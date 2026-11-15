---
title: "Append-Only Mode and Storage Use"
description: "How append-only mode works on BorgBase, when disk space is freed and why reported sizes can differ."
sidebar:
  label: "Append-Only and Storage Use"
  order: 3
---

Also called "delayed deletion". In this mode, Borg will never remove old segments and instead add a new transaction for any change in a transaction log. The result is that no data is ever deleted and operations (like archive prunes or deletions) can be undone. This is useful if the client machine shouldn't get full access to its own backups to e.g. prevent a hacker from deleting backups after taking over a client machine. For full details and instruction on how to roll back, see the official [Borg docs](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode).

:::note
This page describes append-only mode as implemented in Borg 1.x.
:::

## Why can I still prune or delete archives with active append-only mode?

The server-side Borg process [doesn't know](https://github.com/borgbackup/borg/issues/3504#issuecomment-354765228) about the high-level commands (`borg delete`, `borg prune`) you run. It only knows about adding chunks, removing chunks and so on. So with the current architecture, it's not possible to reject e.g. a `borg delete` command right away.

As a result, all high level operations still work, but old data isn't deleted (delayed deletion). Effectively this means that while running backups with append-only SSH keys, no disk space will be recovered in your BorgBase repo with pruning. But you can run a prune with an all access ssh key when your free quota is running low, which will then clear pruned backups and free up disk space.

With append-only mode enabled, the repository will have a timestamped transaction log. This [allows going back](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode) to previous states, even if prune- or delete-commands were issued by the backup client.

If you need to restore an older repo version, you can use [SFTP mode](/setup/import) to make the necessary edits or, preferably, download a backup copy of the whole repo before doing any edits.

## How can I prune append-only repositories?

When using append-only mode, old transactions and segments are never cleaned from the repo and the size can grow over time. The timing and conditions of when old segments are cleaned up depends on the Borg version in use:

- Borg 1.2.x and higher: Use the `borg compact` command to *explicitly* clean up old segments at a suitable time. You can trigger this command from our control panel under *More > Compact repo* from the repo table. Or run `borg compact` with a full access key directly.
- Borg 1.1.x: In this version, old segments are deleted *implicitly* when a write operation (e.g. `borg create`, `borg delete`) is done with a full access key.

## Why is BorgBase showing the same storage use after deleting or pruning archives?

There are situations where removing an archive doesn't automatically delete the data associated with it. This can have multiple reasons:

- The same data segment is still associated with another archive. E.g. if you have two archives referencing the same files and you delete one of them, the data usage will stay the same.
- You are using an append-only key. In this case the server-side Borg process will ignore all requests to actually delete any data and transactions can be rolled back. See [above](#why-can-i-still-prune-or-delete-archives-with-active-append-only-mode) for more.
- When using Borg `1.2.x` or higher, old data is only deleted when running `borg compact` or running the *Compact Repo* action from the BorgBase Control Panel. Before that, no disk space is released.
- When using Borg `1.1.x`, old data is cleaned up only during a *write operation* to the repository. So if you changed key permissions recently, there can be a delay before the data is cleaned up.

## Why is the repository size shown in the web interface different from `borg info`?

BorgBase always displays the actual disk usage, as measured on the file system. This includes some metadata and index files and slight variations from the space usage reported via `borg info` under *All Archives > Deduplicated Size* are expected.

If you see larger variations, you are probably running your repo in *append-only mode*. This means `borg` never really deletes old segments. So the actual disk usage will be higher than what `borg` thinks over time. From the [docs](https://borgbackup.readthedocs.io/en/stable/usage/notes.html#append-only-mode):

> As data is only appended, and nothing removed, commands like prune or delete won’t free disk space, they merely tag data as deleted in a new transaction.

If you are OK to fully remove those old segments, you can run `borg compact` (starting with Borg version 1.2) on it or perform any write operation with a full access key (previous Borg versions). This will free the space and the actual usage and the usage calculated by Borg should now match more closely.
