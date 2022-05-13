---
title: Ansible
nav_order: 4
layout: page
parent: Setup
description: "Use Ansible for automatically setting up clients and repositories."
---
# Ansible

We provide a ready-to-use Ansible role to install Borg, Borgmatic and a cron job on a Linux client (tested on Ubuntu/Debian/CentOS/Fedora) client. Example usage in a playbook:

```yaml
- hosts: webservers
  roles:
  - role: borgbackup
    borg_encryption_passphrase: CHANGEME
    borg_repository: m5vz9gp4@m5vz9gp4.repo.borgbase.com:repo
    borg_source_directories:
      - /srv/www
      - /var/lib/automysqlbackup
```

### Steps to use this role:

1. Install via [Ansible Galaxy](https://galaxy.ansible.com/m3nu/ansible_role_borgbackup) or clone [Github repository](https://github.com/borgbase/ansible-role-borgbackup) into your `roles` folder.
2. Add a new repository without SSH key in [BorgBase](https://www.borgbase.com)
3. Replace Borg passphrase, repository URL and source directories in your playbook
4. Run playbook against client host. A new SSH key will be created and displayed.
5. Add new SSH key in BorgBase.
6. Run `borgmatic init --encryption repokey-blake2` to validate the connection and initialize the new repository.

Learn more on the [Github page of the project](https://github.com/borgbase/ansible-role-borgbackup).

## Interacting with the BorgBase API via Ansible

[Andy Hawkins](https://github.com/adhawkins/) has created a range of Ansible modules that interact with the BorgBase API for a fully automated setup. They allow adding a repository or SSH key to BorgBase. Install it from [Ansible Galaxy](https://galaxy.ansible.com/adhawkins/borgbase):

```
$ ansible-galaxy collection install adhawkins.borgbase
```

For more details see the [Github repo](https://github.com/adhawkins/ansible-borgbase) or the [module documentation](https://adhawkins.github.io/ansible-borgbase/collections/adhawkins/borgbase/index.html).

