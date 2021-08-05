const webpack = require('webpack')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: /node_modules/, 
                use:['source-map-loader'],
            },
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    },
    plugins: [ new NodePolyfillPlugin()],
    resolve: {
        fallback:{
            // tls: false,
            // net: false,
            fs: false,
        }
    }
};