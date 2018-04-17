module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  // Add apollo module
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/onesignal',
    ['@nuxtjs/pwa', { icon: false }]
  ],
  css: [
    '@/assets/css/main.scss',
    '@/assets/css/city.scss',
    'tachyons/css/tachyons.css'
  ],
  // Give apollo module options
  apollo: {
    clientConfigs: {
      default: '~/apollo/default.js'
    }
  },
  env: {
    GRAPHQL_ALIAS: process.env.GRAPHQL_ALIAS || 'cj4mr3yry0bdr0149x6pscuqm'
  },
  workbox: {
    // swURL: '~/assets/js/OneSignalSDKWorker.js'
  },
  manifest: {
    'gcm_sender_id': '482941778795',
    'gcm_sender_id_comment': 'Do not change the GCM Sender ID'
  },
  oneSignal: {
    init: {
      appId: '47d1647c-770f-488f-9bf5-f17103ff82ef',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
          disable: false
      },
      autoRegister: false
    }
  }
}

