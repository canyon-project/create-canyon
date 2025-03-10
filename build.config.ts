// import path from 'node:path'
// import url from 'node:url'
import { defineBuildConfig } from 'unbuild'
// import licensePlugin from '../vite/rollupLicensePlugin'

// const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineBuildConfig({
  entries: ['src/index'],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      target: 'node18',
      minify: true,
    },
  }
})