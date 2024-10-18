import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["*.ts", "src/**/*.ts"],  // Ensures all TypeScript files are included
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",  // ES modules
    },
    env: {
      node: true,  // Enable Node.js global variables and scope
      es2021: true,  // ES6+ features
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
