---
title: Restic
nav_order: 4
layout: page
parent: Setup
description: ""
has_children: false
has_toc: false
---
# Setting up Backups with Restic

{: .note }
Restic support was only added recently and our documenation for it will be expanded over time.

## Step 1 - Initialize Repository

First you need to initilize the repository. This sets up the encryption and writes some supporting files. To avoid passing the repository URL and password with each command, it's recommended to set it as shell variable:

```
$ export RESTIC_REPOSITORY=rest:https://xxxxx:yyyyyyyyyyy@xxxxx.repo.borgbase.com
$ export RESTIC_PASSWORD=mysecret
```

To initilize the repository
```
$ restic init
```

## Step 2 - First snapshot

Restic calls each backup run a "snapshot". It is the state of a specific folder at a specific time. To take a snapshot of folder `/var`:
```
$ restic backup /var
```

Verify our snapshot is there:
```
$ restic snapshots
```

## Further reading

You can find more on how to use Restic in the [official documentation](https://restic.readthedocs.io/en/stable/050_restore.html).

## Have any other questions? [Email Us!](mailto:hello@borgbase.com)
