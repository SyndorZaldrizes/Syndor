module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  overrides: [
    {
      files: ["cypress/**/*.js"],
      env: { browser: true, es2021: true, mocha: true },
      globals: { cy: "readonly", Cypress: "readonly" }
    },
    {
      files: ["scripts/**/*.js"],
      env: { node: true, es2021: true }
    }
  ],
  rules: {
    "no-unused-vars": ["warn", { "args": "none", "ignoreRestSiblings": true }],
    "no-console": "off"
  }
};
