---
title: "Backup Performance"
description: "Find the bottleneck behind slow backups and avoid unnecessary repository checks."
sidebar:
  label: "Performance"
  order: 2
---

## Why is my backup process so slow?

All our servers are connected with 1Gbit connections at a minimum and located in professional data centers. There is no throttling based on account type. We rarely get reports of slow backup speeds. If you do encounter slower-than-expected backups or slow upload speeds, you can follow the steps below to find the bottleneck.

First it helps to understand that modern backup tools do more than just copy files. They will also chunk them into smaller pieces, calculate hashsums, compress and encrypt each part. See [here](https://borgbackup.readthedocs.io/en/master/faq.html#what-s-the-expected-backup-performance) for the full details.

So the upload speed is not always the main bottleneck. Depending on your setup, you should also watch out for CPU usage or disk IO. It's usually difficult to improve uplink speed, but if you are CPU- or IO-limited, there are a few settings you can tune. Just be aware of the trade-offs. Maybe you are OK with a slower initial backup in order to have a smaller well-compressed backup in the future. So here some steps you can take to speed up your backups:

### General Tips
- Avoid congested times of the day: Many users set their backups to run at midnight UTC, which can lead to backups being slower at that time. On the hour tends to be more busy too. To enjoy the best speeds, set your backups to run at random times.
- High latency connection: For backups using TCP (which includes both Borg and Restic), high latency can limit total bandwidth due to the way network buffers are set in Linux. E.g. for 100ms latency the speed would be limited to about 250 Mbit/s. For Restic this can be resolved by tuning the below Linux kernel settings. For Borg the limits are hard-coded in SSH and can't be changed easily. If you want to make the adjustments for Restic, first calculate your connection's bandwidth delay product [here](https://www.speedguide.net/bdp.php) and then see [here](https://fasterdata.es.net/host-tuning/linux/) on how to apply them.
- Use the BBR congestion algorithm, instead of the default cubic. Users have reported a 6x speedup after making this change. This feature needs to be enabled on the *sending* side and works best on **low bandwidth connections**. Clients sending from data centers will likely not see an improvement, as reported by [APNIC](https://blog.apnic.net/2019/11/01/bbr-evaluation-at-a-large-cdn/). Add the below lines to `/etc/sysctl.conf` and apply with `sysctl -p`.
  ```
  net.core.default_qdisc=fq
  net.ipv4.tcp_congestion_control=bbr
  ```
  More details on enabling BBR for network congestion for [Debian](https://wiki.crowncloud.net/?How_to_enable_BBR_on_Debian_10) or [ArchLinux](https://gist.github.com/epyonavenger/a7d0bdcdb64169c4b0031391e10ff203). Thanks to our user Frédéric for sharing this tip!

### Tips for Borg
- See the [official FAQ](https://borgbackup.readthedocs.io/en/master/faq.html#why-is-my-backup-so-slow) on steps to speed up backups using different Borg flags.
- Make sure you choose an appropriate [compression level](https://borgbackup.readthedocs.io/en/stable/usage/help.html?highlight=compression#borg-help-compression) for your data. In general `lz4` (fast, but low compression) `zstd,3` (medium compression) and `zstd,8` (high compression) will work well.
- Ensure the local [files cache](https://borgbackup.readthedocs.io/en/stable/usage/create.html#description) is working correctly. By default Borg will compare `ctime,size,inode` and process the file if either changes. If you have e.g. a network file system with unstable inodes, try using `--files-cache ctime,size`
- Avoid excessive archive checking: `borg check` can read all backup segments and confirm their consistency. For large repos this can take a long time. BorgBase already uses different techniques to avoid bitrot in the storage backend, so `borg check` is not strictly necessary for this purpose. In Borgmatic, add `check` to `skip_actions`. If you still need consistency checks, consider limiting `checks` to `repository` only. Checking all archive metadata is done on the client and very time consuming. See the official [Borg docs](https://borgbackup.readthedocs.io/en/stable/usage/check.html) for details.

## How often should I run `borg check`?

The `borg check` command can detect issues with your repository, but running it on large repos will make your backups much slower and cause higher load on our storage servers. It's not really necessary to run it more often, since the underlying RAID controller already does weekly data scrubs to verify the data. As a result we strongly recommend running `borg check` once a month only. When using Borgmatic, this can be done like this:

- Run this cron task every day to create a new backup: `borgmatic create prune compact`
- And this once a month (some random day a few hours after the backup): `borgmatic check`

With our [Ansible role](https://github.com/borgbase/ansible-role-borgbackup), the check frequency is set under `borgbackup_config.checks`.

**If we notice excessive repo checks on your account, we may contact you or interrupt those processes in order to guarantee the best speed for all users.**
