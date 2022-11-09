---
title: Restic
nav_order: 2
layout: page
description: ""
parent: Restore
has_children: false
has_toc: false
---

# Restoring Files from a Restic Backup

{: .note }
Restic support was only added recently and our documenation for it will be expanded over time.

## Step 1 - List Snapshots

To restore files from a Restic backup, you need two things:

- The repository URL: This can be copied from the BorgBase control panel. It starts with `rest:https://`.
- The repository password: This is the same password used to initialize the repository and for subsequent backups. BorgBase has no knowledge of it and can't help recover it. So it's important to keep it in a safe place.

To avoid having to enter the repository URL and password with each command, you can set it as shell variable:

```
$ export RESTIC_REPOSITORY=rest:https://xxxxx:yyyyyyyyyyy@xxxxx.repo.borgbase.com
$ export RESTIC_PASSWORD=mysecret
```

Then list snapshot:
```
$ restic snapshots
```

Note the ID of the snapshot you want to restore and proceed to the next step

## Step 2 - Restore files

To actually download files from a backup:
```
$ restic restore 9999999 --target /tmp/restore-work
```


## Further reading

You can find more on how to restore files in the [official documentation](https://restic.readthedocs.io/en/stable/).

## Have any other questions? [Email Us!](mailto:hello@borgbase.com)