const { defineConfig } = require('@vue/cli-service')
// const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = defineConfig({
  transpileDependencies: true,
  //是否关闭elint校验
  lintOnSave:false,
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置后自动启动浏览器
    hot: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { // 配置多个代理
      "/testIp": {
        target: "http://localhost:8088",
        changeOrigin: true,//允许跨域
        // ws: true, // websocket支持
        secure: false,
        pathRewrite: {
          "^/testIp": "/"
        }
      },
      // "/elseIp": {
      //   target: "http://localhost:8089",
      //   changeOrigin: true,
      //   //ws: true, // websocket支持
      //   secure: false,
      //   pathRewrite: {
      //     "^/elseIp": "/"
      //   }
      // },
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
