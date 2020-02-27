const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/token.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new Dotenv()
    ],
    devServer: { contentBase: path.resolve(__dirname, 'public'), compress: true,  }
}