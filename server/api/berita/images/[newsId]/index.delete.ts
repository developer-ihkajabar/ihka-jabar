export default defineEventHandler(async (event) => {
  const newsId = getRouterParam(event, 'newsId')
  const isJpg = await useStorage('fs').hasItem(`news/${newsId}.jpg`)
  const isPng = await useStorage('fs').hasItem(`news/${newsId}.png`)
  const isWebp = await useStorage('fs').hasItem(`news/${newsId}.webp`)
  const isJpeg = await useStorage('fs').hasItem(`news/${newsId}.jpeg`)
  switch (true) {
    case isJpg:
      return useStorage('fs').removeItem(`news/${newsId}.jpg`)
    case isPng:
      return useStorage('fs').removeItem(`news/${newsId}.png`)
    case isWebp:
      return useStorage('fs').removeItem(`news/${newsId}.webp`)
    case isJpeg:
      return useStorage('fs').removeItem(`news/${newsId}.jpeg`)

    default:
      return new Response(null, { status: 404 })
  }
})
