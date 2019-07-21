---
title: Automation
nav_order: 4
layout: page
description: ""
---
# How to Incorporate BorgBase into your Automated Deployment Workflow
Modern IT would be impossible without automation. We provide the tools to make reliable backups a part of your deployment workflow.

## Ansible Role for Borg Backup Client

This role will install Borg Borgmatic and a cron job on a Linux (tested on Ubuntu/Debian/CentOS/Fedora) client. Learn more on the [Github page of the project](https://github.com/borgbase/ansible-role-borgbackup).

## Ansible Module to set up BorgBase Repo

BorgBase user [@adhawkinsgh](https://twitter.com/adhawkinsgh/) created a range of Ansible modules that interact with the BorgBase API for a fully automated setup. These roles will also set up new repos and SSH keys with BorgBase.

For details see the [Github repo](https://github.com/adhawkins/ansible-borgbase) or the [in-file documentation](https://github.com/adhawkins/ansible-borgbase/blob/master/borgbase_repo.py).

## API

The GraphQL API used by the web interface is also available to automate tasks, like adding keys and repos.

You can use the Python sample client to communicate with this API or implement your own. The full documentation can be accessed via the GraphiQL interface at [https://api.borgbase.com/graphql](https://api.borgbase.com/graphql).

Interfacing with GraphQL is relatively easy and can be done with any tool or library that can do POST requests. To get you started we provide the following [Python client](https://github.com/borgbase/borgbase-api-client) as example. It simply wraps the Python `requests` package and provides sample GraphQL queries.

Example usage:

```
from borgbase_api_client.client import GraphQLClient
from borgbase_api_client.mutations import *

client = GraphQLClient()
client.login(email='xxx', password='xxx')

new_key_vars = {
    'name': 'Key for VM-004',
    'keyData': 'ssh-ed25519 AAAAC3Nz......aLqRJw+dl/E+2BJ xxx@yyy'
}
res = client.execute(SSH_ADD, new_key_vars)
new_key_id = res['data']['sshAdd']['keyAdded']['id']

new_repo_vars = {
    'name': 'VM-004-test',
    'quotaEnabled': False,
    'appendOnlyKeys': [new_key_id],
    'region': 'us'
}
res = client.execute(REPO_ADD, new_repo_vars)
new_repo_path = res['data']['repoAdd']['repoAdded']['repoPath']
print('Added new repo with path:', new_repo_path)
```