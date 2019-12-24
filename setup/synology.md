---
title: Synology
nav_order: 5
layout: page
parent: Setup
description: "Set up Borg Backup on Synology DiskStation"
---
# Set up Borg Backup on Synology DiskStation

It's possible to install Borg Backup on a Synology NAS device and use it for offsite backups to [BorgBase.com](https://www.borgbase.com). The following steps don't require terminal access and will set up a new regular task in the DSM web interface.

## Step 1 - Install Borg Backup

[SynoCommunity](https://synocommunity.com) provides an updated Borg package for DSM. To install it, follow the steps outlined on their [website](https://synocommunity.com/#easy-install) or below:

1. Log into the web interface
2. Choose *Package Center*
3. Go to *Settings > Package Source* and choose *Add*
4. Enter `SynoCommunity` as name and `http://packages.synocommunity.com` as address

<img src="/img/synology/add-community-repo.png" alt="" width="800" />

You should now see a new *Community* entry on the left side that should have *Borg* listed as package. Simply click *Install* to install Borg together with Python 3.

## Step 2 - Create Hidden Shared Folder for Borg Files

Now, let's add a new hidden share to have easy access to Borg log files and our backup script.

1. Open the DSM *Control Panel* and choose *Shared Folder*
2. Click *Create* and enter a name, description and choose to hide the folder. We also won't need the recycle bin.

<img src="/img/synology/add-shared-folder.png" alt="" width="800" />

## Step 3 - Create SSH Keys

Next, create a new private key for the Synology NAS and place it in the folder. You can either create the key on the device itself, by logging in via SSH (advanced option) or just create it locally and copy it over

```
$ ssh-keygen -f ./id_synology
```

You will end up with two files: The private key, `id_synology` and the public key `id_synology.pub`. Copy the private key to the new `BorgBackup` shared folder on the DSM and add the public key to your [BorgBase.com](https://www.borgbase.com) account.

## Step 4 - Adjust Backup Script

With a shared folder to place our files and authentication set up, we are ready to customize out backup script. This script will run daily, call Borg Backup and possibly prune old archives. You can find a sample script below. Your NAS setup may be different, so be sure to adjust the paths, repokey and exclusions.

This script will also log any added or deleted file to a log and give a summary at the end. This is useful if you need to keep this data for compliance or just to keep an eye on file changes.

```
#!/bin/sh

export BORG_PASSPHRASE="xxx"
export BORGBASE_REPO="zzzz@yyyy.repo.borgbase.com:repo"
export TIMESTAMP=$(date +"%Y-%m-%d-%s")
export BORG_RSH="ssh -i /volume1/BorgBackup/id_synology -o StrictHostKeyChecking=no"


borg create \
    -C auto,zstd,8 \
    --stats \
    --list --filter=AME \
    --exclude 'sh:**/#recycle/' \
    --exclude '/volume1/@database' \
    --exclude '/volume1/@S2S' \
    --exclude '/volume1/@appstore' \
    --exclude '/volume1/@tmp' \
    --exclude '/volume1/@sharesnap' \
    --exclude '/volume1/Office/Applications' \
    --exclude 'sh:/volume1/BorgBackup/*.log' \
    --exclude 'sh:**/@eaDir' \
    --exclude 'sh:**/Thumbs.db' \
    $BORGBASE_REPO::$TIMESTAMP \
    /volume1 > /volume1/BorgBackup/$TIMESTAMP.log 2>&1
```

## Step 5 - Add Backup Task

In this step we will add a daily task to execute the backup script. This is all done in the web interface and you can choose all kinds of daily, weekly or monthly backup frequencies.

First return to the *Control Panel*, enabled switch to *Advanced Mode* in the top-left and open *Task Scheduler*

Then *Create* a new *Scheduled Task* and choose *User-defined script*
<img src="/img/synology/task-scheduler-1.png" alt="" width="800" />

In the next screen, you can enter any name for the task. The user should be `root`, so it has full access to all files. The settings under *Schedule* can be adjusted any way you need them.

Last, add the path of your Borg folder and backup script under *Task Settings*. E.g.

```
bash /volume1/BorgBackup/backup.sh
```

<img src="/img/synology/task-scheduler-2.png" alt="" width="800" />

That's it. Now you are ready to run the backup script. To trigger a manual test run, select the new task and click the *Run* button. You should see increased CPU usage and some upload activity in the resource monitor widget. If there are any errors, you will find them in the shared folder in a log file.


### Conclusion

Now you have an efficient offsite-backup of your essential data with the added benefit of having everything integrated and logged in the web interface.

As always, if you have any additions or questions regarding this guide, feel free to open an issue or pull request in the [Github repo](https://github.com/borgbase/docs.borgbase.com) or shoot us an email to [hello@borgbase.com](mailto:hello@borgbase.com).

