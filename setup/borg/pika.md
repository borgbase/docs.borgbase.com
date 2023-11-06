---
title: Pika Backup
nav_order: 3
layout: page
parent: Borg
grand_parent: Setup
description: "Pika Backup is a GTK program written in Rust designed to make simple backups based on borg."
---
# How to Backup your Desktop using Pika Backup
**[Pika Backup](https://apps.gnome.org/app/org.gnome.World.PikaBackup/)** is a GTK program designed to make simple backups based on borg. Frequent rumors that this software's name is related to a monster with electrical abilities are unfounded.

<img src="/img/setup/home.jpg" alt="Pika Backup main screen" width="450">

## Features

 - Set up new backup repositories or use existing ones
 - Create local or remote backups
 - Save time and disk space because Pika Backup does not need to copy known data again
 - Encrypt your backups
 - List created archives and browse through their contents
 - Recover files or folders via your file browser
 - Supports automatic scheduled backups and clean up of old archives
 - Source can be found [here](https://gitlab.gnome.org/World/pika-backup)

## Install

Pika Backup can be installed using one of these options:
- [Flathub](https://flathub.org/apps/details/org.gnome.World.PikaBackup): `$ flatpak install flathub org.gnome.World.PikaBackup`
- On Arch though the [AUR repo](https://aur.archlinux.org/packages/pika-backup)
- Built from [Source](https://gitlab.gnome.org/World/pika-backup) using Gnome-Builder
 
## Connect to Repository

- Create a SSH key locally and add it to your [BorgBase](https://www.borgbase.com) control panel - see [here](https://docs.borgbase.com/setup/cli/#step-3-create-and-assign-ssh-key-for-authentication) for futher information
- Create a new repository on BorgBase, be sure to add the SSH key you created previously is selected in the *Access* tab.

<img src="/img/setup/addNewRepo.png" alt="Add new repository in Pika Backup" width="450">

- (Recommended) Choose to use encryption and add a password in Pika Backup
- Additional flags can be utilised via the advanced options box.
- Choose which files & folder to backup & which to exclude.

<img src="/img/setup/userHostSupportBeta.png" alt="Pika Backup setup screen" width="450">

## Scheduled Backups
- Click *Scheduled Backups* tab
- Toggle checkbox 'Regularly Create Backups'
- Choose a frequency (Daily, Weekly, Monthly etc)
- There is an option to 'Regualrly Delete Old Archives' which may be useful if you have storage constraints

<img src="/img/setup/backupScheduleBeta.png" alt="Schedule automatic backups" width="450">
