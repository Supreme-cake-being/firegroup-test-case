import { FlatCompat } from "@eslint/eslintrc";
import pluginTs from "@typescript-eslint/eslint-plugin"; // 🔧 Import the plugin explicitly

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    plugins: {
      "@typescript-eslint": pluginTs, // 🔧 Add the plugin manually
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
    },
  }),
];

export default eslintConfig;
