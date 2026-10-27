// Tutte le foto passano da qui: più larghezze in WebP + dimensioni originali (mai ritagliate).
export interface Picture {
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

const modules = import.meta.glob<Picture>('../photos/*.{jpg,jpeg,png}', {
  query: { w: '640;1080;1600;2200', format: 'webp', as: 'picture' },
  import: 'default',
  eager: true,
})

export const photos: Record<string, Picture> = Object.fromEntries(
  Object.entries(modules).map(([path, pic]) => [path.split('/').pop()!.replace(/\.(jpe?g|png)$/i, ''), pic]),
)

export type PhotoName = string

export function getPhoto(name: PhotoName): Picture {
  const p = photos[name]
  if (!p) throw new Error(`Foto mancante: ${name}`)
  return p
}

const ORDER = Object.keys(photos).sort()
// Numero di fotogramma stabile, come su un provino: ADV_001, ADV_002…
export function frameNo(name: PhotoName) {
  return `ADV_${String(ORDER.indexOf(name) + 1).padStart(3, '0')}`
}
