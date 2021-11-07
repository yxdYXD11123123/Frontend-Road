export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'taotao',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "vant/lib/index.css",
    // 全局样式
    "~/assets/scss/index.scss"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vant.js",
    // 封装axios
    "~/plugins/axios",
    // 统一管理接口
    "~/plugins/axios/api"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    // 加前缀
    prefix: "/api"
  },
  // 配置代理
  proxy: {
    '/api/': { target: 'http://xxxxx.top:3002', pathRewrite: { '^/api/': '' } }
  },

  loading: '~/components/Loading.vue',

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
