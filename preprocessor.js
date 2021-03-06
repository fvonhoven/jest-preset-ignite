// typescript compiler
const tsc = require("typescript")

// typescript configuration
const compilerOptions = {
  target: "es2017",
  module: "commonjs",
  jsx: "react",
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  sourceMap: true
}

/**
 * Converts TypeScript files to JavaScript.
 *
 * @param {string} The source code of the file.
 * @param {string} The path to the file we're transformation
 * @returns The transformed source code
 */
function process(src, path) {
  // we only convert .ts and .tsx files
  if (path.endsWith(".ts") || path.endsWith(".tsx")) {
    // compile TS to JS
    const transpiled = tsc.transpileModule(src, {
      compilerOptions: compilerOptions,
      fileName: path
    })

    // give Jest the js and source map
    return {
      code: transpiled.outputText,
      map: transpiled.sourceMapText
    }
  }

  // don't modify it, just hand it back
  return src
}

// make the pre-processor available to jest
module.exports = { process }
