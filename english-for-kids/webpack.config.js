const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname,'./src/script.js',
          ), 
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            title:"english-for-kids",
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "./assets/img", to: "./images" },
              { from: "./assets/audio", to: "./audio" },
            ],
          }),
    ],
    module:{
        rules:[
            {
             test:/\.css$/,
             use: ['style-loader','css-loader']
            },
            {
                test: /\.(png |jpg| svg|gif|mp3)$/,
                use:['file-loader']
            }, 
        ]
    }
}
