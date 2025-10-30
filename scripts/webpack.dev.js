const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: ['../src/main.js'],
	output: {
		path: __dirname + '/dist',
		filename: '[name]-[hash].[ext]',
	},
	module: {
		rules: [
			{ test: /\.css$/, loader: 'css-loader' },
		],
	},
	plugins: [
			new HtmlWebpackPlugin({
				template: __dirname + '/dist/index.html',
				filename: 'index.html',
				hash: false
			}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'common',
					chunks: 'all',
					minChunks: 1,
					priority: -1,
				}
			},
		}
	},
}