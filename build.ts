// import type { BuildConfig } from 'bun'
// import dts from 'bun-plugin-dts'

// const defaultBuildConfig: BuildConfig = {
//   entrypoints: ['./src/index.ts', './src/languages/index.ts', './src/styles/index.ts'],
//   outdir: './dist'
// }

// await Promise.all([
//   // Build JavaScript files
//   Bun.build({
//     ...defaultBuildConfig,
//     format: 'esm',
//     naming: "[dir]/[name].js",
//     minify: true
//   }),

//   // Build type declarations for src/index.ts
//   Bun.build({
//     entrypoints: ['./src/index.ts'],
//     outdir: './dist',
//     plugins: [dts()],
//     format: 'esm'
//   }),

//   // Build type declarations for src/languages/index.ts
//   Bun.build({
//     entrypoints: ['./src/languages/index.ts'],
//     outdir: './dist',
//     plugins: [dts()],
//     format: 'esm'
//   }),

//   // Build type declarations for src/styles/index.ts
//   Bun.build({
//     entrypoints: ['./src/styles/index.ts'],
//     outdir: './dist',
//     plugins: [dts()],
//     format: 'esm'
//   }),
// ])

import type { BuildConfig } from 'bun'
import dts from 'bun-plugin-dts'

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.ts', './src/languages/index.ts', './src/styles/index.ts'],
  outdir: './dist'
}

await Promise.all([
  // Build JavaScript files
  Bun.build({
    ...defaultBuildConfig,
    format: 'esm',
    naming: "[dir]/[name].js",
  }),

  // Build type declarations
  Bun.build({
    entrypoints: ["./src/index.ts"],
    plugins: [dts()],
    format: 'esm',
    naming: "[dir]/[name].js"
  }),

  Bun.build({
    entrypoints: ["./src/languages/index.ts", "./src/styles/index.ts"],
    plugins: [dts()],
    format: 'esm',
    naming: "[dir]/[name].js"
  }),
])