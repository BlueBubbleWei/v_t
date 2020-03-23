'use strict'

const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
// const defautSettings = require('./src/settings.js')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = 'for wym test'
const port = '9999'

// 主要配置项
module.exports = {
  publicPath: '/', //不知道不加./会打包成什么样子
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // false是采用压缩加密，并且不产生map文件
  // 配置开发环境
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  // css 配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      css: {}, // 这里的选项会传递给 css-loader
      postcss: {} // 这里的选项会传递给 postcss-loader
    }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    requireModuleExtension: false // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {},
  // 下面的配置有问题
  // configureWebpack:(config) => {
  //   config.optimization = {
  //     minimizer: [
  //       new UglifyPlugin({
  //         uglifyOptions: {
  //           warnings: false,
  //           compress: {
  //             drop_console: true, // console
  //             drop_debugger: false,
  //             pure_funcs: ['console.log'] // 移除console
  //           }
  //         }
  //       })
  //     ]
  //   }
  //   Object.assign(config, {
  //     // 开发生产共同配置
  //     name: name,
  //     resolve: {
  //       alias: {
  //         '@': path.resolve(__dirname, './src'),//别名配置
  //       }
  //     },
  //   })
  // },
  // configureWebpack: {
  //   name: name,
  //   resolve: {
  //     alias: {
  //       '@': resolve('src') //别名配置
  //     }
  //   }
  // },
  chainWebpack(config) {
    // 不知道为什么去掉
    config.plugins.delete('prelead'),
    config.plugins.delete('prefetch')
    // 设置svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
    
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}