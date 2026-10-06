// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

// Static site only: everything is pre-rendered to dist/ at build time.
export default defineConfig({
  site: 'https://kwondu.github.io',
  output: 'static',
  devToolbar: { enabled: false },
  markdown: {
    // Links written in content/*.md open in a new tab too.
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
  },
});
