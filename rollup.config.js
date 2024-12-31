function cssPathTransform() {
  return {
    name: "css-path-transform",
    generateBundle(options, bundle) {
      const cssFile = bundle["styles.css"];
      if (cssFile) {
        cssFile.source = cssFile.source.replace(
          /url\(['"]?\.\.\/fonts\/([^'"]+)['"]?\)/g,
          "url('./fonts/$1')"
        );
      }
    },
  };
}

const typescript = require("@rollup/plugin-typescript");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const css = require("rollup-plugin-css-only");
const url = require("@rollup/plugin-url");
const babel = require("@rollup/plugin-babel");
const copy = require("rollup-plugin-copy");
const { DEFAULT_EXTENSIONS } = require("@babel/core");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
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
    /^lucide-react/,
  ],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "dist/types",
      exclude: ["**/__tests__", "**/*.test.tsx", "**/*.stories.tsx"],
      noEmitOnError: true,
    }),
    babel({
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
      plugins: [
        ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }],
      ],
      babelHelpers: "bundled",
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      exclude: "node_modules/**",
    }),
    resolve({
      browser: true,
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs({
      include: /node_modules/,
    }),
    url({
      include: ["**/*.ttf", "**/*.woff", "**/*.otf"],
      limit: 0,
      fileName: "fonts/[name][extname]",
    }),
    css({
      output: "styles.css",
    }),
    cssPathTransform(),
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
