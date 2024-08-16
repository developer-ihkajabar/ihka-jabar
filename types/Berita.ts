export interface Berita {
  id: number
  title: string
  content_html: string
  is_published: number
  admin_id: number
  cabang_id: number | null
  approved_by: number | null
  created_at: Date | null
}
