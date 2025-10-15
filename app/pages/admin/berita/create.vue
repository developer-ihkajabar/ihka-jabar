<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import { useBeritaStore } from '@/stores/berita'
import fileToBase64 from '@/utils/fileToBase64'

// Dependencies ==================================================================

const { createNews } = useBeritaStore()
const router = useRouter()
const toast = useToast()

// Data ========================================================================

const editor = useEditor({
  content: '<p>I\'m running Tiptap with Vue.js. 🎉</p>',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'm-5 focus:outline-none',
    },
  },
})

const judulText = ref<string>('')
const fotoRef = ref<HTMLInputElement | null>(null)
const imgSrc = ref<string | null>(null)

// Methods =====================================================================

async function changeFoto() {
  imgSrc.value = await fileToBase64(fotoRef.value!.files![0]!)
}

async function handleCreateNews() {
  const foto = fotoRef.value!.files![0]
  const content = editor.value!.getHTML()
  const judul = judulText.value

  if (!foto) {
    toast.add({
      title: 'Data tidak lengkap',
      description: 'Foto tidak boleh kosong',
      color: 'rose',
    })
    return
  }

  if (!content) {
    toast.add({
      title: 'Data tidak lengkap',
      description: 'Deskripsi tidak boleh kosong',
      color: 'rose',
    })
    return
  }

  await createNews({
    judul,
    content,
    foto,
  })

  return router.go(-1)
}

// Other ===================================================================

onMounted(() => {
})

definePageMeta({
  name: 'BuatBerita',
  layout: 'admin',
})
</script>

<template>
  <div class="space-y-4 p-5">
    <h1 class="text-3xl font-semibold">
      Buat Berita
    </h1>
    <div class="w-1/2">
      <h3 class="text-xl">
        Judul
      </h3>
      <input
        v-model="judulText"
        type="text"
        class="border py-0.5 px-3 border-slate-400 rounded-sm w-full"
        placeholder="Masukkan judul"
      >
    </div>
    <div class="">
      <h3 class="text-xl">
        Foto
      </h3>
      <input
        ref="fotoRef"
        accept=".png, .jpg, .jpeg"
        type="file"
        class="hidden"
        @change="changeFoto"
      >
      <img
        v-if="imgSrc"
        :src="imgSrc"
        class="size-24 object-cover outline-orange-300 rounded-md cursor-pointer"
        @click="() => fotoRef?.click()"
      >
      <div
        v-else
        class="size-24 bg-slate-200 border border-slate-400 rounded-md flex items-center justify-center cursor-pointer"
        @click="() => fotoRef?.click()"
      >
        <span>Pilih Foto</span>
      </div>
    </div>
    <div class="">
      <h3 class="text-xl">
        Deskripsi
      </h3>
      <EditorContent
        :editor="editor"
        class="border rounded-sm"
      />
    </div>
    <div class="flex justify-end">
      <button
        class="bg-orange-400 px-4 py-1 rounded-md"
        @click="handleCreateNews"
      >
        Buat Berita
      </button>
    </div>
  </div>
</template>
