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

1. Have you already assigned a SSH key to the repo on [BorgBase.com](https://www.borgbase.com) and is this the same key you are using locally? *BorgBase* will show the key's SHA256 fingerprint in *Account > SSH Keys*. You can compare this to your local fingerprint like this:

    ```
    $ ssh-keygen -lf ~/.ssh/id_ed25519
    ```

2. Is SSH using the key you assigned? By default only `~/.ssh/id_[rsa | ed25519 | ecdsa]` are used. When using a custom key name, you can add `IdentityFile ~/.ssh/id_custom` to `~/.ssh/config`. Or to only use this key with BorgBase:

    ```
    Host *.repo.borgbase.com
        IdentityFile ~/.ssh/id_custom
    ```

3. Is SSH trying too many keys? The maximum number of keys (`MaxAuthTries`) that can be tried per connection is 6. If you have more keys, specify the key to use, as shown above.
4. Are the key permissions OK? Private keys and important config files (if in use) need to have a permission of `0600`. To change the permission:

    ```
    $ chmod 0600 ~/.ssh/id_custom ~/.ssh/config
    ```

5. If you still get errors, try to connect to your repo using the `ssh` command with verbose logging enabled:

    ```
    $ ssh -v xxxx@xxxx.repo.borgbase.com
    ```

This will print a list of keys being tried and potential problems. You won't get a shell at the end, as BorgBase only supports access via `borg`. Once you see `Remote: Key is restricted.` or `PTY allocation request failed on channel 0` then the login step still worked.


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

This configuration means that the client will send a null packet every 10 seconds to keep the connection alive. If it doesn't get a response 30 times, the connection will be closed. BorgBase already has the appropriate `ClientAliveInterval` configuration applied server-side.

If you still encounter issues, you may be using a VPN, a mobile network that aggressively terminates idle connections or a residential internet connection with short outages. In that case, you can use a simple [retry script](https://github.com/kadwanev/retry) during the initial upload. It will retry the command if it exits with an error. Borg also adds *checkpoint archives* every 30 minutes, so data is only uploaded once, even if the backup run is interrupted.


#### Debug Network Issues

If you suspect routing issues or an unstable network connection (certain residential internet connections come with restricted upload speed), you can run the below network tests: a `mtr` traceroute test to uncover packet loss or `iperf3` for excessive retransmits:

Traceroute to uncover routing issues and packet loss: (takes about 15 min to complete)
```
$ mtr -s 1000 -r -c 1000 xxxxx.repo.borgbase.com
```

Network performance test to uncover excessive retransmits and measure bandwidth: (contact support to enable this first)
```
$ iperf3 -c xxxxx.repo.borgbase.com
```

For an in-depth discussion on network interruptions, also see Borg issues [#636](https://github.com/borgbackup/borg/issues/636) and [#3988](https://github.com/borgbackup/borg/issues/3988). Or [this](https://askubuntu.com/a/354245) and [this](https://unix.stackexchange.com/questions/3026/what-options-serveraliveinterval-and-clientaliveinterval-in-sshd-config-exac) StackExchange question.



### Why is my backup process so slow?

All our servers are connected with 1Gbit connections at a minimum and located in professional data centers. We rarely get reports of slow backup speeds. If you do encounter slower-than-expected backups or slow upload speeds, you can follow the steps below to find the bottleneck.

First it helps to understand the steps `borg` follows when creating an initial or new backup:

1. First it will do some housekeeping, like getting the index from the repo, if there is no local copy.
2. Next it will compare all the inode ID and other attributes of all files to determine changed files. If you move your files to a new file system, the first backup run can take a bit longer, but no new data will be copied.
3. If new data is found, Borg will checksum, compress and encrypt the files as segments of 1-5 MB, skipping any known segments. So if part of a large file changes, only new parts will be uploaded.
4. Last, it will upload new segments to *BorgBase*.

So the upload speed is not always the main bottleneck. Depending on your setup, you should also watch out for CPU usage or disk IO. It's usually difficult to improve uplink speed, but if you are CPU- or IO-limited, there are a few settings you can tune. Just be aware of the trade-offs. Maybe you are OK with a slower initial backup in order to have a smaller well-compressed backup in the future.

- Make sure you choose an appropriate [compression level](https://borgbackup.readthedocs.io/en/stable/usage/help.html?highlight=compression#borg-help-compression) for your data. In general `lz4` (fast, but low compression) `zstd,3` (medium compression) and `zstd,8` (high compression) will work well.
- If you don't need additional file flags, you can disable them with [`--nobsdflags`](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#nobsdflags), [`--noacls`](https://borgbackup.readthedocs.io/en/stable/changes.html#version-1-1-16-2021-03-23), [`--noxattrs`](https://borgbackup.readthedocs.io/en/stable/changes.html#version-1-1-16-2021-03-23) or `bsd_flags: false` in Borgmatic. This can lead to dramatic performance [improvements](https://github.com/borgbackup/borg/issues/5295#issuecomment-805048888) when your backup consists of many small files. (With Borg >1.2, use `--noflags` instead of `--nobsdflags`)
- Ensure the local [files cache](https://borgbackup.readthedocs.io/en/stable/usage/create.html#description) is working correctly. By default Borg will compare `ctime,size,inode` and process the file if either changes. If you have e.g. a network file system with unstable inodes, try using `--files-cache ctime,size`
- Avoid excessive archive checking: `borg check` can read all backup segments and confirm their consistency. For large repos this can take a long time. BorgBase already uses different techniques to avoid bitrot in the storage backend, so `borg check` is not strictly necessary for this purpose. In Borgmatic set `checks` to `disabled` in the `consistency` section. If you still need consistency checks, consider using the `repository` option to limit the check to the repository. Checking all archive metadata is done on the client and very time consuming. See the official [Borg docs](https://borgbackup.readthedocs.io/en/stable/usage/check.html) for details.


## Append-Only Mode

Also called "delayed deletion". In this mode, Borg will never remove old segments and instead add a new transaction for any change in a transaction log. The result is that no data is ever deleted and operations (like archive prunes- or deletions) can be undone. This is useful if the client machine shouldn't get full access to its own backups to e.g. prevent a hacker from deleting backups after taking over a client machine. For full details and instruction on how to roll back, see the official [Borg docs](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode).


### Why can I still prune or delete archives with active append-only mode?

The server-side Borg process [doesn't know](https://github.com/borgbackup/borg/issues/3504#issuecomment-354765228) about the high-level commands (`borg delete`, `borg prune`) you run. It only knows about adding chunks, removing chunks and so on. So with the current architecture, it's not possible to reject e.g. a `borg delete` command right away.

As a result, all high level operations still work, but old data isn't deleted (delayed deletion). Effectively this means that while running backups with append-only SSH keys, no disk space will be recovered in your BorgBase repo with pruning. But you can run a prune with an all access ssh key when your free quota is running low, which will then clear pruned backups and free up disk space.

With append-only mode enabled, the repository will have a timestamped transaction log. This [allows going back](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode) to previous states, even if prune- or delete-commands were issued by the backup client.

If you need to restore an older repo version, you can use [SFTP mode](/setup/import) to make the necessary edits or, preferably, download a backup copy of the whole repo before doing any edits.


### How can I prune append-only repositories?

When using append-only mode, old transactions and segments are never cleaned from the repo and the size can grow over time. The timing and conditions of when old segments are cleaned up depends on the Borg version in use:

- Borg 1.1.x: In this version, old segments are deleted *implicitely* when a write operation (e.g. `borg create`, `borg delete`) is done with a full access key.
- Borg 1.2.x: This version added a new `borg compact` command to *explicitely* clean up old segments at a suitable time. You can trigger this command from our control panel under *More > Compact repo* from the repo table. Or run `borg compact` with a full access key directly.


## Other Questions

### Which storage backend are you using?

Both regions are currently using hardware RAID-6 backed storage servers with enterprise drives and replacement drives ready on-site. This protects against hardware failure and a degree of bit rot. For a list of the providers we work with, you can also see our [GDPR page](https://www.borgbase.com/gdpr).

While this provides good durability against hard drive failure, BorgBase doesn't offer geographical redundancy or redundancy across multiple data centers for single repos. It's thus not recommended to use our service for archiving purposes, where there is no other copy of the data.

If you want geographic redundancy, you can add two repos in different regions and do parallel backup to both of them. This case is, e.g. well supported by Borgmatic, which allows adding a list of repositories.


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


### Is there a maintenance window?

Sometimes it's necessary to restart services and servers to apply security- and maintenance updates. Usually such updates are not urgent, so we schedule them in a way to minimize any service disruption, while doing them. So the maintenance window for each region is as follows:

- **EU Region**: 09:20 to 09:40 UTC [🌍](https://www.timeanddate.com/worldclock/converter.html?iso=20200415T092000&p1=1440)
- **US Region**: 15:20 to 15:40 UTC [🌎](https://www.timeanddate.com/worldclock/converter.html?iso=20200415T152000&p1=1440)

Usually there won't be any downtime during this maintenance window. But if restarts or maintenance are required, it will be done during that time, unless more urgent action is needed.


### Have any other questions? [Email Us!](mailto:hello@borgbase.com)
{: .no_toc }