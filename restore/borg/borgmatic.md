---
title: Restore with Borgmatic
nav_order: 4
layout: page
parent: Borg
grand_parent: Restore
description: "Restoring files with the Borgmatic from the Command Line"
---

# Restoring Files with Borgmatic

Reviewed in August 2023

If you already use Borgmatic for your backups, it may be easier to use Borgmatic syntax for restoring.

Note: You should be comfortable using the command line. If you prefer a graphical, client, look into our [Vorta Tutorial](/setup/vorta/) instead. These instructions should work on macOS and popular Linux flavors, like Debian, Ubuntu, as well as Red Hat, Fedora and CentOS.

## Prerequisites
You should already have Borg, as well as Borgmatic installed and know how to use the command line. If you didn't install Borg yet, have a look at [this previous guide](https://docs.borgbase.com/linux/setup-borg-command-line/).  Please refer to the official [borgmatic documentation](https://torsion.org/borgmatic/docs/how-to/set-up-backups/) for setting up Borgmatic. If your repository is hosted on BorgBase, your config file can be automatically generated for you using the [Configuration Assistant](https://www.borgbase.com/setup).

Borgmatic will automatically use the repo and passphrase defined in the config file. So this doesn't need to be specified again.

## Step 1 - Listing Archives and Files

Assuming that you have Borgmatic correctly configured and making backups, you would first need to find the correct archive (often called snapshot or version) to restore by listing them.
```
$ borgmatic list
```

After choosing the right archive, you can view files contained in it:
```
$ borgmatic list --archive server-2020-04-01
```

Or only look at files in a specific archive and folder:
```
$ borgmatic list \
    --archive server-2020-04-01
    --path var/www/example.com
```

## Step 2 - Extracting Files

Make sure you are in the directory you would like to restore to, as it will extract the files into it.

If you would only like restore a particular directory from a backup, its as easy as adding `--destination $SOME_FOLDER` to the command, along with the directory or file you would like to restore (minus the first `/`).

For example, if you would like to only restore `/mnt/catpics` from the same archive, the full command would be:
```
$ borgmatic extract \
    --archive server-2020-04-01 \
    --path mnt/catpics
    --destination /mnt/new-directory
```

This will restore the full path of that particular directory, but will only include that directory.

### Conclusion

If you already keep your Borg settings in Borgmatic, you should also use it to extract backups. For more details also see [their own documentation](https://torsion.org/borgmatic/docs/how-to/extract-a-backup/).
