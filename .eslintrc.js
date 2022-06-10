module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest", // Allows the use of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  extends: ["plugin:@typescript-eslint/recommended"], // Uses the linting rules from @typescript-eslint/eslint-plugin
  env: {
    node: true, // Enable Node.js global variables
  },
  rules: {
    "no-console": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
