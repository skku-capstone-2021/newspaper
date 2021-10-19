const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
        },
      },
      {
        test: /\.svg$/i,
        loader: "svg-url-loader",
        options: {
          limit: 8 * 1024,
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        loader: "image-webpack-loader",
        enforce: "pre",
      },
    ],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  devtool: "inline-source-map",

  plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
};
