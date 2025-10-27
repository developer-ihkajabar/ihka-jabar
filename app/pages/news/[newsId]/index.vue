<script setup lang="ts">
const route = useRoute('news-newsId')
const imgSrc = ref<string>('')
const loading = ref<boolean>(true)

const { data: newsData } = await useFetch(`/api/news/${route.params.newsId}`)
</script>

<template>
  <main
    v-if="!loading"
    class=""
  >
    <div class="px-4 lg:px-20 py-12">
      <h1 class="text-4xl lg:text-5xl font-semibold">
        {{ newsData?.title }}
      </h1>
      <p v-if="newsData?.createdAt" class="text-lg font-semibold">
        {{ formatDate(newsData?.createdAt) }}
      </p>
    </div>
    <div class="px-6 lg:px-20">
      <div class="mx-auto aspect-video w-full lg:w-176">
        <div class="aspect-2/1 w-full bg-slate-300 rounded-md overflow-hidden">
          <img
            :src="imgSrc"
            class="w-full h-full object-cover"
            alt=""
          >
        </div>
      </div>
      <div
        class="space-y-6 py-16 contentHtml"
        v-html="newsData?.contentHtml"
      />
    </div>
  </main>
  <main v-else>
    <div class="flex justify-center items-center h-[80vh]">
      <Icon
        name="tdesign/loading"
        class="w-10 h-10 text-blue-500 animate-spin"
      />
      <p>Loading ...</p>
    </div>
  </main>
</template>

<style scoped>
.contentHtml p {
  text-align: justify;
}
</style>
