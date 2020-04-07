---
title: Restore with Borgmatic
nav_order: 4
layout: page
parent: Restore
description: "Restoring files with the Borgmatic from the Command Line"
---

# Restoring Files with Borgmatic

If you use Borgmatic for your regular backups, it may be easier to use the Borgmatic syntax, provided you have a correctly configured configuration file.

Note: You should be comfortable using the command line. If you prefer a graphical, client, look into our [Vorta Tutorial](/macos/how-to-backup-your-mac-using-the-vorta-backup-gui/) instead. These instructions should work on macOS and popular Linux flavors, like Debian, Ubuntu, as well as Red Hat, Fedora and CentOS.

## Prerequisites
You should already have Borg, as well as Borgmatic installed and know how to use the command line. If you didn't install Borg yet, have a look at [this previous guide](https://docs.borgbase.com/linux/setup-borg-command-line/).  Please refer to the official [borgmatic documentation](https://torsion.org/borgmatic/docs/how-to/set-up-backups/) for setting up Borgmatic.  If your repository is hosted on BorgBase, your config file can be automatically generated for you using the [Configuration Assistant](https://www.borgbase.com/setup).

## Step 1 - Listing the Archives

Assuming that you have Borgmatic correctly configured and making backups, you would first need to find the backup you need to restore by listing the archives.
```
$ borgmatic -l
```

After choosing the backup, you would then add it to the `borgmatic -x` command
```
$ borgmatic -x server-2020-04-01T12:11:41
```

## Step 2 - Extracting the Archives

Make sure you are in the directory you would like to restore to, as it will extract the files into it.

If you would only like restore a particular directory from a backup, its as easy as adding `--restore path` to the command, along with the directory or file you would like to restore (minus the first `/`).

For example, if you would like to only restore `/mnt/catpics` from the same archive, the full command would be:
```
$ borgmatic -x server-2020-04-01T12:11:41 --restore-path 'mnt/catpics'
```

This will restore the full path of that particular directory, but will only include that directory.

### Conclusion

If you already keep your Borg settings in Borgmatic, you should also use it to extract backups. For more details also see [their own documentation](https://torsion.org/borgmatic/docs/how-to/extract-a-backup/).
