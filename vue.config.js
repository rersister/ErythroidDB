const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// iview-admin线上演示打包路径： https://file.iviewui.com/admin-dist/
// 相对路径可任意部署  ./
// 本地
const BASE_URL = process.env.NODE_ENV === 'production' ? '/EryDB/' : '/'

const LessPluginFunctions = require('less-plugin-functions'); 

module.exports = {

  
  // rules: [
  //   {
  //     test: /\.less$/,
  //     loader: 'less-loader', // 将 Less 文件编译为 CSS 文件
  //     options:new LessPluginFunctions(),
  //   },
  // ],


 
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,
  outputDir:'EryDB',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: 'localhost:3000'
  // }
  // 
  assetsDir: './',
  // 解决跨越问题
  devServer: {
		port: 8080,
		
		host: "localhost",
		
		https: false,
		
		// 自动启动浏览器
    open: false,

    // 解决VUE [WDS] DISCONNECTED 错误
    // Headers: {

    //   'Access-Control-Allow-Origin': '*'

    // },
    // hotOnly: false,
    // disableHostCheck: true
		// proxy: {  不用代理

		// 	"/EryDB/api": {

    //      target: "http://localhost:8090", //设置调用的接口域名和端口
		//   // target: "https://ngdc.cncb.ac.cn/",
    //       changeOrigin: true, //是否跨域
    //       ws:true,
    //       pathRewrite: {
    //         "^/EryDB/api": ""

		// 		}
		// 	}
		// }

  },

}
