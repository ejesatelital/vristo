<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                    <router-link :to="{name:'dashboard'}" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ltr:-ml-1 rtl:-mr-1 inline bg-dark" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300"
                            >Eje Satelital</span
                        >
                    </router-link>

                    <a
                        href="javascript:;"
                        class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                        @click="store.toggleSidebar()"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </a>
                </div>
                <div class="ltr:mr-2 rtl:ml-2 hidden sm:block">
                    <ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <li>
                            <router-link
                                to="/apps/chat"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle r="3" transform="matrix(-1 0 0 1 19 5)" stroke="currentColor" stroke-width="1.5" />
                                    <path
                                        opacity="0.5"
                                        d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    />
                                </svg>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div
                    class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]"
                >
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
                        <form
                            class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
                            :class="{ '!block': search }"
                            @submit.prevent="search = false"
                        >
                            <div class="relative">
                                <input
                                    type="text"
                                    class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                    placeholder="Buscar..."
                                />
                                <button type="button" class="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                    <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
                                        <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    class="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                                    @click="search = false"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                        <path
                                            d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <button
                            type="button"
                            class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="search = !search"
                        >
                            <svg
                                class="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
                                <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>
                    <right-sidebar-component/>
                </div>
            </div>

        </div>
    </header>
</template>

<script lang="ts" setup>
    import { ref, onMounted, computed, reactive, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import appSetting from '@/app-setting';
    import { useUserStore } from '@/stores/user-store';
    import { useCompanyStore } from '@/stores/company-store';
    import { useRoute } from 'vue-router';
    import { useAppStore } from '@/stores/index';
    import { API } from '@/services/api';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import RightSidebarComponent from "../partials/rightSidebarComponent.vue";

    const store = useAppStore();
    const route = useRoute();
    const search = ref(false);
    const api = new API();
    const companyStore = useCompanyStore();
    const userStore = useUserStore();

    const options = ref(companyStore.companyOptions);
    const displayOptions = computed(() => [
        { label: 'Ver Todas', value: 0 },
        ...options.value
    ]);
    const selectedOption = ref();

    const handleSelection = (value) => {
        if (value.value === 0) {
            const companyIds = options.value.map(option => option.value).join(',');
            companyStore.setCompaniesSelect(companyIds);
        } else {
            companyStore.setCompaniesSelect(value.value);
        }
    };
    // multi language
    const i18n = reactive(useI18n());
    const changeLanguage = (item: any) => {
        i18n.locale = item.code;
        appSetting.toggleLanguage(item);
    };

    const currentFlag = computed(() => {
        return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
    });

    const notifications = ref([
        {
            id: 1,
            profile: 'user-profile.jpeg',
            message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
            time: '45 min ago',
        },
        {
            id: 2,
            profile: 'profile-34.jpeg',
            message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
            time: '9h Ago',
        },
        {
            id: 3,
            profile: 'profile-16.jpeg',
            message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
            time: '9h Ago',
        },
    ]);

    const messages = ref([
        {
            id: 1,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
            title: 'Congratulations!',
            message: 'Your OS has been updated.',
            time: '1hr',
        },
        {
            id: 2,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
            title: 'Did you know?',
            message: 'You can switch between artboards.',
            time: '2hr',
        },
        {
            id: 3,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
            title: 'Something went wrong!',
            message: 'Send Reposrt',
            time: '2days',
        },
        {
            id: 4,
            image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
            title: 'Warning',
            message: 'Your password strength is low.',
            time: '5days',
        },
    ]);

    const setActiveDropdown = () => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    };

    const removeNotification = (value: number) => {
        notifications.value = notifications.value.filter((d) => d.id !== value);
    };

    const removeMessage = (value: number) => {
        messages.value = messages.value.filter((d) => d.id !== value);
    };

    onMounted(() => {
        setActiveDropdown();
    });

    watch(route, (to, from) => {
        setActiveDropdown();
    });
</script>
