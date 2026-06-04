import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      outDir: 'dist',
      cleanVueFileName: true,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        type: resolve(__dirname, 'src/type/index.ts'),
        string: resolve(__dirname, 'src/string/index.ts'),
        array: resolve(__dirname, 'src/array/index.ts'),
        object: resolve(__dirname, 'src/object/index.ts'),
        number: resolve(__dirname, 'src/number/index.ts'),
        date: resolve(__dirname, 'src/date/index.ts'),
        browser: resolve(__dirname, 'src/browser/index.ts'),
        url: resolve(__dirname, 'src/url/index.ts'),
        validate: resolve(__dirname, 'src/validate/index.ts'),
        file: resolve(__dirname, 'src/file/index.ts'),
        math: resolve(__dirname, 'src/math/index.ts'),
        color: resolve(__dirname, 'src/color/index.ts'),
        fp: resolve(__dirname, 'src/fp/index.ts'),
      },
      name: 'FeUtils',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          if (format === 'es') return 'index.mjs'
          if (format === 'cjs') return 'index.cjs'
          return 'index.umd.js'
        }
        if (format === 'es') return `${entryName}/index.mjs`
        if (format === 'cjs') return `${entryName}/index.cjs`
        return `${entryName}/index.umd.js`
      },
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
})
