const path = require('path') //引入path模块（node）
const resovle = (dir) => path.join(__dirname,dir)  //将文件组成绝对路径
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    /**打包构建基础配置**/
    publicPath:(process.env.VUE_APP_ENV === 'production'?'//imgt.log56.com':'')+'/hyb_task_h5/dist/', //应用包部署路径
    outputDir:'hyb_task_h5/dist', //当运行vue-cli-service build打包生成构建文件的目录文件名
    assetsDir:'static', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    lintOnSave:false, //eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
    runtimeCompiler:true, //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
    productionSourceMap:false, //// 生产环境是否生成 sourceMap 文件
    /**别名配置**/
    chainWebpack: config => {
        //添加别名
        console.log("别名配置")
        config.resolve.alias.set('@',resovle('src')).set('assets',resovle('src/assets'))
    },
    /**个性化处理webpack配置**/
    configureWebpack: config => {
        console.log("优化-配置externals")
        /**优化-配置externals**/
        // config.externals = {
        //     'vue':'Vue',
        //     'axios':'axios'
        // }
        //只有预发布和生产环境才会开启构建包的分析器
        console.log("当前打包环境为："+process.env.VUE_APP_ENV);
        if(process.env.VUE_APP_ENV.indexOf('prod')!==-1) {
            config.plugins.push(new BundleAnalyzerPlugin())
        }
    },
    /**用来传递任何第三方插件选项,第三方插件配置，调用方式options.pluginOptions.xxx**/
    pluginOptions:{},
    /**本地联调代理配置**/
    devServer:{
        host: '0.0.0.0', // 允许外部ip访问
        port: 8082, // 端口
        https: false, // 启用https
        overlay: {
          warnings: true,
          errors: true
        }, // 错误、警告在页面弹出
        proxy:{
            '/api': {
                target: 'http://kyapptest.log56.com/aps_shq',
                changeOrigin: true,//// 允许websockets跨域
                pathRewrite: {
                    '^/api': ''
                }
            }  
        }
    }
}