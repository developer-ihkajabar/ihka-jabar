<script lang="ts" setup>
import type { Berita } from '~~/types/Berita'

const { news: { id: beritaId, cabang_id, title } } = defineProps<{
  news: Berita
}>()

const { getCabangById } = useCabangStore()

const imgSrc = ref<string>()
const cabang = cabang_id ? getCabangById(cabang_id) : null

async function getImgSrc() {
  const data = await $fetch<string>(`/api/berita/images/${beritaId}`, {
    method: 'GET',
    onResponseError: (error) => {
      console.error(error)
      console.log(error.error)
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
        class="aspect-[2/1] w-full rounded-md object-cover"
      >
    </div>
    <div class="space-y-3">
      <div class="">
        <p class="text-xs">
          17 April 2024
        </p>
        <h3 class="text-base font-semibold">
          {{ title }}
        </h3>
        <p class="text-xs">
          {{ cabang?.name ? cabang.name : 'IHKA Jawa Barat' }}
        </p>
      </div>
      <button class="text-sm">
        Selengkapnya <span><Icon name="solar:arrow-right-outline" /></span>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
