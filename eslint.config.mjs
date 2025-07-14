import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      prettier: eslintPluginPrettier,
      "jsx-a11y": eslintPluginJsxA11y,
    },
    rules: {
      "prettier/prettier": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/no-noninteractive-element-interactions": "warn",
    },
  },
  {
    rules: {
      ...eslintConfigPrettier.rules,
    },
  },
];

export default eslintConfig;
