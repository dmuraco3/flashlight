import { rollup } from "rollup";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";
import { rm } from "node:fs/promises";

const entryPoints = ["src/index.ts", "src/languages/index.ts", "src/styles/index.ts"];

// Build JavaScript files
async function buildJS() {
    const bundle = await rollup({
        input: entryPoints,
        plugins: [
            resolve(), // Resolves node_modules and local imports
            commonjs(), // Converts CommonJS to ES modules if needed
            typescript({ tsconfig: "./rollup-tsconfig.json" }),
            terser({ keep_classnames: true }), // Minifies the JS output
        ],
    });

    await bundle.write({
        dir: "dist",
        format: "esm",
        sourcemap: true,
        preserveModules: true, // Keeps directory structure intact
        entryFileNames: "[name].js", // Outputs the same filenames as in src/
    });

    await bundle.close();
}

// Build TypeScript declarations
async function buildDTS() {
    const dtsBundle = await rollup({
        input: entryPoints,
        plugins: [dts()],
    });

    await dtsBundle.write({
        dir: "dist",
        format: "es",
        preserveModules: true, // Keeps directory structure for .d.ts files
        entryFileNames: "[name].d.ts",
    });

    await dtsBundle.close();
}

async function cleanDist() {
    await rm("dist", { recursive: true, force: true });
}

async function build() {
    await cleanDist();
    await buildJS();
    await buildDTS();
}

try {
    await build();
} catch (error) {
    console.error(error);
    process.exit(1);
}