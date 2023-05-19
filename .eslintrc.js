//eslint-disable-next-line no-undef, prettier/prettier
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true
    // "node": true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "prettier", //в самый конец этот флаг
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier","jest"],
  rules: {
    "no-var": "error",
    // "prettier/prettier": "error",
  },
};
