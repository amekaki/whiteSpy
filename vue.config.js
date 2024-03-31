/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - Clean Vue.js Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
const path = require('path');
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      // 需要重启 IDE
      .set('views',resolve('src/views'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  },
   configureWebpack: {

   plugins: [
     new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       "window.jQuery": "jquery",
       Popper: ["popper.js", "default"]
     })
   ]
 }

}
