---
title: Import and Export
nav_order: 7
layout: page
parent: Setup
description: "How can I import or export existing repository data into BorgBase?"
---
# How to Import or Export Existing Repositories

If you have an existing Borg repository, you can import it into *BorgBase* using SFTP. Naturally you can use the same technique to *export* an existing repository.


## Import Existing Repository

First, create a new and empty *BorgBase* repository in your account under **[Repositories](https://www.borgbase.com/repositories) > New Repo**. Choose the name, region and assign a SSH key for access. Then open the **Advanced Options** section and *Enable SFTP*. Finally, click **Add Repository** to actually create the repository.

Next click the *Copy repo URL* button on the left of the table row. This will add the address of your new repo to the clipboard.

Then on your local system, navigate into the existing repository to be uploaded. The folder should have files called `config` and `data`. After ensuring you are in the correct folder, connect to your new *BorgBase* repository with `sftp`:

```
$ sftp xxxxxxx@xxxxxxx.repo.borgbase.com:repo
```

If the connection succeeds, you will see a new prompt starting with `sftp>`. Now you can upload all existing data with `put -Rp .`:

```
sftp> put -Rp .
```

After the copy operation is finished, you can change your repo's access mode back to *Borg* and use `borg info` to verify the new repo.


## Export Existing Repository

Exporting works similar to importing, but assumes that you already have the repository set up in BorgBase. To export it, open the [Repositories](https://www.borgbase.com/repositories) page in the web interface and choose the **Edit** icon in the right column. This will open the repository settings.

Then open the **Advanced Options** section and *Enable SFTP*. When done, click **Save Changes** and copy the repo URL to the clipboard (icon on the left side)

Next connect to your existing repo using `sftp`:
```
$ sftp xxxxxxx@xxxxxxx.repo.borgbase.com:repo
```

And download the repo folder:
```
sftp> get -Rp .
```


## Using Rclone

[`rclone`](https://rclone.org/sftp/) is a bit more complex but offers good sync features. This makes it better suited for larger repos. Example config (find config path via `rclone config file`):

```
[borgbase]
type = sftp
host = xxx999.repo.borgbase.com
user = xxx999
key_file = ~/.ssh/id_ed25519
shell_type = unix
md5sum_command = none
sha1sum_command = none
```

To upload a repository to BorgBase:

```
$ rclone sync -v local-repo borgbase:repo
```

To download a repository from BorgBase:

```
$ rclone sync -v borgbase:repo local-repo
```

## Have any other questions? [Email Us!](mailto:hello@borgbase.com)
