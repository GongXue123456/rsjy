module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/pcsys': {
        target: 'http://mallsys.rsjykj.com.cn:9091/',
        // target: 'http://172.16.32.11:8889/',
        changeOrigin: true,
        onProxyReq: function(proxyReq, req, res){
          console.log('---------------------')
        }
      },
      '/login': {
        target: 'http://mallsys.rsjykj.com.cn:9091/',
        // target: 'http://172.16.32.11:8889/',
        changeOrigin: true,
        onProxyReq: function(proxyReq, req, res){
          console.log('---------------------')
        }
      }
    }
  }
}
