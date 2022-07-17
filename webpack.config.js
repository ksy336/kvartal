const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config({ path: './.env' });

console.log(process.env)
const stylesHandler = 'style-loader';
const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist`,
    },
    devServer: {
        historyApiFallback: true,
        contentBasePublicPath: path.join(__dirname, 'dist'),
        open: true,
        host: 'localhost',
        port: 8081,
        contentBase: './',
    },

    plugins: [
        new Dotenv({
            path: './.env',
            systemvars: true
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/images'),
                    to: path.resolve(__dirname, 'dist/images'),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{loader: "eslint-loader",
                    options: {
                        quiet: true,
                        transpileOnly:true
                    }
                }],
            },
            {
                test: /\.(js|jsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
                options: {
                    transpileOnly:true
                }
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
    },
};
module.exports = {
    plugins: [new ESLintPlugin(), new StylelintPlugin()],
    watch: true,
}
module.exports = () =>  {

    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());

    config.mode = 'development';
    return config
};

