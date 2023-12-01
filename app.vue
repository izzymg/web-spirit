<script>
import '~/assets/global.css'
</script>

<template>
  <div>
    <SpiritMessage />
    <main>
      <div class="layout">
        <SpiritHeader />
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<style>
main {
  margin: 1em 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.layout {
  width: min(950px, 98vw);
}
</style>