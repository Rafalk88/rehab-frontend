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
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ),
  {
    plugins: {
      prettier: eslintPluginPrettier,
      "jsx-a11y": eslintPluginJsxA11y,
    },
    rules: {
      "prettier/prettier": "warn",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-role": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/label-has-associated-control": [
        "warn",
        {
          labelComponents: [],
          labelAttributes: ["label"],
          controlComponents: [],
          depth: 3,
        },
      ],
    },
  },
  {
    rules: {
      ...eslintConfigPrettier.rules,
    },
  },
];

export default eslintConfig;
