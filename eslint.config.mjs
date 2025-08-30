import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default tseslint.config(
  eslintConfigPrettier,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      "prefer-const": [
        "off",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: false,
        },
      ],
    },
  }
);
