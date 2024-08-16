import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
// @ts-ignore
import {useUserStore} from '@/stores/user-store';
// @ts-ignore
import {useAppStore} from '@/stores/index';
// @ts-ignore
import appSetting from '@/app-setting';
// Marketplace
import HomeView from '../views/index.vue';
import Detail from '../views/detail.vue';
// Users
import IndexUsers from '../views/users/index.vue';
import EditUsers from '../views/users/edit.vue';
import CreateUsers from '../views/users/create.vue';
import ProfileUsers from '../views/users/profile.vue';
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
import storeLayout from '../layouts/store-layout.vue';
import appLayout from '../layouts/app-layout.vue';
import authLayout from '../layouts/auth-layout.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    {
        path: '/auth',
        component: authLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'register',
                name: 'register',
                component: Register
            },
        ],
        meta: {requiresAuth: false}
    },
    {
        path: '/',
        component: storeLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: HomeView
            },
            {
                path: 'detail',
                name: 'detail',
                component: Detail
            },
        ],
        meta: {requiresAuth: false}
    },
    {
        path: '/dashboard',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: DashBoard
            },
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/roles',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'roles',
                component: IndexRoles
            },
            {
                path: 'roles/create',
                name: 'roles-create',
                component: CreateRoles
            },
            {
                path: ':id/edit',
                name: 'roles-edit',
                component: EditRoles
            },
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/users',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'users',
                component: IndexUsers
            },
            {
                path: ':id/edit',
                name: 'users.edit',
                component: EditUsers
            },
            {
                path: 'create',
                name: 'users.create',
                component: CreateUsers
            },
            {
                path: 'profile',
                name: 'profile',
                component: ProfileUsers
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/sass/companies',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'companies',
                component: IndexSass
            },
            {
                path: ':id/edit',
                name: 'companies-edit',
                component: EditSass
            },
            {
                path: 'create',
                name: 'companies-create',
                component: CreateSass
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/sass/company',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'company',
                component: IndexCompany
            },
            {
                path: 'edit',
                name: 'company-edit',
                component: ShowCompany
            },
        ],
        meta: {requiresAuth: true}
    },

    {
        path: '/devices',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'devices',
                component: Device
            },
            {
                path: ':id/edit',
                name: 'company-edit',
                component: ShowCompany
            },
        ],
        meta: {requiresAuth: true}
    },

    {path: '/:pathMatch(.*)*', component: Error404},

];
const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {left: 0, top: 0};
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();
    const userStore = useUserStore();
    const tokenElement = document.querySelector('meta[name="user-api-token"]');
    const token = tokenElement?.getAttribute('content');

   /* if (to?.meta?.requiresAuth) {
        if (token && !userStore.api_token) {
            userStore.loginToken(token);
        } else if (!token && userStore.api_token) {
            userStore.logout().then(router.push({name:'login'}))
        }
    }*/
    next(true);
});
router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});
export default router;
