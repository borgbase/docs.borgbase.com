---
title: Borgmatic
nav_order: 4
layout: page
parent: Restore
description: "Restoring files with Borgmatic"
---

# Restoring with Borgmatic
If you use Borgmatic for your regular backups, it may be easier to use the Borgmatic syntax, provided you have a correctly configured configuration file.

Assuming that you have Borgmatic correctly configured and making backups, you would first need to find the backup you need to restore by listing the archives.
```
$ borgmatic -l
```

After choosing the backup, you would then add it to the `borgmatic -x` command
```
$ borgmatic -x server-2020-04-01T12:11:41
```

Make sure you are in the directory you would like to restore to, as it will extract the files into it.

If you would only like restore a particular directory from a backup, its as easy as adding `--restore path` to the command, along with the directory or file you would like to restore (minus the first `/`).

For example, if you would like to only restore `/mnt/catpics` from the same archive, the full command would be:
```
$ borgmatic -x server-2020-04-01T12:11:41 --restore-path 'mnt/catpics'
```

This will restore the full path of that particular directory, but will only include that directory.
