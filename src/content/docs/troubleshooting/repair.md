---
title: "Repairing Repositories"
description: "Resolve data integrity errors, missing segments and cache problems in Borg repositories."
sidebar:
  label: "Repair"
---

:::note
The commands on this page use Borg 1.x syntax. With Borg 2, pass the repository as `-r $REPO_URL` and use `borg repo-delete --cache-only` and `borg repo-info` instead of `borg delete --cache-only` and `borg info`. The `borg upgrade --archives-tam` step only applies to Borg 1.x.
:::

## I get a 'Data integrity error' when accessing a repository

Borg 1.2.6 shipped with improved archive verification and may throw this error when created with older Borg versions. Full details in the [release logs](https://github.com/borgbackup/borg/blob/1.2.6/docs/changes.rst#pre-125-archives-spoofing-vulnerability-cve-2023-36811) or this [Github issue](https://github.com/borgbackup/borg/issues/7802).

If you trust the remote repository, at a minimum you will need to run the below command:
```
$ BORG_WORKAROUNDS=ignore_invalid_archive_tam borg upgrade --archives-tam $REPO_URL
```

After this all archives will be verified and you will no longer see this error.

## Repair Damaged Repositories

There are rare situations, where Borg repositories can be damaged by e.g. interrupted backups, incomplete migrations, hardware failures or other factors. Symptoms include:

- `Object with key XXX not found in repository`
- `Cache is newer than repository - do you have multiple, independently updated repos with same ID?`

Borg is generally good at fixing those issues and missing data will be added during the next backup run.

### Missing Data Segments

To fix errors related to missing data or files:

1. First run `borg check $REPO_URL`. This will first check the repository files and then one or more archives.
2. If the first step reveals errors, you should make a local repo copy, unless the data is non-critical.
3. Next run `borg check --repair $REPO_URL` to ask Borg to fix any errors.
4. Finally run `borg create ...` to do a full backup run and add potentially missing data.

### Cache Issues

To fix errors related to the cache (from [here](https://github.com/borgbackup/borg/issues/3428#issuecomment-380399036)):

1. First try to delete the local cache `borg delete --cache-only $REPO_URL`
2. If the first step doesn't resolve the issue, try moving the security folder in `~/.config/borg/security/$REPO_ID`. Both the *Repository ID* and the exact *Security dir* are shown by `borg info $REPO_URL`
3. Run a repo check with `borg check $REPO_URL`.
