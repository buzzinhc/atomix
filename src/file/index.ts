export function downloadFile(data: string | Blob | ArrayBuffer, filename: string, mimeType?: string): void {
  let blob: Blob
  if (data instanceof Blob) {
    blob = data
  } else if (data instanceof ArrayBuffer) {
    blob = new Blob([data], { type: mimeType })
  } else {
    blob = new Blob([data], { type: mimeType || 'application/octet-stream' })
  }
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  if (lastDot <= 0 || lastDot == filename.length - 1) {
    return ''
  }
  return filename.slice(lastDot + 1).toLowerCase()
}

export function formatFileSize(bytes: number): string {
  if (bytes == 0) return '0 B'
  if (bytes < 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  let i = 0
  let size = bytes
  while (size >= k && i < units.length - 1) {
    size /= k
    i++
  }
  if (i == 0) return size.toFixed(0) + ' ' + units[i]
  return size.toFixed(size < 10 && size > 1 ? 2 : 0) + ' ' + units[i]
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(file)
  })
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico']

export function isImage(filename: string): boolean {
  const ext = getFileExtension(filename)
  return IMAGE_EXTENSIONS.includes(ext)
}
