// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000",
      authDomain: "dev-8rnncxho8dwek2nw.au.auth0.com",
      authClientId: "56sc4VOMfyEn52BqU0bbnNuu2iytpnpF",
      authCallback: "http://localhost:3001/login"
    }
  },
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
