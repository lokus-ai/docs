---
title: Privacy Policy
description: How Lokus handles your data -- local-first storage, optional analytics, and no cloud dependency.
---

Lokus is a local-first application. Your notes, files, and workspace data stay on your device.

## What stays on your machine

**Everything you write.** Notes, canvas drawings, kanban boards, databases, templates, daily notes, and all attachments are stored as files in your local workspace directory. Lokus does not upload, sync, or mirror your content to any cloud service unless you explicitly configure sync.

**Your preferences and settings.** Theme choices, keyboard shortcuts, workspace paths, plugin configurations, and editor preferences are stored in `~/.lokus/` and your workspace's `.lokus/` folder.

**MCP server data.** The built-in MCP server operates entirely on localhost. Tool calls, logs, and workspace context stay on your machine.

## Analytics (PostHog)

Lokus includes opt-in analytics powered by [PostHog](https://posthog.com/) to understand usage patterns and improve the app.

### What is tracked

- **Session metrics** -- session count, duration, days since last session. No content.
- **Feature activation** -- which features you use (graph, canvas, databases, etc.), tracked once per feature.
- **Milestones** -- anonymous counts like "first note created" or "25 notes reached."
- **Errors** -- error type and screen location for reliability monitoring.
- **Performance** -- app startup time and cold start detection.
- **App metadata** -- app version and platform (macOS/Windows/Linux).

### What is never tracked

- Note content, titles, or file names.
- File paths or workspace directory names.
- Personally identifiable information (name, email, IP address).
- Screen recordings -- `disable_session_recording` is always set to `true`.
- Keystroke or input data.
- Clipboard content.

### How identification works

Lokus generates a random device ID stored in your browser's local storage. This ID is not linked to your name, email, or any account. It exists solely to count unique devices.

### How to opt out

Open **Preferences** and toggle **Analytics** off. Lokus calls `posthog.opt_out_capturing()` immediately -- no restart needed, no data sent after that point.

You can also prevent analytics from ever initializing by not setting the `VITE_POSTHOG_KEY` environment variable (relevant for self-built versions).

## Network connections

Lokus makes these outbound connections:

| Destination | Purpose | When |
|-------------|---------|------|
| `config.lokusmd.com` | Auto-update check | On launch and periodically |
| `us.i.posthog.com` | Analytics (if opted in) | During active sessions |
| `accounts.google.com` | Google Calendar sync | Only if you connect Google Calendar |
| CalDAV provider URLs | Calendar sync | Only if you connect a CalDAV calendar |
| Supabase endpoints | Authentication | Only if you sign in |

All connections use HTTPS. The MCP server binds to `localhost` only and does not accept remote connections.

## Data deletion

Delete your workspace folder and `~/.lokus/` to remove all Lokus data from your machine. Analytics data already sent to PostHog can be requested for deletion by contacting us.

## Third-party services

Lokus does not sell, share, or provide your data to third parties. PostHog processes anonymous analytics data under their [privacy policy](https://posthog.com/privacy). No other third-party service receives data from Lokus unless you configure an integration (Google Calendar, CalDAV, Supabase auth).

## Contact

For privacy questions, open an issue on the [Lokus GitHub repository](https://github.com/lokus-ai/lokus/issues) or email the maintainer directly.
