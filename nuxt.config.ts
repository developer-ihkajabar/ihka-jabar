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

  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
    public: {
      // Can be overridden by NUXT_PUBLIC_HELLO_TEXT environment variable
      helloText: 'Hello from the Edge 👋',
    },
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
