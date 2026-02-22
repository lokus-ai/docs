// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Lokus',
			tagline: 'Where your thinking lives',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/nicepkg/lokus',
				},
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Importing Notes', slug: 'getting-started/importing-notes' },
					],
				},
				{
					label: 'Features',
					items: [
						{ label: 'Editor', slug: 'features/editor' },
						{ label: 'Wiki Links', slug: 'features/wiki-links' },
						{ label: 'Graph View', slug: 'features/graph-view' },
						{ label: 'Canvas', slug: 'features/canvas' },
						{ label: 'Bases', slug: 'features/bases' },
						{ label: 'Daily Notes', slug: 'features/daily-notes' },
						{ label: 'Tasks', slug: 'features/tasks' },
						{ label: 'Tags', slug: 'features/tags' },
						{ label: 'Templates', slug: 'features/templates' },
						{ label: 'Search', slug: 'features/search' },
						{ label: 'Split Editor', slug: 'features/split-editor' },
						{ label: 'Themes', slug: 'features/themes' },
					],
				},
				{
					label: 'AI',
					items: [
						{ label: 'MCP Server', slug: 'ai/mcp-server' },
					],
				},
				{
					label: 'Plugins',
					items: [
						{ label: 'Using Plugins', slug: 'plugins/using-plugins' },
						{ label: 'Creating Plugins', slug: 'plugins/creating-plugins' },
						{ label: 'Plugin API Reference', slug: 'plugins/plugin-api-reference' },
					],
				},
				{
					label: 'Developers',
					items: [
						{ label: 'Architecture', slug: 'developers/architecture' },
						{ label: 'Building from Source', slug: 'developers/building-from-source' },
						{ label: 'API Reference', slug: 'developers/api-reference' },
						{ label: 'Testing', slug: 'developers/testing' },
						{ label: 'Contributing', slug: 'developers/contributing' },
						{ label: 'Environment Variables', slug: 'developers/environment-variables' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Keyboard Shortcuts', slug: 'reference/keyboard-shortcuts' },
						{ label: 'Markdown Syntax', slug: 'reference/markdown-syntax' },
						{ label: 'Template Variables', slug: 'reference/template-variables' },
						{ label: 'Frontmatter', slug: 'reference/frontmatter' },
						{ label: 'Config Options', slug: 'reference/config-options' },
					],
				},
				{
					label: 'Platform',
					items: [
						{ label: 'macOS', slug: 'platform/macos' },
						{ label: 'Windows', slug: 'platform/windows' },
						{ label: 'Linux', slug: 'platform/linux' },
					],
				},
				{
					label: 'Legal',
					items: [
						{ label: 'License', slug: 'legal/license' },
						{ label: 'Privacy', slug: 'legal/privacy' },
					],
				},
				{
					label: 'Changelog',
					slug: 'changelog',
				},
			],
		}),
	],
});
