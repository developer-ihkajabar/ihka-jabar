export interface Program {
  id: number
  title: string
  shortDescription: string
  imgSrc: string
  LongDescription: string
  subTitle: string
  explanation: {
    id: number
    title: string
    description: string
    imgSrc: string
  }[]
}

const program = [
  {
    id: 1,
    title: 'Pelatihan Dasar HouseKeeping',
    shortDescription: 'Pengetahuan dasar tentang prinsip-prinsip kebersihan dan sanitasi.',
    imgSrc: '/img/program1.png',
  },
  {
    id: 2,
    title: 'Pelatihan Manajerial',
    shortDescription: 'Pelatihan manajemen waktu dan manajemen sumber daya untuk meningkatkan produktivitas.',
    imgSrc: '/img/program2.png',
  },
  {
    id: 3,
    title: 'Pelatihan Keterampilan Khusus',
    shortDescription: 'Pelatihan dalam teknik-teknik khusus seperti tata cara membersihkan kamar hotel, area publik, atau fasilitas lainnya.',
    imgSrc: '/img/program3.png',
  },
]
// ] satisfies Program[]

export default program
