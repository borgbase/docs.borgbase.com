---
title: "Restoring Files from a Borg Backup"
sidebar:
  label: "Overview"
description: "What you need to restore a Borg backup and which restore method to choose."
---

If you need to restore your data to a new machine, you will need the following:

- If you used `repokey[-blake2]` encryption mode, you just need the passphrase used. The encrypted key itself is stored in your remote repo.
- If you used `keyfile` encryption mode, you need a copy of the keyfile (you could [print it as QR code](https://borgbackup.readthedocs.io/en/stable/paperkey.html)).

You do **not** need a backup of the SSH key used. It's only used for authentication and you can simply add a new one in our web interface.

So after preparing the passphrase or keyfile, generate a new SSH key on the replacement machine, add it to the repo and you are ready to restore your data. Here an overview of how restoring works with different clients:

| Situation | Method |
| -- | -- |
| Restore a full archive or many files, including all metadata | [**Restore with Borg CLI**](/restore/borg/cli) using `borg extract` |
| Find and copy a few files, or compare several archives | [**Mount and browse**](/restore/borg/mount) using `borg mount` |
| Backups are already managed with [Borgmatic](https://torsion.org/borgmatic/) | [**Restore with Borgmatic**](/restore/borg/borgmatic) |
| You prefer a graphical client over the command line | [**Restore with Vorta**](https://vorta.borgbase.com/usage/restore/) (link to Vorta documentation) |

All of these solutions work well, but care should be used with each one.  Borg is a powerful program, but the wrong syntax, incorrect command, or extracting into the wrong directory can lead to accidental overwriting of your current files, or even destruction of your current backups.
