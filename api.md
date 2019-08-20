---
title: API
nav_order: 6
layout: page
description: "Introduction to the BorgBase API and Ansible role for full backup automation."
---
# API

The [GraphQL API](https://api.borgbase.com/graphql) used by the web interface is also available to automate tasks. You can look up repository statistics, assign new SSH keys or create new backup repositories.

## Creating an Access Token

Before using the API, create a new API token in your BorgBase Control Panel under [*Account > API*](https://www.borgbase.com/account?tab=2). Here you can choose between different permission levels and specify an expiration date for short-lived keys.

### Available Permission Levels:
- **Read Only**: Can only do GraphQL queries and no mutations. Thus it can not change any data.
- **Create Only**: Limited permissions to *create* repositories and SSH keys. Can only use the following GraphQL operations: `repoAdd`, `sshAdd`, `repoList`, `sshList`.
- **Full Access**: This key has all permissions and can do the same as a fully-authenticated user. Use with care!

## Authentication

Once you have your key, you can make requests against the [API](https://api.borgbase.com/graphql). The token should be passed as HTTP header:

```
Authorization: Bearer <YOUR TOKEN>
Content-Type: application/json
```

## Looking up GraphQL Operations

The full documentation with all available operations and variables can be accessed via the GraphiQL interface at [https://api.borgbase.com/graphql](https://api.borgbase.com/graphql).

Interfacing with GraphQL is relatively easy and can be done with any tool or library that can do JSON POST requests. To get you started, we provide the following [Python client](https://github.com/borgbase/borgbase-api-client) as an example. It simply wraps the Python `requests` package and provides sample GraphQL queries.

Some GraphQL sample queries:

- List the `id` and `name` of all SSH keys in the account: `{ sshList {id, name}}`
- Get `name` disk usage for all repos: `{ repoList {id, name, currentUsage} }`
- Delete SSH key: `mutation { sshDelete(id: 1786) {ok}}`

For an introduction to GraphQL, see [How to GraphQL](https://www.howtographql.com).

## Examples

Using cURL:

```
$ curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer <YOUR TOKEN>" \
    -d '{"query": "{ sshList {id, name}}" }' \
    https://api.borgbase.com/graphql
```

Using Python requests:

```python
import requests
TOKEN = '<YOUR TOKEN>'

headers = {"Authorization": "Bearer " + TOKEN}
query = "{ sshList {id, name}}" 

response = requests.post('https://api.borgbase.com/graphql',
                         json={'query': query}, 
                         headers=headers)

print(response.json())
```

A more complex example that adds a new SSH key and backup repository.


```python
from borgbase_api_client.client import GraphQLClient
from borgbase_api_client.mutations import *

TOKEN = os.environ.get("TOKEN")
client = GraphQLClient(TOKEN)

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
