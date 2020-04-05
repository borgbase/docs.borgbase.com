---
title: Restore
nav_order: 4
layout: page
description: ""
has_children: true
---

# Restoring Files from a Borg Backup

There are a variety of ways to restore your backups using Borg.  A few of these methods include:
* **Mounting and Browsing** - Mounting the backup archive from a specific date, and copying the files you need from it
* **Extracting** - Extracting the complete or partial backup directly from the Borg backup
* **Extracting with Borgmatic** - Similar to the `borg extract` command, this uses the CLI [borgmatic](https://torsion.org/borgmatic/) wrapper rather than using borg directly
* **Extracting with Vorta** - Also similar to the `borg extract` command, this uses the graphical Borg client [Vorta](https://vorta.borgbase.com/) to restore your backups.

All of these are powerful solutions, but care should be used with each one.  Borg is a powerful program, but the wrong syntax, incorrect command, or extracting into the wrong directory can lead to accidental overwriting your current files, or even destruction of you current backups.

If you're looking to complement your backup workflow with cost-effective offsite backups, also look into [BorgBase.com](https://www.borgbase.com). There is a free tier of 5 GB for life. Paid plan start at $2/month or $.005/GB for larger plans. We also offer custom solutions to enterprise customers. This includes setting up local backup agents or evaluating your whole backup strategy. Contact [hello@borgbase.com](mailto:hello@borgbase.com) for more.
