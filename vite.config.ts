import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'
import * as path from "path";

export default defineConfig((config) => {

  return {
    build: {
      minify: false,
      lib: {
        entry: ['src/index.ts', 'src/ext'],
        name: 'POEL10N_CORE',
        fileName: (format, entryName) => {
          return (format === "es" ? `${entryName}.js` : `${entryName}.umd.js`)
        },
      },
      rollupOptions: {
        input: {
          'index': path.resolve(__dirname, 'src/index.ts'),
          /**
           * 如果不指定这个入口, Rollup 会自动把它优化掉, 因为没有在 index.ts 中引用
           * 但是在 index 中引用会导致 ext 依赖的 webextension-polyfill 被直接引入
           */
          'ext': path.resolve(__dirname, 'src/ext/index.ts'),
        }
      }
    },
    plugins: [
      dts({
        outputDir: ['dist'],
      })
    ]
  }
})

