import { defineConfig } from 'iles'

import iconsResolver from 'unplugin-icons/resolver'

import icons from 'unplugin-icons/vite'
import unocss from 'unocss/vite'
import inspect from 'vite-plugin-inspect'

export default defineConfig({
  siteUrl: 'https://the-vue-point-with-iles.netlify.app/',
  jsx: 'solid',
  svelte: true,
  components: {
    resolvers: [iconsResolver({ componentPrefix: '' })],
  },
  markdown: {
    rehypePlugins: [
      ['@mapbox/rehype-prism', { alias: { markup: ['html', 'vue'] } }],
    ],
    // Example: Configure all posts to use a different layout without having to
    // add `layout: 'post'` in every file.
    extendFrontmatter (frontmatter, filename) {
      if (filename.includes('/posts/'))
        return { layout: 'post', ...frontmatter }
    },
  },
  vite: {
    plugins: [
      icons({ autoInstall: true }),
      unocss({
        include: [/src\/(components|layouts|pages)/],
      }),
      Boolean(process.env.DEBUG) && inspect(),
    ],
  },
})
