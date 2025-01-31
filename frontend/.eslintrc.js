module.exports = {
  extends: ["airbnb", "airbnb-typescript", "plugin:prettier/recommended"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
