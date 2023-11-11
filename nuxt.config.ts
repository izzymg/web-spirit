// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "nuxt-icon",
    ["@nuxtjs/google-fonts", {
      families: {
        "Noto Sans": [400]
      },
      display: "swap",
      subsets: "cyrillic"
    }]
  ],
  routeRules: {
    "/v1/**": { proxy: { to: "http://localhost:3000/v1/**" } }
  }
})
