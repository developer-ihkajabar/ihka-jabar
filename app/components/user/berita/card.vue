<script lang="ts" setup>
import type { Berita } from '~~/types/Berita'

const { news } = defineProps<{
  news: Berita
}>()

const { getCabangById } = useCabangStore()

const imgSrc = ref<string>()
const cabang = news.cabang_id ? getCabangById(news.cabang_id) : null

async function getImgSrc() {
  const data = await $fetch<string>(`/api/berita/images/${news.id}`, {
    method: 'GET',
    onResponseError: (error) => {
      console.error(error)
      console.log(error.error)
    },
  })

  imgSrc.value = data
}

console.log(news)

onMounted(() => {
  getImgSrc()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="rounded-md">
      <img
        :src="imgSrc"
        class="aspect-[2/1] w-full rounded-md object-cover"
      >
    </div>
    <div class="space-y-3">
      <div class="">
        <p class="text-xs">
          17 April 2024
        </p>
        <h3 class="font-semibold text-xl">
          {{ news.title }}
        </h3>
        <p class="text-xs">
          {{ cabang?.name ?? 'IHKA Jawa Barat' }}
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
