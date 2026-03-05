---
title: Importing Notes
description: Import your existing notes from Obsidian, Logseq, Roam Research, or plain markdown folders into Lokus.
---

Lokus reads standard markdown files. Depending on where your notes are coming from, you may need an automatic conversion step or none at all.

## From Obsidian

Obsidian vaults use plain markdown, but they also contain Obsidian-specific syntax that Lokus needs to convert. The built-in Obsidian importer handles this automatically.

### Quick Import (recommended)

1. Open Lokus and go to **Preferences > Import** (or press `Cmd+,` / `Ctrl+,` and select **Import** from the sidebar).
2. Click **Select Folder to Import**.
3. Select your Obsidian vault folder (the one containing your `.obsidian/` directory).
4. Lokus auto-detects it as an Obsidian vault and shows the detection result.
5. Confirm **Obsidian** is selected as the source platform.
6. Click **Convert & Open**.

The importer copies your vault to a new `<vault>-lokus` workspace folder. Your original vault is never modified, so you can continue using Obsidian side by side.

### Import Wizard (more control)

For more control over the process, use the full Import Wizard:

1. In the workspace, go to **File > Import Notes** to open the Import Wizard.
2. Select **Obsidian** as the platform.
3. Click **Select Source** and choose your vault folder.
4. The wizard validates the source and reports how many markdown and canvas files were found.
5. Review the **Preview** step to see how sample notes will be converted.
6. Choose a **Destination** folder (or use the current workspace).
7. Click **Start Import** and wait for completion.

### What the importer handles

The Obsidian importer runs a full conversion pipeline:

- **Callout conversion** -- Obsidian callout types (e.g. `[!faq]`, `[!caution]`, `[!tldr]`) are normalized to Lokus-supported types (`question`, `warning`, `abstract`, etc.). Natively supported types like `note`, `tip`, `info`, `warning`, and `danger` pass through unchanged.
- **Canvas files** -- `.canvas` files are converted to `.excalidraw` format. Nodes become rectangles with bound text, edges become arrows, and edge labels are preserved. The resulting files open directly in the Lokus canvas editor.
- **Frontmatter stripping** -- Obsidian-specific frontmatter keys are removed. Standard YAML frontmatter is preserved.
- **Dataview queries** -- `dataview`, `dataviewjs`, and `query` fenced code blocks are flagged as unsupported and preserved as-is so the original syntax is not lost.
- **Comments** -- Obsidian comment blocks (`%%...%%`) are stripped during conversion.
- **Tasks plugin metadata** -- Inline metadata like `[due:: 2024-01-15]` and `[priority:: high]` is stripped from task text. Standard `[ ]` / `[x]` checkboxes are left untouched.
- **Assets** -- Image and media files (PNG, JPG, GIF, SVG, PDF, MP3, MP4, and others) are discovered and included in the converted workspace.

### What works without conversion

These features are natively compatible between Obsidian and Lokus and require no conversion:

- Wiki links: `[[Note Name]]` and `[[Note Name|Display Text]]`
- Block references: `[[Note#heading]]` and `[[Note^blockid]]`
- Embeds: `![[Note]]`
- Tags: `#tag` format
- Standard markdown, tables, and task lists
- KaTeX math: `$inline$` and `$$block$$`
- Code blocks with syntax highlighting
- Local and remote images

### What does not carry over

- **Community plugin syntax** -- Templater commands and other plugin-specific syntax beyond Dataview will display as plain text. The underlying markdown is preserved.
- **Custom CSS snippets** -- Obsidian CSS snippets do not apply. Use Lokus themes in **Preferences > Appearance** instead.

### Running both side by side

Because the importer creates a separate workspace, you can keep using your Obsidian vault and your Lokus workspace independently. If you prefer to open the vault directly without conversion, you can do so -- wiki links, tags, math, and standard markdown all work immediately, but Obsidian-specific callout types, canvas files, comments, and Dataview blocks will not be processed.

## From plain markdown folders

If you have a folder of `.md` files from any source -- a Git repo, a notes directory, files exported from another app -- just open that folder as a workspace.

1. Open Lokus and click **Open Existing Workspace**.
2. Select the folder containing your markdown files.
3. Done. Lokus reads the files as-is.

Lokus preserves your existing folder structure. Subfolders become nested folders in the file tree. Any `[[wiki links]]` in your files will work automatically if the linked files exist in the workspace.

## From Logseq

Logseq uses an outline-based structure and a `property:: value` syntax that differs from standard markdown. Lokus includes a built-in converter that handles this translation.

### Before you start

1. Make sure your Logseq graph is synced and up to date.
2. Note the location of your Logseq graph folder (the one containing the `logseq/config.edn` file).

### Quick Import (recommended)

1. Open Lokus and go to **Preferences > Import** (or press `Cmd+,` / `Ctrl+,` and select **Import** from the sidebar).
2. Click **Select Folder to Import**.
3. Select your Logseq graph folder.
4. Lokus auto-detects it as a Logseq graph and shows the detection result.
5. Confirm **Logseq** is selected as the source platform.
6. Click **Convert & Open**.

A backup of your original files is created automatically before any conversion happens. The converter processes your notes in place, then opens the folder as a Lokus workspace.

### Import Wizard (more control)

For more control over the process, use the full Import Wizard:

1. In the workspace, go to **File > Import Notes** to open the Import Wizard.
2. Select **Logseq** as the platform.
3. Click **Select Source** and choose your Logseq graph folder.
4. The wizard validates the source and reports how many files were found.
5. Review the **Preview** step to see how sample notes will be converted.
6. Choose a **Destination** folder (or use the current workspace).
7. Click **Start Import** and wait for completion.

### What gets converted

