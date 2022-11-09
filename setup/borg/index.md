---
title: Borg
nav_order: 3
layout: page
description: ""
parent: Setup
has_children: true
has_toc: false
---
# Setting up Backups with Borg

Borg is a lightweight backup client that you install locally to prepare your data before sending it to BorgBase for storage. Borg will deduplicate, compress and encrypt your files before sending them to us. Depending on your environment, there are different ways to set up Borg:

- Our [Command Line Tutorial](cli) describes general steps to set up Borg with Borgmatic and should work on most systems.
- The community-maintained [Docker image ](https://github.com/borgmatic-collective/docker-borgmatic) comes with all dependencies to run Borg and Borgmatic.

### Desktop
For macOS- and Linux desktops we offer [Vorta](vorta), our desktop client. It provides a graphical user interface around Borg and integrates with your desktop environment to make creating, browsing and restoring backups easier.

If you are new to Vorta and Borg Backup, be sure to start with [this video](https://www.youtube.com/watch?v=asZX2YbTaNE) by Sun Knudsen. He gives a high level overview Borg's concepts and then walks through doing backups with Vorta step-by-step.

For Gnome desktops there is also the community-maintained [Pika Backup](pika).

### Servers and NAS
- Our [Ansible role](ansible) can be used to fully automate the setup process.
- If you run a NAS, see our [Synology](synology) and [TrueNAS](true-nas) tutorials.
- JVM Host is offering a paid Borg plugin for use with DirectAdmin. [Tutorial](https://www.jvmhost.com/articles/directadmin-borg-plugin/) and [order page](https://www.jvmhost.com/software.html).
- If you run a database server, like MySQL, MariaDB or Postgres, see [here](databases) on how to properly dump the data before a backup run.

### Import- and Export Existing Repositories
If you have an existing Borg repository and would like to keep your existing archive history, you can also [import (and export) repos using SFTP](import).