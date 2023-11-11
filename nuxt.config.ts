// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "nuxt-icon",
  ],
  routeRules: {
    "/v1/**": { proxy: { to: "http://localhost:3000/v1/**" } }
  }
})
