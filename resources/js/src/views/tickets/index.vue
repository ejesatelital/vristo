<template>
    <div>
        <div class="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full ">
            <div
                class="overlay bg-black/60 z-[5] w-full h-full absolute rounded-md hidden"
                :class="{ '!block xl:!hidden': isShowMailMenu }"
                @click="isShowMailMenu = !isShowMailMenu"
            ></div>

            <div
                class="panel xl:block p-4 dark:gray-50 w-[225px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden"
                :class="{ '!block': isShowMailMenu }"
            >
                <div class="flex flex-col h-full pb-16">
                    <div class="pb-5">
                        <button class="btn btn-primary w-full" type="button" @click="redirectToCreate">{{$t('create_ticket')}}</button>
                    </div>
                    <perfect-scrollbar
                        :options="{
                            swipeEasing: true,
                            wheelPropagation: false,
                        }"
                        class="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow"
                    >
                        <div class="space-y-1">
                            <button
                                type="button"
                                class="w-full flex items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                                :class="{
                                    'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': !isEdit && selectedTab === 'inbox',
                                }"
                                @click="tabChanged('inbox')"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0">
                                    <path
                                        opacity="0.5"
                                        d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                    <path
                                        d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                    />
                                </svg>

                                <div class="ltr:ml-3 rtl:mr-3">{{ $t("requests")}}</div>
                            </button>

                            <button
                                type="button"
                                class="w-full flex items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                                :class="{
                                    'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': !isEdit && selectedTab === 'mytickets',
                                }"
                                @click="tabChanged('mytickets')"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0">
                                    <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5"></circle>
                                    <path opacity="0.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="currentColor" stroke-width="1.5"></path>
                                </svg>

                                <div class="ltr:ml-3 rtl:mr-3">{{ $t("my_tickets") }}</div>
                            </button>

                        </div>
                    </perfect-scrollbar>
                </div>
            </div>

            <div v-show="!selectedTicket && !isEdit" class="panel p-0 flex-1 overflow-x-hidden h-full">
                <div class="xl:hidden flex justify-end items-center flex-wrap-reverse p-4">
                    <button type="button" class="hover:text-primary block ltr:mr-3 rtl:ml-3" @click="isShowMailMenu = !isShowMailMenu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                            <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            <path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                        </svg>
                    </button>
                </div>

                <div class="xl:hidden h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                <div class="flex flex-wrap items-center gap-4 mx-4 py-4 lg:justify-between">
                    <div class="dropdown">
                        <Popper
                            :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                            offsetDistance="0"
                            class="align-middle"
                        >
                        <div>
                            <button type="button" v-tippy:group class="hover:text-white flex items-center btn btn-outline-info gap-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                    <path d="M22 5.81445V6.50427C22 7.54211 22 8.06103 21.7404 8.49121C21.4808 8.92139 21.0065 9.18837 20.058 9.72234L17.145 11.3622C16.5085 11.7204 16.1903 11.8996 15.9625 12.0974C15.488 12.5093 15.1959 12.9933 15.0636 13.587C15 13.872 15 14.2056 15 14.8727V17.5422C15 19.4517 15 20.4064 14.3321 20.8242C13.6641 21.242 12.7248 20.8748 10.8462 20.1404C9.95128 19.7905 9.50385 19.6156 9.25192 19.2611C9 18.9065 9 18.4518 9 17.5422L9 14.8727C9 14.2056 9 13.872 8.93644 13.587C8.80408 12.9933 8.51199 12.5093 8.03751 12.0974C7.80967 11.8996 7.49146 11.7204 6.85504 11.3622L3.94202 9.72234C2.99347 9.18837 2.5192 8.92139 2.2596 8.49121C2 8.06103 2 7.54211 2 6.50427V5.81445" stroke="currentColor" stroke-width="1.5"/>
                                    <path opacity="0.5" d="M22 5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466" stroke="currentColor" stroke-width="1.5"/>
                                </svg>
                                {{ $t('filter_by') }}
                            </button>
                            <tippy target="group">{{ $t('states') }}</tippy>
                        </div>
                        <template #content="{ close }">
                                <ul @click="close()">
                                    <li>
                                        <a href="javascript:;" @click="filterByStatus([1,2,3])">
                                            <div class="w-2 h-2 rounded-full bg-dark ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                            {{ $t('not_filter') }}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="filterByStatus(1)">
                                            <div class="w-2 h-2 rounded-full bg-info ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                            {{ $t('open') }}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="filterByStatus(2)">
                                            <div class="w-2 h-2 rounded-full bg-primary ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                            {{ $t('in_progress') }}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="filterByStatus(3)">
                                            <div class="w-2 h-2 rounded-full bg-warning ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                            {{ $t('answered') }}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="filterByStatus(4)">
                                            <div class="w-2 h-2 rounded-full bg-success ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                            {{ $t('closed') }}
                                        </a>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                    <div class="flex gap-3">
                        <!-- Campo de búsqueda -->
                        <div class="relative max-w-xs w-full md:flex-1">
                            <input v-model="params.search" type="text" class="form-input w-full pr-10" placeholder="Buscar..."/>
                            <button v-if="params.search" @click="clearSearch" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                ✕
                            </button>
                        </div>
                        <!-- Campo de búsqueda por fecha -->
                        <div class="w-full md:w-auto md:flex-1">
                            <flat-pickr v-model="date" :config="rangeCalendar" @on-close="setRangeDate" class="form-input lg:w-[266px] text-center" placeholder="Buscar por fecha..."></flat-pickr>
                        </div>
                        <!-- Select columns -->
                        <div class="dropdown">
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="0" class="align-middle">
                                <button
                                    type="button"
                                    class="flex items-center border font-semibold border-[#e0e6ed] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                >
                                    <span class="ltr:mr-1 rtl:ml-1">Columnas</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                        <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <template #content>
                                    <ul class="whitespace-nowrap">
                                        <template v-for="(col, i) in cols" :key="i">
                                            <li>
                                                <div class="flex items-center px-4 py-1">
                                                    <label class="cursor-pointer mb-0">
                                                        <input
                                                            type="checkbox"
                                                            class="form-checkbox"
                                                            :id="`chk-${i}`"
                                                            :value="col.field"
                                                            @change="col.hide = !$event.target.checked"
                                                            :checked="!col.hide"
                                                        />
                                                        <span :for="`chk-${i}`" class="ltr:ml-2 rtl:mr-2">{{ col.title }}</span>
                                                    </label>
                                                </div>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                </div>

                <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

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
                        class="cursor-pointer"
                        skin="whitespace-nowrap bh-table-hover"
                        firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                        previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    >
                        <template #message="data">
                            <div @click="redirectToEdit(data.value.id)" class="flex flex-col gap-2">
                                <div class="flex items-center gap-2">
                                    <div
                                        class="group-hover:text-primary font-semibold text-base flex items-center gap-1"
                                        :class="`${data.value.status_id == 4 ? 'text-white-dark':''}`"
                                    >
                                        {{ data.value.requester.first_name ?? '' }} {{ data.value.requester.last_name ?? '' }}
                                        <span class="text-white-dark overflow-hidden max-w-[500px] whitespace-nowrap text-ellipsis">
                                            - {{ data.value.subject }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #status="data">
                            <div v-if="data.value.status">
                                <span class="badge" :class="`badge-outline-${data.value.status_class}`">
                                    {{ data.value.status }}
                                </span>
                            </div>
                        </template>

                        <template #responsible="data">
                            <div class="flex items-center">
                                {{ data.value.responsible?.first_name ?? '' }} {{ data.value.responsible?.last_name ?? '' }}
                            </div>
                        </template>

                        <template #actions="data">
                            <div class="flex items-center justify-between w-max" v-if="data.value.status_id != 4">
                                <div class="dropdown">
                                    <Popper
                                        :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                        offsetDistance="0"
                                        class="align-middle"
                                    >
                                        <a href="javascript:;">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-5 h-5 rotate-90 opacity-70"
                                            >
                                                <circle cx="5" cy="12" r="2" stroke="currentColor" stroke-width="1.5"></circle>
                                                <circle
                                                    opacity="0.5"
                                                    cx="12"
                                                    cy="12"
                                                    r="2"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                ></circle>
                                                <circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="1.5"></circle>
                                            </svg>
                                        </a>
                                        <template #content="{ close }">
                                            <ul @click="close()" class="whitespace-nowrap">
                                                <li>
                                                    <a href="javascript:;" class="w-full gap-2 text-primary" @click="openResponsibleModal(data.value)">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                                            <path d="M9.5 14C11.1569 14 12.5 15.3431 12.5 17C12.5 18.6568 11.1569 20 9.5 20C7.84315 20 6.5 18.6568 6.5 17C6.5 15.3431 7.84315 14 9.5 14Z" stroke="currentColor" stroke-width="1.5"/>
                                                            <path d="M14.5 3.99998C12.8431 3.99998 11.5 5.34312 11.5 6.99998C11.5 8.65683 12.8431 9.99998 14.5 9.99998C16.1569 9.99998 17.5 8.65683 17.5 6.99998C17.5 5.34312 16.1569 3.99998 14.5 3.99998Z" stroke="currentColor" stroke-width="1.5"/>
                                                            <path opacity="0.5" d="M13 17L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                            <path opacity="0.5" d="M11 7L2 6.9585" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                            <path opacity="0.5" d="M2 17L6 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                            <path opacity="0.5" d="M22 7L18 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        </svg>
                                                       {{ data.value.assigned_id ? 'Reasignar ticket':'Asignar ticket' }}
                                                    </a>
                                                </li>
                                                <li v-if="data.value.user_id == userStore.id">
                                                    <a href="javascript:;" class="w-full text-success gap-2" @click="setStatus(data.value.id, 4)">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                                            <path opacity="0.5" d="M12 2L12 10M12 10L15 7M12 10L9 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path opacity="0.5" d="M2 13H5.16026C6.06543 13 6.51802 13 6.91584 13.183C7.31367 13.3659 7.60821 13.7096 8.19729 14.3968L8.80271 15.1032C9.39179 15.7904 9.68633 16.1341 10.0842 16.317C10.482 16.5 10.9346 16.5 11.8397 16.5H12.1603C13.0654 16.5 13.518 16.5 13.9158 16.317C14.3137 16.1341 14.6082 15.7904 15.1973 15.1032L15.8027 14.3968C16.3918 13.7096 16.6863 13.3659 17.0842 13.183C17.482 13 17.9346 13 18.8397 13H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                            <path d="M17 2.12695C18.6251 2.28681 19.7191 2.64808 20.5355 3.46455C22 4.92902 22 7.28604 22 12.0001C22 16.7141 22 19.0712 20.5355 20.5356C19.0711 22.0001 16.714 22.0001 12 22.0001C7.28595 22.0001 4.92893 22.0001 3.46447 20.5356C2 19.0712 2 16.7141 2 12.0001C2 7.28604 2 4.92902 3.46447 3.46455C4.28094 2.64808 5.37486 2.28681 7 2.12695" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        </svg>
                                                        {{$t('close_ticket')}}
                                                    </a>
                                                </li>
                                                <li v-if="data.value.user_id == userStore.id && data.value.responses.length == 0">
                                                    <a href="javascript:;" @click="deleteRow(data.value.id)" class="text-danger">
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0"
                                                        >
                                                            <path
                                                                d="M20.5001 6H3.5"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                            ></path>
                                                            <path
                                                                d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                            ></path>
                                                            <path
                                                                opacity="0.5"
                                                                d="M9.5 11L10 16"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                            ></path>
                                                            <path
                                                                opacity="0.5"
                                                                d="M14.5 11L14 16"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                                stroke-linecap="round"
                                                            ></path>
                                                            <path
                                                                opacity="0.5"
                                                                d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                                                stroke="currentColor"
                                                                stroke-width="1.5"
                                                            ></path>
                                                        </svg>
                                                        Delete
                                                    </a>
                                                </li>
                                            </ul>
                                        </template>
                                    </Popper>
                                </div>
                            </div>
                        </template>
                    </vue3-datatable>
                </div>
            </div>

        </div>

        <!-- add project modal -->
        <TransitionRoot appear :show="isResponsibleModal" as="template">
            <Dialog as="div" @close="closeResponsibleModal()" class="relative z-[51]">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
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
                            <DialogPanel class="panel border-0 p-0 w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="closeResponsibleModal()"
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
                                <div class="text-lg rounded-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                   Asignar responsable
                                </div>
                                <div class="p-5">
                                    <form @submit.prevent="saveResponsible">

                                        <div class="">
                                            <Select
                                            :options="roles"
                                            v-model="rolSelected"
                                            titleSelect="Area"
                                            name="roles"
                                            @update:modelValue="getUsersByRol"
                                            />
                                        </div>

                                        <div class="mt-2">
                                            <Select
                                            :options="usersByRol"
                                            v-model="userByRolSelected"
                                            titleSelect="Colaboradores"
                                            name="usersByRol"
                                            />
                                        </div>

                                        <div class="flex justify-end items-center mt-8">
                                            <button type="button" class="btn btn-outline-danger" @click="closeResponsibleModal()">Cancelar</button>
                                            <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">Asignar</button>
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
    import { ref, onMounted, reactive } from 'vue';
    import { Disclosure, DisclosureButton, DisclosurePanel, TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import { API } from '@/services/local';
    import Select from '@/components/partials/Select.vue';
    import { useUserStore } from "../../stores/user-store";
    import { NOTIFY } from '@/services/notify';
    import moment from 'moment';
    import { useRouter } from 'vue-router';

    useMeta({ title: 'Tickets' });
    const roles = ref();
    const usersByRol = ref();
    const rolSelected = ref();
    const userByRolSelected = ref();
    const ticketId: any = ref(null);
    const userStore = useUserStore();
    const api = new API();
    const notify = new NOTIFY();
    const store = useAppStore();
    const loading = ref(true);
    const rangeCalendar: any = ref({
        mode: 'range',
        dateFormat: 'Y-m-d',
        position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left'
    });
    const rows: any = ref(null);
    const cols = ref([
        { field: 'id', title: 'ID', sort: false, width: '20px', hide: false},
        { field: 'message', title: 'Solicitudes', width: '400px', headerClass: 'justify-center', hide: false},
        { field: 'status', title: 'Estado', headerClass: 'justify-center', hide: false },
        { field: 'priority', title: 'Prioridad', headerClass: 'justify-center', hide: false },
        { field: 'area.name', title: 'Area asignada', headerClass: 'justify-center', hide: true },
        { field: 'responsible', title: 'Responsable', headerClass: 'justify-center', hide: false },
        { field: 'updated_at_text', title: 'Ultima actualización', headerClass: 'justify-center', hide: true },
        { field: 'created_at', title: 'Creado el', headerClass: 'justify-center', hide: true },
        { field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center', hide: false },
    ]);
    let timer: any;
    const total_rows = ref(0);

    const date = ref([moment().startOf('month').toDate(), moment().toDate()]);
    const params = reactive({
        current_page: 1,
        pagesize: 10,
        column_filters: [],
        sort_column: 'id',
        sort_direction: 'desc',
        search: null,
        date:{from: moment().startOf('month').format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD')},
        status:[1,2,3],
        user_id: null
    });

    const isShowMailMenu = ref(false);
    const isEdit = ref(false);
    const selectedTab = ref('inbox');
    const selectedTicket: any = ref(null);
    const isResponsibleModal = ref(false);
    const router = useRouter();
    const openResponsibleModal = (selectedTicket: any = null) => {

        if(selectedTicket.area){
            rolSelected.value = {
                label: selectedTicket.area.name,
                value: selectedTicket.area.id
            };
            getUsersByRol();
        }

        if(selectedTicket.responsible){
            userByRolSelected.value = {
                label: selectedTicket.responsible.first_name+' '+selectedTicket.responsible.last_name,
                value: selectedTicket.responsible.id
            }
        }
        ticketId.value = selectedTicket.id;
        isResponsibleModal.value = true;
    };

    const closeResponsibleModal = () => {
        isResponsibleModal.value = false;
        ticketId.value = null;
    };

    const saveResponsible = async () => {

        if (!rolSelected.value) {
            notify.showToast('Debes asignar un área al caso.', 'warning');
            return false;
        }

        let obj: any = {
            rol_id: rolSelected.value.value,
            assigned_id: userByRolSelected.value?.value || null
        };

        try {
            const isConfirmed = await notify.showConfirm(
                'Confirmar Envío',
                '¿Estás seguro de que deseas asignar este caso?',
                'question',
                'Sí, enviar',
                'Cancelar'
            );
            if (isConfirmed) {
                await api.put(`tickets/v1/tickets/${ticketId.value}`, obj, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                notify.showToast('Ticket asignado exitosamente', 'success');
                getData();
            } else {
                notify.showToast('Operación cancelada', 'info');
            }
        } catch (error) {
            console.error('Error fetching data', error);
            notify.showToast('Error al asignar el ticket', 'error');
        }
        closeResponsibleModal();
    };

    const tabChanged = (tabType: any) => {
        isEdit.value = false;
        selectedTab.value = tabType;
        isShowMailMenu.value = false;
        getTicketsTab();
    };

    const getTicketsTab = () => {
        if (selectedTab.value === 'inbox') {
            params.user_id = null;
            getData()
        } else if (selectedTab.value === 'mytickets') {
            params.user_id = userStore.id;
            changeServer(params);
        }
    };

    const filterByStatus = (status: any) => {
        params.status = status;
        changeServer(params);
    };

    const setRangeDate = (value: any) => {
        params.date = {
            from: moment(value[0]).format('YYYY-MM-DD'),
            to: moment(value[1]).format('YYYY-MM-DD')
        };
        params.current_page = 1;
        changeServer(params);
    };

    const redirectToCreate = () => {
        router.push({ name: 'tickets-create' });
    };

    const redirectToEdit = (id: number) => {
        router.push({ name: 'tickets-edit', params: { id }});
    };

    const changeServer = (data: any) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;
        params.sort_column = data.sort_column;
        params.sort_direction = data.sort_direction;

        if (data.change_type === 'search') {
            params.current_page = 1;
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
    };

    // Función para obtener los tickets
    const getData = async () => {
        try {
            loading.value = true;
            const response = await api.get(`tickets/v1/tickets?filter={"search":"${params.search}",
            "order":{"field":"${params.sort_column}","way":"${params.sort_direction}"},
            "date":{"from":"${params.date.from}","to":"${params.date.to}"},
            "status":[${params.status}],"user_id":"${params.user_id}"}&page=${params.current_page}&take=${params.pagesize}`);
            rows.value = response?.data;
            total_rows.value = response?.meta?.page?.total;
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            loading.value = false;
        }
    };

    // Función para eliminar un ticket solo sino tiene respuestas
    const deleteRow = (id: number) => {
        notify.showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer',
            'warning',
            'Sí, eliminar',
            'Cancelar'
            ).then(isConfirmed => {
            if (isConfirmed) {
                try {
                    api.delete(`tickets/v1/tickets/${id}`);
                    getData();
                    notify.showToast('Registro eliminado exitosamente!', 'success');
                } catch (error) {
                    const errorMessage = error.response?.data?.errors ?? 'Ocurrió un error al eliminar el registro.';
                    notify.showToast(errorMessage, 'error');
                }
            }
            else{
                notify.showToast('Operación cancelada', 'info');
            }
        });
    };

    const setStatus = (id: number, status: number)  => {
        const data = {
            status: status
        };
        notify.showConfirm(
            '¿Estás seguro?',
            'Deseas cambiar el estado del ticket?',
            'warning',
            'Sí, Actualizar',
            'Cancelar'
            ).then(isConfirmed => {
            if (isConfirmed) {
                api.put(`tickets/v1/tickets/${id}`, data)
                .then(async response => {
                    await getData();
                    notify.showToast('Registro actualizado exitosamente!', 'success');
                })
                .catch(error => {
                    console.log(error);
                    // Mostrar el mensaje de error devuelto por el controlador
                    const errorMessage = error.response?.data?.errors ?? 'Ocurrió un error al actualizar el registro.';
                    notify.showToast(errorMessage, 'warning');
                });
            }
        });
    }

    const getRoles = async () =>
    {
        const response = await api.get(`user/roles`);
        if (response) {
            roles.value = response.data
            // .filter((x: any) => x.id >= 5 && x.id <= 9)
            .map(function (x: any) {
                return {
                    label: x.name,
                    value: x.id
                }
            })
        }
    }

    // Función para obtener los tickets
    const getUsersByRol = async () => {
        try {
            userByRolSelected.value = null;
            const responseUsersByRol = await api.get(`user/users?page=${params.current_page}&per_page=${params.pagesize}&roles=[${rolSelected.value.value}]`);
            if (responseUsersByRol) {
                usersByRol.value = responseUsersByRol.data
                // .filter((x: any) => x.id >= 5 && x.id <= 9)
                .map(function (x: any) {
                    return {
                        label: x.first_name+' '+x.last_name,
                        value: x.id
                    }
                })
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    // Lógica que corre cuando el componente es montado
    onMounted(async () => {
       await getData();
       await getRoles();
    });
</script>
