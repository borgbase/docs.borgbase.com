---
title: Setup
nav_order: 3
layout: page
description: ""
has_children: true
has_toc: false
---

# Setting up Backups to BorgBase

Time to get real on backups. 💪 The _Setup_ section helps you to choose a backup tool and start backing up your files.
{: .fs-6 .fw-300 }

---

## Step 1 - Choosing a Backup Tool

Currently BorgBase offers support for three backup tools. Choosing the right one depends on your specific situation. Here a quick comparison:

| | Borg | Restic | Vykar |
| -- | -- | -- | -- |
| Initial Release | 2010 | 2015 | 2026 |
| Deduplication | Yes | Yes | Yes |
| Compression | Yes, different algorithms | Yes, Zstandard only | Yes, LZ4 or Zstandard |
| Encryption | Yes, optional | Yes, always | Yes, always (AES-256-GCM or ChaCha20, auto-selected) |
| Transport protocol | SSH | HTTP/2 | HTTP/2 (REST) |
| Transport authentication | SSH keypair | Username and password | Access token |
| Programming language | Python/C/Cython | Go | Rust |
| Multi-threaded | No (planned) | Yes | Yes |
| Configuration | Via wrappers (e.g. Borgmatic) | Via wrappers (e.g. Autorestic) | Built-in YAML configuration |
| Scheduling | External (cron/systemd) | External (cron/systemd) | Built-in daemon scheduler |
| Installation | Included in many Linux distros, single PyInstaller binary available, or with `pip` | Single Go binaries for many platforms available | Single binary for Linux, macOS, and Windows |
| Desktop GUIs | Yes, [Vorta](https://github.com/borgbase/vorta) and [Pika Backup](https://github.com/pika-backup/pika-backup) | Yes, [BackRest](https://github.com/garethgeorge/backrest) | Yes, built-in |
| Related projects and tools | Many community projects with additional tools, e.g. Borgmatic | Some, but not as many as Borg | Built by BorgBase, no wrappers needed |

Borg is the most mature and memory-efficient tool. Restic is well-established with a large community. Vykar is the fastest in both backup and restore with the lowest CPU cost, and includes built-in scheduling and configuration. See [here](https://vykar.borgbase.com/#benchmarks) for an in-depth benchmark.

Here some rough guidance on which one to choose:

- If you want the fastest backups with built-in scheduling and a friendly YAML configuration, use Vykar.
- If you already use Borg and are happy with it, there's no need to switch.
- If you need the lowest memory consumption (like on a small VPS), use Borg.
- If you need a desktop GUI for macOS or Gnome, use Borg with Vorta.
- If you already have Restic scripts and workflows in place, Restic will continue to work well.

## Step 2 - Create Backup Repository

Next you will create a new "repository" for your backup. A repository groups multiple snapshots (or archives) together and keeps related files. Usually one machine will use one repository. In some cases it can also make sense to share a repository between different machines to benefit from shared deduplication.

To add a new repository on _BorgBase_, log into your account, go to the [Repositories page](https://www.borgbase.com/repositories) and click _Add Repo_. This will ask you to pick a name, region and format. There are also optional settings like limiting the storage quota.

## Step 3 - Initialize Repository and Upload Files

This step will depend on the backup tool you chose previously. We provide you with copy & paste commands to get started quickly. To view them, head to the [Setup page](https://www.borgbase.com/setup) and choose the repository you just created. You will see commands for the chosen backup tool. For more details, see our documentation for each tool:

- [Setting up Backups with Borg](borg)
- [Setting up Backups with Restic](restic)
- [Setting up Backups with Vykar](https://vykar.borgbase.com/)

If you already have an existing repository, you can also [import](import) it using SFTP.
