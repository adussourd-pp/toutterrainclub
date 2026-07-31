// Compile the TTC component source into an ESM dist entry.
// React/react-dom stay external — the design-sync bundle wraps this as an IIFE
// and the host provides React at runtime.
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.jsx"],
  outfile: "./dist/index.mjs",
  bundle: true,
  format: "esm",
  jsx: "transform",
  loader: { ".jsx": "jsx" },
  external: ["react", "react-dom", "react/jsx-runtime"],
  logLevel: "info",
});
console.log("built dist/index.mjs");
