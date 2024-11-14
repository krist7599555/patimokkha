/*
Bun plugin for Civet files. Simply follow the steps below:

1. Create bunfig.toml if it doesn't exist
2. Add the following line:
preload = ["@danielx/civet/bun-civet"]
3. Get plugin from npm:
bun add -D @danielx/civet

After that, you can use .civet files with the Bun cli, like:
$ bun file.civet
*/

import { plugin, file } from 'bun';
//import { plugin, file, Transpiler } from 'bun'

console.log('REGISTER PLUGIN');
await plugin({
  name: 'Civet loader',
  async setup(builder) {
    // builder.onResolve({ filter: /\.civet$/ }, async ({ path }) => {
    //   console.log('RESOLVE PATH', path);
    //   return {
    //     path
    //   };
    // });
    builder.onLoad({ filter: /\.civet$/ }, async ({ path }) => {
      const { compile } = await import('@danielx/civet');
      console.log('TEST PATH', path);
      const source = await file(path).text();
      // Compiling and running at the same time, so enable comptime
      // to ensure any async promises get resolved
      let contents = await compile(source, {});
      // Transpile directly as workaround to loader spec below not working
      //contents = await transpiler.transform contents

      return {
        contents,
        loader: 'tsx'
      };
    });
  }
});
