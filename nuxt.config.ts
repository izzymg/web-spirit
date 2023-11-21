// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    "nuxt-icon",
    ["@nuxtjs/google-fonts", {
      families: {
        "Noto Sans": [400],
        "PT Mono": [500]
      },
      display: "swap",
      subsets: "cyrillic"
    }]
  ],
})
