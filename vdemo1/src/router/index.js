import { createRouter, createWebHashHistory } from "vue-router";
import IndexView from "../views/index.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
    // 404
    {
        // path: "*",
        path: "/:pathMatch(.*)*",
        name: "404",
        component: IndexView,
        redirect: "/404",
        children: [
            {
                path: "/404",
                name: "找不到",
                meta: {
                    title: "404",
                },
                component: () => import("@/views/exception/unfound"),
            },
        ],
    },
    {
        path: "/",
        name: "home",
        component: IndexView,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '/home',
                    validAuth: true,
                },
                component: HomeView,
            },
            {
                path: '/about',
                name: 'about',
                meta: {
                    title: '/about',
                    validAuth: true,
                    role: 2
                },
                component: () =>
                import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),


            },
        ]
    },
];

const router = createRouter({
    // createWebHistory\createWebHashHistory
    history:createWebHashHistory(),
    routes,
});

// 全局前置守卫 来控制权限
// router.beforeEach((to, from, next) => {
//  // encodeURIComponent(a);
//  location.href = res.result.redirect;
// });
// router.afterEach(() => {
//   window.scrollTo(0, 0);
// });

export default router;
