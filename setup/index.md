---
title: Setup
nav_order: 3
layout: page
description: ""
has_children: true
has_toc: false
---
# Setting up Backups to BorgBase

Time to get real on backups. 💪 The *Setup* section helps you to choose a backup tool and start backing up your files.
{: .fs-6 .fw-300 }

---

## Step 1 - Choosing a Backup Tool

Currently BorgBase offers support for two backup tools. Choosing the right one depends on your specific situation. Here a quick comparison:

|                            | Borg                                                                              | Restic                                          |
|----------------------------|-----------------------------------------------------------------------------------|-------------------------------------------------|
| Initial Release            | 2010                                                                              | 2015                                            |
| Deduplication              | Yes                                                                               | Yes                                             |
| Compression                | Yes, different algorithms                                                         | Yes, Zstandard only                             |
| Encryption                 | Yes, optional                                                                     | Yes, always                                     |
| Transport protocol         | SSH                                                                               | HTTP/2                                          |
| Transport authentication             | SSH keypair                                                                       | Username and password              |
| Programming language       | Python/C/Cython                                                                   | Go                                              |
| Multi-threaded             | No (planned)                                                                      | Yes                                             |
| Installation               | Included in many Linux distros, single PyInstaller binary available, or with `pip` | Single Go binaries for many platforms available |
| Desktop GUIs               | Yes, Vorta and Pika Backup                                                        | No                                              |
| Related projects and tools | Many community projects with additional tools, e.g. Borgmatic                     | Some, but not as many as Borg                   |


As you can see the features of both tools are relatively similar. Speed is also similar and depends on the precise use case. In some cases, Restic may use more memory.

In terms of features and options, Borg is more mature, while Restic focuses on a more basic set of features. Here some rough guidance on which one to choose:

- If Borg comes with your distro and you are comfortable using SSH keys, use Borg.
- If you don't usually use SSH keys and prefer the simplicity of a username and password, use Restic.
- If you need a desktop GUI for macOS or Gnome, use Borg.


## Step 2 - Create Backup Repository

Next you will create a new "repository" for your backup. A repository groups multiple snapshots (or archives) together and keeps related files. Usually one machine will use one repository. In some cases it can also make sense to share a repository between different machines to benefit from shared deduplication.

To add a new repository on *BorgBase*, log into your account, go to the [Repositories page](https://www.borgbase.com/repositories) and click *Add Repo*. This will ask you to pick a name, region and format. There are also optional settings like limiting the storage quota.

## Step 3 - Initialize Repository and Upload Files

This step will depend on the backup tool you chose previously. We provide you with copy & paste commands to get started quickly. To view them, head to the [Setup page](https://www.borgbase.com/setup) and choose the repository you just created. You will see commands for the chosen backup tool. For more details, see our documentation for each tool:

- [Setting up Backups with Borg](borg)
- [Setting up Backups with Restic](restic)

If you already have an existing repository, you can also [import](import) it using SFTP.

