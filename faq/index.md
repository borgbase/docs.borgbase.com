---
title: FAQ
nav_order: 9
layout: page
description: "Common errors and frequently asked questions"
has_children: true
has_toc: false
---
# Frequently Asked Questions
{: .no_toc }

1. TOC
{:toc}

## Troubleshooting

### All connections to a BorgBase repo fail with an error immediately.

If you get `Connection closed by remote host. Is borg working on the server?`, it is almost always a problem with SSH keys. Double-check the following to debug further:

1. Have you already assigned a SSH key to the repo on [BorgBase.com](https://www.borgbase.com)?
2. Is SSH using the key you assigned? By default only `~/.ssh/id_[rsa | ed25519 | ecdsa]` are used. When using a custom key name, you can add `IdentityFile ~/.ssh/id_custom` to `~/.ssh/config`. Or to only use this key with BorgBase:

    ```
    Host *.repo.borgbase.com
        IdentityFile ~/.ssh/id_custom
    ```

3. Is SSH trying too many keys? The maximum number of keys (`MaxAuthTries`) that can be tried per connection is 6. If you have more keys, specify the key to use, as shown above.
4. Are the key permissions OK? Private keys need to have a permission of `0600`. To change the permission:

    ```
    $ chmod 0600 ~/.ssh/id_custom
    ```

5. If you still get errors, try to connect to your repo using the `ssh` command with verbose logging enabled:

    ```
    $ ssh -v xxxx@xxxx.repo.borgbase.com
    ```

This will print a list of keys being tried and potential problems. You won't get a shell at the end, as BorgBase only support access via `borg`. Once you see `Remote: Key is restricted.` or `PTY allocation request failed on channel 0` then the login step still worked.


### Why is my backup process so slow?

All our servers are connected with 1Gbit connections at a minimum and located in professional data centers. We rarely get reports of slow backup speeds. If you do encounter slower-than-expected backups or slow upload speeds, you can follow the steps below to find the bottleneck.

First it helps to understand the steps `borg` follows when creating an initial or new backup:

1. First it will do some housekeeping, like getting the index from the repo, if there is no local copy.
2. Next it will compare all the inode ID and other attributes of all files to determine changed files. If you move your files to a new file system, the first backup run can take a bit longer, but no new data will be copied.
3. If new data is found, Borg will checksum, compress and encrypt the files as segments of 1-5 MB, skipping any known segments. So if part of a large file changes, only new parts will be uploaded.
4. Last, it will upload new segments to *BorgBase*.

So the upload speed is not always the main bottleneck. Depending on your setup, you should also watch out for CPU usage or disk IO. It's usually difficult to improve uplink speed, but if you are CPU- or IO-limited, there are a few settings you can tune. Just be aware of the trade-offs. Maybe you are OK with a slower initial backup in order to have a smaller well-compressed backup in the future.

- Make sure you choose an appropriate [compression level](https://borgbackup.readthedocs.io/en/stable/usage/help.html?highlight=compression#borg-help-compression) for your data. In general `lz4` (fast, but low compression) `zstd,3` (medium compression) and `zstd,8` (high compression) will work well.
- If you don't need additional file flags, you can disable them with [`--nobsdflags`](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#nobsdflags) or `bsd_flags: false` in Borgmatic. In a future version this flag may be [renamed](https://github.com/borgbackup/borg/issues/4489) to `--noflags`.
- Ensure the local [files cache](https://borgbackup.readthedocs.io/en/stable/usage/create.html#description) is working correctly. By default Borg will compare `ctime,size,inode` and process the file if either changes. If you have e.g. a network file system with unstable inodes, try using `--files-cache ctime,size`
- Avoid excessive archive checking: `borg check` can read all backup segments and confirm their consistency. For large repos this can take a long time. BorgBase already uses different techniques to avoid bitrot in the storage backend, so `borg check` is not strictly necessary for this purpose. In Borgmatic set `checks` to `disabled` in the `consistency` section. If you still need consistency checks, consider using the `repository` option to limit the check to the repository. Checking all archive metadata is done on the client and very time consuming. See the official [Borg docs](https://borgbackup.readthedocs.io/en/stable/usage/check.html) for details.
- If you suspect a slow (certain residential internet connections come with restricted upload speed) or unstable network connection, we can temporarily enable `iperf3` for you server-side.


### My SSH connection breaks after a long backup or prune operation.

If Borg happens to be busy on the client- or server side, it may not send data over the SSH connection for a while. In this case, some ISPs will [terminate](https://anderstrier.dk/2021/01/11/my-isp-is-killing-my-idle-ssh-sessions-yours-might-be-too/) the connection after a period of inactivity, especially if a NAT is involved. You would then see an error like this:

```
Remote: packet_write_wait: Connection to xxx.xxx.xxx.xxx: Broken pipe
Connection closed by remote host
```

or

```
Remote: client_loop: send disconnect: Broken pipe
RemoteRepository: 2.61 kB bytes sent, 1.01 MB bytes received, 52 messages sent
Connection closed by remote host
```

Which means the SSH connection has been terminated and Borg is unable to send data to the server-side process. One possible [solution](https://github.com/borgbackup/borg/issues/3988#issuecomment-478807213) is to have the client send regular keep-alive packages while no data is sent by Borg. On the client machine, you can add the below configuration to `~/.ssh/config` or `/etc/ssh/ssh_config`:

```
Host *.repo.borgbase.com
        ServerAliveInterval 10
        ServerAliveCountMax 30
```

This configuration means that the client will send a null packet every 10 seconds to keep the connection alive. If it doesn't get a response 30 times, the connection will be closed.

BorgBase already has the appropriate `ClientAliveInterval` configuration server-side.

For an in-depth discussion, also see Borg issues [#636](https://github.com/borgbackup/borg/issues/636) and [#3988](https://github.com/borgbackup/borg/issues/3988). Or [this](https://askubuntu.com/a/354245) and [this](https://unix.stackexchange.com/questions/3026/what-options-serveraliveinterval-and-clientaliveinterval-in-sshd-config-exac) StackExchange question.

If you still encounter issues, you may be using a VPN or mobile network that aggressively terminates idle connections.


## Append-Only Mode

In this mode, Borg will never remove old segments and instead add a new transaction for any change in a transaction log. The result is that no data is ever deleted and unwanted operations (like archive prunes- or deletions) can be undone. This is useful if the client machine shouldn't get full access to its own backups to e.g. prevent a hacker from deleting backups after taking over a client machine. For full details and instruction on how to roll back, see the official [Borg docs](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode).


### Why can I still prune or delete archives with active append-only mode?

The Borg developers made the [decision](https://github.com/borgbackup/borg/issues/3504#issuecomment-354764028) to fail delete commands "silently". Effectively this means that while running backups with append-only ssh keys, no disk space will be recovered in your BorgBase repo with pruning. But you can run a prune with an all access ssh key when your free quota is running low, which will then clear pruned backups and free up disk space.

With append-only mode enabled, the repository will have a timestamped transaction log. This [allows going back](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode) to previous states, even if prune- or delete-commands were issued by the backup client.

If you need to restore an older repo version, you can export the whole repo using `rsync` and roll back to a previous transaction.


### How can I prune append-only repositories?

When using append-only mode, old transactions and segments are never cleaned from the repo and the size can grow over time. To really prune append-only repos and reduce their space usage, you have two options:

1. Temporarily set your main key to full access mode. This will remove old transactions during the next operation.
2. Use a trusted admin machine wiht a full access key to prune. This will also clear old transactions.



## Other Questions

### Which storage backend are you using?

Both regions are currently using hardware RAID-6 backed storage servers. This protects against hardware failure and a degree of bit rot. For a list of the providers we work with, you can also see our [GDPR page](https://www.borgbase.com/gdpr).


### How can I migrate an existing repo including archives to or from BorgBase?

We offer free migration services for both, incoming and outgoing transfers. Currently this is done manually. To start a transfer follow these steps:

1. For incoming transfers, create an empty repo in your BorgBase account.
2. Make sure your old repo data is accessible from the internet somehow, e.g. via SSH, FTP or HTTP. For SSH we will provide you with a one-time public key to use.
3. Contact our support and provide the BorgBase repo ID and the login details of the transfer source or target.


### Why is the repository size shown in the web interface different from `borg info`?

BorgBase always displays the actual disk usage, as measured on the file system. This includes some metadata and index files and slight variations from the space usage reported via `borg info` under *All Archives > Deduplicated Size* are expected.

If you see larger variations, you are probably running your repo in *append-only mode*. This means `borg` never really deletes old segments. So the actual disk usage will be higher than what `borg` thinks over time. From the [docs](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode):

> As data is only appended, and nothing removed, commands like prune or delete won’t free disk space, they merely tag data as deleted in a new transaction.

If you are OK to fully remove those old segments, then just write to the repo with a full-access key. This will clean up old segments:

> Be aware that as soon as you write to the repo in non-append-only mode (e.g. prune, delete or create archives from an admin machine), it will remove the deleted objects permanently


### How often should I run `borg check`?

The `borg check` command can detect issues with your repository, but running it on large repos will make your backups much slower and cause higher load on our storage servers. It's not really necessary to run it more often, since the underlying RAID controller already does weekly data scrubs to verify the data. As a result we strongly recommend running `borg check` once a month only. When using Borgmatic, this can be done like this:

- Run this cron task every day to create a new backup: `borgmatic --create --prune`
- And this once a month (some random day a few hours after the backup): `borgmatic --check`

Our [Ansible role](https://github.com/borgbase/ansible-role-borgbackup) also supports monthly checks, when `borgmatic_large_repo` is set to `True` (the default).

**If we notice excessive repo checks on your account, we may contact you or interrupt those processes in order to guarantee the best speed for all users.**

### How do I fully remove my account?

If you have found another backup service and prefer to remove your account, you can do so any time. Doing so will remove your account data permanently. If you ever choose to start using BorgBase again, you will have to open a new account. If you ever had a paid subscription, we will still keep some invoicing data, as required by law. To remove your account:

1. Remove all your repositories and make sure the data is saved elsewhere. You can also transfer your whole archive via `rsync`, as described [here](import).
2. Log into your account and navigate to [*Account > Profile*](https://www.borgbase.com/account?tab=6). Then click *Remove Account*


### Have any other questions? [Email Us!](mailto:hello@borgbase.com)
{: .no_toc }