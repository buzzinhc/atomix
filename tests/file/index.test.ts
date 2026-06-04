import { describe, it, expect } from 'vitest'
import {
  downloadFile,
  getFileExtension,
  formatFileSize,
  readFileAsText,
  readFileAsDataURL,
  isImage,
} from '../../src/file'

describe('getFileExtension', () => {
  it('should return extension without dot', () => {
    expect(getFileExtension('photo.png')).toBe('png')
    expect(getFileExtension('image.jpg')).toBe('jpg')
    expect(getFileExtension('file.jpeg')).toBe('jpeg')
  })

  it('should handle multiple dots', () => {
    expect(getFileExtension('my.photo.png')).toBe('png')
    expect(getFileExtension('archive.tar.gz')).toBe('gz')
  })

  it('should return lowercase extension', () => {
    expect(getFileExtension('photo.PNG')).toBe('png')
    expect(getFileExtension('image.JPEG')).toBe('jpeg')
  })

  it('should return empty string for no extension', () => {
    expect(getFileExtension('filename')).toBe('')
    expect(getFileExtension('noextensionhere')).toBe('')
  })

  it('should return empty string for dot at end', () => {
    expect(getFileExtension('filename.')).toBe('')
    expect(getFileExtension('photo.png.')).toBe('')
  })

  it('should handle hidden files', () => {
    expect(getFileExtension('.gitignore')).toBe('')
    expect(getFileExtension('.env.example')).toBe('example')
  })
})

describe('formatFileSize', () => {
  it('should format bytes', () => {
    expect(formatFileSize(0)).toBe('0 B')
    expect(formatFileSize(500)).toBe('500 B')
    expect(formatFileSize(1023)).toBe('1023 B')
  })

  it('should format kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1 KB')
    expect(formatFileSize(1536)).toBe('1.50 KB')
    expect(formatFileSize(10240)).toBe('10 KB')
  })

  it('should format megabytes', () => {
    expect(formatFileSize(1048576)).toBe('1 MB')
    expect(formatFileSize(1572864)).toBe('1.50 MB')
    expect(formatFileSize(10485760)).toBe('10 MB')
  })

  it('should format gigabytes', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB')
    expect(formatFileSize(1610612736)).toBe('1.50 GB')
  })

  it('should format terabytes', () => {
    expect(formatFileSize(1099511627776)).toBe('1 TB')
  })

  it('should handle negative bytes', () => {
    expect(formatFileSize(-100)).toBe('0 B')
  })
})

describe('isImage', () => {
  it('should return true for image extensions', () => {
    expect(isImage('photo.jpg')).toBe(true)
    expect(isImage('photo.jpeg')).toBe(true)
    expect(isImage('photo.png')).toBe(true)
    expect(isImage('photo.gif')).toBe(true)
    expect(isImage('photo.webp')).toBe(true)
    expect(isImage('photo.svg')).toBe(true)
    expect(isImage('photo.bmp')).toBe(true)
    expect(isImage('photo.ico')).toBe(true)
  })

  it('should return true for uppercase extensions', () => {
    expect(isImage('photo.JPG')).toBe(true)
    expect(isImage('photo.PNG')).toBe(true)
    expect(isImage('photo.GIF')).toBe(true)
  })

  it('should return false for non-image files', () => {
    expect(isImage('document.pdf')).toBe(false)
    expect(isImage('video.mp4')).toBe(false)
    expect(isImage('audio.mp3')).toBe(false)
    expect(isImage('archive.zip')).toBe(false)
    expect(isImage('script.js')).toBe(false)
  })

  it('should return false for files without extension', () => {
    expect(isImage('filename')).toBe(false)
    expect(isImage('README')).toBe(false)
  })

  it('should handle files with path', () => {
    expect(isImage('/path/to/photo.jpg')).toBe(true)
    expect(isImage('C:\\Users\\photo.png')).toBe(true)
  })
})

describe.skip('downloadFile', () => {
  it('should create download link for string data', () => {
    downloadFile('hello world', 'test.txt', 'text/plain')
  })

  it('should handle Blob data', () => {
    const blob = new Blob(['test content'], { type: 'text/plain' })
    downloadFile(blob, 'test.txt')
  })

  it('should handle ArrayBuffer data', () => {
    const buffer = new ArrayBuffer(8)
    downloadFile(buffer, 'test.bin')
  })
})

describe.skip('readFileAsText', () => {
  it('should read file as text', async () => {
    const file = new File(['hello world'], 'test.txt', { type: 'text/plain' })
    const result = await readFileAsText(file)
    expect(result).toBe('hello world')
  })
})

describe.skip('readFileAsDataURL', () => {
  it('should read file as data URL', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    const result = await readFileAsDataURL(file)
    expect(result).toMatch(/^data:text\/plain;base64,/)
  })
})
