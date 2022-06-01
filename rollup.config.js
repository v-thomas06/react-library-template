import { terser } from "rollup-plugin-terser";
import { readFileSync } from "fs";
import packageJson from "./package.json";
import swc from "rollup-plugin-swc3";
import dts from "rollup-plugin-dts";

const swcConfig = swc(JSON.parse(readFileSync("./.swcrc")));

/** @type {import("rollup").RollupOptions} */
export default [
  {
    input: "lib/public_api.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        format: "esm",
        file: packageJson.module,
        sourcemap: true,
      },
    ],
    plugins: [swcConfig, terser()],
  },
  {
    input: "lib/public_api.ts",
    output: [{ file: packageJson.types }],
    external: [/\.css$/],
    plugins: [dts({})],
  },
];
