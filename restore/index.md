---
title: Restore
nav_order: 4
layout: page
description: ""
has_children: true
has_toc: false
---

# Restoring Files from a Borg Backup

There are a variety of ways to restore your backups using Borg.  A few of these methods include:

* **Extracting with Vorta** - Use our Borg desktop client, [Vorta](https://vorta.borgbase.com/) to restore your backups. Recommended for users not used to the command line.
* [**Mounting and Browsing**](mount) - Mount and browse an archive and copy the files you need from it.
* [**Extracting with Borg CLI**](borg) - Use the Borg CLI directly to extract a full or partial backup archive.
* [**Extracting with Borgmatic**](borgmatic) - Use the [Borgmatic](https://torsion.org/borgmatic/) CLI wrapper.

All of these solutions work well, but care should be used with each one.  Borg is a powerful program, but the wrong syntax, incorrect command, or extracting into the wrong directory can lead to accidental overwriting of your current files, or even destruction of you current backups.
