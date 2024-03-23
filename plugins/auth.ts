import { createAuth0 } from "@auth0/auth0-vue"


export default defineNuxtPlugin (nuxtApp => {
    let conf = useRuntimeConfig()
    nuxtApp.vueApp.use(createAuth0({
        domain: conf.public.authDomain as string,
        clientId: conf.public.authClientId as string,
        authorizationParams: {
            redirect_uri: conf.public.authCallback,
        }
    }))
})