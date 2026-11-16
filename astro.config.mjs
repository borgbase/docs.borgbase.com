// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';

export default defineConfig({
	site: 'https://docs.borgbase.com',
	// Emit cli.html instead of cli/index.html to keep the existing extensionless URLs on Cloudflare Pages.
	build: { format: 'file' },
	integrations: [
		starlight({
			title: 'BorgBase Docs',
			description:
				'All the resources you need to develop a comprehensive backup strategy with BorgBase and apply it in your environment.',
			logo: { src: './src/assets/logo.svg' },
			favicon: '/favicon.png',
			customCss: ['./src/styles/custom.css'],
			components: {
				SocialIcons: './src/components/SocialIcons.astro',
			},
			head: [
				{
					tag: 'script',
					attrs: {
						src: 'https://stats.snapdragon.cc/script.js',
						'data-website-id': '80a4c095-4270-49b2-ae02-9f9478887c43',
						defer: true,
					},
				},
			],
			routeMiddleware: './src/routeData.ts',
			plugins: [starlightLinksValidator()],
			sidebar: [
				'index',
				{
					label: 'Setup',
					items: [
						{ slug: 'setup', label: 'Choose a Backup Tool' },
						{
							label: 'Borg',
							collapsed: true,
							items: [
								'setup/borg',
								'setup/borg/cli',
								'setup/borg/ssh-keys',
								{ label: 'Desktop', items: ['setup/borg/vorta', 'setup/borg/pika'] },
								{
									label: 'Servers and NAS',
									items: [
										'setup/borg/synology',
										{ label: 'TrueNAS', link: 'https://runby.coffee/backing-up-truenas-with-borg/' },
										'setup/borg/borg-ui',
										'setup/borg/ansible',
									],
								},
								{ label: 'Guides', items: ['setup/borg/databases', 'setup/borg/containers'] },
							],
						},
						'setup/restic',
						{ label: 'Vykar', link: 'https://vykar.borgbase.com/' },
					],
				},
				{
					label: 'Restore',
					collapsed: true,
					items: [
						'restore',
						{
							label: 'Borg',
							collapsed: true,
							items: [
								'restore/borg',
								'restore/borg/cli',
								'restore/borg/mount',
								'restore/borg/borgmatic',
								{ label: 'Restore with Vorta', link: 'https://vorta.borgbase.com/usage/restore/' },
							],
						},
						'restore/restic',
						{ label: 'Vykar', link: 'https://vykar.borgbase.com/' },
					],
				},
				{
					label: 'Repositories',
					items: ['repositories/settings', 'repositories/append-only', 'repositories/import', 'repositories/storage'],
				},
				{
					label: 'Troubleshooting',
					items: ['troubleshooting', 'troubleshooting/connection', 'troubleshooting/performance', 'troubleshooting/repair'],
				},
				{
					label: 'Planning',
					collapsed: true,
					items: [
						{ slug: 'strategy', label: 'Backup Strategy' },
						{ slug: 'verify', label: 'Verification Checklist' },
					],
				},
				{
					label: 'Account',
					items: ['pricing', 'account'],
				},
				'api',
			],
		}),
	],
});
