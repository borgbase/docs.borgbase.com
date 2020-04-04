---
title: Extracting
nav_order: 3
layout: page
parent: Restore
description: "Restoring files with borg extract"
---

# Using `borg extract` to Bulk Restore Files

FUSE can be slow for a large number of files and it can't restore metadata. For this reason, Borg includes a second command for fast bulk-restoring – `borg extract`.

To use it, you will need to know the precise path and archive name to restore. The [`borg mount`](https://borgbackup.readthedocs.io/en/stable/usage/extract.html) command can be helpful for this.

Assuming we got the archive name and path from the previous step, a possible `borg extract` command could be

```
$ borg extract \
    --dry-run --list \
    w66xh7lj@w66xh7lj.repo.borgbase.com:repo::nyx2-test-repo-2019-02-16T12:04:06 \
    /Users/manu/Documents/financial
```

Due to the `--dry-run` and `--list` arguments this will print a list of files to be restored, but won't actually restore any files. To actually restore files, remove `--dry-run`.

The last part of the command gives the path you're looking to restore. If you pass no paths, then *all* the data will be restored.

Borg will restore your files to the current working directory. So be sure you are in the right place before running the command for real. To restore all the data from a specific snapshot to the current directory:

```
$ borg extract \
    --list \
    w66xh7lj@w66xh7lj.repo.borgbase.com:repo::nyx2-test-repo-2019-02-16T12:04:06
```
