import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  future: { compatibilityVersion: 4 },
  modules: ['nitro-cloudflare-dev', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'IHKA Jawa Barat',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  nitro: {
    preset: 'cloudflare-pages',
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  colorMode: {
    preference: 'light',
  },

  // https://eslint.nuxt.com
  eslint: {
    checker: true,
    config: {
      stylistic: {
        quotes: 'single',
      },
      autoInit: true,
    },
  },

})
