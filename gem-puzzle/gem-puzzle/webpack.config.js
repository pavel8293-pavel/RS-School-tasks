const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');



module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'), 
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            title:"GEM-PUZZLE",
            template:'./src/index.html'
        }),
        new CleanWebpackPlugin()
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
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            }
        ]
    }
};
