<script>
import '~/assets/global.css'
</script>

<script setup>
const runtimeConfig = useRuntimeConfig()
const { data, err } = useFetch(`${runtimeConfig.public.apiBase}/`)
</script>

<template>
  <div>
    <h1>spirit</h1>
    <SpiritMessage v-if="err" is-error :message={err} />
    <div v-else>
      {{ data }}
    </div>
  </div>

</template>

