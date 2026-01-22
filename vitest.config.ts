import path from 'path'
import { defineConfig } from 'vitest/config'

const APP_NAME = path.basename(__dirname)
const VERBOSE = process.env.VERBOSE === '1'

export default defineConfig(() => ({
  cacheDir: `/tmp/${APP_NAME}`,
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'bin/**/*.test.ts'],
    exclude: ['node_modules', 'dist', 'tmp'],
    setupFiles: ['./src/setup.ts'],
    reporters: [VERBOSE ? 'verbose' : 'dot'],
    logHeapUsage: false,
    outputFile: undefined,
    silent: false,
    ui: false,
    pool: 'threads',
    threads: {
      singleThread: false,
      useAtomics: true,
    },
    watchExclude: ['**/node_modules/**', '**/dist/**', '**/tmp/**'],
    coverage: {
      enabled: false,
    },
    typecheck: {
      enabled: false,
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    target: 'node18',
  },
}))
