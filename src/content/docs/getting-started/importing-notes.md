---
title: Importing Notes
description: Import your existing notes from Obsidian, Logseq, Roam Research, or plain markdown folders into Lokus.
---

Lokus reads standard markdown files. Depending on where your notes are coming from, you may not need to import anything at all.

## From Obsidian

**No conversion needed.** Obsidian vaults are already compatible with Lokus because both apps use plain markdown files with the same conventions.

1. Open Lokus. On the Launcher screen, click **Open Existing Workspace**.
2. Select your Obsidian vault folder (the one containing your `.obsidian/` directory).
3. Lokus opens the vault. Your notes are ready.

### What works immediately

- Wiki links: `[[Note Name]]` and `[[Note Name|Display Text]]`
- Block references: `[[Note#heading]]` and `[[Note^blockid]]`
- Embeds: `![[Note]]`
- YAML frontmatter and properties
- Tags: `#tag` format
- Standard markdown, tables, and task lists
- KaTeX math: `$inline$` and `$$block$$`
- Code blocks with syntax highlighting
- Local and remote images

### What does not carry over

- **Community plugin syntax** -- Dataview queries, Templater commands, and other plugin-specific syntax will display as plain text or code blocks. The underlying markdown is preserved.
- **Canvas files** -- Obsidian `.canvas` files are not supported. Lokus has its own canvas built on TLDraw.
- **Custom CSS snippets** -- Obsidian CSS snippets do not apply. Use Lokus themes in **Preferences > Appearance** instead.

### Running both side by side

You can use Lokus and Obsidian with the same vault at the same time. Both apps read and write plain markdown files, so changes made in one appear in the other. This makes it easy to try Lokus without committing to a full switch.

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
| `TODO` / `DOING` / `DONE` keywords | `- [ ]` and `- [x]` checkboxes |
| `((uuid))` block references | `^blockid` references |
| `[[Page]]` links | `[[Page]]` (preserved as-is) |
| Outline bullet structure | Standard markdown paragraphs |
| Block embeds | Standard embeds |

### Known limitations

- Logseq queries (`{{query ...}}`) are converted to code blocks. They will not execute.
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
| Blocks and nested blocks | Paragraphs and lists |
| `((uid))` references | `^blockid` references |
| `[[Page]]` links | `[[Page]]` (preserved) |
| Block embeds | Standard embeds |
| Tags | Frontmatter tags |
| Timestamps | Frontmatter `created` / `modified` |

### Known limitations

- Firebase-hosted images may need to be downloaded and re-linked manually.
- Complex nested block structures may need manual cleanup.
- Roam-specific features (graph view layout, page filters) do not transfer.

## After importing

### Verify your notes

1. Open a few notes and confirm formatting looks correct.
2. Click some `[[wiki links]]` to make sure they resolve.
3. Check that images display properly.
4. Review the import results for any warnings or errors.

### If something looks wrong

- The importer creates backups before converting. Check the backup folder to access original files.
- Formatting issues are usually limited to platform-specific syntax (plugin commands, queries). The base markdown is always preserved.
- File names are case-sensitive on Linux. If links are broken, check that the case matches.

### Keep your originals

The import process never deletes your source files. For Logseq, a backup is created in the same directory. For Roam, the original JSON export is untouched. Keep these originals for at least a few weeks while you verify everything transferred correctly.

## Supported platforms summary

| Source | Method | Conversion needed |
|--------|--------|-------------------|
| Obsidian | Open vault as workspace | No |
| Plain `.md` folders | Open folder as workspace | No |
| Logseq | Preferences > Import | Yes (automatic) |
| Roam Research | Preferences > Import (JSON) | Yes (automatic) |

## Troubleshooting

**"Source path does not exist"** -- Double-check that you selected the correct folder. For Logseq, the folder should contain a `logseq/config.edn` file.

**"No markdown files found"** -- Make sure you selected the graph root folder, not a subfolder like `pages/` or `journals/`.

**Import is slow** -- Large collections (1,000+ notes) can take several minutes. Do not close Lokus during the import.

**Broken links after import** -- Check that file names match exactly (case-sensitive on Linux). Some links from block references may need manual adjustment. The import results list any unresolved references.

**Need help?** File an issue on [GitHub](https://github.com/lokus-ai/lokus/issues) with the platform you imported from and the error message.
