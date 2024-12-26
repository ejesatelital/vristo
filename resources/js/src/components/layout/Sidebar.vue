<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link :to="{name:'dashboard'}" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt=""/>
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">Eje Satelital</span>
                    </router-link>
                    <a
                        href="javascript:;"
                        class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
                        @click="store.toggleSidebar()"
                    >
                        <svg class="w-5 h-5 m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                            <path
                                opacity="0.5"
                                d="M16.9998 19L10.9998 12L16.9998 5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </a>
                </div>
                <perfect-scrollbar
                    :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }"
                    class="h-[calc(100vh-80px)] relative"
                >
                    <ul class="relative font-semibold space-y-0.5 p-4 py-0">
                        <li class="menu nav-item">
                            <router-link :to="{name:'dashboard'}"  class="group" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <svg class="group-hover:!text-primary shrink-0" width="20" height="20"
                                         viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.5"
                                              d="M6.22209 4.60105C6.66665 4.304 7.13344 4.04636 7.6171 3.82976C8.98898 3.21539 9.67491 2.9082 10.5875 3.4994C11.5 4.09061 11.5 5.06041 11.5 7.00001V8.50001C11.5 10.3856 11.5 11.3284 12.0858 11.9142C12.6716 12.5 13.6144 12.5 15.5 12.5H17C18.9396 12.5 19.9094 12.5 20.5006 13.4125C21.0918 14.3251 20.7846 15.011 20.1702 16.3829C19.9536 16.8666 19.696 17.3334 19.399 17.7779C18.3551 19.3402 16.8714 20.5578 15.1355 21.2769C13.3996 21.9959 11.4895 22.184 9.64665 21.8175C7.80383 21.4509 6.11109 20.5461 4.78249 19.2175C3.45389 17.8889 2.5491 16.1962 2.18254 14.3534C1.81598 12.5105 2.00412 10.6004 2.72315 8.86451C3.44218 7.12861 4.65982 5.64492 6.22209 4.60105Z"
                                              fill="currentColor"/>
                                        <path
                                            d="M21.446 7.06901C20.6342 5.00831 18.9917 3.36579 16.931 2.55398C15.3895 1.94669 14 3.34316 14 5.00002V9.00002C14 9.5523 14.4477 10 15 10H19C20.6569 10 22.0533 8.61055 21.446 7.06901Z"
                                            fill="currentColor"/>
                                    </svg>
                                    <span class="px-2">{{ $t('Dashboard') }}</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="menu nav-item relative" v-if="userStore.hasAccess('devices.devices.index')">
                            <router-link  class="group" :to="{name:'devices'}" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="group-hover:!text-primary shrink-0"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M19.7165 20.3624C21.143 19.5846 22 18.5873 22 17.5C22 16.3475 21.0372 15.2961 19.4537 14.5C17.6226 13.5794 14.9617 13 12 13C9.03833 13 6.37738 13.5794 4.54631 14.5C2.96285 15.2961 2 16.3475 2 17.5C2 18.6525 2.96285 19.7039 4.54631 20.5C6.37738 21.4206 9.03833 22 12 22C15.1066 22 17.8823 21.3625 19.7165 20.3624Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M5 8.51464C5 4.9167 8.13401 2 12 2C15.866 2 19 4.9167 19 8.51464C19 12.0844 16.7658 16.2499 13.2801 17.7396C12.4675 18.0868 11.5325 18.0868 10.7199 17.7396C7.23416 16.2499 5 12.0844 5 8.51464ZM12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                                            fill="currentColor"
                                        />
                                    </svg>

                                    <span class="px-2">{{ $t('devices') }}</span>
                                </div>
                            </router-link>
                        </li>

                        <li class="menu nav-item relative" v-if="userStore.hasAccess('sass.companies.index')">
                            <router-link class="group" :to="{name:'companies'}" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  class="group-hover:!text-primary shrink-0">
                                        <path opacity="0.5" d="M20.9129 5.88881C21.25 6.39325 21.25 7.09549 21.25 8.49995V21.2499H21.75C22.1642 21.2499 22.5 21.5857 22.5 21.9999C22.5 22.4142 22.1642 22.7499 21.75 22.7499H1.75C1.33579 22.7499 1 22.4142 1 21.9999C1 21.5857 1.33579 21.2499 1.75 21.2499H2.25V8.49995C2.25 7.09549 2.25 6.39325 2.58706 5.88881C2.73298 5.67043 2.92048 5.48293 3.13886 5.33701C3.58008 5.04219 5.67561 5.00524 6.75702 5.00061C6.75291 5.292 6.75294 5.59649 6.75298 5.91045L6.75299 5.99995V7.24995H4.25C3.83579 7.24995 3.5 7.58573 3.5 7.99995C3.5 8.41416 3.83579 8.74995 4.25 8.74995H6.75299V10.2499H4.25C3.83579 10.2499 3.5 10.5857 3.5 10.9999C3.5 11.4142 3.83579 11.7499 4.25 11.7499H6.75299V13.2499H4.25C3.83579 13.2499 3.5 13.5857 3.5 13.9999C3.5 14.4142 3.83579 14.7499 4.25 14.7499H6.75299V21.2499H16.7529V14.7499H19.25C19.6642 14.7499 20 14.4142 20 13.9999C20 13.5857 19.6642 13.2499 19.25 13.2499H16.7529V11.7499H19.25C19.6642 11.7499 20 11.4142 20 10.9999C20 10.5857 19.6642 10.2499 19.25 10.2499H16.7529V8.74995H19.25C19.6642 8.74995 20 8.41416 20 7.99995C20 7.58573 19.6642 7.24995 19.25 7.24995H16.7529V5.99995L16.7529 5.91046V5.91043C16.753 5.59648 16.753 5.292 16.7489 5.00061C17.8303 5.00524 19.9199 5.04219 20.3611 5.33701C20.5795 5.48293 20.767 5.67043 20.9129 5.88881Z" fill="currentColor"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 2H12.75C14.6356 2 15.5784 2 16.1642 2.58579C16.75 3.17157 16.75 4.11438 16.75 6V21.25H18.25H21.25H21.75C22.1642 21.25 22.5 21.5858 22.5 22C22.5 22.4142 22.1642 22.75 21.75 22.75H1.75C1.33579 22.75 1 22.4142 1 22C1 21.5858 1.33579 21.25 1.75 21.25H2.25H5.25H6.75V6C6.75 4.11438 6.75 3.17157 7.33579 2.58579C7.92157 2 8.86438 2 10.75 2ZM11.75 18.25C12.1642 18.25 12.5 18.5858 12.5 19V21.25H11V19C11 18.5858 11.3358 18.25 11.75 18.25ZM9.75 14C9.33579 14 9 14.3358 9 14.75C9 15.1642 9.33579 15.5 9.75 15.5H13.75C14.1642 15.5 14.5 15.1642 14.5 14.75C14.5 14.3358 14.1642 14 13.75 14H9.75ZM9 11.75C9 11.3358 9.33579 11 9.75 11H13.75C14.1642 11 14.5 11.3358 14.5 11.75C14.5 12.1642 14.1642 12.5 13.75 12.5H9.75C9.33579 12.5 9 12.1642 9 11.75ZM9.75 8.5C9.33579 8.5 9 8.83579 9 9.25C9 9.66421 9.33579 10 9.75 10H13.75C14.1642 10 14.5 9.66421 14.5 9.25C14.5 8.83579 14.1642 8.5 13.75 8.5H9.75ZM9 6.25C9 5.83579 9.33579 5.5 9.75 5.5H13.75C14.1642 5.5 14.5 5.83579 14.5 6.25C14.5 6.66421 14.1642 7 13.75 7H9.75C9.33579 7 9 6.66421 9 6.25Z" fill="currentColor"/>
                                    </svg>

                                    <span class="px-2">{{ $t('companies') }}</span>
                                </div>
                            </router-link>
                        </li>

                        <li class="menu nav-item" v-if="userStore.hasAccess('rh.employees.index')||userStore.hasAccess('rh.departments.index')">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'rh' }"
                                @click="activeDropdown === 'rh' ? (activeDropdown = null) : (activeDropdown = 'rh')"
                            >
                                <div class="flex items-center">
                                    <svg
                                        class="group-hover:!text-primary shrink-0"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle opacity="0.5" cx="15" cy="6" r="3" fill="currentColor" />
                                        <ellipse opacity="0.5" cx="16" cy="17" rx="5" ry="3" fill="currentColor" />
                                        <circle cx="9.00098" cy="6" r="4" fill="currentColor" />
                                        <ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill="currentColor" />
                                    </svg>

                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">Rh</span>
                                </div>
                                <div class="rtl:rotate-180" :class="{ '!rotate-90': activeDropdown === 'rh' }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'rh'">
                                <ul class="sub-menu text-gray-500">
                                    <li v-if="userStore.hasAccess('rh.employees.index')">
                                        <router-link :to="{name:'rh.employees'}" @click="toggleMobileMenu">Colaboradores</router-link>
                                    </li>
                                    <li v-if="userStore.hasAccess('rh.departments.index')">
                                        <router-link :to="{name:'rh.departments'}" @click="toggleMobileMenu">Areas</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>

                        <li class="menu nav-item" v-if="userStore.hasAccess('user.users.index')||userStore.hasAccess('user.roles.index')">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'users' }"
                                @click="activeDropdown === 'users' ? (activeDropdown = null) : (activeDropdown = 'users')"
                            >
                                <div class="flex items-center">
                                    <svg
                                        class="group-hover:!text-primary shrink-0"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle opacity="0.5" cx="15" cy="6" r="3" fill="currentColor" />
                                        <ellipse opacity="0.5" cx="16" cy="17" rx="5" ry="3" fill="currentColor" />
                                        <circle cx="9.00098" cy="6" r="4" fill="currentColor" />
                                        <ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill="currentColor" />
                                    </svg>

                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{ $t('users') }}</span>
                                </div>
                                <div class="rtl:rotate-180" :class="{ '!rotate-90': activeDropdown === 'users' }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'users'">
                                <ul class="sub-menu text-gray-500">
                                    <li v-if="userStore.hasAccess('user.users.index')">
                                        <router-link :to="{name:'users'}" @click="toggleMobileMenu">{{ $t('users') }}</router-link>
                                    </li>
                                    <li v-if="userStore.hasAccess('user.roles.index')">
                                        <router-link :to="{name:'roles'}" @click="toggleMobileMenu">{{ $t('roles') }}</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>


                        <h2 class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1" v-if="userStore.hasAccess('user.users.index')">
                            <svg
                                class="w-4 h-5 flex-none hidden"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="1.5"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>{{ $t('admin') }}</span>
                        </h2>

                        <li class="menu nav-item" v-if="userStore.hasAccess('subscriptions.applications.index')">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'components' }"
                                @click="activeDropdown === 'components' ? (activeDropdown = null) : (activeDropdown = 'components')"
                            >
                                <div class="flex items-center">
                                    <svg
                                        class="group-hover:!text-primary shrink-0"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.42229 20.6181C10.1779 21.5395 11.0557 22.0001 12 22.0001V12.0001L2.63802 7.07275C2.62423 7.09491 2.6107 7.11727 2.5974 7.13986C2 8.15436 2 9.41678 2 11.9416V12.0586C2 14.5834 2 15.8459 2.5974 16.8604C3.19479 17.8749 4.27063 18.4395 6.42229 19.5686L8.42229 20.6181Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.7"
                                            d="M17.5774 4.43152L15.5774 3.38197C13.8218 2.46066 12.944 2 11.9997 2C11.0554 2 10.1776 2.46066 8.42197 3.38197L6.42197 4.43152C4.31821 5.53552 3.24291 6.09982 2.6377 7.07264L11.9997 12L21.3617 7.07264C20.7564 6.09982 19.6811 5.53552 17.5774 4.43152Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M21.4026 7.13986C21.3893 7.11727 21.3758 7.09491 21.362 7.07275L12 12.0001V22.0001C12.9443 22.0001 13.8221 21.5395 15.5777 20.6181L17.5777 19.5686C19.7294 18.4395 20.8052 17.8749 21.4026 16.8604C22 15.8459 22 14.5834 22 12.0586V11.9416C22 9.41678 22 8.15436 21.4026 7.13986Z"
                                            fill="currentColor"
                                        />
                                    </svg>

                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                        $t('Suscripciones')
                                    }}</span>
                                </div>
                                <div class="rtl:rotate-180" :class="{ '!rotate-90': activeDropdown === 'components' }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'components'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link :to="{name:'applications'}" @click="toggleMobileMenu">{{ $t('applications') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'subscriptions'}" @click="toggleMobileMenu">{{ $t('subscriptions') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'orders'}" @click="toggleMobileMenu">{{ $t('orders') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'payments'}" @click="toggleMobileMenu">{{ $t('payments') }}</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>


                        <li class="menu nav-item relative" v-if="userStore.hasAccess('tickets.tickets.index')">
                            <router-link class="group" :to="{name:'tickets'}" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="group-hover:!text-primary shrink-0">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0137 17L14.0079 19.0029C14.0065 19.4731 14.0058 19.7081 13.8591 19.8541C13.7124 20 13.4767 20 13.0054 20H9.99502C6.21438 20 4.32407 20 3.14958 18.8284C2.34091 18.0218 2.08903 16.8766 2.01058 15.0105C1.99502 14.6405 1.98724 14.4554 2.05634 14.332C2.12545 14.2085 2.40133 14.0545 2.95308 13.7463C3.56586 13.4041 3.98007 12.7503 3.98007 12C3.98007 11.2497 3.56586 10.5959 2.95308 10.2537C2.40133 9.94554 2.12545 9.79147 2.05634 9.66802C1.98724 9.54458 1.99502 9.35954 2.01058 8.98947C2.08903 7.12339 2.34091 5.97823 3.14958 5.17157C4.32407 4 6.21439 4 9.99502 4H13.5052C13.7814 4 14.0056 4.22298 14.0064 4.49855L14.0137 7C14.0137 7.55228 14.4625 8 15.0162 8L15.0162 10C14.4625 10 14.0137 10.4477 14.0137 11V13C14.0137 13.5523 14.4625 14 15.0162 14V16C14.4625 16 14.0137 16.4477 14.0137 17Z" fill="currentColor"/>
                                        <path opacity="0.5" d="M15.0166 15.9998C15.5703 15.9998 16.0191 16.4475 16.0191 16.9998V18.9763C16.0191 19.4578 16.0191 19.6986 16.1735 19.8462C16.3279 19.9939 16.5641 19.9839 17.0366 19.9639C18.8995 19.885 20.0441 19.633 20.8508 18.8282C21.6595 18.0216 21.9114 16.8764 21.9898 15.0104C22.0054 14.6403 22.0132 14.4552 21.9441 14.3318C21.875 14.2083 21.5991 14.0543 21.0473 13.7462C20.4346 13.404 20.0203 12.7501 20.0203 11.9998C20.0203 11.2495 20.4346 10.5957 21.0473 10.2535C21.5991 9.94536 21.875 9.7913 21.9441 9.66785C22.0132 9.5444 22.0054 9.35936 21.9898 8.98929C21.9114 7.12321 21.6595 5.97805 20.8508 5.17139C19.9731 4.29586 18.6956 4.07463 16.5282 4.01872C16.2486 4.01151 16.0191 4.237 16.0191 4.516V6.99982C16.0191 7.55211 15.5703 7.99982 15.0166 7.99982L15.0166 9.99982C15.5703 9.99982 16.0191 10.4475 16.0191 10.9998V12.9998C16.0191 13.5521 15.5703 13.9998 15.0166 13.9998V15.9998Z" fill="currentColor"/>
                                    </svg>

                                    <span class="px-2">{{ $t('tickets') }}</span>
                                </div>
                            </router-link>
                        </li>


                        <li class="menu nav-item relative" v-if="userStore.hasAccess('media.medias.index')">
                            <router-link class="group" :to="{name:'media'}" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="group-hover:!text-primary shrink-0">
                                        <path opacity="0.5" d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z" fill="currentColor"/>
                                        <path d="M20 6.23751C19.9992 5.94016 19.9949 5.76263 19.9746 5.60842C19.7974 4.26222 18.7381 3.2029 17.3919 3.02567C17.1969 3 16.9647 3 16.5003 3H9.98828C10.1042 3.10392 10.2347 3.23445 10.45 3.44975L11.0003 4C11.8161 4.81578 12.2239 5.22367 12.7124 5.49543C12.9807 5.64471 13.2653 5.7626 13.5606 5.84678C14.0982 6 14.675 6 15.8287 6H16.2024C17.9814 6 19.1593 6 20 6.23751Z" fill="currentColor"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z" fill="currentColor"/>
                                    </svg>
                                    <span class="px-2">{{ $t('media') }}</span>
                                </div>
                            </router-link>
                        </li>

                        <li class="menu nav-item" v-if="userStore.hasAccess('singit.singit.index')">
                            <button
                                type="button"
                                class="nav-link group w-full"
                                :class="{ active: activeDropdown === 'signit' }"
                                @click="activeDropdown === 'signit' ? (activeDropdown = null) : (activeDropdown = 'signit')"
                            >
                                <div class="flex items-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="group-hover:!text-primary shrink-0">
                                        <path opacity="0.5" d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" fill="currentColor"/>
                                        <path d="M16.5189 16.5013C16.6939 16.3648 16.8526 16.2061 17.1701 15.8886L21.1275 11.9312C21.2231 11.8356 21.1793 11.6708 21.0515 11.6264C20.5844 11.4644 19.9767 11.1601 19.4083 10.5917C18.8399 10.0233 18.5356 9.41561 18.3736 8.94849C18.3292 8.82066 18.1644 8.77687 18.0688 8.87254L14.1114 12.8299C13.7939 13.1474 13.6352 13.3061 13.4987 13.4811C13.3377 13.6876 13.1996 13.9109 13.087 14.1473C12.9915 14.3476 12.9205 14.5606 12.7786 14.9865L12.5951 15.5368L12.3034 16.4118L12.0299 17.2323C11.9601 17.4419 12.0146 17.6729 12.1708 17.8292C12.3271 17.9854 12.5581 18.0399 12.7677 17.9701L13.5882 17.6966L14.4632 17.4049L15.0135 17.2214L15.0136 17.2214C15.4394 17.0795 15.6524 17.0085 15.8527 16.913C16.0891 16.8004 16.3124 16.6623 16.5189 16.5013Z" fill="currentColor"/>
                                        <path d="M22.3665 10.6922C23.2112 9.84754 23.2112 8.47812 22.3665 7.63348C21.5219 6.78884 20.1525 6.78884 19.3078 7.63348L19.1806 7.76071C19.0578 7.88348 19.0022 8.05496 19.0329 8.22586C19.0522 8.33336 19.0879 8.49053 19.153 8.67807C19.2831 9.05314 19.5288 9.54549 19.9917 10.0083C20.4545 10.4712 20.9469 10.7169 21.3219 10.847C21.5095 10.9121 21.6666 10.9478 21.7741 10.9671C21.945 10.9978 22.1165 10.9422 22.2393 10.8194L22.3665 10.6922Z" fill="currentColor"/>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9C15.25 9.41421 14.9142 9.75 14.5 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H11C11.4142 12.25 11.75 12.5858 11.75 13C11.75 13.4142 11.4142 13.75 11 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13ZM7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H9.5C9.91421 16.25 10.25 16.5858 10.25 17C10.25 17.4142 9.91421 17.75 9.5 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z" fill="currentColor"/>
                                    </svg>

                                    <span class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                        {{ $t('signit') }}
                                    </span>
                                </div>
                                <div class="rtl:rotate-180" :class="{ '!rotate-90': activeDropdown === 'signit' }">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <vue-collapsible :isOpen="activeDropdown === 'signit'">
                                <ul class="sub-menu text-gray-500">
                                    <li>
                                        <router-link :to="{name:'templates'}" @click="toggleMobileMenu">{{ $t('templates') }}</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="{name:'contracts'}" @click="toggleMobileMenu">{{ $t('contracts') }}</router-link>
                                    </li>
                                </ul>
                            </vue-collapsible>
                        </li>

                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, reactive} from 'vue';

import {useAppStore} from '@/stores/index';
import VueCollapsible from 'vue-height-collapsible/vue3';
import {useUserStore} from "../../stores/user-store";
import { useI18n } from 'vue-i18n';
import appSetting from '@/app-setting';
const store = useAppStore();
const activeDropdown: any = ref('');
const subActive: any = ref('');
const userStore = useUserStore();

// multi language
const i18n = reactive(useI18n());
const changeLanguage = (item: any) => {
    i18n.locale = item.code;
    appSetting.toggleLanguage(item);
};

onMounted(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const ul: any = selector.closest('ul.sub-menu');
        if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
            if (ele.length) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        }
    }
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>
