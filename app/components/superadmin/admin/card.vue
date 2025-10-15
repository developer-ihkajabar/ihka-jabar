<script lang="ts" setup>
import type { Admin } from '@@/types/Admin'
import type { OnClickOutsideOptions } from '@vueuse/core'
import { vOnClickOutside } from '@vueuse/components'

// Props ========================================================================
const props = defineProps<{ admin: Admin }>()

// Dependencies ================================================================
const adminStore = useAdminStore()
const cabangStore = useCabangStore()

// Data ========================================================================
const buttonMenuRef = ref<HTMLButtonElement | null>(null)
const openMenu = ref(false)

// Methods =====================================================================
function toggleAdminMenu() {
  openMenu.value = !openMenu.value
}

const onClickOutsideHandler: [(ev: unknown) => void, OnClickOutsideOptions] = [
  () => {
    openMenu.value = false
  },
  { ignore: [buttonMenuRef] },
]

async function activateAdmin() {
  await adminStore.activateAdmin(props.admin.id)
  openMenu.value = false
}
async function deactivateAdmin() {
  await adminStore.deactivateAdmin(props.admin.id)
  openMenu.value = false
}
async function deleteAdmin() {
  await adminStore.deleteAdmin(props.admin.id)
  openMenu.value = false
}
</script>

<template>
  <div
    class="min-h-36 transition-all border-(~ slate) relative bg-zinc-50 duration-150 easy-in-out rounded-md w-full flex items-center px-5 py-3 gap-3
    hover:bg-blue-50 hover:scale-[1.015] hover:border-blue-300"
  >
    <div class="flex-(~ col) h-full w-full">
      <div class="flex-1 flex flex-col justify-center">
        <p
          v-if="admin.is_active"
          class="text-xs flex items-center gap-1"
        >
          <Icon
            name="solar:check-square-broken"
            class="text-green-500"
          />Actived
        </p>
        <p
          v-else
          class="text-xs flex items-center gap-1"
        >
          <Icon
            name="solar:close-square-broken"
            class="text-red-500"
          />not yet Actived
        </p>
        <h2 class="text-lg font-semibold capitalize line-clamp-1">
          {{ admin.name }}
        </h2>
        <h2 class="text-xs capitalize">
          {{ admin.is_moderator ? 'Admin + Moderator' : 'Admin' }}
        </h2>
        <h2
          v-if="admin.member_id"
          class="text-sm flex gap-1 items-center mt-2"
        >
          <Icon name="material-symbols:remember-me" />
          {{ admin.member_id }}
        </h2>
        <h2 class="text-sm flex gap-1 items-center mt-2">
          <Icon name="solar:mailbox-line-duotone" />
          {{ admin.email }}
        </h2>
        <h2
          v-if="admin.no_telp"
          class="text-sm flex gap-1 items-center"
        >
          <Icon name="solar:phone-rounded-line-duotone" />
          {{ admin.no_telp }}
        </h2>
        <h2
          v-if="admin.cabang_id"
          class="text-sm flex gap-1 items-center"
        >
          <Icon name="solar:point-on-map-perspective-line-duotone" />
          {{ cabangStore.getCabangById(admin.cabang_id)?.name }}
        </h2>
        <h2
          v-else
          class="text-sm flex gap-1 items-center"
        >
          <Icon name="solar:point-on-map-perspective-bold" />
          Jawa Barat
        </h2>
      </div>
    </div>
    <div class="absolute top-1 right-1">
      <div class="relative">
        <button
          ref="buttonMenuRef"
          class="bg-transparent p-2 rounded-full transition-all duration-150 hover:bg-slate-300"
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
          <button
            v-if="!admin.is_active"
            class="bg-green-100 px-6 py-1 rounded border-(~ green-500)"
            @click="activateAdmin"
          >
            Activate
          </button>
          <button
            v-else
            class="bg-orange-100 px-6 py-1 rounded border-(~ orange-500)"
            @click="deactivateAdmin"
          >
            Deactivate
          </button>
          <button
            class="bg-red-50 px-6 py-1 rounded border-(~ red-400)"
            @click="deleteAdmin"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
