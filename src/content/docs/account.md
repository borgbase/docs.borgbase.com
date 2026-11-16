---
title: "Account and Support"
description: "Account security, maintenance windows, account removal and how to get support."
sidebar:
  label: "Account and Support"
---

## How do I protect my account with two-factor authentication?

BorgBase supports two-factor authentication with one-time passwords (OTP) from an authenticator app. Once enabled in your account settings, logging into the control panel requires the current code in addition to your password. This protects repository settings and SSH key assignments, even if your password is leaked. It doesn't affect backups, which authenticate with SSH keys or repository credentials.

## Which storage backend are you using?

See [Storage Backend and Redundancy](/repositories/storage).

## How can I migrate an existing repo including archives to or from BorgBase?

See [Import and Export](/repositories/import) for self-service transfers and our [free migration service](/repositories/import#migration-service).

## How do I fully remove my account?

If you have found another backup service and prefer to remove your account, you can do so any time. Doing so will remove your account data permanently. If you ever choose to start using BorgBase again, you will have to open a new account. If you ever had a paid subscription, we will still keep some invoicing data, as required by law. To remove your account:

1. Remove all your repositories and make sure the data is saved elsewhere. You can also download your whole repository via SFTP or `rclone`, as described [here](/repositories/import).
2. Log into your account and navigate to [*Account > Profile*](https://www.borgbase.com/account?tab=6). Then click *Remove Account*

## Is there a maintenance window?

Sometimes it's necessary to restart services and servers to apply security- and maintenance updates. Such updates are applied during off-peak hours, late morning and afternoon of that time zone. They will be published on our [status page](https://status.borgbase.com/status/default).

## How do I get support?

If you have any questions or issues regarding your *BorgBase* account, simply email to [hello@borgbase.com](mailto:hello@borgbase.com) any time. You will generally receive a response within a few hours during working hours and within a day otherwise.

We are also happy to help out with questions around setting up backups using the various projects in the Borg eco system, for example Borgmatic, Vorta and others on a best-effort basis. If you have a specific question, you will usually receive a speedy response. For more general questions (e.g. "How do I restore my backup?") or feedback on open source software, it's better to first read the related documentation, search the project's issue tracker or – for genuine bugs – open an issue on Github. Here some links for specific projects:

- **Borg Backup**: [Documentation](https://borgbackup.readthedocs.io/en/stable/index.html), [Issue Tracker](https://github.com/borgbackup/borg/issues/)
- **Borgmatic**: [Documentation](https://torsion.org/borgmatic/), [Issue Tracker](https://projects.torsion.org/borgmatic-collective/borgmatic/issues/)
- **Vorta**: [Documentation](https://vorta.borgbase.com/), [Issue Tracker](https://github.com/borgbase/vorta/issues)

If you require additional support or integration, we can also connect you with a relevant maintainer or our parent company's [Quick Support offering](https://www.peakford.com/support/).
