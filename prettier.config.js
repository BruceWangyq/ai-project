/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss", "@ianvs/prettier-plugin-sort-imports")],
};

module.exports = config;