| Logseq | Lokus |
|--------|-------|
| `property:: value` inline properties | YAML frontmatter |
| `TODO` keyword | `- [ ]` unchecked checkbox |
| `DOING` keyword | `- [/]` in-progress checkbox |
| `DONE` keyword | `- [x]` checked checkbox |
| `LATER` keyword | `- [<]` deferred checkbox |
| `NOW` keyword | `- [!]` urgent checkbox |
| `WAIT` / `WAITING` keyword | `- [w]` waiting checkbox |
| `CANCELLED` / `CANCELED` keyword | `- [-]` cancelled checkbox |
| `((uuid))` block references | `^blockid` references |
| `[[Page]]` links | `[[Page]]` (preserved as-is) |
| Top-level outline bullets (short) | Headings |
| Indented outline bullets | List items |
| Block embeds `{{embed ...}}` | Standard embeds `![[...]]` |
| `pages/parent___child.md` namespaces | `parent/child.md` folder hierarchy |
| `journals/` daily notes | `daily-notes/` folder with normalized date filenames |
| `assets/` folder | Copied to workspace as attachments |

### Callout handling

Callout blocks (`> [!type]`) are preserved and the callout type is normalized to a Lokus-supported type using the same mapping as the Obsidian importer.

### Known limitations

- Logseq queries (`{{query ...}}`) and `query`/`datalog` fenced code blocks are converted to informational callout blocks. They will not execute.
- Heavily nested outlines may need manual adjustment after conversion.
- Page aliases should be verified after import.

## From Roam Research

Roam stores data in a proprietary format. To import into Lokus, first export from Roam as JSON, then use the Lokus importer.

### Step 1: Export from Roam

1. In Roam Research, go to **Settings > Export All**.
2. Select **JSON** as the export format.
3. Download the `.json` file and save it somewhere accessible.

### Step 2: Import into Lokus

**Quick Import:**

1. Open **Preferences > Import**.
2. Click the **Roam JSON** button (next to the folder selector).
3. Select your Roam export `.json` file.
4. Lokus detects it as a Roam export.
5. Click **Convert & Open**.

**Import Wizard:**

1. Open the Import Wizard (**File > Import Notes**).
2. Select **Roam Research** as the platform.
3. Click **Select Source** and choose your `.json` export file.
4. Review the preview of converted notes.
5. Choose a destination folder.
6. Click **Start Import**.

### What gets converted

| Roam | Lokus |
|------|-------|
| Pages | Individual `.md` files |
| Top-level short blocks | Headings |
| Nested blocks | List items |
| `((uid))` references | `^blockid` references |
| `[[Page]]` links | `[[Page]]` (preserved) |
| Block embeds | Standard embeds |
| `{{[[TODO]]}}` markers | `- [ ]` unchecked checkbox |
| `{{[[DONE]]}}` markers | `- [x]` checked checkbox |
| `{{[[DOING]]}}` markers | `- [/]` in-progress checkbox |
| `#[[multi word tag]]` | `#multi-word-tag` |
| Tags | Frontmatter tags |
| Timestamps | Frontmatter `created` / `modified` |
| Date-titled pages (daily notes) | `daily-notes/` folder with date slug filenames |
| Attributes (`key:: value`) | Frontmatter properties |

### Known limitations

- Firebase-hosted images are kept as remote URLs. They are not downloaded during import.
- Complex nested block structures may need manual cleanup.
- Roam-specific features (graph view layout, page filters) do not transfer.

## After importing

### Conversion marker

After a successful import, Lokus creates a `.lokus/converted.json` file in the workspace. This file records which platform the workspace was converted from, the conversion timestamp, and the converter version. Lokus uses this marker to avoid re-converting an already-imported workspace.

### Verify your notes

1. Open a few notes and confirm formatting looks correct.
2. Click some `[[wiki links]]` to make sure they resolve.
3. Check that images display properly.
4. Review the import results for any warnings or errors.

### If something looks wrong

- The importer creates backups before converting (Logseq) or writes to a new folder (Obsidian, Roam). Check the backup or original folder to access source files.
- Formatting issues are usually limited to platform-specific syntax (plugin commands, queries). The base markdown is always preserved.
- File names are case-sensitive on Linux. If links are broken, check that the case matches.

### Keep your originals

The import process never deletes your source files. For Obsidian, a new workspace folder is created alongside the vault. For Logseq, a backup is created in the same directory. For Roam, the original JSON export is untouched. Keep these originals for at least a few weeks while you verify everything transferred correctly.

## Supported platforms summary

| Source | Method | Conversion needed |
|--------|--------|-------------------|
| Obsidian | Preferences > Import | Yes (automatic -- callouts, canvas, frontmatter, Dataview, comments) |
| Plain `.md` folders | Open folder as workspace | No |
| Logseq | Preferences > Import | Yes (automatic -- outline, tasks, namespaces, journals) |
| Roam Research | Preferences > Import (JSON) | Yes (automatic -- blocks, tasks, daily notes, tags) |

## Troubleshooting

**"Source path does not exist"** -- Double-check that you selected the correct folder. For Logseq, the folder should contain a `logseq/config.edn` file. For Obsidian, it should contain an `.obsidian/` directory.

**"No markdown files found"** -- Make sure you selected the graph root folder, not a subfolder like `pages/` or `journals/`.

**Import is slow** -- Large collections (1,000+ notes) can take several minutes. Do not close Lokus during the import.

**Broken links after import** -- Check that file names match exactly (case-sensitive on Linux). Some links from block references may need manual adjustment. The import results list any unresolved references.

**Need help?** File an issue on [GitHub](https://github.com/lokus-ai/lokus/issues) with the platform you imported from and the error message.
