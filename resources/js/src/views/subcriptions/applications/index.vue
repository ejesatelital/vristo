<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Aplicaciones</span>
            </li>
        </ul>


        <div class="mt-5 panel p-0 border-0 overflow-hidden">
            <div class="flex items-center justify-between gap-4 p-5">
                <h2 class="text-xl text-bold"> {{ $t('applications') }}</h2>
                <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div class="flex gap-3">
                        <div>
                            <button type="button" class="btn btn-primary" @click="addApplicationModal=true">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2">
                                    <circle cx="10" cy="6" r="4" stroke="currentColor" stroke-width="1.5"/>
                                    <path
                                        opacity="0.5"
                                        d="M18 17.5C18 19.9853 18 22 10 22C2 22 2 19.9853 2 17.5C2 15.0147 5.58172 13 10 13C14.4183 13 18 15.0147 18 17.5Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                    <path d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12" stroke="currentColor"
                                          stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                Nueva App
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                class="btn btn-outline-primary p-2"
                                :class="{ 'bg-primary text-white': displayType === 'list' }"
                                @click="displayType = 'list'"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                    <path d="M2 5.5L3.21429 7L7.5 3" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                    <path
                                        opacity="0.5"
                                        d="M2 12.5L3.21429 14L7.5 10"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path d="M2 19.5L3.21429 21L7.5 17" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M22 19L12 19" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"/>
                                    <path opacity="0.5" d="M22 12L12 12" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"/>
                                    <path d="M22 5L12 5" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                class="btn btn-outline-primary p-2"
                                :class="{ 'bg-primary text-white': displayType === 'grid' }"
                                @click="displayType = 'grid'"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                    <path
                                        opacity="0.5"
                                        d="M2.5 6.5C2.5 4.61438 2.5 3.67157 3.08579 3.08579C3.67157 2.5 4.61438 2.5 6.5 2.5C8.38562 2.5 9.32843 2.5 9.91421 3.08579C10.5 3.67157 10.5 4.61438 10.5 6.5C10.5 8.38562 10.5 9.32843 9.91421 9.91421C9.32843 10.5 8.38562 10.5 6.5 10.5C4.61438 10.5 3.67157 10.5 3.08579 9.91421C2.5 9.32843 2.5 8.38562 2.5 6.5Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M13.5 17.5C13.5 15.6144 13.5 14.6716 14.0858 14.0858C14.6716 13.5 15.6144 13.5 17.5 13.5C19.3856 13.5 20.3284 13.5 20.9142 14.0858C21.5 14.6716 21.5 15.6144 21.5 17.5C21.5 19.3856 21.5 20.3284 20.9142 20.9142C20.3284 21.5 19.3856 21.5 17.5 21.5C15.6144 21.5 14.6716 21.5 14.0858 20.9142C13.5 20.3284 13.5 19.3856 13.5 17.5Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        d="M2.5 17.5C2.5 15.6144 2.5 14.6716 3.08579 14.0858C3.67157 13.5 4.61438 13.5 6.5 13.5C8.38562 13.5 9.32843 13.5 9.91421 14.0858C10.5 14.6716 10.5 15.6144 10.5 17.5C10.5 19.3856 10.5 20.3284 9.91421 20.9142C9.32843 21.5 8.38562 21.5 6.5 21.5C4.61438 21.5 3.67157 21.5 3.08579 20.9142C2.5 20.3284 2.5 19.3856 2.5 17.5Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        d="M13.5 6.5C13.5 4.61438 13.5 3.67157 14.0858 3.08579C14.6716 2.5 15.6144 2.5 17.5 2.5C19.3856 2.5 20.3284 2.5 20.9142 3.08579C21.5 3.67157 21.5 4.61438 21.5 6.5C21.5 8.38562 21.5 9.32843 20.9142 9.91421C20.3284 10.5 19.3856 10.5 17.5 10.5C15.6144 10.5 14.6716 10.5 14.0858 9.91421C13.5 9.32843 13.5 8.38562 13.5 6.5Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="relative">
                        <input v-model="params.search" type="text"
                               class="form-input py-2 ltr:pr-11 rtl:pl-11 peer w-full pr-10" placeholder="Buscar..."
                               @input="handleInput"/>
                        <button v-if="params.search" @click="clearSearch"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ✕
                        </button>
                        <div v-else
                             class="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5"
                                        opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5"
                                      stroke-linecap="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <template v-if="displayType === 'list'">
                <div class="datatable">
                    <vue3-datatable
                        :rows="rows"
                        :columns="cols"
                        :loading="loading"
                        :totalRows="total_rows"
                        :isServerMode="true"
                        :sortable="true"
                        :sortColumn="params.sort_column"
                        :sortDirection="params.sort_direction"
                        :pageSize="params.pagesize"
                        :search="params.search"
                        @change="changeServer"
                        skin="whitespace-nowrap bh-table-hover"
                        firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                        previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    >
                        <template #name="data">
                            <div class="flex items-center w-max">
                                <div v-show="data.value.cover" class="w-max">
                                    <img
                                        :src="`/assets/images/${data.value.cover}`"
                                        class="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                        alt="avatar"
                                    />
                                </div>
                                <div
                                    v-show="!data.value.cover && data.value.name"
                                    class="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full text-white text-sm font-semibold"
                                    :style="{ backgroundColor: data.value.color }"
                                >
                                    {{ data.value.name ? data.value.name.charAt(0) : '' }}
                                </div>
                                <div
                                    v-show="!data.value.cover && !data.value.name"
                                    class="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4.5 h-4.5"
                                    >
                                        <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5"></circle>
                                        <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor"
                                                 stroke-width="1.5"></ellipse>
                                    </svg>
                                </div>
                                <div>{{ data.value.name ?? null }}</div>
                            </div>
                        </template>
                        <template #actions="data">
                            <div class="flex justify-center gap-3">
                                <!-- <template v-if="userStore.hasAccess('sass.companies.edit')"> -->
                                <button type="button" class="btn btn-sm btn-info" v-tippy:edit
                                        @click="editApplication(data.value)">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path
                                            d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                    </svg>
                                </button>
                                <tippy target="edit">edit</tippy>
                                <!-- </template> -->

                                <!-- <template v-if="userStore.hasAccess('sass.companies.destroy')"> -->
                                <button type="button" class="btn btn-sm btn-danger" v-tippy:delete
                                        @click="deleteApplication(data.value.id)">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5"
                                              stroke-linecap="round"></path>
                                        <path
                                            d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5"
                                              stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5"
                                              stroke-linecap="round"></path>
                                        <path opacity="0.5"
                                              d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                              stroke="currentColor" stroke-width="1.5"></path>
                                    </svg>
                                </button>
                                <tippy target="delete">borrar</tippy>
                                <!-- </template> -->

                            </div>
                        </template>
                    </vue3-datatable>
                </div>
            </template>
        </div>

        <template v-if="displayType === 'grid'">
            <div class="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full">
                <template v-for="app in rows" :key="app.id">
                    <div class="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                        <div
                            class="bg-white/40 rounded-t-md bg-[url('/assets/images/notification-bg.png')] bg-center bg-cover p-6 pb-0">
                            <template v-if="app.path">
                                <img class="object-contain w-4/5 max-h-40 mx-auto"
                                     :src="`/assets/images/profile-35.png`"/>
                            </template>
                        </div>
                        <div class="px-6 pb-24 -mt-10 relative">
                            <div class="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                                <div class="flex items-center justify-center flex-wrap ">
                                    <div v-show="app.cover" class="w-max">
                                        <img
                                            :src="`/assets/images/${app.cover}`"
                                            class="h-10 w-10 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                            alt="avatar"
                                        />
                                    </div>
                                    <div
                                        v-show="!app.cover && app.name"
                                        class="grid place-content-center h-10 w-10 ltr:mr-2 rtl:ml-2 rounded-full text-white text-sm font-semibold"
                                        :style="{ backgroundColor: app.color }"
                                    >
                                        {{ app.name ? app.name.charAt(0) : '' }}
                                    </div>
                                    <div
                                        v-show="!app.cover && !app.name"
                                        class="border border-gray-300 dark:border-gray-800 rounded-full grid place-content-center h-10 w-10 ltr:mr-2 rtl:ml-2"
                                    >
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-4.5 h-4.5"
                                        >
                                            <circle cx="12" cy="6" r="4" stroke="currentColor"
                                                    stroke-width="1.5"></circle>
                                            <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor"
                                                     stroke-width="1.5"></ellipse>
                                        </svg>
                                    </div>
                                </div>

                                <div class="text-xl">{{ app.name }}</div>
                                <div class="text-white-dark">
                                    <a :href="app.url" target="_blank">{{ app.url }}</a>
                                </div>
                            </div>
                            <div class="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                <div class="flex items-center">
                                    <div class="text-white-dark">{{ app.description }}</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="flex-none ltr:mr-2 rtl:ml-2">Versión:</div>
                                    <div class="text-white-dark">{{ app.version ?? null }}</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="flex-none ltr:mr-2 rtl:ml-2">Creado el:</div>
                                    <div class="text-white-dark">{{ app.created_at ?? null }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                            <!-- <template v-if="userStore.hasAccess('sass.companies.edit')"> -->
                            <button type="button" class="btn btn-outline-info w-1/2" v-tippy:edit
                                    @click="editApplication(app)">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                    <path
                                        d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                </svg>
                            </button>
                            <tippy target="edit">Editar</tippy>
                            <!-- </template> -->

                            <!-- <template v-if="userStore.hasAccess('sass.companies.destroy')"> -->
                            <button type="button" class="btn btn-outline-danger w-1/2" v-tippy:delete
                                    @click="deleteApplication(app.id)">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                    <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"></path>
                                    <path
                                        d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"></path>
                                    <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round"></path>
                                    <path opacity="0.5"
                                          d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                          stroke="currentColor" stroke-width="1.5"></path>
                                </svg>
                            </button>
                            <tippy target="delete">Borrar</tippy>
                            <!-- </template> -->
                        </div>
                    </div>
                </template>
            </div>
        </template>

        <!-- add contact modal -->
        <TransitionRoot appear :show="addApplicationModal" as="template">
            <Dialog as="div" @close="addApplicationModal = false" class="relative z-50">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-[black]/60"/>
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel
                                class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="addApplicationModal = false"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="w-6 h-6"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                                <div
                                    class="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                    {{ app.id ? 'Editar Aplicación' : 'Agregar Aplicación' }}
                                </div>
                                <div class="p-5">
                                    <form @submit.prevent="saveApplication">
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-3/12 mb-5">
                                                <div class="mb-5">
                                                    <label for="name">Logo</label>
                                                    <img src="/assets//images/profile-34.jpeg" alt=""
                                                         class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"/>
                                                </div>
                                                <div class="mb-5">
                                                    <label for="name">Cover</label>
                                                    <img src="/assets//images/profile-34.jpeg" alt=""
                                                         class="w-40 h-30 md:w-40 md:h-30 object-cover mx-auto"/>
                                                </div>
                                                <div class="mb-5 ">
                                                    <label for="name">Color</label>
                                                    <div class="panel p-2.5 rounded-md flex items-center group"
                                                         @click="colorChange">
                                                        <div
                                                            class="w-20 h-[84px] -m-2.5 ltr:mr-4 rtl:ml-4 ltr:rounded-l-md rtl:rounded-r-md transition-all duration-700 group-hover:scale-110"
                                                            :style="`background-color:${app.color}`"></div>
                                                        <div><h5 class="text-sm sm:text-base">Color</h5><span
                                                            class="text-white-dark">{{ app.color }}</span><input
                                                            id="color" type="color" v-model="app.color"
                                                            style="visibility: hidden"/></div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div class="flex-1 grid grid-cols-1 gap-5">
                                                <div class="mb-5">
                                                    <label for="name">Nombre *</label>
                                                    <input id="name" type="text" placeholder="Enter Name"
                                                           class="form-input" v-model="app.name" required/>
                                                </div>
                                                <div class="mb-5">
                                                    <label for="description">Descripción</label>
                                                    <textarea
                                                        id="address"
                                                        rows="3"
                                                        placeholder="Enter Address"
                                                        class="form-textarea resize-none min-h-[100px]"
                                                        v-model="app.description"
                                                    ></textarea>
                                                </div>
                                                <div class="mb-5">
                                                    <label for="url">URL</label>
                                                    <input id="url" type="text" placeholder="Enter url"
                                                           class="form-input" v-model="app.url"/>
                                                </div>
                                                <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-5">
                                                    <div class="mb-5">
                                                        <label for="number">Versión</label>
                                                        <input id="number" type="text"
                                                               placeholder="Enter version Number"
                                                               class="form-input" v-model="app.version"/>
                                                    </div>
                                                    <div class="mb-5">
                                                        <label for="number">Modulo</label>
                                                        <input id="number" type="text" placeholder="Nombre del Modulo"
                                                               class="form-input" v-model="app.model"/>
                                                    </div>
                                                    <div class="mb-5">
                                                        <label for="number">Entidad</label>
                                                        <input id="number" type="text" placeholder="Nombre del Modulo"
                                                               class="form-input" v-model="app.entity"/>
                                                    </div>
                                                </div>
                                                <div class="mb-5">
                                                    <label for="dateEnd">Lista de Permisos</label>
                                                    <div class="mb-5">
                                                        <div class="flex">
                                                            <input id="newCheckList" type="text"
                                                                   v-model="newPermissionsList"
                                                                   placeholder=""
                                                                   class="form-input ltr:rounded-r-none rtl:rounded-l-none"/>
                                                            <button type="button"
                                                                    class="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none"
                                                                    @click="addPermissionsList">Agregar
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="flex flex-col rounded-md border border-[#e0e6ed] dark:border-[#1b2e4b]">
                                                        <div v-for="(item , i) in app.permissions" :key="i"
                                                             class="flex space-x-4 rtl:space-x-reverse border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                                            <label for="tack_checkbox1" class="mb-0 cursor-pointer"
                                                            >{{ item.label }}
                                                                <button
                                                                    class="badge bg-danger my-auto ltr:ml-auto rtl:mr-auto hover:top-0 align-content-between"
                                                                    @click="deletePermissionsList(item.id)">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="24px"
                                                                        height="24px"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        stroke-width="1.5"
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        class="w-6 h-6"
                                                                    >
                                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                    </svg>
                                                                </button>
                                                            </label
                                                            >
                                                        </div>
                                                    </div>
                                                    <div class="text-danger mt-2" id="endDateErr"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex justify-end items-center mt-8">
                                            <button type="button" class="btn btn-outline-danger"
                                                    @click="addApplicationModal = false">Cancelar
                                            </button>
                                            <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Guardar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<script lang="ts" setup>
import {ref, onMounted, reactive, watch} from 'vue';
import {TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay} from '@headlessui/vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import Swal from 'sweetalert2';
import {useMeta} from '@/composables/use-meta';
import {useAppStore} from '@/stores/index';
import {useI18n} from 'vue-i18n';
import {API} from '@/services/api';
import {useCompanyStore} from "@/stores/company-store";

const modal2 = ref(false);

useMeta({title: 'Applications'});
const companyStore = useCompanyStore();
const loading = ref(true);
const store = useAppStore();
// multi language
const i18n = reactive(useI18n());

const api = new API();

const cols = ref([
    {field: 'id', title: 'Id', width: '50px'},
    {field: 'name', title: 'Nombre'},
    {field: 'description', title: 'Descripción'},
    {field: 'url', title: 'Url'},
    {field: 'version', title: 'Versión'},
    {field: 'created_at', title: 'Creado el'},
    {field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center'},
]);
const rows: any = ref(null);
const total_rows = ref(0);

const params = reactive({
    current_page: 1,
    pagesize: 10,
    column_filters: [],
    sort_column: 'id',
    sort_direction: 'desc',
    search: null
});

let timer: any;

const app = ref({
    id: null,
    name: '',
    description: '',
    media_single: [{zone: 'cover', image: {}}, {zone: 'logo', image: {}}],

    version: '',
    model: '',
    entity: '',
    color: '#2196f3',
    status: 1,
    url: '',
    logo: '/assets/images/file-preview.svg',
    cover:'/assets/images/file-preview.svg',
    permissions: [],

});

const displayType = ref('list');
const addApplicationModal = ref(false);
const newPermissionsList = ref()
const addPermissionsList = () => {
    if (!newPermissionsList.value) {
        return true;
    }
    const data = {
        id: app.value.permissions.length + 1,
        label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.${newPermissionsList.value.toLowerCase()}`
    }
    app.value.permissions.push(data)
    newPermissionsList.value = null
}
const deletePermissionsList = (id) => {
    const items = <any>[]
    app.value.permissions.map(function (x: any) {
        if (x.id === id) {
            return null
        } else {
            items.push(x)
            return x
        }
    })
    app.value.permissions = items
}

const editApplication = (item: any = null) => {
    app.value = item;
    addApplicationModal.value = true;
};


const saveApplication = async () => {
    let application = {
        name: app.value.name,
        description: app.value.description,
        permissions: app.value.permissions,
        version: app.value.version,
        color: app.value.color,
        status: app.value.status,
        url: app.value.url
    };
    if (app.value.id) {
        //update user
        try {
            loading.value = true;
            const response = await api.put(`subscriptions/v1/applications/${app.value.id}`, application)
            getData();
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            loading.value = false;
        }
    } else {
        //add user
        try {
            loading.value = true;
            const response = await api.post(`subscriptions/v1/applications`, application)
            getData();
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            loading.value = false;
        }
    }

    showMessage('La solicitud se ha guardado correctamente.');
    addApplicationModal.value = false;
};

const deleteApplication = (id: number) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            api.delete(`subscriptions/v1/applications/${id}`)
                .then(async response => {
                    await getData();
                    showMessage('La solicitud se ha guardado correctamente.');
                })
                .catch(error => {
                    showMessage('Hubo un problema al eliminar la empresa.', 'error');
                });
        }
    });
};

const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: {container: 'toast'},
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};

const getData = async () => {
    try {
        loading.value = true;
        const response = await api.get(`subscriptions/v1/applications?filter={"search":"${params.search}"}&page=${params.current_page}&take=${params.pagesize}`)
        rows.value = response?.data
        total_rows.value = response?.meta?.page?.total;
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
}

const changeServer = (data: any) => {
    params.current_page = data.current_page;
    params.pagesize = data.pagesize;
    params.sort_column = data.sort_column;
    params.sort_direction = data.sort_direction;
    if (data.change_type === 'search') {
        clearTimeout(timer);
        timer = setTimeout(() => {
            getData();
        }, 500);
    } else {
        getData();
    }
};

const clearSearch = () => {
    params.search = null;
    clearTimeout(timer);
    getData();
};

const image = ref();

const uploadedFile = ref({
    file: '',
    app_id: app.value.id,
    pathOld: app.value.logo
});

const handleFileUpload = async (event) => {
    try {
        loading.value = true
        uploadedFile.value.file = event.target.files[0];
        let formData = new FormData();
        formData.append('file', uploadedFile.value.file);
        formData.append('app_id', uploadedFile.value.app_id);
        formData.append('pathOld', uploadedFile.value.pathOld);
        const response = await api.post(`sass/v1/companies/images`, formData);
        app.value.logo = response.data.data.link;
        image.value = response.data.data.url;
        loading.value = false
    } catch (e) {
        console.log(e)
        loading.value = false
    }
};


onMounted(async () => {
    await getData();

});

const colorChange = () => {
    const color = document.getElementById('color');
    color.click();
}
watch(() => app.value.model, (value) => {
    if (app.value.permissions.length < 1) {
        app.value.permissions = [
            {id: 1, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.index`},
            {id: 2, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.create`},
            {id: 3, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.edit`},
            {id: 4, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.destroy`}
        ]
    } else {
        app.value.permissions = app.value.permissions.map(x => {
            const permission= x.label.split(".")
            console.log(permission)
            return {id: x.id, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.${permission[2]}`}
        })
    }

});
watch(() => app.value.entity, (value) => {
    if (app.value.permissions.length < 1) {
        app.value.permissions = [
            {id: 1, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.index`},
            {id: 2, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.create`},
            {id: 3, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.edit`},
            {id: 4, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.destroy`}
        ]
    } else {
        app.value.permissions = app.value.permissions.map(x => {
            const permission= x.label.split(".")
            console.log(permission)
            return {id: x.id, label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.${permission[2]}`}
        })
    }
});
</script>
