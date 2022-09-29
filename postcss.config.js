module.exports = (ctx) => ({
    // map: ctx.options.map,
    plugins: [
      [
        "postcss-custom-media",
        {
          importFrom: "./src/css/common/common.css",
        },
      ],
      require("autoprefixer")({ grid: 'autoplace' }),
      require("postcss-nested"),
      require("tailwindcss/nesting")(require("postcss-nested")),
      require("tailwindcss"),
    ],
  });