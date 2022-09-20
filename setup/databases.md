---
title: Databases
nav_order: 8
layout: page
parent: Setup
description: "How to back up MySQL, MariaDB or Postgres using Borg Backup?"
---
# How to back up MySQL, MariaDB or Postgres

Many services and servers require a database, whose content needs to be backed up as well. There are different ways to achieve this using Borg or Borgmatic. One method you should avoid is to copy the internal data directory of the database, as it's not save to copy those files while the database service is running. A better way is to create a compressed dump of the actual data and add that file to the backup. There are multiple ways to do so:

### Using Borgmatic's Built-In Database Hook (Recommended)

If you are already using Borgmatic and have a large database, you can also use their built-in database hooks to dump the database content and include it in your backup. The advantage of this technique is that the database dump is read via a named pipe and never written to disk, thus saving storage space.

To dump all MySQL and Postgres DBs before each backup, one would use the following snippet:[^4]

```
hooks:
    postgresql_databases:
        - name: all
    mysql_databases:
        - name: all
```


### Using a Standalone Backup Script

Most popular distributions include scripts, like `automysqlbackup`[^1] or `autopostgresqlbackup`[^2]. Those scripts will usually save a daily dump of all databases to a folder, like `/var/lib/automysqlbackup`. By running this script *before* your backup and including the dump folder in your source directories, you get a timely backup of your database.

For Borgmatic, you can use pre-backup hooks to run the database dump script:

```
hooks:
    before_backup:
        - /usr/sbin/autopostgresqlbackup
```


## Have any other questions? [Email Us!](mailto:hello@borgbase.com)



### References
[^1]: [automysqlbackup](https://sourceforge.net/projects/automysqlbackup/)
[^2]: [autopostgresqlbackup](https://github.com/exoscale/autopostgresqlbackup)
[^3]: [Borgmatic: How to add preparation and cleanup steps to backups](https://torsion.org/borgmatic/docs/how-to/add-preparation-and-cleanup-steps-to-backups/)
[^4]: [Borgmatic: Database Backup Hooks](https://torsion.org/borgmatic/docs/how-to/backup-your-databases/)
