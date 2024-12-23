const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const css = require("rollup-plugin-css-only");
const url = require("@rollup/plugin-url");
const babel = require("@rollup/plugin-babel");
const copy = require("rollup-plugin-copy");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  external: [
    "react",
    "react-dom",
    "invariant",
    "react-bootstrap",
    "@restart/hooks",
    "@restart/ui",
    "dom-helpers",
    "classnames",
    "prop-types",
  ],
  plugins: [
    babel({
      presets: ["@babel/preset-react"],
      plugins: [
        ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
      ],
      babelHelpers: "bundled",
    }),
    resolve({
      browser: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    url({
      include: ["**/*.ttf", "**/*.woff", "**/*.otf"],
      limit: 0,
      fileName: "[name][extname]",
    }),
    css({
      output: "styles.css",
    }),
    copy({
      targets: [
        {
          src: "src/fonts/*",
          dest: "dist/fonts",
        },
      ],
      verbose: true,
    }),
  ],
};
