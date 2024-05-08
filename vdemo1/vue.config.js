// vue.config.js
module.exports = {
    // 基本路径
    publicPath: "./",

    // 输出目录
    outputDir: "dist",

    // 用于放置生成的静态资源 (js、css、img、fonts) 的目录 (相对于 outputDir)
    assetsDir: "",

    // 是否在构建生产包时生成 sourceMap 文件
    productionSourceMap: false,

    // 配置 webpack-dev-server 行为
    devServer: {
        host: 'localhost', // 允许外部ip访问
        port: '8000',
        https: false, // 启用https
        // inline: true, // 刷新
        // hot: true, // 热更新,不刷新
        overlay: {
            warnings: false,
            errors: false
        },
        // 代理配置
        proxy: {
            // 选项写法
            "/api": {
                target: "http://example.com", // 目标地址
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务器，然后发送请求的数据，会先发给代理服务器，由代理服务器转发
                pathRewrite: {
                    "^/api": "/api", // 路径重写，移除路径中的 /api
                },
                headers: {
                    cookie: '',
                }
            },
            // 或者使用正则表达式写法
            // '/api/*': {
            //   target: '<url>',
            //   changeOrigin: true,
            //   pathRewrite: {
            //     '^/api': '/api'
            //   }
            // }
        },
        // 其他 devServer 配置
        port: 8080, // 端口号
        open: true, // 自动打开浏览器
        // ...
    },

    // 配置 webpack
    configureWebpack: {
        // 提供全局变量
        plugins: [
            // ...其他插件
        ],
        resolve: {
            alias: {
                // 别名配置
                "@": "/src", // 例如：import MyComponent from '@/components/MyComponent.vue'
                assets: "/src/assets",
                components: "/src/components",
                views: "/src/views",
                store: "/src/store",
                router: "/src/router",
                // ...其他别名
            },
        },
    },

    // 配置 webpack-dev-server
    devServer: {
        // 当使用 `npm run serve` 或者 `yarn serve` 启动开发服务器时，
        // 此配置用于运行开发服务器
        // ...其他 devServer 配置
    },

    // 配置 CSS 预处理器
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    // 配置插件
    pluginOptions: {
        // ...其他插件配置
    },
};
