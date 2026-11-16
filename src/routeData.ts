import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

// build.format 'file' makes Starlight emit .html canonicals; Cloudflare Pages serves extensionless URLs.
const stripHtml = (href: string) => href.replace(/(\/index)?\.html$/, (_, index) => (index ? '/' : ''));

export const onRequest = defineRouteMiddleware((context) => {
	for (const { tag, attrs } of context.locals.starlightRoute.head) {
		if (!attrs) continue;
		if (tag === 'link' && attrs.rel === 'canonical' && typeof attrs.href === 'string') {
			attrs.href = stripHtml(attrs.href);
		} else if (tag === 'meta' && attrs.property === 'og:url' && typeof attrs.content === 'string') {
			attrs.content = stripHtml(attrs.content);
		}
	}
});
