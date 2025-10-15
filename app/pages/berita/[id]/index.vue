<script setup lang="ts">
import type { Berita } from '~~/types/Berita'

definePageMeta({
  name: 'DetailBerita',
})

// Data ========================================================================

const router = useRoute()
const id = Number(router.params.id)
const newsData = ref<Berita>()
const imgSrc = ref<string>('')
const loading = ref<boolean>(true)

// Methods =====================================================================

async function fetchNews() {
  const { getNewsById } = useBeritaStore()
  newsData.value = getNewsById(id)
}

async function getImgSrc() {
  const data = await $fetch<string>(`/api/berita/images/${id}`, {
    method: 'GET',
    onResponseError: (error) => {
      console.error(error)
      console.log(error.error)
    },
  })

  imgSrc.value = data
}

// Lifecycle Hooks =============================================================

onMounted(async () => {
  await fetchNews()
  await getImgSrc()
  loading.value = false
})
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
      <p class="text-lg font-semibold">
        {{ formatDate(newsData?.created_at) }}
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
        v-html="newsData?.content_html"
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
