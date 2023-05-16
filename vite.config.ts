import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts'],
      name: 'POEL10N_CORE',
      formats: ['es', 'umd'],
    }
  },
  plugins: [
    dts({
      outputDir: ['dist'],
    })
  ]
})

