<script setup lang="ts">
import type { Berita } from '~~/types/Berita'
import type { Cabang } from '~~/types/Cabang'

const { getBpcNewsById } = useBeritaStore()
const { getCabangById } = useCabangStore()
const route = useRoute()

const id = Number(route.params.id)

definePageMeta({
  name: 'BeritaCabang',
})

const beritaCabangList = ref<Berita[]>()
const cabang = ref<Cabang>()

const getBeritaCabangList = async () => {
  beritaCabangList.value = getBpcNewsById(id).filter(b => b.is_published === 1)
}

const getCabang = async () => {
  cabang.value = getCabangById(id)
  console.log(cabang.value)
}

onMounted(async () => {
  await getBeritaCabangList()
  await getCabang()
})
</script>

<template>
  <main class="">
    <div class="px-4 py-12 lg:px-10">
      <h1 class="text-5xl font-semibold lg:text-6xl">
        Berita Terkini Cabang {{ cabang?.name }}
      </h1>
      <div class="mt-8 flex flex-col gap-20 lg:gap-10 px-1 lg:px-3">
        <template v-if="beritaCabangList && beritaCabangList?.length > 0">
          <UserBeritaCard2
            v-for="berita in beritaCabangList"
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
