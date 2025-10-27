<script setup lang="ts">
const route = useRoute('news-regions-regionId')

const { data: beritaCabangList } = await useFetch(`/api/news`, {
  query: {
    regencyId: route.params.regionId,
  },
})

const { data: regency } = await useFetch(`/api/regions/${route.params.regionId}`)
</script>

<template>
  <main class="">
    <div class="px-4 py-12 lg:px-10">
      <h1 class="text-5xl font-semibold lg:text-6xl">
        Berita Terkini Cabang {{ regency?.name }}
      </h1>
      <div class="mt-8 flex flex-col gap-20 lg:gap-10 px-1 lg:px-3">
        <template v-if="beritaCabangList && beritaCabangList?.length > 0">
          <UserBeritaCard2
            v-for="berita in beritaCabangList"
            :key="berita.id"
            :news="berita"
          />
        </template>
        <template v-else>
          <p class="text-lg font-semibold">
            Belum ada berita
          </p>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contentHtml:first-child {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.contentHtml>*:not(:first-child) {
  display: none;
}
</style>
