type Program = {
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
  // {
  //   id: 1,
  //   title: 'Pelatihan Dasar HouseKeeping',
  //   shortDescription: 'Pengetahuan dasar tentang prinsip-prinsip kebersihan dan sanitasi.',
  //   imgSrc: '/img/program1.png',
  //   LongDescription: 'fadsf',
  //   subTitle: 'Untuk meningkatkan pengetahuan tentang dasar housekeeping, terdapat beberapa pelatihan yang dilakukan.',
  //   explanation: [
  //     {
  //       id: 1,
  //       title: 'Pembelajaran Teori',
  //       description: 'Peserta akan diajarkan konsep-konsep dasar housekeeping, seperti prinsip-prinsip kebersihan, jenis-jenis produk pembersih, standar kebersihan, dan pentingnya tata letak ruangan.',
  //       imgSrc: '/img/oiufaaoidsfdf.png',
  //     },
  //     {
  //       id: 2,
  //       title: 'Demonstrasi Peralatan dan Teknik',
  //       description: 'Instruktur akan melakukan demonstrasi tentang cara menggunakan peralatan housekeeping seperti vakum, pembersih lantai, dan peralatan pembersih lainnya. Mereka juga akan menunjukkan teknik-teknik pembersihan yang efektif untuk berbagai jenis permukaan.',
  //       imgSrc: '/img/oiufaaoidsfdf.png',
  //     },
  //   ],
  // },
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
