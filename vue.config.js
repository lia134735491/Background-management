module.exports = {
     devServer: {
         proxy: {
             '/api':{
                 target: 'http://api-toutiao-web.itheima.net',
                 changeOrigin: true,
                 ws: true,
                 pathRewrite: {
                     '^/api/': ''
                 }
             }
         }
     }
}