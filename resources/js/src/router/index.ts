import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

// Marketplace
import HomeView from '../views/index.vue';
import Detail from '../views/detail.vue';


// Users
import IndexUsers from '../views/users/index.vue';
import EditUsers from '../views/users/edit.vue';
import CreateUsers from '../views/users/create.vue';

// Sass
import IndexSass from '../views/sass/index.vue';
import EditSass from '../views/sass/edit.vue';
import CreateSass from '../views/sass/create.vue';

import IndexCompany from '../views/sass/company/index.vue';
import ShowCompany from '../views/sass/company/show.vue';

// Roles
import IndexRoles from '../views/roles/index.vue';
import CreateRoles from '../views/roles/create.vue';
import EditRoles from '../views/roles/edit.vue';

import Device from '../views/devices/index.vue';

import Error404 from '../views/pages/error404.vue';
import Login from '../views/auth/login.vue';
import Register from '../views/auth/register.vue';

import DashBoard from '../views/dashboard.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView, meta: { layout: 'store' }},
    { path: '/detail', name: 'detail', component: Detail,  meta: { layout: 'store' }},

    { path: '/dashboard', name: 'dashboard', component: DashBoard},

    { path: '/user/users', name: 'users.index', component: IndexUsers},
    { path: '/users/:id/edit', name: 'users.edit', component: EditUsers },
    { path: '/users/create', name: 'users.create', component: CreateUsers },
    { path: '/users/profile/:id', name: 'profile', component: () => import('../views/users/profile.vue') },

    { path: '/user/roles', name: 'roles.index', component: IndexRoles},
    { path: '/user/roles/create', name: 'roles.create', component: CreateRoles},
    { path: '/user/roles/:id/edit', name: 'roles.edit', component: EditRoles},

    { path: '/companies', name: 'companies.index', component: IndexSass},
    { path: '/companies/:id/edit', name: 'companies.edit', component: EditSass },
    { path: '/companies/create', name: 'companies.create', component: CreateSass },

    { path: '/company/:id', name: 'company.index', component: IndexCompany},
    { path: '/company/:id/edit', name: 'company.show', component: ShowCompany},

    { path: '/devices', name: 'devices', component: Device },

    { path: '/:pathMatch(.*)*', component: Error404 },

    { path: '/auth/login', name: 'login', component: Login, meta: { layout: 'auth' }},
    { path: '/auth/register', name: 'register', component: Register, meta: { layout: 'auth' }},

    // { path: '/', name: 'home', component: HomeView },


];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    console.log(to?.meta?.layout);

    if (to?.meta?.layout == 'store') {
        store.setMainLayout('store');
    }
    else if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    }
    else {
        store.setMainLayout('app');
    }
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
