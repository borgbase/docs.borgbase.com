---
title: Verify
nav_order: 4
layout: page
description: "How to verify existing backups"
---

# Verify Existing Backups

Untested backups are like Schrödinger's cat. Nobody knows they're dead or alive. This article helps to methodically evaluate the quality of a backup.
{: .fs-6 .fw-300 }

### tl;dr
You can evaluate the quality of a backup by considering those 5 points:

- [x] Backups are happening
- [x] Backups are happening often enough
- [x] Backups contain the expected data
- [x] Backups are independent (enough) from the source data
- [x] Backups are safe from modification

### Prerequisites

You should have a backup process in place and working. If you are still working on setting up your backups, then start with this [higher level guide](/strategy/) on backup strategy and then check back when it's all up and running.


## Checklist for existing Backups
### 1.  Backups are happening
This is the most common and easiest to spot. You want to have a way to be sure your backup script still works after months or years of updates and server modifications. So it's essential to log successful runs, the absence of successful runs, and failures. And keep in mind that the absence of failures isn't the same as success. If your script just doesn't run, it can't fail.

There are a few services that are specialized in monitoring cron jobs. They will also alert you about the absence of successful backups, not just failures. Borgmatic, a very useful wrapper around Borg implements a number of them, as described [here](https://torsion.org/borgmatic/docs/how-to/monitor-your-backups/#third-party-monitoring-services). Or you can ping a service endpoint at the end a run like this:

````
1 1 * * 0  backup.sh && curl http://my-monitor.com/success
````

For [Borgmatic](https://torsion.org/borgmatic/docs/how-to/monitor-your-backups/#third-party-monitoring-services) you can define error hooks that are called when failures happen:

```yaml
hooks:
    on_error:
        - send-message.sh "Error with {repository}"
```

And log successful runs:

```yaml
hooks:
    healthchecks:
        ping_url: http://my-monitor.com/success
```

When using [BorgBase](https://www.borgbase.com/), we will also monitor for the absence of successful backups for you and alert you when they are absent for too long.

### 2. Backups are happening often enough
This is less a technical problem, and more an organizational one. It's related to your recovery point objective (RPO), as described [here](/strategy/#backup-frequency-mismatch). In a nutshell, RPO is a fancy way of saying that a backup becomes less useful, as it becomes older.

Consider, for example, an office file server that's used by dozens of employees. If you do daily backups in such a case, you are at risk of losing a whole day's work (if the incident happens just after the end of the workday). This may not be acceptable. So you should always match your backup technique and interval to the speed at which data changes.

In the case of our office file server, you could add an additional backup run at noon (if bandwidth is an issue) or set up hourly local snapshots to cover the most common risks of accidental deletions.

### 3. Backups contain the expected data
This error is hard to catch with automated tooling. So the best way is to browse or mount the backup and look at a few files and folders. You can use [Vorta](https://vorta.borgbase.com/), the desktop backup client BorgBase maintains to browse the actual files. Or mount an archive and browse it locally. For BorgBase you can also track the change in space usage over time on a chart. Though this may miss issues with small folders or data that doesn't change much.

Another way to *really* verify a backup, is to use it while migrating to a new server or do a trial restore.

### 4. Backups are independent (enough) from the source data
Backups are there to protect from uncertain events that may happen. If one event can take down your backup *and* the source data at the same time, it's not a good backup. Some examples:
- Your backup for your laptop is on a USB drive in your house. The house burns down, destroying the laptop and USB drive.
- Your backup is with a cloud provider that's managed and accessed by the same admin account managing the source data. So anyone breaking into this account could remove the source data *and* the backup.
- A hosting company is generous enough to include some free backup space with your hosting package. This is great but risks losing all your data if this one company goes out of business unexpectedly.

Of course, it will be difficult to fully uncorrelate your data from the backup. Hence the "enough" in the title. It will still be on the same planet and maybe the same country. But there are many ways to improve the situation by putting your eggs in different baskets, i.e. providers, regions, drives of the same company, etc.

### 5. Backups are safe from modification
This final point applies to all "push" style backups where the source machine also initiates the backup. Popular sync solutions, like Dropbox, fall into this category: A file is changed locally and Dropbox uploads the file, potentially overwriting the remote backup copy. Another example would be simple (S)FTP storage space, where either only one copy of the data is kept or the client has permission to modify the data.

While Borg is also a push backup, you can enable [*append-only* mode](/faq/#append-only-mode), which will preserve all data until the repository is explicitly cleaned up. To avoid backups growing too large, pair this with [server-side compaction](/faq/#how-can-i-prune-append-only-repositories).

## Conclusion
Now you know many ways in which a backup can go wrong and hopefully more ways to avoid ever getting in a bad backup situation.

This article was adapted from [5 Common Backup Failures and How to Avoid Them](https://noted.lol/common-backup-failures/), initially published on [Noted.lol](https://noted.lol/)

## Have any other questions? [Email Us!](mailto:hello@borgbase.com)