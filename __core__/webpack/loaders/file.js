/*
    __core__/webpack/loaders/file

    File loader in client from static folder
    see: https://www.npmjs.com/package/file-loader
    eg: <img src="path/to/static/file.png" />
*/

const fileLoader = {
    loader: require.resolve('file-loader'),
    options: {
        name: '[name].[ext]',
        emitFile: false,
    },
}

module.exports = {
    // test: /\.(png|jpg|jpeg|gif|svg|ico|json)$/,
    exclude: /\.(js|jsx|ts|tsx|mjs)$/,
    type: 'javascript/auto',
    use: [fileLoader],
}
