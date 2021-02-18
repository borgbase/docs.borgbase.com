---
title: Mount and Browse Archives
nav_order: 2
layout: page
parent: Restore
description: "Mount and Browse Archive"
---

# Restoring Files by Mounting and Browsing a Borg Archive

Note: You should be comfortable using the command line. If you prefer a graphical, client, look into our [Vorta Tutorial](/macos/how-to-backup-your-mac-using-the-vorta-backup-gui/) instead. These instructions should work on macOS and popular Linux flavors, like Debian, Ubuntu, as well as Red Hat, Fedora and CentOS.

## Goals
This article assumes that you have set up a backup workflow to a local or remote Borg repository. Now you would like to restore files from it. Borg offers two different ways to restore files. The `borg mount` command allows you to browse multiple archives and find exactly the file you are looking for. Due to some overhead from the FUSE mount library, the speed can be slower when restoring a large number of files. This is where `borg extract` comes in. If you already know which files you need, it can quickly restore large quantities of data including all metadata.

## Prerequisites
You should already have Borg installed and know how to use the command line. If you didn't install Borg yet, have a look at [this previous guide](https://docs.borgbase.com/linux/setup-borg-command-line/).


## Step 1 - Set up FUSE
The FUSE library allows mounting arbitrary file systems into user space. It's available for all popular systems. The [official Borg docs](https://borgbackup.readthedocs.io/en/stable/installation.html) have a detailed overview for each system. You will need two parts: the actual FUSE library and Python wrappers for it.

**For macOS**: Install the FUSE library from Homebrew.
```
$ brew cask install macfuse
```

**For Debian/Ubuntu**: The FUSE library is available from the main package repository.
```
$ sudo apt-get install libfuse-dev fuse pkg-config
```

**For Red Hat/CentOS**: FUSE is available from the official repository.
```
$ yum install fuse-devel fuse pkgconfig
```


## Step 2 - Install Borg with FUSE support
FUSE support is an optional add-on for Borg. Install it like this:

```
$ pip3 install 'borgbackup[fuse]'
```

On macOS, you could also use Borg's [FUSE-enabled Tap](https://github.com/borgbackup/homebrew-tap).


## Step 3 - Validate Installation and Repository
Next make sure everything is installed properly and you have access to the backup repo.

```
$ borg info w66xh7lj@w66xh7lj.repo.borgbase.com:repo
```

You should see output similar to this. If you get an error, be sure that you have access to the repository. If your repo is encrypted, it will also ask you for the password or keyfile.


```
Repository ID: daf2e2b94a1b57f0effc96939813ef58d0af04414f92f87c3e092a99adaa90eb
Location: ssh://w66xh7lj@w66xh7lj.repo.borgbase.com/./repo
Encrypted: Yes (repokey BLAKE2b)
Cache: /Users/manu/.cache/borg/daf2e2b94a1b57f0effc96939813ef58d0af04414f92f87c3e092a99adaa90eb
Security dir: /Users/manu/.config/borg/security/daf2e2b94a1b57f0effc96939813ef58d0af04414f92f87c3e092a99adaa90eb
------------------------------------------------------------------------------
                       Original size      Compressed size    Deduplicated size
All archives:              665.90 MB            577.88 MB             68.41 MB

                       Unique chunks         Total chunks
Chunk index:                    1359                 6711
```

If you installed Borg and llfuse via PIP, you can also validate the packages are installed

```
$ pip freeze | grep llfuse
$ pip freeze | grep borgbackup
```

## Step 4 - Mounting the Backup
The `borg mount` command allows for simple browsing and restoring individual files without their complete metadata. This is great to restore a few documents or images.

First create a new folder as mount point. Since we're not working with root permissions, we won't use `/mnt`. Instead any empty folder in your home directory will suffice.

```
$ mkdir borg-mnt
```

Next mount the whole repository into the newly created folder. This will give us a view of *all* archives in the repository.

```
$ borg mount w66xh7lj@w66xh7lj.repo.borgbase.com:repo borg-mount
```

If there was no error, you should now see all your archives in the `borg-mount` folder:

```
$ ls -l borg-mount
```

Depending on the archive names used, the output could look like this.

```
drwxr-xr-x  1 manu  staff  0 Feb 16 12:04 nyx2-test-repo-2019-02-16T12:04:06
drwxr-xr-x  1 manu  staff  0 Mar  5 13:12 nyx2-test-repo-2019-03-05T13:12:04
drwxr-xr-x  1 manu  staff  0 Mar 19 22:36 nyx2-test-repo-2019-03-19T22:36:07
drwxr-xr-x  1 manu  staff  0 Mar 25 23:29 nyx2-test-repo-2019-03-25T23:29:35
drwxr-xr-x  1 manu  staff  0 Mar 26 23:02 nyx2-test-repo-2019-03-26T23:01:57
drwxr-xr-x  1 manu  staff  0 Mar 27 09:21 nyx2-test-repo-2019-03-27T09:21:42
```

You can now browse this folder structure and copy the files you need.

For more information on mounting, check out [the official Borg documentation](https://borgbackup.readthedocs.io/en/stable/usage/mount.html).
