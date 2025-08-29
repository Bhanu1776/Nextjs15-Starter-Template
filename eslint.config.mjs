import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import security from "eslint-plugin-security";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Shared rules for both JS and TS files
const sharedRules = {
  "prettier/prettier": "warn",
  "react/react-in-jsx-scope": ["off"],
  "react/jsx-uses-react": ["off"],
  "import/no-extraneous-dependencies": "warn",
  "@next/next/no-img-element": 0,
  "no-await-in-loop": 0,
  "no-undef": 0,
  "no-return-assign": ["error", "except-parens"],
  "no-restricted-syntax": [
    2,
    "ForInStatement",
    "LabeledStatement",
    "WithStatement",
  ],
  "prefer-const": [
    "error",
    {
      destructuring: "all",
    },
  ],
  "arrow-body-style": [2, "as-needed"],
  "no-unused-expressions": [
    1,
    {
      allowTaggedTemplates: true,
    },
  ],
  "no-param-reassign": [
    2,
    {
      props: false,
    },
  ],
  "import/prefer-default-export": 0,
  import: 0,
  "func-names": 0,
  "space-before-function-paren": 0,
  "comma-dangle": 0,
  "max-len": 0,
  "import/extensions": 0,
  "no-underscore-dangle": 0,
  "consistent-return": 0,
  "react/display-name": 1,
  "react/no-array-index-key": 0,
  "react/prefer-stateless-function": 0,
  "react/forbid-prop-types": 0,
  "react/no-unescaped-entities": 0,
  "react/function-component-definition": 0,
  "jsx-a11y/accessible-emoji": 0,
  "jsx-a11y/alt-text": "error",
  "jsx-a11y/label-has-associated-control": [
    "error",
    {
      assert: "either",
    },
  ],
  "react/require-default-props": 0,
  "react/jsx-filename-extension": [
    1,
    {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".mdx"],
    },
  ],
  radix: 0,
  "jsx-a11y/href-no-hash": "off",
  "jsx-a11y/anchor-is-valid": [
    "warn",
    {
      aspects: ["invalidHref"],
    },
  ],
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  prettierConfig,
  //* Generic rules
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs}"],
    plugins: {
      "react-hooks-extra": reactHooksExtra,
      prettier: prettierPlugin,
      "better-tailwindcss": betterTailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
      },
    },
    rules: {
      ...sharedRules,
      ...betterTailwindcss.configs.recommended.rules,
      "no-shadow": [
        2,
        {
          hoist: "all",
          allow: ["resolve", "reject", "done", "next", "err", "error"],
        },
      ],
      // React Hooks Extra rules
      "react-hooks-extra/ensure-use-callback-has-non-empty-deps": "warn",
      "react-hooks-extra/ensure-use-memo-has-non-empty-deps": "warn",
      "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
      "react-hooks-extra/ensure-custom-hooks-using-other-hooks": "warn",
      "react-hooks-extra/no-direct-set-state-in-use-effect": "error",
    },
  },
  //* TypeScript rules
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Override with TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-shadow": [
        2,
        {
          hoist: "all",
          allow: ["resolve", "reject", "done", "next", "err", "error"],
        },
      ],
      "@typescript-eslint/comma-dangle": ["off"],
      // TypeScript import rules
      "@typescript-eslint/consistent-type-exports": [
        "warn",
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "warn",
    },
  },
  //* API routes - security focus
  {
    files: ["src/api/**/*.{js,ts}"],
    plugins: { security },
    rules: {
      "security/detect-object-injection": "error",
      "no-console": "error",
    },
  },
  //* Ignore files
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "dist/**",
      "bin/**",
      "pnpm-lock.yaml",
      "pnpm-workspace.yaml",
      "**/*.d.ts",
      "*.min.js",
    ],
  },
];

export default eslintConfig;
