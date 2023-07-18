import * as esbuild from 'esbuild'

const config = {
  entryPoints: ['./src/index.ts'],
  write: true,
  bundle: false,
  minify: true,
  outfile: './dist/index.js',
}

// const buildctx = await esbuild.context(config)

await esbuild.build(config)
