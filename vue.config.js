const { defineConfig } = require('@vue/cli-service')
// const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = defineConfig({
  transpileDependencies: true,
  //是否关闭elint校验
  lintOnSave:false,
  devServer: {
    host: "localhost",
    port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置后自动启动浏览器
    hot: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: {
      "/proxy_url":{           // /proxy_url 这个用来和根路径 baseURL 进行匹配
        target: 'http://192.168.216.164:8080/',  // 这个是填写跨域的请求域名+端口号，也就是要请求的URL(不包含URL路径)
        changeOrigin: true,  // 是否允许跨域请求，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        // pathRewrite: {   // 路径重写
        //   '^/proxy_url': '/' // 替换target中的请求地址，原请求为 http://127.0.0.1:8000/kuayu 实际请求为 http://127.0.0.1:8000/proxy_url/kuayu
        // }
      }
    }
  },

  configureWebpack:{
    plugins: [
      // new CleanWebpackPlugin(),
      // new webpack.ProsvidePlugin({
      //   jQuery: 'jquery',
      //   $: 'jquery',
      //   "windows.jQuery":'jquery'
      // })
    ]
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 存放less变量文件的路径
        // path.resolve(__dirname, "./src/assets/less/parameter.less")
      ]
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#ec6800'
          },
          javascriptEnabled: true,
        },
      },
    },
  }
})
