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
// Subcriptions
import IndexSubcriptions from '../views/subcriptions/subcription/index.vue';
import CreateSubcriptions from '../views/subcriptions/subcription/create.vue';
import EditSubcriptions from '../views/subcriptions/subcription/edit.vue';
// Applications
import IndexApplications from '../views/subcriptions/applications/index.vue';
// Orders
import IndexOrders from '../views/subcriptions/orders/index.vue';
// Payments
import IndexPayments from '../views/subcriptions/payments/index.vue';
// Tickets
import IndexTickets from '../views/tickets/index.vue';
import CreateTickets from '../views/tickets/create.vue';
import EditTickets from '../views/tickets/edit.vue';
// Media
import IndexMedia from '../views/media/index.vue';
// import EditMedia from '../views/media/edit.vue';
//Sigint
import IndexTemplates from '../views/singit/templates/index.vue';
import IndexTemplate from '../views/singit/templates/show.vue';
import EditTemplates from '../views/singit/templates/edit.vue';
import CreateTemplates from '../views/singit/templates/create.vue';
import IndexContracts from '../views/singit/contracts/index.vue';
import IndexContract from '../views/singit/contracts/show.vue';
import EditContracts from '../views/singit/contracts/edit.vue';
import SignatureContracts from '../views/singit/contracts/signature.vue';


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
        path: '/subscriptions',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'subscriptions',
                component: IndexSubcriptions
            },
            {
                path: 'create',
                name: 'subscriptions-create',
                component: CreateSubcriptions
            },
            {
                path: ':id/edit',
                name: 'subscriptions-edit',
                component: EditSubcriptions
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/applications',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'applications',
                component: IndexApplications
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/orders',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'orders',
                component: IndexOrders
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/payments',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'payments',
                component: IndexPayments
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
                path: ':id',
                name: 'companies-show',
                component: IndexCompany
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
                path: ':id',
                name: 'company-edit',
                component: EditSass
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
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/tickets',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'tickets',
                component: IndexTickets
            },
            {
                path: 'create',
                name: 'tickets-create',
                component: CreateTickets
            },
            {
                path: ':id/edit',
                name: 'tickets-edit',
                component: EditTickets
            },
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/media',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'media',
                component: IndexMedia
            },
            // {
            //     path: ':id/edit',
            //     name: 'media-edit',
            //     component: EditMedia
            // }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/singit/templates',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'templates',
                component: IndexTemplates
            },
            {
                path: ':id',
                name: 'templates-show',
                component: IndexTemplate
            },
            {
                path: ':id/edit',
                name: 'templates-edit',
                component: EditTemplates
            },
            {
                path: 'create',
                name: 'templates-create',
                component: CreateTemplates
            }
        ],
        meta: {requiresAuth: true}
    },
    {
        path: '/singit/contracts',
        component: appLayout,
        children: [
            {
                path: '',
                name: 'contracts',
                component: IndexContracts
            },
            {
                path: ':id',
                name: 'contracts-show',
                component: IndexContract
            },
            {
                path: ':id/edit',
                name: 'contracts-edit',
                component: EditContracts
            },
            // {
            //     path: 'signature',
            //     name: 'contracts-signature',
            //     component: SignatureContracts
            // },

        ],

        meta: {requiresAuth: true}
    },
    {
        path: '/contratos',
        component: storeLayout,
        children: [
            {
                path: 'firmar/:hash',
                name: 'contracts-signature',
                component: SignatureContracts
            },
            {
                path: 'firmar/:id/edit',
                name: 'contracts-signature-edit',
                component: SignatureContracts
            },
        ],

        meta: {requiresAuth: false}
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
