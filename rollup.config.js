import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import postcssPrefixer from "postcss-prefixer";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";

const extensions = [".js", ".jsx", ".ts", ".tsx", ".scss"];

process.env.BABEL_ENV = "production";

function setUpRollup({ input, output }) {
  return {
    input,
    exports: "named",
    output,
    watch: {
      include: "*",
      exclude: "node_modules/**",
    },
    plugins: [
      peerDepsExternal(),
      json(),
      resolve({ extensions }),
      commonjs({
        include: /node_modules/,
      }),
      typescript(),
      postcss({
        extract: true,
        modules: true,
        sourceMap: true,
        use: ["sass"],
        plugins: [
          postcssPrefixer({
            prefix: `${pkg.name}__`,
          }),
        ],
      }),
      copy({
        targets: [
            // Need to copy the files over for usage
            { src: "src/assets", dest: "lib" },
        ],
    }),
    ],
    external: ["react", "react-dom"],
  };
}

export default [
  setUpRollup({
    input: "./src/index.ts",
    output: {
      file: "lib/index.js",
      sourcemap: true,
      format: "cjs",
    },
  }),
  setUpRollup({
    input: "./src/index.ts",
    output: {
      file: "lib/index.esm.js",
      sourcemap: true,
      format: "esm",
    },
  }),
  {
    input: 'lib/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
];
