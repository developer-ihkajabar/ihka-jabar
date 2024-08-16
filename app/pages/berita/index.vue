<script setup lang="ts">
const { beritaList } = storeToRefs(useBeritaStore())

const beritaDaerahList = computed(() => {
  return beritaList.value.filter(berita => berita.cabang_id == null && berita.is_published === 1)
})

definePageMeta({
  name: 'BeritaDaerah',
})
</script>

<template>
  <main class="">
    <div class="px-4 py-12 lg:px-10">
      <h1 class="text-5xl font-semibold lg:text-6xl">
        Berita Terkini
      </h1>
      <div class="mt-8 flex flex-col gap-20 lg:gap-10 px-1 lg:px-3">
        <template v-if="beritaDaerahList.length > 0">
          <UserBeritaCard2
            v-for="berita in beritaDaerahList"
            :key="berita.id"
            :berita="berita"
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

<style scoped lang="css">
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
