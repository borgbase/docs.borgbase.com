---
title: Create SSH Key
nav_order: 1
layout: page
parent: FAQ
description: "How to create a new SSH key for secure connections."
---
# How to Create a SSH Key on macOS or Ubuntu/Debian

### Introduction
SSH (or Secure Shell) was invented as a more secure replacement for **telnet**. It is used to connect to a remote server and run command, transfer files or forward traffic. If you do anything remotely related to server or websites, you probably heard about it.

BorgBackup also uses SSH to securely connect to a backup server and transfer files. It does this by starting another server on the remote end, which makes it quicker than using SFTP (a subset of SSH to transfer files) directly.

To use SSH, you need a keypair, which consists of a public- and a private key. The private key should always stay on your local machine. The public key can be added to remote services (like BorgBase), so you can authenticate yourself to the remote service. This is more convenient and secure than using a password because a key is much longer than a typical password.

## Step 1 – Ensure OpenSSH is available
OpenSSH is the default SSH server- and client used on most Linux distributions and on macOS. It comes with utilities to generate keys. It's already pre-installed on macOS. On Ubuntu or Debian it will be installed most of the time. Run the following command to make sure it works:

```
$ ssh-keygen
```

If OpenSSH is already installed, you will see output like this. Cancel the command with **Ctrl-C** and proceed to step 2.
<div class='code-label'>ssh-keygen sample output</div>
```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/manu/.ssh/id_rsa):
```

If the above command gives an error, you can still install OpenSSH using this command on Ubuntu or Debian. On other distributions this may differ.
```
$ apt-get install openssh-client
```

## Step 2 – Create Keypair
As computers get faster, encryption needs to adjust. That's why the recommended key algorithm and key length has changed over the years. As of 2018 the recommended key setting[^1] [^2] is:

```
$ ssh-keygen -t ed25519 -a 100
```

This will generate an Ed25519 key, which is shorter and faster than a comparable RSA key. If you prefer to use the older RSA format or because you have an older OpenSSH version, you can also use:

```
$ ssh-keygen -t rsa -b 4096 -o -a 100
```

After choosing an appropriate key format- and length, the command will ask you a series of questions regarding place to save the key and password. Using the default location in `~/.ssh/id_ed25519` or `~/.ssh/id_rsa` is generally OK and OpenSSH will easily find keys later. Optionally you can also use a password and store it in macOS' Keychain later.

## Step 3 – Using the Public Key Part for Backups
When done, you will find your newly-generated key in `~/.ssh`. To view your public key:
```
$ cat ~/.ssh/id_ed25519.pub
```

Or if you chose a RSA key
```
$ cat ~/.ssh/id_rsa.pub
```

This will print your **public** key. (Please don't upload your private key.)
```
ssh-ed25519 AAAAC3NzaC1lZDI...LqRJw+dl/E+2BJ manu@nyx
```

You can now simply copy it to the clipboard and add it to [BorgBase.com](https://www.borgbase.com) under **Account** > **SSH Keys**.

When adding a new backup repository, you can choose any of your SSH keys. It's good practice to have one keypair per-server or machine. So each machine can only access its own backups.

During repo initialization, Borg will simply use the key without any further settings.

### References
[^1]: [Secure Secure Shell](https://stribika.github.io/2015/01/04/secure-secure-shell.html)
[^2]: [What are ssh-keygen best practices?](https://security.stackexchange.com/questions/143442/what-are-ssh-keygen-best-practices)