---
title: Borg UI
nav_order: 6
layout: page
parent: Borg
grand_parent: Setup
description: "Borg UI is a self-hosted web interface for Borg. It manages repositories, schedules, restores and alerts from the browser on a server, NAS or homelab box."
---
# How to Backup a Server or NAS to BorgBase using Borg UI

**[Borg UI](https://borgui.com)** is a community-maintained web interface for Borg. It runs as a Docker container, or natively on Debian and Ubuntu, on a server, NAS or homelab box and manages Borg repositories from the browser. It ships a BorgBase preset, so the repository path form and the SSH key setup are handled for you.

## Features

 - Create backups to a BorgBase repository on a schedule, with retention and compaction alongside
 - Watch backups run with live progress and cancel from the interface
 - Browse any archive like a filesystem and restore a single file or the whole tree
 - Check, prune and compact repositories from the browser
 - Back up several machines: local paths, remote hosts over SSH, or agents for machines behind NAT
 - Notifications on success and failure through Slack, Discord, Telegram, email and others
 - Free Community edition under AGPL-3.0, source can be found [here](https://github.com/karanhudia/borg-ui)

## Install

One container:

```
docker run -d -p 8081:8081 -v borg_data:/data ainullcode/borg-ui:latest
```

Compose, Portainer, Unraid and the native Debian and Ubuntu install are covered in the [installation docs](https://docs.borgui.com/installation).

## Connect to Repository

- Create a new repository on BorgBase and note its repository URL, for example `ssh://abcd@abcd.repo.borgbase.com/./repo`
- In Borg UI, open *Remote Machines*, choose *Add machine* and pick the BorgBase preset. Paste the host and username from the repository URL
- Press *Deploy key*. Borg UI shows its public SSH key. Add it under *Access > SSH Keys* in the BorgBase control panel and select it on the repository
- Open *Repositories*, choose *New repository* or *Import existing*, select *Remote* and the BorgBase machine, and enter the path exactly as in the URL: `/./repo`
- Set a passphrase. Borg UI stores it encrypted so scheduled runs work unattended

A walkthrough with the exact values is at [borgui.com/providers/borgbase](https://borgui.com/providers/borgbase).

## Scheduled Backups

- Open *Backup Plans* and choose *New plan*
- Pick the folders to back up and the BorgBase repository as the target
- Set the schedule, either with cron or one of the presets, and the retention, for example 7 daily, 4 weekly and 6 monthly
- Add a notification channel so a failed run is not silent
