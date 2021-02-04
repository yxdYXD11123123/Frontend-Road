const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// vueloader插件
const VueLoaderPlugin = require('vue-loader-v16/dist/plugin.js').default;

// 配置
module.exports = {
    mode: 'development',
    // 入口
    entry: './src/main.js',
    // 出口
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 把index.html作为模板，创建到dist目录
            template: './public/index.html'
        }),
        // 它负责克隆您定义的任何其他规则，并将它们应用到.vue文件中相应的语言块
        // 例如，如果有与/\.js$/匹配的规则，则它将应用于.vue文件中的<script>块
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            // 处理css文件
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