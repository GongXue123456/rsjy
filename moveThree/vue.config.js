module.exports = {
  publicPath: '/',
  devServer: {
    // proxy: {
    //   "/api/app": {
    //     target: "http://js.vipgz5.idcfengye.com/three-small/",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api/app' : '/app'
    //     },
    //     onProxyReq: function(proxyReq, req, res){
    //       console.log('---------------------')
    //     }
    //   }
    // },
    proxy: {
      "/app": {
        target: "http://rsjykj.com.cn:9992/",
        changeOrigin: true,
        onProxyReq: function(proxyReq, req, res){
          console.log('---------------------')
        }
      }
    },
    // sockHost: '127.0.0.1:88',
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: false
    },
    // lintOnSave: false
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }
}
