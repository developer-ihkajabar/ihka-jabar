export default defineEventHandler(async (event) => {
  const newsId = getRouterParam(event, 'newsId')
  const kv = event.context.cloudflare.env['ihka-jabar-kv']

  const image = await kv.get(`images/news/${newsId}.png`)
  if (!image) {
    setResponseStatus(event, 404, 'Image not found')
    return 'Image not found'
  }
  return `data:image/png;base64,${image}`
})
