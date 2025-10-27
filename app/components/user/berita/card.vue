<script lang="ts" setup>
const { news } = defineProps<{
  news: News
}>()

const imgSrc = ref<string>()
const { data: region } = await useFetch(`/api/regions/${news.cabangId}`)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="rounded-md">
      <img
        :src="imgSrc"
        class="aspect-2/1 w-full rounded-md object-cover"
      >
    </div>
    <div class="space-y-3">
      <div class="">
        <p v-if="news.createdAt" class="text-xs text-cobalt-900">
          {{ new Date(news.createdAt).toLocaleDateString('id-ID') }}
        </p>
        <h3 class="font-semibold text-xl text-cobalt-900">
          {{ news.title }}
        </h3>
        <p v-if="region" class="text-xs">
          {{ region.name }}
        </p>
      </div>
      <NuxtLink
        :to="`/news/${news.id}`"
        class="text-sm text-cobalt-900"
      >
        Selengkapnya <span><Icon name="solar:arrow-right-outline" /></span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
