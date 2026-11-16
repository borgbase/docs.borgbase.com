---
title: "Restoring Files from a Restic Backup"
sidebar:
  label: "Restic"
description: "List snapshots and restore files from a Restic repository on BorgBase."
---

## Prerequisites

To restore files from a Restic backup, you need two things:

- The repository URL: This can be copied from the BorgBase control panel. It starts with `rest:https://`.
- The repository password: This is the same password used to initialize the repository and for subsequent backups. BorgBase has no knowledge of it and can't help recover it. So it's important to keep it in a safe place.

## Step 1 - List Snapshots

To avoid having to enter the repository URL and password with each command, you can set it as shell variable:

```
$ export RESTIC_REPOSITORY=rest:https://xxxxx:yyyyyyyyyyy@xxxxx.repo.borgbase.com
$ export RESTIC_PASSWORD=mysecret
```

Then list snapshots:
```
$ restic snapshots
```

Note the ID of the snapshot you want to restore and proceed to the next step

## Step 2 - Restore files

To actually download files from a backup:
```
$ restic restore 99999999 --target /tmp/restore-work
```

## Further reading

You can find more on how to restore files in the [official documentation](https://restic.readthedocs.io/en/stable/).
