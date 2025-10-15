<script lang="ts" setup>
import type { Berita } from '~~/types/Berita'
import { formatDate } from '#imports'

const { berita } = defineProps<{
  berita: Berita
}>()

const imgSrc = ref<string>('')

async function getImgSrc() {
  const data = await $fetch<string>(`/api/berita/images/${berita.id}`, {
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
  <div
    class="flex flex-col gap-3 lg:gap-8 px-4 md:flex-row md:px-0"
  >
    <div class="w-full px-0 lg:w-5/12 lg:px-6">
      <div class="aspect-2/1 w-full bg-slate-300 rounded-md overflow-hidden">
        <img
          :src="imgSrc"
          class="w-full h-full object-cover"
          alt=""
        >
      </div>
    </div>
    <div class="flex w-full flex-col gap-3 lg:w-7/12">
      <h3 class="text-3xl font-semibold lg:text-4xl">
        {{ berita.title }}
      </h3>
      <span class="font-semibold lg:font-normal">
        {{ formatDate(berita.created_at! as unknown as string) }}
      </span>
      <div
        class="contentHtml"
        v-html="berita.content_html"
      />
      <NuxtLink
        :to="{ name: 'DetailBerita', params: { id: berita.id } }"
        class="font-semibold flex items-center gap-2"
      >
        Selengkapnya
        <Icon name="solar:arrow-right-linear" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
