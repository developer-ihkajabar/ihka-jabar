<script lang="ts" setup>
const { news } = defineProps<{
  news: News
}>()

const imgSrc = ref<string>()
const { data: region } = await useFetch(`/api/regions/${news.cabangId}`)

async function getImgSrc() {
  const data = await $fetch<string>(`/api/berita/images/${news.id}`, {
    method: 'GET',
    onResponseError: (error) => {
      console.error(error)
    },
  })

  imgSrc.value = data
}

onMounted(() => {
  getImgSrc()
})
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
        <p v-if="news.createdAt" class="text-xs">
          {{ new Date(news.createdAt).toLocaleDateString('id-ID') }}
        </p>
        <h3 class="font-semibold text-xl">
          {{ news.title }}
        </h3>
        <p v-if="region" class="text-xs">
          {{ region.name }}
        </p>
      </div>
      <NuxtLink
        :to="`/berita/${news.id}`"
        class="text-sm text-cobalt-900"
      >
        Selengkapnya <span><Icon name="solar:arrow-right-outline" /></span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>
