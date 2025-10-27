<script lang="ts" setup>
const router = useRouter()

definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div class="space-y-4 p-5">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">
        Berita
      </h1>
      <div class="flex gap-5 items-center">
        <button
          class="bg-transparent text-xl"
          @click="router.go(0)"
        >
          <Icon name="solar:refresh-bold-duotone" />
        </button>
        <NuxtLink
          :to="{ name: 'BuatBerita' }"
          class="bg-blue-100 border border-blue-500 px-5 py-1 text-slate-700 h-fit rounded-sm flex items-center gap-2"
        >
          <Icon name="solar:pen-2-bold-duotone" />
          Buat Berita
        </NuxtLink>
      </div>
    </div>
    <!-- <div
      v-if="beritaList.length > 0"
      class="w-full grid grid-cols-3 gap-x-8 gap-y-6"
    >
      <AdminBeritaCard
        v-for="newsItem in beritaList"
        :key="newsItem.id"
        :news="newsItem"
        :is-moderator="Boolean(user?.isModerator)"
      />
    </div>
    <div v-else>
      <p class="text-center text-lg text-slate-500">
        Tidak ada berita
      </p>
    </div> -->
  </div>
</template>

<style scoped></style>
