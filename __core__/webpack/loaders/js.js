/*
    __core__/webpack/loaders/js

    Babel loader
    see: https://www.npmjs.com/package/babel-loader

    To transpiling the js files
*/

const babelLoader = {
    loader: require.resolve('babel-loader'),
    options: {
        cacheDirectory: true,
        babelrc: false,
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            'react-loadable/babel',
        ],
    },
}

module.exports = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [babelLoader],
}
