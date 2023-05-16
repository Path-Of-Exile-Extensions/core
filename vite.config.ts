import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      name: 'POEL10N_CORE',
      fileName: (format) => (format === "es" ? "index.js" : "index.umd.js"),
    }
  },
  plugins: [
    dts({
      outputDir: ['dist'],
    })
  ]
})

