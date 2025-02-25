const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css",
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader ,'css-loader', 'postcss-loader']
            }
        ]
    }
}