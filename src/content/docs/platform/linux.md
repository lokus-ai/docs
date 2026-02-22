---
title: Linux
description: Linux-specific notes for Lokus including dependencies, package formats, and desktop environments.
---

Lokus supports Ubuntu 20.04+, Fedora 38+, Arch, and most modern distributions with GTK 3 and WebKitGTK 4.1.

## Package formats

### DEB (Ubuntu / Debian)

```bash
sudo dpkg -i lokus_x.x.x_amd64.deb
sudo apt-get install -f   # fix missing dependencies if needed
```

### RPM (Fedora / RHEL)

```bash
sudo dnf install lokus-x.x.x-1.x86_64.rpm
```

### AppImage

```bash
chmod +x Lokus_x.x.x_amd64.AppImage
./Lokus_x.x.x_amd64.AppImage
```

AppImage requires FUSE. If the AppImage fails to start:

```bash
# Ubuntu/Debian
sudo apt-get install fuse libfuse2
```

## Dependencies

Most distributions ship these pre-installed. If Lokus fails to launch, install them manually:

**Ubuntu / Debian:**
```bash
sudo apt-get install libgtk-3-0 libwebkit2gtk-4.1-0 libayatana-appindicator3-1
```

**Fedora:**
```bash
sudo dnf install gtk3 webkit2gtk4.1 libappindicator-gtk3
```

**Arch:**
```bash
sudo pacman -S gtk3 webkit2gtk-4.1 libappindicator-gtk3
```

## Desktop environment support

Lokus detects your desktop environment (`XDG_CURRENT_DESKTOP`) and adapts file-manager integration accordingly:

| Desktop | File manager | Detection |
|---------|-------------|-----------|
| GNOME | Nautilus | `nautilus` command |
| KDE | Dolphin | `dolphin` command |
| Xfce | Thunar | `thunar` command |
| Other | `xdg-open` | Fallback |

"Reveal in file manager" and similar features use the appropriate tool for your environment.

## Auto-updates

The updater checks `https://config.lokusmd.com/api/updates/latest.json` for new releases. Update signatures are verified against a public key embedded in the binary.

## Build from source

```bash
# Install build dependencies (Ubuntu/Debian)
sudo apt-get install build-essential libgtk-3-dev \
  libwebkit2gtk-4.1-dev libappindicator3-dev \
  librsvg2-dev patchelf pkg-config

# Clone and build
git clone https://github.com/lokus-ai/lokus.git
cd lokus
npm install
npm run tauri build
```

Output: `src-tauri/target/release/bundle/` containing `.deb`, `.rpm`, and `.AppImage` files.
