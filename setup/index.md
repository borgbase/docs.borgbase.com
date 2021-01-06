---
title: Setup
nav_order: 3
layout: page
description: ""
has_children: true
has_toc: false
---
# Setting up Borg for Backups to BorgBase

Borg is a lightweight backup client that you install locally to prepare your data before sending it to BorgBase for storage. Borg will deduplicate, compress and encrypt your files before sending them to us. Depending on your environment, there are different ways to set up Borg:

### Desktop
For macOS- and Linux desktops we offer [Vorta, our desktop client](vorta). It provides a graphical user interface around Borg and integrates with your desktop environment to make creating, browsing and restoring backups easier.

If you are new to Vorta and Borg Backup, be sure to start with [this video](https://www.youtube.com/watch?v=asZX2YbTaNE) by Sun Knudsen. He gives a high level overview Borg's concepts and then walks through doing backups with Vorta step-by-step.

### Servers
- Our [Command Line Tutorial](cli) describes general steps to set up Borg with Borgmatic and should work on most systems. If you run MySQL, MariaDB or Postgres, see [here on how to dump them before the backup](databases).
- For larger deployments, also consider using our [Ansible role](ansible) to automate the setup process.
- If you run a [Synology NAS](synology), you can add offsite backups in a simple way using the DSM web interface.

### Import- and Export Existing Repositories
If you have an existing Borg repository and would like to keep your existing archive history, you can also [import (and export) repos using Rsync](import).