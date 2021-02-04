const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// vueloader插件
const VueLoaderPlugin = require('vue-loader-v16/dist/plugin.js').default;


module.exports = {
    mode: 'development',
    // 入口
    entry: './src/main.js',
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new VueLoaderPlugin()
    ],
    // 用loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // 处理vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader-v16'
            }
        ]
    }
}