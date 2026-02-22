---
title: Installation
description: Download and install Lokus on macOS, Windows, or Linux.
---

Download the latest release from the [GitHub Releases page](https://github.com/lokus-ai/lokus/releases).

## macOS

**Supported versions:** macOS 10.15 (Catalina) and later. Works on both Intel and Apple Silicon.

1. Download `Lokus_x.x.x_universal.dmg` from the releases page.
2. Open the DMG and drag **Lokus.app** into your **Applications** folder.
3. On first launch, macOS will warn about an unverified developer. Right-click the app and select **Open**, then click **Open** again in the dialog.

If macOS shows "Lokus is damaged and can't be opened," remove the quarantine flag:

```bash
xattr -cr /Applications/Lokus.app
```

## Windows

**Supported versions:** Windows 10 (1903+) and Windows 11, x64 only.

1. Download the `Lokus_x.x.x_x64-setup.exe` installer.
2. Run the installer and follow the prompts.
3. Launch Lokus from the Start Menu.

**WebView2 requirement:** Lokus needs the Microsoft Edge WebView2 runtime. Windows 10 (version 1903+) and Windows 11 include it by default. If it's missing, the installer will prompt you to install it, or download it from [Microsoft](https://developer.microsoft.com/en-us/microsoft-edge/webview2/).

## Linux

**Supported versions:** Ubuntu 20.04+, Fedora 38+, and most modern distributions with GTK 3 and WebKitGTK.

### DEB package (Ubuntu / Debian)

```bash
# Download and install
sudo dpkg -i lokus_x.x.x_amd64.deb

# Fix missing dependencies if needed
sudo apt-get install -f
```

### RPM package (Fedora / RHEL)

```bash
sudo dnf install lokus-x.x.x-1.x86_64.rpm
```

### AppImage

```bash
chmod +x Lokus_x.x.x_amd64.AppImage
./Lokus_x.x.x_amd64.AppImage
```

If the AppImage fails to start, install FUSE:

```bash
# Ubuntu/Debian
sudo apt-get install fuse libfuse2
```

### Linux dependencies

Most distributions ship these pre-installed. If Lokus fails to start, install:

```bash
# Ubuntu/Debian
sudo apt-get install libgtk-3-0 libwebkit2gtk-4.1-0 libayatana-appindicator3-1

# Fedora
sudo dnf install gtk3 webkit2gtk4.1 libappindicator-gtk3

# Arch
sudo pacman -S gtk3 webkit2gtk-4.1 libappindicator-gtk3
```

## Build from source

For developers who want to compile Lokus themselves.

### Prerequisites

- **Node.js 18+** with npm
- **Rust** (latest stable, via [rustup](https://rustup.rs))
- **Git**
- Platform-specific build tools (see below)

### Platform build tools

**macOS:**
```bash
xcode-select --install
```

**Windows:**
```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install build-essential libgtk-3-dev \
  libwebkit2gtk-4.1-dev libappindicator3-dev \
  librsvg2-dev patchelf pkg-config
```

### Build steps

```bash
git clone https://github.com/lokus-ai/lokus.git
cd lokus
npm install
npm run tauri build
```

Build output lands in `src-tauri/target/release/bundle/`.

For platform-specific builds:
```bash
npm run build:macos    # macOS (.dmg + .app)
npm run build:windows  # Windows (.exe installer)
npm run build:linux    # Linux (.deb, .rpm, .AppImage)
```

## Auto-updates

Lokus checks for updates automatically and prompts you when a new version is available. You can also check manually in **Preferences > Updates**.

## System requirements

| Component | Windows | macOS | Linux |
|-----------|---------|-------|-------|
| OS | Windows 10 (1903+) | macOS 10.15+ | Ubuntu 20.04+ |
| RAM | 4 GB minimum | 4 GB minimum | 2 GB minimum |
| Disk | 500 MB | 500 MB | 300 MB |
| Display | 1024 x 768 | 1024 x 768 | 1024 x 768 |

## Next steps

Install complete? Head to the [Quick Start guide](/getting-started/quick-start) to create your first workspace.
