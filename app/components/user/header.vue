<script setup lang="ts">
const { cabangList } = storeToRefs(useCabangStore())

const cabangList2 = computed(() => cabangList.value?.sort((a, b) => a.id - b.id))
</script>

<template>
  <header class="flex h-20 xl:h-24 items-center justify-between bg-white px-5 xl:px-10">
    <div class="flex h-full items-center gap-3">
      <div class="h-[50%] xl:h-[70%]">
        <img
          src="/img/logo.png"
          class="h-full w-full object-cover"
        >
      </div>
      <div class="hidden md:flex flex-col text-cobalt-900">
        <span class="font-times text-xl xl:text-4xl font-bold">IHKA</span>
        <span class="font-times text-base xl:text-xl font-bold">BPD Jawa Barat</span>
      </div>
    </div>
    <nav class="hidden md:flex h-full items-center gap-10 text-lg font-semibold text-cobalt-900 *:flex *:h-full *:items-center">
      <NuxtLink
        :to="{ name: 'Beranda' }"
        class="align-bottom"
      >
        Beranda
      </NuxtLink>
      <NuxtLink :to="{ name: 'About' }">
        Tentang
      </NuxtLink>
      <NuxtLink :to="{ name: 'Program' }">
        Program
      </NuxtLink>
      <NuxtLink :to="{ name: 'BeritaDaerah' }">
        Berita
      </NuxtLink>
      <div class="group relative flex items-center gap-1">
        BPC
        <Icon
          name="solar:alt-arrow-down-bold"
          class="text-sm"
        />
        <nav
          class="absolute left-[30%] top-[85%] z-20 hidden translate-x-[-50%] flex-col gap-0.5 rounded-md bg-sky-100 px-2 py-2 *:text-nowrap group-hover:flex"
        >
          <NuxtLink
            v-for="cabang in cabangList2"
            :key="cabang.id"
            :to="{ name: 'BeritaCabang', params: { id: cabang.id } }"
            class="rounded-md pl-4 pr-10 hover:bg-sky-200 cursor-pointer"
          >
            {{ cabang.name }}
          </NuxtLink>
        </nav>
      </div>
      <NuxtLink
        :to="{ name: 'AdminLogin' }"
        class="h-fit! rounded-full bg-cobalt-900 text-white px-6 py-1"
      >
        Sign In
      </NuxtLink>
    </nav>
    <NuxtLink
      :to="{ name: 'MobileNavigation' }"
      type="button"
      class="block md:hidden"
    >
      <Icon
        name="solar:hamburger-menu-linear"
        class="text-black text-2xl"
      />
    </NuxtLink>
  </header>
</template>
