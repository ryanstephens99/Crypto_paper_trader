const webpack = require('webpack')

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
    }
};