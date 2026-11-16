---
title: "Account and Service"
description: "Storage backend, repository migration, maintenance windows, account removal and how to get support."
sidebar:
  label: "Account and Service"
  order: 5
---

## Which storage backend are you using?

We deploy a mix of hardware- and software RAID-6 backed storage servers with NVMe-backed write caches for performance and enterprise hard drives for reliability. Replacement drives are ready on-site for quick failovers. For a list of the providers we work with, you can also see our [GDPR page](https://www.borgbase.com/gdpr).

While this setup provides good durability against most kinds of hardware failures, BorgBase doesn't offer geographical redundancy or redundancy across multiple data centers for single repos. It's thus not recommended to use our service for archiving purposes, where there is no other copy of the data.

If you need geographic redundancy, you can add two repos in different regions and back up to both of them. This case is, e.g. well supported by Borgmatic, which allows adding a list of repositories. Here an example configuration:

```yaml
repositories:
    - path: ssh://xxxxxx@xxxxxx.repo.borgbase.com/./repo  # EU-based repository nr. 1
    - path: ssh://yyyyyy@yyyyyy.repo.borgbase.com/./repo  # US-based repository nr. 2
```

## How can I migrate an existing repo including archives to or from BorgBase?

We offer free migration services for both, incoming and outgoing transfers. Currently this is done manually. To start a transfer follow these steps:

1. For incoming transfers, create an empty repo in your BorgBase account.
2. Make sure your old repo data is accessible from the internet somehow, e.g. via SSH, FTP or HTTP. For SSH we will provide you with a one-time public key to use.
3. Contact our support and provide the BorgBase repo ID and the login details of the transfer source or target.

## How do I fully remove my account?

If you have found another backup service and prefer to remove your account, you can do so any time. Doing so will remove your account data permanently. If you ever choose to start using BorgBase again, you will have to open a new account. If you ever had a paid subscription, we will still keep some invoicing data, as required by law. To remove your account:

1. Remove all your repositories and make sure the data is saved elsewhere. You can also transfer your whole archive via `rsync`, as described [here](/setup/import).
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
