<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { data: regions } = await useFetch('/api/regions')

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Beranda',
    to: '/',
    active: route.name === 'index',
  },
  {
    label: 'Tentang',
    to: '/about',
    active: route.name === 'about',
  },
  {
    label: 'Program',
    to: '/programs',
    active: route.name === 'programs',
  },
  {
    label: 'Berita',
    to: '/news',
    active: route.name === 'news',
  },
  {
    label: 'BPC',
    tooltip: {
      text: 'Badan Pimpinan Cabang',
    },
    children: regions.value?.map(r => ({
      label: r.name,
      to: `/news/regions/${r.id}`,
    })),
  },
])
</script>

<template>
  <UHeader class="h-18 border-0">
    <template #title>
      <div class="h-16 flex items-center gap-3">
        <img
          src="/img/logo.png"
          class="h-3/4 w-full object-contain"
        >
        <div class="hidden md:flex flex-col text-cobalt-900">
          <span class="font-times text-xl xl:text-2xl font-bold">IHKA</span>
          <span class="font-times text-base xl:text-md font-bold text-nowrap">BPD Jawa Barat</span>
        </div>
      </div>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        :ui="{
          link: 'text-base',
        }"
      />
      <UTooltip text="Login ke dashboard admin">
        <UButton block>
          Login
        </UButton>
      </UTooltip>
    </template>
  </UHeader>
</template>
