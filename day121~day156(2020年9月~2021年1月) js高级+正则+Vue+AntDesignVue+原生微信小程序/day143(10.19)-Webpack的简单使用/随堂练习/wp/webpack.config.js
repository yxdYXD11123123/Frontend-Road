const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 打包模式
    mode: 'development',
    // 入口
    entry: './src/main.js',
    // 输出位置
    plugins: [
        // 清理webpack
        new CleanWebpackPlugin(),
        // 自动生成html
        new HtmlWebpackPlugin({
            title: '自动生成html'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'out1.js'
    }
}