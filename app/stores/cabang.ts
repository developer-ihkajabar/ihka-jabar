import type { Cabang } from '@@/types/Cabang'
import { defineStore } from 'pinia'

export const useCabangStore = defineStore('Cabang', () => {
  const cabangList = ref<Cabang[]>()

  const fetchCabang = async () => {
    const data = await $fetch<Cabang[]>('/api/cabang')
    cabangList.value = data
  }

  const getCabangById = (id: number) => {
    return cabangList.value?.find(cabang => cabang.id === id)
  }

  return {
    cabangList,
    fetchCabang,
    getCabangById,
  }
})
