const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/pc/', {
      // target: 'http://172.16.32.33:8889/',
      target: 'http://106.2.4.37:88/',
      changeOrigin: true,
      onProxyReq: function(){
      }
    }),
    proxy('/pclogin/', {
      // target: 'http://172.16.32.33:8889/',
      target: 'http://106.2.4.37:88/',
      changeOrigin: true,
      onProxyReq: function(){
      }
    })
  )
}