module.exports = {
  publicPath: '/',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  crossorigin: 'use-credentials',
  lintOnSave: true,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map'
    } else if (process.env.NODE_ENV === 'test') {
      config.devtool = 'cheap-module-eval-source-map'
    }
  },
  pwa: {
    name: 'KB Coder PWA App',
    shorName: 'KB Coder',
    themeColor: '#400080',
    msTileColor: '#800080',
    manifestOptions: {
      start_url: '/'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js'
    }
  }
}
