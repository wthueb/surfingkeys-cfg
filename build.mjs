import esbuild from 'esbuild';
import { readFile } from 'fs/promises';
import { minifyHTMLLiteralsPlugin } from 'esbuild-plugin-minify-html-literals';

/** @type {import('esbuild').Plugin} */
const loadAndMinifyCss = {
  name: 'load-minify-css',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const f = await readFile(args.path);
      const css = await esbuild.transform(f, { loader: 'css', minify: true });
      return { loader: 'text', contents: css.code };
    });
  },
};

await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'surfingkeys.js',
  bundle: true,
  minify: true,
  plugins: [
    loadAndMinifyCss,
    minifyHTMLLiteralsPlugin({
      minifyOptions: {
        // can't use this since the css template strings aren't properly
        // structured css (there are no selectors/blocks)
        minifyCSS: false,
      },
    }),
  ],
});
