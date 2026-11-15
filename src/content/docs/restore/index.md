---
title: "Restoring Files"
sidebar:
  label: "Overview"
  order: 0
---

The most important step of any backup: getting your files back. How this works depends on the backup tool used for the repository:

- [**Restore from a Borg backup**](/restore/borg) – using the Borg CLI, Borgmatic, Vorta or by mounting and browsing an archive.
- [**Restore from a Restic backup**](/restore/restic) – list snapshots and restore files with the Restic CLI.

In both cases you need the repository URL from the BorgBase control panel and the passphrase chosen when the repository was initialized (plus the keyfile, if you used Borg's `keyfile` mode). BorgBase has no knowledge of either and can't help recover them.

Not sure if your backups are usable? Go through our [verification checklist](/verify) before you need them.
