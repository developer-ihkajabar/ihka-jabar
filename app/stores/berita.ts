import type { Berita } from '@@/types/Berita'

export const useBeritaStore = defineStore('news', () => {
  // Dependencies =====================================================
  const toast = useToast()

  // State ============================================================
  const beritaList = ref<Berita[]>([])

  // Actions ==========================================================
  const fetchNews = async () => {
    const data = await $fetch<Berita[]>('/api/berita', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
      onResponseError: (error) => {
        toast.add({
          title: 'Gagal mengambil berita',
          description: error.response._data,
        })
      },
    })

    beritaList.value = data
  }

  const fetchAllNews = async () => {
    const data = await $fetch<Berita[]>('/api/berita')
    beritaList.value = data
  }

  const getNewsById = (id: number) => {
    console.log(id)
    const berita = beritaList.value.find(n => n.id === id)
    console.log(berita)
    return berita
  }

  const getBpcNewsById = (id: number) => {
    const berita = beritaList.value.filter(n => n.cabang_id === id)
    return berita
  }

  const createNews = async ({ judul, foto, content }: { judul: string, foto: File, content: string }) => {
    const formData = new FormData()
    formData.append('title', judul)
    formData.append('image', await jpegToPng(foto))
    formData.append('content', content!)

    const data = await $fetch<Berita>('/api/berita', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
      onResponseError: (error) => {
        toast.add({
          title: 'Gagal menambahkan berita',
          color: 'rose',
          description: error.response._data,
        })
      },
    })

    beritaList.value.unshift(data)
  }

  const approveNews = async (id: number) => {
    const token = localStorage.getItem('admin_token')

    await $fetch(`/api/berita/${id}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponseError: (error) => {
        toast.add({
          title: 'Gagal menyetujui berita',
          color: 'rose',
          description: error.response._data,
        })
      },
    })

    beritaList.value = beritaList.value.map((n) => {
      if (n.id === id) {
        n.is_published = true
      }
      return n
    })
  }

  const disapproveNews = async (id: number) => {
    const token = localStorage.getItem('admin_token')

    await $fetch(`/api/berita/${id}/disapprove`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onResponseError: (error) => {
        toast.add({
          title: 'Gagal menolak berita',
          description: error.response._data,
        })
      },
    })
  }

  const deleteNews = async (id: number) => {
    await $fetch(`/api/berita/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
      },
      onResponseError: (error) => {
        toast.add({
          title: 'Gagal menghapus berita',
          description: error.response._data,
        })
      },
    })

    beritaList.value = beritaList.value.filter(n => n.id !== id)
  }

  return { beritaList, createNews, fetchNews, deleteNews, approveNews, disapproveNews, fetchAllNews, getNewsById, getBpcNewsById }
})
