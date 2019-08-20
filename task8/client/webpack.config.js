const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'src/html/index.html',
    filename: 'index.html',
    inject: 'body',
    historyApiFallback: true,
});

const env = process.env.NODE_ENV;
const publicPath = env === 'production' ? './' : '';

const config = {
    mode: env || 'development',
    entry: ['babel-polyfill', path.join(APP_DIR, 'index.js')],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/,
                loader: 'file-loader',
            },
        ],
    },
    plugins: [HtmlWebpackPluginConfig],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public'),
        port: 3000,
        proxy: {
            '/api/*': {
                target: 'http://localhost:5000/',
                secure: 'false',
            },
        },
    },
};

module.exports = config;