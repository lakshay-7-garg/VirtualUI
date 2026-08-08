import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.js"], // entry point of the library where it gets all the components and exports them to the dist folder
  format: ["esm", "cjs"], // in these 2 formats the library will be bundled
  dts: false, // generates typescript declaration files for the library
  clean: true, // removes old dist and build new 
  external: ["react"] // react is not bundles only components 
});