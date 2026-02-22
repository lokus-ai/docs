---
title: Building from Source
description: Prerequisites, clone instructions, and build steps for compiling Lokus on macOS, Windows, and Linux.
---

Build Lokus from source to run the latest code, test changes, or contribute back.

## Prerequisites

Install these before building:

| Tool | Version | Install |
|------|---------|---------|
| **Node.js** | 22+ | [nodejs.org](https://nodejs.org/) or `nvm install 22` |
| **Rust** | Latest stable | `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \| sh` |
| **Git** | Any recent | [git-scm.com](https://git-scm.com/) |

Verify your installations:

```bash
node --version   # v22.x.x
cargo --version  # cargo 1.x.x
rustc --version  # rustc 1.x.x
git --version    # git version 2.x.x
```

### Platform-Specific Dependencies

#### macOS

```bash
xcode-select --install
brew install pkg-config
```

#### Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install -y \
    libgtk-3-dev \
    libwebkit2gtk-4.0-dev \
    libappindicator3-dev \
    librsvg2-dev \
    patchelf \
    build-essential \
    libssl-dev \
    pkg-config
```

For Ubuntu 22.04+, use `libwebkit2gtk-4.1-dev` instead of `4.0`.

#### Linux (Fedora)

```bash
sudo dnf install -y \
    gtk3-devel \
    webkit2gtk4.0-devel \
    libappindicator-gtk3-devel \
    librsvg2-devel \
    openssl-devel
```

#### Linux (Arch)

```bash
sudo pacman -S webkit2gtk gtk3 libappindicator-gtk3 librsvg openssl
```

#### Windows

Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022) with the "C++ build tools" workload. Or:

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

WebView2 comes preinstalled on Windows 10/11. If missing:

```powershell
winget install Microsoft.EdgeWebView2
```

## Clone and Install

```bash
git clone https://github.com/lokus-ai/lokus.git
cd lokus
npm install
```

## Development Mode

Start the app with hot-reload for both frontend and backend:

```bash
npm run tauri dev
```

This runs Vite on port 1420 (React frontend with HMR) and compiles the Rust backend. First run takes 5--10 minutes for Rust dependency compilation. Subsequent runs are much faster.

Platform-specific dev commands:

```bash
npm run dev:macos    # macOS-specific config
npm run dev:windows  # Windows-specific config
npm run dev:linux    # Linux-specific config
```

### Running Frontend Only

To work on just the React frontend (no Tauri/Rust):

```bash
npm run dev
```

This starts the Vite dev server at `http://localhost:1420`. Tauri API calls will fail, but layout and styling work is possible.

## Production Build

Build a distributable binary for your current platform:

```bash
npm run tauri build
```

Output locations:

| Platform | Output |
|----------|--------|
| macOS | `src-tauri/target/release/bundle/dmg/Lokus_*.dmg` |
| Windows | `src-tauri/target/release/bundle/nsis/Lokus_*.exe` |
| Linux | `src-tauri/target/release/bundle/appimage/lokus_*.AppImage` |

### Cross-Platform Builds

Build for specific platforms (on macOS, CI, etc.):

```bash
npm run build:macos    # macOS .dmg
npm run build:windows  # Windows .exe (requires cross-compilation setup)
npm run build:linux    # Linux .AppImage/.deb/.rpm
```

Build all platforms:

```bash
npm run build:all
```

### App Store Build

For macOS App Store submission (disables auto-updater):

```bash
npm run build:appstore
```

## Verify the Build

After building, verify everything works:

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Check Rust compilation
cargo check --manifest-path=src-tauri/Cargo.toml
```

## Clean Build

Remove all build artifacts and start fresh:

```bash
npm run clean           # Remove dist/ and src-tauri/target/
npm run clean:build     # Clean + reinstall dependencies
```

## Troubleshooting

**Rust compilation fails with missing linker:**
Install `build-essential` (Linux) or Xcode Command Line Tools (macOS).

**`cargo: command not found` after installing Rust:**

```bash
source "$HOME/.cargo/env"
# Or add to your shell profile:
export PATH="$HOME/.cargo/bin:$PATH"
```

**Port 1420 already in use:**

```bash
# macOS/Linux
lsof -ti:1420 | xargs kill -9

# Windows
netstat -ano | findstr :1420
taskkill /PID <PID> /F
```

**Build runs out of memory:**

```bash
export CARGO_BUILD_JOBS=2
```

**Apple Silicon issues:**

```bash
softwareupdate --install-rosetta
```

**First build is slow:** This is normal. Rust compiles all dependencies on the first build. Incremental compilation makes subsequent builds faster (seconds instead of minutes).
