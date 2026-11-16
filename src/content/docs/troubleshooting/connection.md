---
title: "Connection and SSH Issues"
description: "Fix refused connections, SSH key errors and dropped SSH sessions when backing up to BorgBase."
sidebar:
  label: "Connection Issues"
---

## All connections to a BorgBase repo fail with an error immediately.

If you get a `Connection refused` error, there may have been too many failed login attempts. Those could also be caused by different retry scripts. In this case, your IP may be blocked for 20 minutes from this server. Solution is simply to wait a few minutes and ensure there aren't too many failed logins.

If you get `Permission denied (public key)`, `Connection closed by remote host. Is borg working on the server?` or get asked for a SSH *password* (as opposed to Borg *passphrase*), it is almost always a problem with SSH keys. Double-check the following to debug further:

1. Have you already assigned a SSH key to the repo on [BorgBase.com](https://www.borgbase.com) and is this the same key you are using locally?  *BorgBase* will show the key's SHA256 fingerprint in *Account > SSH Keys*. You can compare this to your local fingerprint like this:

    ```
    $ ssh-keygen -lf ~/.ssh/id_ed25519
    ```

2. Is SSH using the key you assigned? By default only `~/.ssh/id_[rsa | ed25519 | ecdsa]` are used. If you run Borg from a different user account, the SSH keys will differ too. When using a custom key name, you can add `IdentityFile ~/.ssh/id_custom` to `~/.ssh/config`. Or to only use this key with BorgBase:

    ```
    Host *.repo.borgbase.com
        IdentityFile ~/.ssh/id_custom
    ```

3. Is the SSH key you are using encrypted? Encrypted keys need to be unlocked (added to `ssh-agent`) before using them with Vorta and you may get prompted for a password when using it with Borg directly. So not well suited for non-interactive use. For most use cases, using an encrypted key doesn't increase security. It's better to use one key per machine and not move it.
4. Is SSH trying too many keys? The maximum number of keys (`MaxAuthTries`) that can be tried per connection is 6. If you have more keys, specify the key to use, as shown above.
5. Are the key permissions OK? Private keys and important config files (if in use) need to have a permission of `0600`. To change the permission:

    ```
    $ chmod 0600 ~/.ssh/id_custom ~/.ssh/config
    ```

6. If you still get errors, try to connect to your repo using the `ssh` command with verbose logging enabled:

    ```
    $ ssh -v xxxx@xxxx.repo.borgbase.com
    ```

    This will print a list of keys being tried and potential problems. You won't get a shell at the end, as BorgBase only supports access via `borg`. Once you see `Remote: Key is restricted.`, a `Remote:` line ending in `key options: command` (newer OpenSSH versions) or `PTY allocation request failed on channel 0` then the login step still worked.

7. Does the server's SSH host key match the repo's? Mouse over the fingerprint icon next to the repo in BorgBase to see the expected fingerprint, then check what your client actually reaches:

    ```
    $ ssh-keyscan -t rsa xxxxx.repo.borgbase.com | ssh-keygen -lf -
    ```

    If it doesn't match, something on the network path is answering on port 22 instead of our server (often a router "SSH inspection"/proxy feature or an ISP middlebox) — this shows up as `Server accepts key` followed immediately by `Permission denied`. Don't delete your `known_hosts` entry; it's what caught the mismatch. Try a different network, such as a phone hotspot, to confirm.

## My SSH connection breaks after a long backup or prune operation.

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

Which means the SSH connection has been terminated and Borg is unable to send data to the server-side process. Some possible solutions are:

### Frequent keepalive packets
Mostly helpful for long `borg prune` or `borg check` operations running server-side. Have the client send regular keep-alive packets while no data is sent by Borg. On the client machine, you can add the below configuration to `~/.ssh/config` or `/etc/ssh/ssh_config`:

```
Host *.repo.borgbase.com
        ServerAliveInterval 10
        ServerAliveCountMax 30
```

This configuration means that the client will send a null packet every 10 seconds to keep the connection alive. If it doesn't get a response 30 times, the connection will be closed. BorgBase already has the appropriate `ClientAliveInterval` configuration applied server-side.

### Enable automatic retries in Borgmatic
Borgmatic can automatically retry a failed command. To benefit from this feature add this to your Borgmatic config:

```yaml
retries: 5
retry_wait: 5
```

### Use external retry mechanism
You can also use your own retry mechanism in a shell script. Borg adds *checkpoint archives* every 30 minutes, so your progress is preserved if a retry is needed. Keep in mind that exit code `1` means Borg encountered warnings and you probably don't want to retry in this case, but check the logs.

### Debug packet loss and unstable connections
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

## What's the difference between a SSH key, SSH password, SSH key passphrase and Borg repository passphrase?

The SSH key is used for *authentication*, while the Borg repository passphrase is used for *encryption*. If you are prompted for a SSH *password*, there is an issue with your SSH key. See [Keys, Passwords and Passphrases](/setup/borg/ssh-keys#keys-passwords-and-passphrases) for the full explanation.
