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
      start_url: './index.html'
    },
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      cleanupOutdatedCaches: true // cleans up cache that is outdated because of a previous version of Workbox.
    }
    // navigateFallback: './public/index.html'
  }
}
