---
title: Borg
nav_order: 1
layout: page
description: ""
parent: Restore
has_children: true
has_toc: false
---

# Restoring Files from a Borg Backup

If you need to restore your data to a new machine, you will need the following:

- If you used `repokey[-blake2]` encrytion mode, you just need the passphrase used. The encrypted key itself is stored in your remote repo.
- If you used `keyfile` encryption mode, you need a copy of the keyfile (you could [print it as QR code](https://borgbackup.readthedocs.io/en/stable/paperkey.html)).

You do **not** need a backup of the SSH key used. It's only used for authentication and you can simply add a new one in our web interface.

So after preparing the passphrase or keyfile, generate a new SSH key on the replacement machine, add it to the repo and you are ready to restore your data. Here an overview of how restoring works with different clients:

* [**Restore with Borg CLI**](cli) - Use the Borg CLI directly to extract a full or partial backup archive.
* [**Restore with Borgmatic**](borgmatic) - Use the [Borgmatic](https://torsion.org/borgmatic/) CLI wrapper.
* [**Restore with Vorta**](https://vorta.borgbase.com/usage/restore/) (link to Vorta documentation) - Use our Borg desktop client, Vorta to restore backups. Recommended for users not used to the command line.
* [**Mounting and Browsing**](mount) - Mount and browse an archive and copy the files you need from it.

All of these solutions work well, but care should be used with each one.  Borg is a powerful program, but the wrong syntax, incorrect command, or extracting into the wrong directory can lead to accidental overwriting of your current files, or even destruction of you current backups.
