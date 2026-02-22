---
title: macOS
description: macOS-specific notes for Lokus including Gatekeeper, code signing, and notarization.
---

Lokus supports macOS 10.13 (High Sierra) and later, on both Intel and Apple Silicon (M1/M2/M3/M4).

## Installation

Download `Lokus_x.x.x_universal.dmg` from the [releases page](https://github.com/lokus-ai/lokus/releases). Open the DMG and drag Lokus.app into your Applications folder.

## Gatekeeper and unsigned builds

Current releases are not yet code-signed with an Apple Developer ID certificate. macOS Gatekeeper will block the app on first launch.

**Option 1: Right-click to open**

Right-click Lokus.app in Applications, select **Open**, then click **Open** in the confirmation dialog. You only need to do this once.

**Option 2: Remove the quarantine flag**

If macOS shows "Lokus is damaged and can't be opened":

```bash
xattr -cr /Applications/Lokus.app
```

For DMG files that won't mount:

```bash
xattr -cr ~/Downloads/Lokus.dmg
open ~/Downloads/Lokus.dmg
```

## Code signing and notarization

Once code signing is enabled, Gatekeeper will verify the app automatically and none of the above workarounds will be necessary. The signing process requires:

1. **Apple Developer ID Application certificate** ($99/year Apple Developer Program membership).
2. **Hardened runtime** enabled with entitlements for network access, file system access, JIT compilation, and clipboard access.
3. **Notarization** submitted to Apple for automated security review.
4. **Stapling** the notarization ticket to the DMG so offline verification works.

Tauri handles all of this during the build when the signing identity and notarization credentials are provided as environment variables. See the release workflow in `.github/workflows/release.yml`.

## Entitlements

Lokus requests these macOS entitlements:

| Entitlement | Reason |
|-------------|--------|
| `com.apple.security.network.client` | Outbound network for sync and updates |
| `com.apple.security.files.user-selected.read-write` | Read/write workspace files |
| `com.apple.security.cs.allow-jit` | JavaScript engine in WebView |
| `com.apple.security.cs.allow-unsigned-executable-memory` | Plugin sandbox execution |
| `com.apple.security.cs.disable-library-validation` | Loading plugin dynamic libraries |
| `com.apple.security.automation.apple-events` | Clipboard access |

## Window style

Lokus uses the macOS overlay title bar style (`titleBarStyle: "Overlay"`) with a hidden title for a native-feeling traffic light layout. The title is rendered inside the app's own header bar.

## Auto-updates

The built-in updater checks `https://config.lokusmd.com/api/updates/latest.json` for new releases. Update signatures are verified with a public key embedded in the app binary. Updates are downloaded and applied on next launch.

## Build from source

```bash
xcode-select --install   # Install Xcode Command Line Tools
git clone https://github.com/lokus-ai/lokus.git
cd lokus
npm install
npm run tauri build
```

Output: `src-tauri/target/release/bundle/macos/Lokus.app`
