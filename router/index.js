import Vue from 'vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

const routerHistory = createWebHashHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: Login,
        },
        {
            path: '/Login',
            component: Login,
        },
        {
            path: '/Home',
            component: Home,
        },
    ]
})

export default router