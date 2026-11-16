---
title: "Restoring Files with Borg"
description: "Restoring Files with the Borg from the Command Line"
sidebar:
  label: "Restore with Borg"
---

_Reviewed in November 2026_

The `borg extract` command restores a full archive or selected paths from it, including all metadata. It is the fastest way to restore a large number of files. If you would rather browse archives and copy a few files, see [Mount and Browse Archives](/restore/borg/mount). For other options and what you need on a new machine, see the [overview](/restore/borg).

:::note
You should be comfortable using the command line. If you prefer a graphical client, see [restoring with Vorta](https://vorta.borgbase.com/usage/restore/) instead. These instructions should work on macOS and popular Linux flavors, like Debian, Ubuntu, as well as Red Hat, Fedora and CentOS.
:::

:::note
The commands on this page use Borg 1.x syntax. Borg 2 takes the repository via `BORG_REPO` or `-r` and the archive as a separate argument, as described in the [setup tutorial](/setup/borg/cli). If several archives share the same name, select one by its ID as shown by `borg repo-list`, e.g. `aid:4dcedf39`.
:::

## Prerequisites
You should already have Borg installed and know how to use the command line. If you didn't install Borg yet, have a look at [this previous guide](/setup/borg/cli).

## Step 1 - Listing the Archives

To use `borg extract`, you will need to know the precise path and archive name to restore. The [`borg list`](https://borgbackup.readthedocs.io/en/stable/usage/list.html) command can be helpful for this. It lists all archives of a repository or, with an archive name appended, the files in that archive:

```
$ borg list ssh://w66xh7lj@w66xh7lj.repo.borgbase.com/./repo
$ borg list ssh://w66xh7lj@w66xh7lj.repo.borgbase.com/./repo::nyx2-test-repo-2019-02-16T12:04:06
```

Assuming we got the archive name and path from the previous step, a possible `borg extract` command could be

```
$ borg extract \
    --dry-run --list \
    ssh://w66xh7lj@w66xh7lj.repo.borgbase.com/./repo::nyx2-test-repo-2019-02-16T12:04:06 \
    /Users/manu/Documents/financial
```

Due to the `--dry-run` and `--list` arguments this will print a list of files to be restored, but won't actually restore any files. To actually restore files, remove `--dry-run`.

The last part of the command gives the path you're looking to restore. If you pass no paths, then *all* the data will be restored.  If you would like to extract a particular directory without its full path, you would add `--strip-components n`, with `n` being the number of directories you would like to be stripped.

## Step 2 - Extracting the Archives

Borg will restore your files to the current working directory. So be sure you are in the right place before running the command for real. Borg 2 only extracts into an empty directory, unless you add `--continue`. To restore all the data from a specific snapshot to the current directory:

```
$ borg extract \
    --list \
    ssh://w66xh7lj@w66xh7lj.repo.borgbase.com/./repo::nyx2-test-repo-2019-02-16T12:04:06
```

For more information on extracting, check out [the official Borg documentation](https://borgbackup.readthedocs.io/en/stable/usage/extract.html).
