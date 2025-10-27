<script lang="ts" setup>

</script>

<template>
  <div
    class="flex h-screen overflow-hidden"
  >
    <AdminSide class="w-2/12 peer hover:shadow-2xl top-0 transition-all duration-300 hover:bg-white rounded-2xl" />
    <div class="w-10/12 peer-hover:shadow shadow-xl transition-all duration-300">
      <div class="overflow-y-scroll h-screen px-10 py-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
