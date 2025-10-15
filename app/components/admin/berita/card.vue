<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import type { OnClickOutsideOptions } from '@vueuse/core'
import type { Berita } from '@@/types/Berita'
import { useBeritaStore } from '@/stores/berita'

// Props ========================================================================
const props = defineProps<{
  news: Berita
  isModerator?: boolean
}>()

// Dependencies ================================================================
const newsStore = useBeritaStore()

// Data ========================================================================
const buttonMenuRef = ref<HTMLButtonElement | null>(null)
const openMenu = ref(false)
const imgSrc = ref<string>()

// Functions ===================================================================

async function getImgSrc() {
  const data = await $fetch<string>(`/api/berita/images/${props.news.id}`, {
    method: 'GET',
    onResponseError: (error) => {
      console.error(error)
      console.log(error.error)
    },
  })

  imgSrc.value = data
}

function toggleAdminMenu() {
  openMenu.value = !openMenu.value
}

const onClickOutsideHandler: [(ev: unknown) => void, OnClickOutsideOptions] = [
  () => {
    openMenu.value = false
  },
  { ignore: [buttonMenuRef] },
]

async function handleDeleteNews() {
  await newsStore.deleteNews(props.news.id)
  openMenu.value = false
}

async function handleApproveNews() {
  await newsStore.approveNews(props.news.id)
  openMenu.value = false
}

async function handleDisapproveNews() {
  await newsStore.disapproveNews(props.news.id)
  openMenu.value = false
}

onMounted(async () => {
  await getImgSrc()
})
</script>

<template>
  <div
    class="h-36 transition-all border border-slate-300 relative bg-zinc-50 duration-150 easy-in-out rounded-md w-full flex items-center px-3 py-3 gap-3 hover:bg-blue-50 hover:scale-[1.015] hover:border-blue-300"
  >
    <div class="h-full aspect-square rounded-md">
      <img
        :src="imgSrc"
        class="h-full w-full rounded-md object-cover"
      >
      <!-- <UseImage :src='imgSrc' v-if="imgSrc" class="h-full w-full rounded-md object-cover">
        <template #loading>
          Loading..
        </template>

        <template #error>
          Failed
        </template>
      </UseImage> -->
    </div>
    <div class="flex flex-col h-full w-full">
      <div class="flex-1 flex flex-col justify-center">
        <p
          v-if="news.is_published"
          class="text-xs flex items-center gap-1"
        >
          <Icon
            name="solar:check-square-broken"
            class="text-green-500"
          />Approved
        </p>
        <p
          v-else
          class="text-xs flex items-center gap-1"
        >
          <Icon
            name="solar:close-square-broken"
            class="text-red-500"
          />Not yet approved
        </p>
        <h2 class="text-lg line-clamp-3">
          {{ news.title }}
        </h2>
        <div class="text-xs mt-2">
          <h3 class="font-semibold">
            Description:
          </h3>
          <p
            class="line-clamp-2"
            v-html="news.content_html"
          />
        </div>
      </div>
    </div>
    <div class="absolute top-1 right-1">
      <div class="relative">
        <button
          ref="buttonMenuRef"
          class="w-8 flex items-center justify-center rounded-lg aspect-square transition-all duration-150 hover:bg-slate-300"
          @click="toggleAdminMenu"
        >
          <Icon
            name="solar:menu-dots-bold-duotone"
            class=""
          />
        </button>
        <div
          v-show="openMenu"
          v-on-click-outside="onClickOutsideHandler"
          class="text-sm h-fit flex flex-col justify-end gap-2 absolute top-[103%] right-1 bg-white px-3 py-2 border rounded-lg"
        >
          <template v-if="isModerator">
            <button
              v-if="news.is_published"
              class="bg-orange-50 px-2 rounded border border-orange-400"
              @click="handleDisapproveNews"
            >
              Disapprove
            </button>
            <button
              v-else
              class="bg-green-50 px-2 rounded border border-green-400"
              @click="handleApproveNews"
            >
              Approve
            </button>
          </template>
          <button
            class="bg-red-50 px-2 rounded border border-red-400"
            @click="handleDeleteNews"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
