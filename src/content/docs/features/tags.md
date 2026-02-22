---
title: Tags
description: Organize and filter notes with inline hashtags and frontmatter tags.
---

Tag any note by typing `#tagname` inline or adding tags to the YAML frontmatter. Lokus indexes tags automatically and lets you search, filter, and browse by tag.

## Add tags to a note

### Inline tags

Type `#` followed by a tag name anywhere in your note:

```markdown
This meeting is about #project-alpha and #roadmap planning.
```

Tags support letters, numbers, hyphens, and underscores. They must start with a letter. Tags inside code blocks and inline code are ignored.

### Nested tags

Use `/` to create hierarchical tags:

```markdown
#work/projects/lokus
#personal/reading
```

Nested tags let you filter at any level. Querying `#work` with nested mode returns all notes tagged `#work`, `#work/projects`, `#work/projects/lokus`, etc.

### Frontmatter tags

Add tags in YAML frontmatter at the top of a note:

```yaml
---
tags:
  - project-alpha
  - roadmap
---
```

Or as an inline array:

```yaml
---
tags: [project-alpha, roadmap]
---
```

Both inline `#tags` and frontmatter tags are merged into a single index.

## Tag rules

- Tags are normalized to **lowercase**
- Must start with a letter (`#123` is not a valid tag)
- Allowed characters: `a-z`, `0-9`, `-`, `_`, `/`
- Maximum length: 100 characters
- Trailing slashes are stripped

## Search and filter by tag

The tag manager supports several query modes:

| Query type | Description |
|------------|-------------|
| Single tag | Find all notes with a specific tag |
| All tags (AND) | Find notes that have **every** listed tag |
| Any tags (OR) | Find notes that have **at least one** listed tag |
| Nested (include children) | Match a tag and all its sub-tags |

## Tag autocomplete

Start typing `#` in the editor and Lokus suggests existing tags ranked by usage frequency. The autocomplete detects the tag boundaries at your cursor position and offers up to 10 suggestions.

## Rename and delete tags

Tags can be renamed or deleted across all notes at once:

- **Rename**: Updates the tag in the index for every note that uses it. The note content is tracked via ID, so the displayed tag updates accordingly.
- **Delete**: Removes the tag from the index across all notes.

## Tag hierarchy

Lokus organizes nested tags into a tree structure. A tag like `#work/projects/lokus` creates three levels:

```
work
  projects
    lokus
```

Each level in the hierarchy accumulates the note count from all its children, so the `work` node shows the total count of all work-related notes.
