<script lang="ts" setup>
const router = useRouter()
const { data: regions } = await useFetch('/api/regions')

definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="h-screen flex bg-cobalt-900 px-6 py-8 text-white">
    <div class="flex flex-col gap-2">
      <NuxtLink
        :to="{ name: 'index' }"
        class="align-bottom"
      >
        Beranda
      </NuxtLink>
      <NuxtLink :to="{ name: 'about' }">
        Tentang
      </NuxtLink>
      <NuxtLink :to="{ name: 'programs' }">
        Program
      </NuxtLink>
      <NuxtLink :to="{ name: 'news' }">
        Berita
      </NuxtLink>
      <div class="group relative items-center gap-1">
        BPC
        <nav
          class="flex flex-col gap-0.5 rounded-md px-2 py-2 *:text-nowrap"
        >
          <NuxtLink
            v-for="region in regions"
            :key="region.id"
            :to="{ name: 'news-regions-regionId', params: { regionId: region.id } }"
            class="rounded-md pl-4 pr-10 hover:bg-sky-200 cursor-pointer"
          >
            {{ region.name }}
          </NuxtLink>
        </nav>
      </div>
    </div>
    <button
      class="text-white absolute top-4 right-4"
      @click="router.go(-1)"
    >
      <Icon
        name="material-symbols:close-rounded"
        class="text-3xl"
      />
    </button>
  </div>
</template>

<style scoped>

</style>
