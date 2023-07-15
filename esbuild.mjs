import * as esbuild from 'esbuild'

const config = {
  entryPoints: ['./src/index.ts'],
  write: true,
  bundle: true,
  minify: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'build.js',
}

// const buildctx = await esbuild.context(config)

await esbuild.build(config)
