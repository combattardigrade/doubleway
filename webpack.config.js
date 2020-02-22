const path = require('path')

module.exports = {
    entry: './src/token.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: { contentBase: path.resolve(__dirname, 'public'), compress: true}
}