const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const {ANALYZE} = process.env;
const {BundleAnalyzerPlugin} = WebpackBundleAnalyzer;

module.exports = {
    // plugins: [
    //     new BundleAnalyzerPlugin(),
    // ],
    productionSourceMap: false
}

