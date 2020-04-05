---
title: Restore with Borg CLI
nav_order: 3
layout: page
parent: Restore
description: "Restoring files with the Borg CLI"
---

# Restoring Files with Borg via the command line

FUSE can be slow for a large number of files and it can't restore metadata. For this reason, Borg includes a second command for fast bulk-restoring – `borg extract`.

Note: You should be comfortable using the command line. If you prefer a graphical, client, look into our [Vorta Tutorial](/macos/how-to-backup-your-mac-using-the-vorta-backup-gui/) instead. These instructions should work on macOS and popular Linux flavors, like Debian, Ubuntu, as well as Red Hat, Fedora and CentOS.

## Prerequisites
You should already have Borg installed and know how to use the command line. If you didn't install Borg yet, have a look at [this previous guide](https://docs.borgbase.com/linux/setup-borg-command-line/).

## Step 1 - Listing the Archives

To use it, you will need to know the precise path and archive name to restore. The [`borg mount`](https://borgbackup.readthedocs.io/en/stable/usage/extract.html) command can be helpful for this.

Assuming we got the archive name and path from the previous step, a possible `borg extract` command could be

```
$ borg extract \
    --dry-run --list \
    w66xh7lj@w66xh7lj.repo.borgbase.com:repo::nyx2-test-repo-2019-02-16T12:04:06 \
    /Users/manu/Documents/financial
```

Due to the `--dry-run` and `--list` arguments this will print a list of files to be restored, but won't actually restore any files. To actually restore files, remove `--dry-run`.

The last part of the command gives the path you're looking to restore. If you pass no paths, then *all* the data will be restored.  If you would like to extract a particular directory without its full path, you would add `--strip-components n`, with `n` being the number of directories you would like to be stripped.

## Step 2 - Extracting the Archives

Borg will restore your files to the current working directory. So be sure you are in the right place before running the command for real. To restore all the data from a specific snapshot to the current directory:

```
$ borg extract \
    --list \
    w66xh7lj@w66xh7lj.repo.borgbase.com:repo::nyx2-test-repo-2019-02-16T12:04:06
```

For more information on extracting, check out [the official Borg docuementation](https://borgbackup.readthedocs.io/en/stable/usage/extract.html).
