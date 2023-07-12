import {createRouter, createWebHistory} from "vue-router";
import TestComp from "@/pages/TestComp.vue";
import BasePage from "@/pages/BasePage.vue";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component:TestComp,

        },
        {
            path: '/:id',
            component:TestComp,
        },
    ],
/*    strict: true, // applies to all routes*/
})
