<script lang="ts" setup>
const { news } = defineProps<{
  news: News
}>()

const imgSrc = ref('')

// this is temporary solution due to previous implementation
async function getImgSrc() {
  if (!news.imageUrl)
    return
  const data = await $fetch<string>(news.imageUrl)

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
          v-if="imgSrc"
          :src="imgSrc"
          class="w-full h-full object-cover"
          alt=""
        >
      </div>
    </div>
    <div class="flex w-full flex-col gap-3 lg:w-7/12">
      <h3 class="text-3xl font-semibold lg:text-4xl">
        {{ news.title }}
      </h3>
      <span v-if="news.createdAt" class="font-semibold lg:font-normal">
        {{ formatDate(news.createdAt) }}
      </span>
      <div
        class="contentHtml"
        v-html="news.contentHtml"
      />
      <NuxtLink
        :to="{ name: 'news-newsId', params: { newsId: news.id } }"
        class="font-semibold flex items-center gap-2"
      >
        Selengkapnya
        <Icon name="solar:arrow-right-linear" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
