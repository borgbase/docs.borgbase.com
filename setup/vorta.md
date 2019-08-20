---
title: Desktop Client
nav_order: 3
layout: page
parent: Setup
description: "Vorta is a cross-platform open source backup client. It makes managing Borg backups easy and there is no need to run commands in the Terminal."
---
# How to Backup your Desktop using the Vorta Client for Borg

**Note**: Vorta is currently in beta-testing and shouldn't be your only backup solution.

### Introduction
Vorta is a cross-platform open source backup client. It makes managing Borg backups easy and there is no need to run commands in the Terminal.

Vorta is also open source and everyone can contribute to improve the app or look at the source code. Together with Borg, which is also open source, this creates a strong chain of trust. By using Vorta, the user can benefit from all the strong point of Borg and have the convenience of a graphical user interface at the same time. Feature highlights:

- Encrypted, deduplicated and compressed backups for maximum security and efficiency.
- Run backups manually or with the built-in scheduler.
- Pick the Wifis you want to use for backups.
- View snapshots and quickly mount them to restore files.

## Step 1 – Download Vorta
Visit the [official Github page](https://github.com/borgbase/vorta/) to download the latest release from the [Release page](https://github.com/borgbase/vorta/releases). You want the first file, e.g. `vorta-0.2.3-alpha.zip`.

When the file is downloaded, unpack it and run it by double-clicking it.

<img src="/img/vorta/Screenshot-2018-11-02-at-19.56.04-300x188.png" alt="" width="300" height="188" />


After starting Vorta, you will see a new icon in your menu bar and a new settings window.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.02.28.png" alt="" width="500" />

This is where you will configure your SSH key and remote backup repository in steps 2 and 3.

## Step 2 – Setting up a SSH Key
SSH keys are used to log into remote servers without using a password. Vorta uses a SSH key to securely connect to your backup repository. A SSH key consists of 2 parts: A private and a public key. The *private* key should be kept securely on your computer. The public key can be shared, so you can log in to your remote backup repository.

Vorta makes it simple to create a new public-private keypair. Simply choose **Create New Key** from the settings window. This will open a new window to configure some options. Generally the defaults are the best options and there is no reason to change them.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.04.27-1024x119.png" alt="" width="835" height="97" />

If you already use SSH and have your own keys, just keep the **SSH Key** setting at the default and any available keys will be used automatically.

After clicking **Generate and Copy to Clipboard**, the *public* part of your key will be in the clipboard. You can past it anywhere using ⌘V.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.07.13.png" alt="" width="300" height="200" />

## Step 3 – Add Remote Backup Repository
Now you are ready to add the place that will store your backups – also called *backup repository* or *repo* for short. Vorta works with any repo. So you could use your existing server. It just needs SSH configured and the Borg command line tool installed.

Another option is to use [BorgBase.com](https://www.borgbase.com), which is a specialized hosting service just for Borg. It offers some advantages over private servers, like monitoring for inactive backups, secure separation of repo data and append-only repos.

When using BorgBase, navigate to **Account** > **SSH Keys** to add your new key. For name, you can use anything. E.g. "My Macbook". In the key-field, just paste the public key that was copied to the clipboard before.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.12.34.png" alt="" width="260" height="300" />

Next go to **Repositories** and choose **New Repo**. There just make sure to choose the key you previously created and adjust any options, like server location and available space.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.14.59.png" alt="" width="300" height="209" />

After adding the repo, you can easily copy the Repo URL by clicking the left icon in the row of the repo. The Repo URL is the address where your backup data can be accessed.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.16.14.png" alt="" width="300" height="106" />

With the Repo URL in the clipboard, we can move back to Vorta and **Initialize New Repository**. This will set up a new repo. We could also connect to an existing repo.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.18.02.png" alt="" width="300" height="85" />

In the dialog, paste the Repo URL and choose a secure password. If you don't have specific encryption requirements and didn't change the default name of the SSH key, you can keep the other settings at their defaults.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.18.39.png" alt="" width="300" height="124" class="aligncenter size-medium wp-image-64" />

## Step 4 – Add folders to back up
With your repo settings in place, you can now add some backup folders and make your first backup. Navigate to the **Sources** tab to add some folders or exclusions.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.37.32.png" alt="" width="300" height="169" class="aligncenter size-medium wp-image-65" />

Next press **Start Backup** to do your first backup. After every successful backup (or snapshot), a new line will be added to the **Snapshot** tab. There you can also mount a snapshot and restore files.

<img src="/img/vorta/Screenshot-2018-11-02-at-20.40.41.png" alt="" width="300" height="180" class="aligncenter size-medium wp-image-66" />

## Conclusion
After you have validated that everything works as expected, you can put your backups on auto-pilot. If you chose [BorgBase.com](https://www.borgbase.com) as repo provider, you can set alerts to be notified if your backups stop working for longer than X days.