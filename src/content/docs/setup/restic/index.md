---
title: "Setting up Backups with Restic"
sidebar:
  label: "Restic"
description: "Initialize a Restic repository on BorgBase and take a first snapshot."
---

Restic sends backups to BorgBase over HTTPS and authenticates with a username and password, which are part of the repository URL. Before you start, [create a repository](/setup#next-steps) with the Restic format and copy its URL from the BorgBase control panel. It starts with `rest:https://`.

## Step 1 - Initialize Repository

First you need to initialize the repository. This sets up the encryption and writes some supporting files. To avoid passing the repository URL and password with each command, it's recommended to set it as shell variable:

```
$ export RESTIC_REPOSITORY=rest:https://xxxxx:yyyyyyyyyyy@xxxxx.repo.borgbase.com
$ export RESTIC_PASSWORD=mysecret
```

To initialize the repository:
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

## Next steps

- [Verify](/verify) that your backups are working.
- Try a [test restore](/restore/restic).

## Further reading

You can find more on how to use Restic in the [official documentation](https://restic.readthedocs.io/en/stable/010_introduction.html).
