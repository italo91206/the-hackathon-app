export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  future: {
    compatibilityVersion: 3,
  },

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },

  typescript: {
    strict: true,
    shim: false,
  },

  runtimeConfig: {
    db: {
      client: process.env.DB_CLIENT || 'better-sqlite3',
      connection: process.env.DB_CONNECTION || './db/database.sqlite3',
    },
    public: {},
  },
})
