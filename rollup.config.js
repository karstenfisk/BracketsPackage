import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/server/index.ts",
    output: {
      dir: "dist/cjs",
      entryFileNames: "server/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
    ],
  },
  {
    input: "src/client/index.ts",
    output: {
      dir: "dist/cjs",
      entryFileNames: "client/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      terser(),
    ],
  },
  {
    input: "src/types.d.ts",
    output: { file: "dist/cjs/types.d.ts", format: "es" },
    plugins: [dts()],
  },
];
