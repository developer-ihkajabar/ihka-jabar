import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-30',
  modules: ['nitro-cloudflare-dev', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],

  css: ['@/assets/main.css'],

  app: {
    head: {
      title: 'IHKA Jawa Barat',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  nitro: {
    preset: 'cloudflare-pages',
    cloudflareDev: {
      configPath: './wrangler.toml',
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      standalone: false,
      autoInit: true,
    },
  },
})
