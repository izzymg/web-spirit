// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-icon"],
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000/v1",
    }
  }
})
