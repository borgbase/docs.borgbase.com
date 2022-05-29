---
title: Pika Backup
nav_order: 3
layout: page
parent: Setup
description: "Pika Backup is a GTK program written in Rust designed to make simple backups based on borg."
---
# How to Backup your Desktop using Pika Backup
**[Pika Backup](https://apps.gnome.org/app/org.gnome.World.PikaBackup/)** is a GTK program designed to make simple backups based on borg. Frequent rumors that this software's name is related to a monster with electrical abilities are unfounded.

<img src="baseUI" alt="">

## Features

 - Set up new backup repositories or uses existing ones
 - Create backups locally and remote
 - Save time and disk space because Pika Backup does not need to copy known data again
 - Encrypt your backups
 - List created archives and browse through their contents
 - Recover files or folders via your file browser
 - Supports automatic scheduled backups and clean up of old archives [version 0.4.0-beta-1 or newer] 
 - Source can be found [here](https://gitlab.gnome.org/World/pika-backup)

## Install

Pika Backup can be installed from;
 - [Flathub](https://flathub.org/apps/details/org.gnome.World.PikaBackup) 
 	> $ flatpak install flathub org.gnome.World.PikaBackup
 - On Arch though the [AUR repo](https://aur.archlinux.org/packages/pika-backup)
 - Built from [Source](https://gitlab.gnome.org/World/pika-backup) using Gnome-Builder
 
## Setup repository

 - Create a SSH key - add it to your .ssh/config - see [here](https://docs.borgbase.com/setup/cli/#step-3-create-and-assign-ssh-key-for-authentication) for futher information
 - Create a repository on borgbase 
 - Initialise 
	> $ borg init -e repokey-blake2 XXXXX@XXXXX.repo.borgbase.com:repo
 
 <img src="addRepoUI" alt="">
 
 - The URL in Pika is different to the borg command line & vorta - instead it will look as below.
   	> ssh://XXXXX@XXXXX.repo.borgbase.com/./repo
 - (Recommended) Add a password. 
 - Additional flags can be utilised via the advanced options box.
 - Choose whick files & folder to backup & which to exclude. 

## Setup repository [0.4.0-beta-1 or newer]
 - Create a SSH key - add it to your .ssh/config
 - Create a repository on BorgBase
 - Version 0.4.0 supports user@host:path syntax
<img src="userHostSupportBeta" alt="">

## Auto-Backups [requires 0.4.0-beta-1 or newer]
 - Click scheduled backups
 - Toggle 'Regularly Create Backups'
 - Choose a frequency (Daily, Weekly, Monthly etc)
 - There is an option to 'Regualrly Delete Old Archives' which may be useful if you have storage constraints
<img src="backupScheduleBeta" alt="">
