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
			plugins: [starlightLinksValidator()],
			sidebar: [
				'index',
				'strategy',
				{
					label: 'Setup',
					items: [
						'setup',
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
										'setup/borg/ansible',
										'setup/borg/borg-ui',
										'setup/borg/synology',
										'setup/borg/true-nas',
										'setup/borg/containers',
										'setup/borg/databases',
									],
								},
							],
						},
						'setup/restic',
						'setup/import',
					],
				},
				'verify',
				{
					label: 'Restore',
					collapsed: true,
					items: [
						'restore',
						{ label: 'Borg', collapsed: true, items: [{ autogenerate: { directory: 'restore/borg' } }] },
						'restore/restic',
					],
				},
				'pricing',
				'api',
				{ label: 'FAQ', items: [{ autogenerate: { directory: 'faq' } }] },
			],
		}),
	],
});
