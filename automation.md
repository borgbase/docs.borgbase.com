---
title: API and Automation
nav_order: 4
layout: page
description: "Introduction to the BorgBase API and Ansible role for full backup automation."
---
# How to Incorporate BorgBase into your Automated Deployment Workflow
You can fully automate your backup management using our GraphQL API. For quick client setup, an Ansible role is provided.

## API

The GraphQL API used by the web interface is also available to automate tasks, like adding keys and repos. Before using the API, create a new API token in your BorgBase Control Panel under [*Account > API*](https://www.borgbase.com/account?tab=2). Here you can choose between different permission levels and specify an expiration date for short-lived keys.

Once you have your key, you can make requests against our [GraphQL API](https://api.borgbase.com/graphql). The token should be passed as HTTP header:

`Authorization: Bearer <YOUR TOKEN>`

An example request using cURL:

```
$ curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <YOUR TOKEN>" \
    -d '{"query": "{ sshList {id, name}}" }' \
    https://api.borgbase.com/graphql
```

Example using Python requests:

```
import requests
TOKEN = '<YOUR TOKEN>'

headers = {"Authorization": "Bearer " + TOKEN}
query = "{ sshList {id, name}}" 

response = requests.post('https://api.borgbase.com/graphql',
                         json={'query': query}, 
                         headers=headers)

print(response.json())
```

The full documentation with all available operations can be accessed via the GraphiQL interface at [https://api.borgbase.com/graphql](https://api.borgbase.com/graphql).

Interfacing with GraphQL is relatively easy and can be done with any tool or library that can do JSON POST requests. To get you started, we provide the following [Python client](https://github.com/borgbase/borgbase-api-client) as an example. It simply wraps the Python `requests` package and provides sample GraphQL queries.

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

## Ansible

### Setting Up a Backup Client using Ansible

This role will install Borg Borgmatic and a cron job on a Linux (tested on Ubuntu/Debian/CentOS/Fedora) client. Learn more on the [Github page of the project](https://github.com/borgbase/ansible-role-borgbackup).

### Interacting with the BorgBase API via Ansible

BorgBase user [@adhawkinsgh](https://twitter.com/adhawkinsgh/) created a range of Ansible modules that interact with the BorgBase API for a fully automated setup. These roles will also set up new repos and SSH keys with BorgBase.

For details see the [Github repo](https://github.com/adhawkins/ansible-borgbase) or the [in-file documentation](https://github.com/adhawkins/ansible-borgbase/blob/master/borgbase_repo.py).

