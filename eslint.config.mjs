import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,  // Explicitly define the TypeScript plugin
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,  // Load the recommended TypeScript rules
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }], // Ignore unused vars prefixed with _
    },
  },
];
