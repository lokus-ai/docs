---
title: Sync & Privacy
description: How Lokus sync works, what the encryption does and doesn't do, and what stays on your device.
---

Lokus is **local-first**: everything you write is a plain markdown file in a folder on your computer. Sync is an optional layer on top, and it only exists if you sign in and turn it on.

## The short version

- **No account, no cloud.** Guest mode keeps everything on your device. Nothing leaves your machine.
- **With sync on**, your notes are encrypted on your device before they're uploaded, and decrypted when they come back down.
- **Your folder is the source of truth.** Delete Lokus, keep the folder; move the folder to another app; open it in a text editor. It's just markdown.

## How sync works

1. Each workspace gets an entry in your account's workspace registry.
2. Lokus scans your vault, hashes each file, and uploads changed files as **encrypted blobs** to your private storage space.
3. A single **manifest** (a list of your files with their hashes) is stored per workspace and used to detect changes on other devices.
4. When two devices edit the same note differently, Lokus keeps both versions: yours stays put, the other arrives as a `.conflict-…` copy you can compare and merge.
5. Offline edits queue up locally and upload when you're back online.

Sync runs in the background on a schedule and after saves; it never blocks your writing.

## The encryption, honestly

- Files are encrypted with **AES-256-GCM** using a master key generated on your first device.
- That master key is wrapped (encrypted) with a key derived from your account and stored alongside your sync data so your other devices can unlock it.
- **What this means:** your notes are unreadable to casual observers and to anyone who intercepts them in transit or at rest. **What it does not mean:** zero-knowledge. The wrapped key lives server-side, so the sync service can, in principle, decrypt your blobs. If you need guarantees beyond that, keep sync off and manage the folder yourself (e.g., your own encrypted drive or your own sync tool).
- We state this plainly because most apps say "end-to-end encrypted" and hope you don't read further.

## What sync is not

- **Not real-time collaboration.** Two people editing the same note concurrently will produce conflict copies, not a merged document.
- **Not a backup service.** Sync mirrors what's on your devices. Keep your own backups of important vaults.
- **Not forced.** You can sign in for sync and still keep specific workspaces local-only.

## Privacy defaults

- **Analytics** are limited to product usage metrics (PostHog) and can be disabled in Preferences.
- **Crash reporting** is off unless you explicitly enable it; the crash reporter isn't even loaded when it's off.
- **No note content is ever sent to analytics or crash reporting.** Only the sync pipeline touches your notes, and only in encrypted form.
- Deleting your account removes your sync data, including the wrapped key — after that, previously uploaded blobs are undecryptable by anyone.

## Related

- [Using Plugins](/plugins/using-plugins/) — plugins are sandboxed and need your approval for any data access
- [Installation](/getting-started/installation/) — guest mode and sign-in options
