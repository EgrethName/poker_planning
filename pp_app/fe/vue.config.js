'use strict'
const titles = require('./title.js')
const glob = require('glob')
const pages = {}
const path = require('path')
const cli = require('commander');

const IS_PROD = process.env.NODE_ENV === 'production';

const staticFolder = IS_PROD ? '../static/' : '';
const cssFolder = IS_PROD ? `${staticFolder}css/` : './css/';
const imagesFolder = IS_PROD ? `${staticFolder}img/` : './images/';
const assetsDir = IS_PROD ? '../static' : '';

cli
  .option('-i, --ip <ip>', 'Device IP used along development.', '192.168.2.15')
  .parse(process.argv);

const options = cli.opts();

console.log(options.ip);
process.env.VUE_APP_IP = options.ip;

glob.sync('./src/views/**/app.js').forEach(path => {
  const chunk = path.split('./src/views/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk],
    IS_PROD,
    staticFolder,
    cssFolder,
    imagesFolder
  }
})
module.exports = {
  outputDir: '../templates',
  assetsDir,
  pages,
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      // If using the runtime only build
      path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
      // Or if using full build of Vue (runtime + compiler)
      // path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
    );
    config.plugins.delete('named-chunks');
  },
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:8080',
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '' }
  //     }
  //   }
  // }
}
