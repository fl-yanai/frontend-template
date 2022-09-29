const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

const main = "dist";
const sub = "";
const build_dir = main + sub;

const entries = require('./entries.json')

const htmlOthersWebPackPlugin = (input,output, srcPath) => {
  return Object.keys(input).map((key) =>
    new HtmlWebPackPlugin({
      filename: `${output[key]}index.html`,
      template: `${srcPath}/${input[key]}.ejs`,
    })
  );
};

module.exports = {
  mode: "production",

  devServer: {
    static: build_dir,
    open: true,
  },

  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
  },

  target: ["web", "es5"],

  entry: "./src/js/index.ts",

  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, build_dir),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(ejs|html)$/i,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "ejs-plain-loader",
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
          {
            loader: "tslint-loader",
            options: {
              typeCheck: true,
              fix: false,
              emitErrors: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        generator: {
          filename: "[path][name][ext]",
        },
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    ...htmlOthersWebPackPlugin(entries.input,entries.output,'./src/views'), 
    new MiniCssExtractPlugin({
      filename: "css/bundle.css",
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true,
        }),
      ],
      pngquant: {
        quality: "70-85",
      },
      gifsicle: {
        interlaced: false,
        optimizationLevel: 10,
        colors: 256,
      },
      svgo: {},
    }),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },

  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },

  watchOptions: {
    ignored: /node_modules/,
  },
};