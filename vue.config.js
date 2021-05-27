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
  // chainWebpack: config => {
  //   // Webpack includes a small piece of runtime code that gets inserted into the last chunk created. This could cause our vendor
  //   // chunk to change unnecessarily. So the next line causes this runtime to be put in a separate file.
  //   // Doing this in development mode causes the pwalocalserve to not see changes in files and trigger service worker.
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.set('runtimeChunk', true)
  //   }
  // }
}
