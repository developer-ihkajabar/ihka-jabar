// @ts-check
import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  await antfu({
    stylistic: {
      quotes: 'single',
    },
    rules: {
      'node/prefer-global/buffer': 'off',
    },
  }),
  {
    rules: {
      'vue/no-v-html': 'off',
    },
  },
)
