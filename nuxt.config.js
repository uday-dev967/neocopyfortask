const pkg = require('./package')
const path = require('path')
const dotenv = require('dotenv')
const { parsed } = dotenv.config()
const url = "http://169.254.59.246:3000"
const backend = parsed.BACKEND ? `${parsed.BACKEND}/api` : '/api'
const gaKey = parsed.gaKey;
import en from "./lang/en";
import ja from "./lang/ja"
import es from "./lang/es"

export default {
    // mode: 'spa',
    ssr: false,

    /*
     ** Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
            // { hid: 'description', name: 'description', content: 'Create 3D Floor Plans & Interior Designs for Home, Office Online | Foyr'}
            { hid: 'description', name: 'description', content: 'Created on Foyr Neo - Lightning fast interior design software.' },
            {  name: 'og:title', content: 'Check out my latest design' },
            {  name: 'og:description', content: 'Created on Foyr Neo - Lightning fast interior design software.' },
            // {  name: 'og:image', content: 'https://foyr.com/wp-content/uploads/2020/02/banner-image.jpg?x67681' }
            {   name:"twitter:title", content:"Check out my latest design"},
            {   name:"twitter:description", content:"Created on Foyr Neo - Lightning fast interior design software."}
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: 'https://foyr.com/wp-content/uploads/2020/03/Foyr-fav.png' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400;500;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&family=Ubuntu:wght@300;500;700&family=Nunito+Sans:wght@200;300;400;500;900&family=Inter:wght@400;500;600;700&display=swap' },
            // {rel:'stylesheet', href:'https://unpkg.com/element-ui/lib/theme-chalk/index.css'}
        ],
        script: [
            // { src: '/js/chat.js'},
            { src: '/js/newChat.js' },
            // { src: '/js/amplitude.js'},
            { src: '/js/segement.js' },
            { src: '/js/detect.min.js' },
            { src: '/js/fbUS.js' },
            { src: '/js/fbSingapore.js' },
            { src: '/js/fbIndia.js' },
            { src: '/js/meta.js' },
            // {src:'https://unpkg.com/element-ui/lib/index.js'},
            { src: 'https://www.googletagmanager.com/gtag/js?id=AW-789738350' },
            { src: '/js/googleGlobal.js' },
            { src: '/js/googleGTM.js' },
            // {src:'https://docs.smartkarrot.com/frameworks/web/v4/UsageAnalytics.js'},
            { src: 'https://www.datadoghq-browser-agent.com/datadog-logs-us.js' },
            { src: '/js/newRelicBrowser.js' },
            { src: '/js/datadog.js' },
            { src: '/js/jszip.min.js' },
            { src: '/js/customerLab.js'},
            { src: 'https://js.chargebee.com/v2/chargebee.js',
             "data-cb-site":"foyr",
             "data-cb-fbq-enabled":"true"
            },
            {src:'/js/iframeCode.js'},
        ],
    },

    /*
     ** Customize the progress-bar color
     */
    // loading: { color: '#fff' },

    /*
     ** Global CSS
     */
    css: [
        // 'element-ui/lib/theme-chalk/reset.css',
        // 'element-ui/lib/theme-chalk/index.css',
        '~/assets/scss/global.scss',
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        // '@/plugins/element-ui',
        '~/plugins/axios',
        '~/plugins/user-agent',
        '~/plugins/vue-touch.js',
        '~/plugins/globalMessage',
        '~/plugins/social-sharing',
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios', 
        // 'nuxt-user-agent',
        '@nuxtjs/style-resources',
        [
            '@nuxtjs/i18n',
            {
              locales: ['en', 'ja', 'es'],
              defaultLocale: 'en',
              vueI18n: {
                fallbackLocale: 'en',
                messages: {
                  en: en,
                  ja: ja,
                  es: es
                }
              }
            }
        ]
        // ['@nuxtjs/google-analytics', {
        //   id: gaKey,
        //   // debug: {
        //   //   enabled:  window.location.host == "neo.foyr.com"?false:true,
        //   //   sendHitTask:  window.location.host == "neo.foyr.com"?false:true
        //   // },
        // }]
    ],
    /*
     ** sass resource
     */
    styleResources: {
        scss: [
            '~/assets/scss/helpers/_variables.scss',
            '~/assets/scss/helpers/_mixins.scss'
        ]
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {

        }
    },
    env: {
        backend
    },
    axios: {
        baseURL: backend
    },
    router: {
        linkActiveClass: 'active-link',
        middleware: 'routing'
    }

}
