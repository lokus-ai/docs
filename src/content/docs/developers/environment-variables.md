---
title: Environment Variables
description: All environment variables used by Lokus, their defaults, and how to configure them.
---

Lokus reads environment variables from a `.env` file in the project root. Copy the example file to get started:

```bash
cp .env.example .env
```

## Variable Reference

### `VITE_AUTH_BASE_URL`

Base URL for the authentication backend.

| Mode | Default |
|------|---------|
| Development (`npm run dev`) | `http://localhost:3000` |
| Production (`npm run build`) | `https://lokusmd.com` |

```bash
VITE_AUTH_BASE_URL=https://lokusmd.com
```

Used for sign-up, sign-in, OAuth flows, email confirmation links, and profile management. The value is baked into the frontend at build time.

### `AUTH_BASE_URL`

Rust-side equivalent of `VITE_AUTH_BASE_URL`. Automatically matches the frontend value. Override only if the backend needs a different endpoint.

### `GOOGLE_CLIENT_ID`

Google OAuth Client ID for Gmail integration. Required only if you enable Gmail features.

```bash
GOOGLE_CLIENT_ID=your_client_id_here
```

Create one at [Google Cloud Console](https://console.cloud.google.com/) > Credentials > OAuth 2.0 Client IDs. Set application type to "Desktop application" and add `http://localhost:8080/gmail-callback` as an authorized redirect URI.

### `GOOGLE_CLIENT_SECRET`

Google OAuth Client Secret. Paired with `GOOGLE_CLIENT_ID` above.

```bash
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### `VITE_ENABLE_CRASH_REPORTS`

Enable Sentry crash reporting. Default: `false`.

```bash
VITE_ENABLE_CRASH_REPORTS=true
```

### `TAURI_SENTRY_DSN`

Sentry DSN for the Rust backend. Only used when `VITE_ENABLE_CRASH_REPORTS` is `true`.

```bash
TAURI_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

### `VITE_SENTRY_ENVIRONMENT`

Sentry environment label. Default: `production`.

```bash
VITE_SENTRY_ENVIRONMENT=staging
```

### `VITE_DISABLE_UPDATE_CHECKER`

Disable the auto-update check. Used for App Store builds where updates go through the store.

```bash
VITE_DISABLE_UPDATE_CHECKER=true
```

## Development vs Production

In development (`npm run dev`), Vite reads the `.env` file and injects `VITE_`-prefixed variables into the frontend. The Rust backend loads `.env` via `dotenvy` at startup.

In production (`npm run build`), `VITE_`-prefixed variables are baked into the JavaScript bundle at build time. Changing them after the build has no effect -- you must rebuild.

## Security

- Never commit `.env` files with real credentials. The `.gitignore` already excludes `.env`.
- Rotate credentials immediately if they are accidentally exposed.
- Use `.env.example` for documenting variable names without real values.
