---
title: Import and Export Repositories
nav_order: 6
layout: page
parent: Setup
description: "How can I import or export existing repository data into BorgBase?"
---
# How to Import or Export Existing Repositories

If you already have an existing Borg repository with data and archives you would like to keep, you can import it into BorgBase using `rsync`. Naturally you can use the same technique to *export* an existing repository to e.g. use it locally or with another provider.

You could also store arbitrary data *instead* of a Borg repository, though this is not supported or recommended.

## Import Existing Repository

First create a new BorgBase repository in your account under **[Repositories](https://www.borgbase.com/repositories) > New Repo**. Choose the name and region. Then open the **Advanced Options** section and select one or more keys under **Keys with Rsync Access**. Note that you can't use the same key for multiple roles. So if you want to use the same key for Borg access later, you need to remove it from the **Rsync** list first. Finally, click **Add Repository** to actually create the repository.

Next you will run the `rsync` command locally to copy your existing repository to BorgBase. In this step it's important to pay attention to the folder structure. You will want to copy the *content* of the repo folder, but not the folder itself:

```
$ rsync -Paz --dry-run --stats MY-EXISTING-REPO/ xxxyyy@xxxyyy.repo.borgbase.com:
```

Note the `/` at the end of the source folder. It means rsync will copy the contents, but not the folder.

Another thing to note is that there is no `repo` at the end of the repo URL, since rsync will automatically point to that path. So you need to remove it when copying the repo URL from the web interface.

After verifying that the command is correct, remove the `--dry-run` parameter and wait until all the data is copied.


## Export Existing Repository

Exporting works similar to importing, but assumes that you already have the repository set up in BorgBase. To export it, open the [Repositories](https://www.borgbase.com/repositories) page in the web interface and choose the **Edit** icon in the right column. This will open the repository settings.

Then open the **Advanced Options** section and select one or more keys under **Keys with Rsync Access**. Note that you can't use the same key for multiple roles. So you may have to deselect some full- or append-only keys first. When done, **Save Changes** and copy the repo URL to the clipboard (icon on the left side)

Next you will run the `rsync` command locally to copy your repository data out of BorgBase. Since the URL for `rsync` is slightly different from Borg, you need to remove the final `repo` part, but keep the colon. An example `rsync` command would be:

```
$ rsync -Paz --dry-run --stats xxxyyy@xxxyyy.repo.borgbase.com: LOCAL-REPO-DATA
```

After verifying that the command is correct, remove the `--dry-run` parameter and wait until all the data is copied.

## Have any other questions? [Email Us!](mailto:hello@borgbase.com)
