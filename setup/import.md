---
title: Import and Export Repositories
nav_order: 7
layout: page
parent: Setup
description: "How can I import or export existing repository data into BorgBase?"
---
# How to Import or Export Existing Repositories

If you have an existing Borg repository, you can import it into *BorgBase* using SFTP. Naturally you can use the same technique to *export* an existing repository.


## Import Existing Repository

First, create a new and empty *BorgBase* repository in your account under **[Repositories](https://www.borgbase.com/repositories) > New Repo**. Choose the name, region and assign a SSH key for access. Then open the **Advanced Options** section and set the access mode to *SFTP*. Finally, click **Add Repository** to actually create the repository.

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

Then open the **Advanced Options** section and set the access mode to *SFTP*. When done, click **Save Changes** and copy the repo URL to the clipboard (icon on the left side)

Next connect to your existing repo using `sftp`:
```
$ sftp xxxxxxx@xxxxxxx.repo.borgbase.com:repo
```

And download the repo folder:
```
sftp> get -Rp .
```


## Using LFTP instead of SFTP

If you should need more advanced features, you can also use the more complex `lftp` tool for the data transfer. Uploading an existing repo would work like this. Note that you need to adjust the repo URL slightly.

```
 lftp -e "mirror -eRv my-local-repo repo; quit;"  sftp://xxxxxx:@xxxxxx.repo.borgbase.com
```


## Have any other questions? [Email Us!](mailto:hello@borgbase.com)
