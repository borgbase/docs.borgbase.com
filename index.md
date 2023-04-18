---
layout: default
title: Home
nav_order: 1
description: "All the resources you need to develop a comprehensive backup strategy with BorgBase and apply it in your environment."
permalink: /
---

# BorgBase Documentation Centre
{: .fs-9 }

All the resources you need to develop a comprehensive backup strategy with [BorgBase](https://www.borgbase.com) and apply it in your environment.
{: .fs-6 .fw-300 }

---

## Steps to Get Started

### Your Backup Strategy and Data
Even the best tools need a sound strategy. Get started by creating an inventory of your important data assets, catalog where they are stored and discover potential issues in backup workflows. [More...](strategy)

### Sign up with BorgBase
[BorgBase](https://www.borgbase.com) is a dedicated hosting service for Borg backup repositories. It allows you to manage all your backups in one place and use powerful Borg features, like append-only mode in a simple way. You get 10 GB free backup space after [signing up](https://www.borgbase.com/register) (no credit card required).

### Setup
We aim to make this as simple as possible. The built-in [setup wizard](https://www.borgbase.com/setup) will display the commands to start using new backup repositories. There are also more detailed steps for different platform for [Borg](setup/borg) and [Restic](setup/restic) in the [Setup](setup) section.

#### Choose a Backup Tool
Currently we support two backup tools – Borg and Restic. They have similar features and the main difference is how backups are sent. Borg uses SSH, while Restic uses HTTP. See our [Setup](setup) section for a comparison and detailed setup instructions for each one.

#### Automation
Use our [GraphQL API](api) or [Ansible role](setup/borg/ansible) to automate repeated setup steps on client endpoints.

### Verify Backup
Ensure your data is there when it's needed. Our [verification checklist](verify) covers 5 common issues with backups and how to avoid them.

### Restore Data from a Backup
The most important step: How to restore files from a backup. [More...](restore)

---

## Open Source Sustainability

Borg and most other tools used around our service are fully open source. This is great because everyone can audit the source code and add improvements. But it also makes all of us responsible for keeping the ecosystem in good shape.

By using *BorgBase* for your backups, you help us maintain our own open source offerings, like [Vorta](https://vorta.borgbase.com/), for the benefit of the whole community. See our [Github profile](https://github.com/borgbase) for current projects.

In addition, you can choose to add a donation to the [Borg Backup project](https://github.com/borgbackup/borg) during checkout. All proceeds will go directly to [Thomas](https://github.com/ThomasWaldmann), the current lead maintainer to help him and others spend more time improving Borg Backup.