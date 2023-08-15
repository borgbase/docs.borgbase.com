---
title: Containers
nav_order: 4
layout: page
parent: Borg
grand_parent: Setup
description: "Use Borg and Borgmatic to backup (Docker) containers"
---

# Backup (Docker) Containers

_Reviewed on 2023 August 16_

### Introduction

Docker and related container tools, like Podman have greatly simplified the work of sysadmins. Instead of installing dependencies on the operating system, they can now be isolated in a "container". This helps with isolation and updates. At the same time containers are relatively light because processes share the host OS and kernel.

Backing up data related to containers isn't too different from any other application. This article will simply share some rough steps and best practices.

## Prerequisites

This tutorial assumes that you are using Docker or Podman, though similar container runtimes should work in a similar way. It also works with rootless and rootfull containers.

## Step 1 - Gather data to backup

Containers keep data in multiple places. To get a complete backup, you need to establish where data needed to successfully recreate a container is kept.

- **Container configuration**: This means the details needed to recreate a container or pod and is equivalent to the `docker run` command needed to launch a container. Often this is kept in a `docker-compose.yml` file (for small deployments), in a orchestration tool, like Portainer or other deployment automation tool.
- **Mounted volumes**: Any data inside a container is managed by the publisher of the image and will disappear if the container is updated or recreate. Thus it's necessary to mount persistent folders _outside_ the container. This can happen with _named volumes_ (managed by the container runtime and usually kept in `/var/lib/docker/volumes/` or a user's home folder) or _bind mounts_ (links to actual host folders). No matter where mounted folders are kept, they need to be included in the backup.
- **Databases**: Many apps require a database to work and often launch a separate container for it. If you have multiple apps requiring e.g. a MySQL database, it's generally simpler to consolidate this in _one_ container and let multiple apps share one DB container. This makes backup easier and also saves resources.

## Step 2 - Backup volumes

With the locations known, you can use our usual [CLI tutorial](cli) or [Ansible role](ansible) to set up Borgmatic and Borg. There is also a [Docker image](https://github.com/borgmatic-collective/docker-borgmatic) to run Borgmatic. No matter which installation method works best, you will always need to set up a `borgmatic.yaml` file.

First let's cover container configurations and volumes:

```
location:
    source_directories:
        - /root/docker-compose
        - /var/lib/docker/volumes/
```

## Step 3 - Backup databases

Databases are slightly trickier to back up, since data might be kept in memory and just copying the data files is not sufficient for a clean backup. The simplest way to get a full database backup is Borgmatic's database dump feature. It will use named pipes to dump the data, which doesn't need space for intermediate files. See [here](databases) for more.

The below config would log into a local database container as root user and create a backup of all databases:

```
hooks:
  before_backup:
    - echo "`date` - Starting backup."
  postgresql_databases:
      - name: all
        password: ${POSTGRES_ROOT_PASSWORD}
        username: postgres
  mysql_databases:
      - name: all
        port: 33306
        username: root
        password: ${MYSQL_ROOT_PASSWORD}
        options: "--column-statistics=0"
```

{: .note }
The above example uses env var interpolation, which allows filling a Borgmatic config file via env vars. More [here](https://torsion.org/borgmatic/docs/how-to/provide-your-passwords/#environment-variable-interpolation).

## Step 4 - Testing

As a final step, it's generally a good idea to run a backup and test restoring it. So you will know you process works and you can rely on it, when you need it.

## Conclusion

This guide explained the high level step on backing up Docker and similar containers. As with every backup, it's important to first establish _where_ all the data is located and then choose appropriate backup strategies to get a complete backup.

## Have any other questions? [Email Us!](mailto:hello@borgbase.com)
