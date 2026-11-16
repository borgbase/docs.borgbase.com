---
title: "Backup your Desktop using the Vorta Client for Borg"
description: "Vorta is a cross-platform open source backup client. It makes managing Borg backups easy and there is no need to run commands in the Terminal."
sidebar:
  label: "Vorta"
---

[Vorta](https://vorta.borgbase.com) is a cross-platform open source backup client. It makes managing Borg backups easy and there is no need to run commands in the Terminal.

<video controls="" style="max-width: 100%;" preload="none" src="https://vorta.borgbase.com/assets/images/vorta/vorta-0.9-1080.mp4" poster="https://vorta.borgbase.com/assets/images/vorta/vorta-0.9-preview.webp"> </video>

Vorta is also open source and everyone can contribute to improve the app or look at the source code. Together with Borg, which is also open source, this creates a strong chain of trust. By using Vorta, the user can benefit from all the strong point of Borg and have the convenience of a graphical user interface at the same time. Feature highlights:

- Encrypted, deduplicated and compressed backups for maximum security and efficiency.
- Run backups manually or with the built-in scheduler.
- Pick the Wifis you want to use for backups.
- View snapshots and quickly mount them to restore files.

## Connect Vorta to BorgBase

1. [Install Vorta](https://vorta.borgbase.com/install/) for your platform.
2. In Vorta, click **Add** next to the SSH Key setting and generate a new key. The public part is copied to the clipboard. If you already have SSH keys, Vorta will use them automatically.
3. In the BorgBase control panel, paste the public key under **Account > SSH Keys**. See [SSH Keys](/setup/borg/ssh-keys) for background.
4. Create a new repository under **Repositories**, assign the key you just added and copy the repository URL.
5. Back in Vorta, add a new repository, paste the repository URL and choose a secure passphrase.
6. Add folders in the **Sources** tab and press **Start Backup**.

The [Vorta tutorial for remote backups](https://vorta.borgbase.com/usage/remote/) covers these steps in detail with screenshots. To get files back, see [restoring with Vorta](https://vorta.borgbase.com/usage/restore/).

For updated instructions on installing and using Vorta, see the [official website](https://vorta.borgbase.com) or join our community on [Github](https://github.com/borgbase/vorta).
