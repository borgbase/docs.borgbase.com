---
title: "Repository Settings"
description: "Options available for each BorgBase repository: region, access keys, quota, monitoring alerts, SFTP access and compaction."
sidebar:
  label: "Settings"
---

Each repository has its own settings. You choose them when adding a repository on the [Repositories page](https://www.borgbase.com/repositories) and can change most of them later using the **Edit** icon in the repository's row. The same options are available via the [API](/api) using the `repoAdd` and `repoEdit` operations.

## Format and Region

- **Format**: The backup tool the repository is used with. See [Choose a Backup Tool](/setup) for a comparison. For Borg, you can also choose the Borg version per repository.
- **Region**: Where the repository is stored. You can choose between US and EU locations. A single repository is kept in one region only. To get geographic redundancy, back up to [two repositories in different regions](/repositories/storage).

## Access and SSH Keys

Borg repositories are accessed using SSH keys. Keys are first added to your account under **Account > SSH Keys** and then assigned to one or more repositories. A key that isn't assigned to a repository can't access it. See [SSH Keys](/setup/borg/ssh-keys) on how to create one.

Each key is assigned to a repository with one of two access levels:

- **Full access**: The key can add, prune and delete archives and free up disk space.
- **Append-only access**: The key can add new archives, but data is never actually removed. Use this for the key kept on the machine being backed up, so a compromised machine can't destroy its own backups. See [Append-Only Mode](/repositories/append-only) for details.

It's good practice to use one key per machine. If a machine is lost or compromised, you can remove its key without affecting others.

Restic repositories don't use SSH keys. They authenticate with the username and password that are part of the repository URL.

## Storage Quota

By default a repository can use all the storage available to your account. Optionally you can limit the space a single repository may use. This is useful to keep one machine from using up the quota shared with others. See [Pricing](/pricing) on how storage use is billed.

## Monitoring Alerts

BorgBase can alert you when a repository hasn't received a new backup for a set number of days. This catches the case where a backup job stops running silently, which a failure notification on the client would miss. Set the number of days to a bit more than your backup interval.

Alerts can be delivered by email, Pushover or webhook. For more ways to make sure backups are working, see our [verification checklist](/verify).

## SFTP Access

Under **Advanced Options** you can temporarily *Enable SFTP* to access the raw repository files. This is used to [import or export](/repositories/import) an existing repository. Switch the repository back to normal access when done.

## Compaction

With Borg 1.2 and newer, pruned or deleted data only frees disk space once the repository is compacted. You can run this from the control panel using *More > Compact repo* in the repository's row, schedule it to run regularly on the server, or run `borg compact` with a full access key. Server-side compaction is useful for repositories that are otherwise only accessed with append-only keys. See [How can I prune append-only repositories?](/repositories/append-only#how-can-i-prune-append-only-repositories)
