import { resolve } from 'path'
import { defineConfig } from 'iles'

import iconsResolver from 'unplugin-icons/resolver'

import icons from 'unplugin-icons/vite'
import unocss from '@unocss/vite'
import inspect from 'vite-plugin-inspect'

const resolveUno = (path: string) =>
  resolve(`../../../unocss/packages/${path}/src/index.ts`)

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
    resolve: {
      alias: {
        unocss: resolveUno('unocss'),
        '@unocss/core': resolveUno('core'),
        '@unocss/vite': resolveUno('vite'),
        '@unocss/preset-uno': resolveUno('preset-uno'),
        '@unocss/preset-attributify': resolveUno('preset-attributify'),
        '@unocss/preset-icons': resolveUno('preset-icons'),
        '@unocss': resolve('../../../unocss/packages'),
      },
    },
    plugins: [
      icons({ autoInstall: true }),
      unocss(),
      Boolean(process.env.DEBUG) && inspect(),
    ],
  },
})
