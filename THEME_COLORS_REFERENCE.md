# Lokus Theme Colors Reference
**For Figma Design Work**

This document provides all color tokens from Lokus themes for accurate design reproduction.

---

## One Dark Pro (Primary Theme)

### Main Areas
- **Main Background**: `#282c34` - Primary application background
- **Sidebar/Panel**: `#21252b` - Left sidebar, panels, navigation
- **Secondary Panel**: `#2c313a` - Secondary panels, hover states

### Text Colors
- **Main Text**: `#abb2bf` - Primary text color
- **Secondary Text**: `#5c6370` - Muted text, descriptions
- **Heading**: `#abb2bf` - Headers and titles

### Accent & UI Colors
- **Accent/Primary**: `#61afef` - Links, active states, primary actions
- **Success**: `#98c379` - Success messages, positive indicators
- **Warning**: `#e5c07b` - Warnings, caution indicators
- **Danger**: `#e06c75` - Errors, destructive actions
- **Info**: `#56b6c2` - Information, neutral highlights

### Borders & Dividers
- **Border**: `#3e4451` - Borders, dividers, separators
- **Input Border**: `#3e4451` - Input field borders

### Additional Colors
- **Link**: `#61afef`
- **Code Background**: `#2c313a`
- **Selection**: `#3e4451`

---

## Catppuccin Mocha

### Main Areas
- **Main Background**: `#1e1e2e` - Primary application background
- **Sidebar/Panel**: `#181825` - Left sidebar, panels, navigation
- **Secondary Panel**: `#313244` - Secondary panels

### Text Colors
- **Main Text**: `#cdd6f4` - Primary text
- **Secondary Text**: `#a6adc8` - Muted text
- **Heading**: `#cdd6f4`

### Accent & UI Colors
- **Accent/Primary**: `#89b4fa` - Links, active states
- **Success**: `#a6e3a1` - Success indicators
- **Warning**: `#f9e2af` - Warnings
- **Danger**: `#f38ba8` - Errors
- **Info**: `#94e2d5` - Information

### Borders & Dividers
- **Border**: `#45475a` - Borders and dividers

---

## Dracula

### Main Areas
- **Main Background**: `#282a36` - Primary application background
- **Sidebar/Panel**: `#1e1f29` - Left sidebar, panels, navigation
- **Secondary Panel**: `#343746` - Secondary panels

### Text Colors
- **Main Text**: `#f8f8f2` - Primary text
- **Secondary Text**: `#6272a4` - Muted text
- **Heading**: `#f8f8f2`

### Accent & UI Colors
- **Accent/Primary**: `#bd93f9` - Links, active states
- **Success**: `#50fa7b` - Success indicators
- **Warning**: `#f1fa8c` - Warnings
- **Danger**: `#ff5555` - Errors
- **Info**: `#8be9fd` - Information

### Borders & Dividers
- **Border**: `#44475a` - Borders and dividers

---

## Tokyo Night

### Main Areas
- **Main Background**: `#1a1b26` - Primary application background
- **Sidebar/Panel**: `#16161e` - Left sidebar, panels, navigation
- **Secondary Panel**: `#24283b` - Secondary panels

### Text Colors
- **Main Text**: `#a9b1d6` - Primary text
- **Secondary Text**: `#565f89` - Muted text
- **Heading**: `#c0caf5`

### Accent & UI Colors
- **Accent/Primary**: `#7aa2f7` - Links, active states
- **Success**: `#9ece6a` - Success indicators
- **Warning**: `#e0af68` - Warnings
- **Danger**: `#f7768e` - Errors
- **Info**: `#7dcfff` - Information

### Borders & Dividers
- **Border**: `#414868` - Borders and dividers

---

## Nord

### Main Areas
- **Main Background**: `#2e3440` - Primary application background
- **Sidebar/Panel**: `#242933` - Left sidebar, panels, navigation
- **Secondary Panel**: `#3b4252` - Secondary panels

### Text Colors
- **Main Text**: `#d8dee9` - Primary text
- **Secondary Text**: `#6c768a` - Muted text
- **Heading**: `#eceff4`

### Accent & UI Colors
- **Accent/Primary**: `#88c0d0` - Links, active states
- **Success**: `#a3be8c` - Success indicators
- **Warning**: `#ebcb8b` - Warnings
- **Danger**: `#bf616a` - Errors
- **Info**: `#81a1c1` - Information

### Borders & Dividers
- **Border**: `#4c566a` - Borders and dividers

---

## Usage Guide for Figma

### Layout Structure
1. **Main Background** - Use for primary canvas/workspace area
2. **Sidebar/Panel** - Use for left navigation, file explorer, side panels
3. **Secondary Panel** - Use for nested panels, hover states, secondary areas

### Component Colors
- **Text Hierarchy**: Main text → Secondary text → Muted
- **Interactive Elements**: Use Accent color for buttons, links, active states
- **Status Indicators**: Success (green), Warning (yellow), Danger (red), Info (cyan/blue)
- **Borders**: Use Border color for all dividers, separators, and container borders

### Design Tokens Pattern
All themes follow CSS custom property pattern:
```css
--app-bg           /* Main background */
--app-panel        /* Sidebar */
--app-panel-secondary  /* Secondary panels */
--app-text         /* Primary text */
--app-text-secondary   /* Muted text */
--accent           /* Primary interactive color */
--success          /* Positive feedback */
--warning          /* Caution */
--danger           /* Errors */
--border           /* Dividers */
```

### Recommended Theme for Primary Designs
**One Dark Pro** - Most commonly used, balanced contrast, professional appearance.

---

*Color values extracted from: `/Lokus/src/themes/*.json`*
*Last Updated: 2025-11-04*
