// const {createProxyMiddleware} = require('http-proxy-middleware')

const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use('/proxy',
        createProxyMiddleware(
            {
                target: 'http://localhost:3000',
                changeOrigin: true,
            }
        )
    )
}
