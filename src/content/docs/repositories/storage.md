---
title: "Storage Backend and Redundancy"
description: "How BorgBase stores repository data, what redundancy it provides and how to add geographic redundancy."
sidebar:
  label: "Storage and Redundancy"
---

We deploy a mix of hardware- and software RAID-6 backed storage servers with NVMe-backed write caches for performance and enterprise hard drives for reliability. Replacement drives are ready on-site for quick failovers. For a list of the providers we work with, you can also see our [GDPR page](https://www.borgbase.com/gdpr).

While this setup provides good durability against most kinds of hardware failures, BorgBase doesn't offer geographical redundancy or redundancy across multiple data centers for single repos. It's thus not recommended to use our service for archiving purposes, where there is no other copy of the data.

If you need geographic redundancy, you can add two repos in different regions and back up to both of them. This case is, e.g. well supported by Borgmatic, which allows adding a list of repositories. Here an example configuration:

```yaml
repositories:
    - path: ssh://xxxxxx@xxxxxx.repo.borgbase.com/./repo  # EU-based repository nr. 1
    - path: ssh://yyyyyy@yyyyyy.repo.borgbase.com/./repo  # US-based repository nr. 2
```
