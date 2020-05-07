module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended",
    "airbnb-typescript/base",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    semi: 0,
    "class-methods-use-this": [0],
    "@typescript-eslint/semi": [0],
    "@typescript-eslint/member-delimiter-style": 0,
  },
};
