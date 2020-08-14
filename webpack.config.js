const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
const filename = ext => {
  if (isProd) {
    return `bundle.[hash].${ext}`;
  } else {
    return `bundle.${ext}`;
  }
};

const jsLoaders = () => {
  const loaders = [{
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-env"]
    }
  }];
  if (isDev) {
    loaders.push("eslint-loader");
  }
  return loaders;
};


module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core")
    }
  },
  devtool: isDev ? "source-map" : "",
  devServer: {
    port: 4200,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }

    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename("css")
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          },
        },
        "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ],
  },
};