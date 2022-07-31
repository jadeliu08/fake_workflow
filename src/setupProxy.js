const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    // proxy第一个参数为要代理的路由
    // 第二参数中target为代理后的请求网址，changeOrigin是否改变请求头，其他参数请看官网
    app.use(createProxyMiddleware("/prod", {
        target: 'https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true
    }));
}