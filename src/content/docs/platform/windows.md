---
title: Windows
description: Windows-specific notes for Lokus including WebView2, code signing, and SmartScreen.
---

Lokus supports Windows 10 (version 1903 and later) and Windows 11, x64 only.

## Installation

Download `Lokus_x.x.x_x64-setup.exe` from the [releases page](https://github.com/lokus-ai/lokus/releases) and run the NSIS installer. Lokus appears in the Start Menu after installation.

## WebView2 requirement

Lokus renders its UI through the Microsoft Edge WebView2 runtime. Windows 11 and Windows 10 (1903+) ship with WebView2 pre-installed. If it is missing, the installer prompts you to download it from [Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).

Without WebView2, Lokus will not start.

## SmartScreen warnings

Current releases are not code-signed with an EV certificate. Windows SmartScreen may display a "Windows protected your PC" warning on first run.

Click **More info**, then **Run anyway** to proceed. This warning appears once.

## Code signing

Code signing eliminates the SmartScreen warning and shows a verified publisher name in the installer. The process:

1. Obtain a code signing certificate from a trusted CA (Sectigo, DigiCert, or GlobalSign).
2. Configure the certificate thumbprint in `src-tauri/tauri.windows.conf.json`.
3. Tauri's build system calls `signtool` to sign the `.exe` and `.msi` outputs.
4. A timestamp server (e.g., `http://timestamp.sectigo.com`) ensures signatures remain valid after the certificate expires.

**EV certificates** provide instant SmartScreen reputation. Standard certificates require approximately 2,000 unique downloads before SmartScreen stops warning.

## Build targets

The Windows build produces an NSIS installer by default (`targets: ["nsis"]` in the Tauri config). The installer uses English language and the Lokus icon.

Auto-updates on Windows use passive install mode -- the update is applied silently with a progress bar, no user interaction required.

## Build from source

```powershell
# Install Visual Studio Build Tools
winget install Microsoft.VisualStudio.2022.BuildTools

# Clone and build
git clone https://github.com/lokus-ai/lokus.git
cd lokus
npm install
npm run tauri build
```

Output: `src-tauri\target\release\bundle\nsis\Lokus_x.x.x_x64-setup.exe`
