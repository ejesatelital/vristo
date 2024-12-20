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
                        <button class="btn btn-primary w-full" type="button" @click="redirectToCreate">
                            {{ $t('create_ticket') }}
                        </button>
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
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0">
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

                                <div class="ltr:ml-3 rtl:mr-3">{{ $t("requests") }}</div>
                            </button>

                            <button
                                type="button"
                                class="w-full flex items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                                :class="{
                                    'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': !isEdit && selectedTab === 'mytickets',
                                }"
                                @click="tabChanged('mytickets')"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0">
                                    <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5"></circle>
                                    <path opacity="0.5"
                                          d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                          stroke="currentColor" stroke-width="1.5"></path>
                                </svg>

                                <div class="ltr:ml-3 rtl:mr-3">{{ $t("my_tickets") }}</div>
                            </button>

                        </div>
                    </perfect-scrollbar>
                </div>
            </div>

            <div v-show="!selectedTicket && !isEdit" class="panel p-0 flex-1 overflow-x-hidden h-full">
                <div class="xl:hidden flex justify-end items-center flex-wrap-reverse p-4">
                    <button type="button" class="hover:text-primary block ltr:mr-3 rtl:ml-3"
                            @click="isShowMailMenu = !isShowMailMenu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             class="w-6 h-6">
                            <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" stroke-width="1.5"
                                  stroke-linecap="round"></path>
                            <path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5"
                                  stroke-linecap="round"></path>
                        </svg>
                    </button>
                </div>

                <div class="xl:hidden h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                <div class="flex flex-wrap items-center gap-4 mx-4 py-4">
                    <!-- Select Check Status -->
                    <div class="dropdown">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'"
                                offsetDistance="0" class="align-middle">
                            <button
                                type="button"
                                class="flex items-center border font-semibold border-[#e0e6ed] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            >
                                <span class="ltr:mr-1 rtl:ml-1">Estados</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                    <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                            <template #content>
                                <ul class="whitespace-nowrap">
                                    <template v-for="(state, i) in states" :key="i">
                                        <li>
                                            <div class="flex items-center px-4 py-1">
                                                <label class="cursor-pointer mb-0">
                                                    <input
                                                        type="checkbox"
                                                        class="form-checkbox"
                                                        :class="`${state.class}`"
                                                        :id="`chk-state-${state.id}`"
                                                        :value="state.id"
                                                        v-model="selectedStates"
                                                    />
                                                    <span :for="`chk-state-${state.id}`" class="ltr:ml-2 rtl:mr-2">{{ state.name }}</span>
                                                </label>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                <!-- <div class="flex gap-3"> -->
                    <div class="flex items-end justify-end" v-if="selectedTab === 'inbox' && userStore.hasAccess('tickets.tickets.indexall')">
                        <label for="subject" class="me-3">Ver todos los tickets</label>
                        <label class="w-12 h-6 relative">
                            <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox4" v-model="allTickets" />
                            <span for="custom_switch_checkbox4" class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                        </label>
                    </div>
                    <!-- Campo de búsqueda -->
                    <div class="relative w-full md:w-auto md:flex-1">
                        <input v-model="params.search" type="text" class="form-input w-full pr-10"
                                placeholder="Buscar..."/>
                        <button v-if="params.search" @click="clearSearch"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ✕
                        </button>
                    </div>
                    <!-- Campo de búsqueda por fecha -->
                    <div class="w-full md:w-auto md:flex-1">
                        <flat-pickr v-model="date" :config="rangeCalendar" @on-close="setRangeDate"
                                    class="form-input lg:w-[266px]"
                                    placeholder="Buscar por fecha..."></flat-pickr>
                    </div>
                    <!-- Select columns -->
                    <div class="dropdown">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'"
                                offsetDistance="0" class="align-middle">
                            <button
                                type="button"
                                class="flex items-center border font-semibold border-[#e0e6ed] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            >
                                <span class="ltr:mr-1 rtl:ml-1">Columnas</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                    <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round"/>
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
                                                    <span :for="`chk-${i}`" class="ltr:ml-2 rtl:mr-2">{{
                                                            col.title
                                                        }}</span>
                                                </label>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                <!-- </div> -->
                </div>

                <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                <div class="datatable items-center gap-4 mx-4 py-4 lg:justify-between">
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
                                        class="font-semibold flex"
                                        :class="`${data.value.status_id == 4 ? 'text-white-dark':''}`"
                                    >
                                        <div
                                            v-tippy:priority
                                            class="w-3 h-3 rounded-full mt-1 me-3"
                                            :class="`bg-${data.value.priority_class}`"
                                        ></div>
                                        <tippy target="priority" class="capitalize">{{
                                                data.value.priority
                                            }}
                                        </tippy>
                                        {{ data.value.requester.full_name ?? '' }}
                                        <span
                                            class="text-white-dark overflow-hidden max-w-[500px] whitespace-nowrap text-ellipsis">
                                            - {{ data.value.subject }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </template>

                        <template #status="data">
                            <div v-if="data.value.status" class="text-center">
                                <span class="badge" :class="`badge-outline-${data.value.status_class}`">
                                    {{ data.value.status }}
                                </span>
                            </div>
                        </template>

                        <template #responsible="data">
                            <div class="flex items-center gap-2" v-if="data.value.responsible">
                                <img :src="data.value.responsible?.avatar ?? ''" class="w-9 h-9 rounded-full max-w-none" alt="user-profile">
                                <div class="font-semibold"> {{ data.value.responsible?.full_name ?? '' }}</div></div>
                        </template>

                        <template #created_at="data">
                            {{ formatDate(data.value.created_at) }}
                        </template>

                        <template #actions="data">
                            <div class="flex items-end w-max" v-if="data.value.status_id != 4">
                                <ul class="flex items-center justify-center gap-3">
                                    <li v-if="selectedTab === 'inbox' ">
                                        <a href="javascript:;" v-tippy:assigned_id
                                           @click="openResponsibleModal(data.value)">
                                            <svg v-if="data.value.assigned_id" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                 class="w-6 h-6">
                                                <circle cx="12" cy="6" r="4" stroke="currentColor"
                                                        stroke-width="1.5"></circle>
                                                <path opacity="0.5"
                                                      d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4"
                                                      stroke="currentColor" stroke-width="1.5"
                                                      stroke-linecap="round"></path>
                                                <path opacity="0.5"
                                                      d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4"
                                                      stroke="currentColor" stroke-width="1.5"
                                                      stroke-linecap="round"></path>
                                                <ellipse cx="12" cy="17" rx="6" ry="4" stroke="currentColor"
                                                         stroke-width="1.5"></ellipse>
                                                <path opacity="0.5"
                                                      d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14"
                                                      stroke="currentColor" stroke-width="1.5"
                                                      stroke-linecap="round"></path>
                                                <path opacity="0.5"
                                                      d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14"
                                                      stroke="currentColor" stroke-width="1.5"
                                                      stroke-linecap="round"></path>
                                            </svg>
                                            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"/>
                                                <path opacity="0.5"
                                                      d="M15.5841 20.4366C14.5358 20.7944 13.3099 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C14.6083 13 16.8834 13.8152 18.0877 15.024"
                                                      stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                                                <path d="M18 18.5C18.3905 18.8905 18.6095 19.1095 19 19.5L21 17"
                                                      stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"
                                                      stroke-linejoin="round"/>
                                            </svg>
                                        </a>
                                        <tippy target="assigned_id">
                                            {{ data.value.assigned_id ? 'Reasignar ticket' : 'Asignar ticket' }}
                                        </tippy>
                                    </li>
                                    <li v-if="data.value.user_id == userStore.id">
                                        <a href="javascript:;" v-tippy:close @click="setStatus(data.value.id, 4)">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-success"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5" d="M12 2L12 10M12 10L15 7M12 10L9 7"
                                                        stroke="currentColor" stroke-width="1.5"
                                                        stroke-linecap="round" stroke-linejoin="round"/>
                                                <path opacity="0.5"
                                                        d="M2 13H5.16026C6.06543 13 6.51802 13 6.91584 13.183C7.31367 13.3659 7.60821 13.7096 8.19729 14.3968L8.80271 15.1032C9.39179 15.7904 9.68633 16.1341 10.0842 16.317C10.482 16.5 10.9346 16.5 11.8397 16.5H12.1603C13.0654 16.5 13.518 16.5 13.9158 16.317C14.3137 16.1341 14.6082 15.7904 15.1973 15.1032L15.8027 14.3968C16.3918 13.7096 16.6863 13.3659 17.0842 13.183C17.482 13 17.9346 13 18.8397 13H22"
                                                        stroke="currentColor" stroke-width="1.5"
                                                        stroke-linecap="round"/>
                                                <path
                                                    d="M17 2.12695C18.6251 2.28681 19.7191 2.64808 20.5355 3.46455C22 4.92902 22 7.28604 22 12.0001C22 16.7141 22 19.0712 20.5355 20.5356C19.0711 22.0001 16.714 22.0001 12 22.0001C7.28595 22.0001 4.92893 22.0001 3.46447 20.5356C2 19.0712 2 16.7141 2 12.0001C2 7.28604 2 4.92902 3.46447 3.46455C4.28094 2.64808 5.37486 2.28681 7 2.12695"
                                                    stroke="currentColor" stroke-width="1.5"
                                                    stroke-linecap="round"/>
                                            </svg>
                                        </a>
                                        <tippy target="close">Cerrar Ticket</tippy>
                                    </li>
                                    <li v-if="data.value.user_id == userStore.id && data.value.responses.length == 0">
                                        <a href="javascript:;" v-tippy:delete @click="deleteRow(data.value.id)"
                                           class="text-danger">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
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
                                        </a>
                                        <tippy target="delete">Eliminar Ticket</tippy>
                                    </li>
                                </ul>
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
                                <div
                                    class="text-lg rounded-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
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
                                            <button type="button" class="btn btn-outline-danger"
                                                    @click="closeResponsibleModal()">Cancelar
                                            </button>
                                            <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">Asignar
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
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogOverlay
} from '@headlessui/vue';
import {quillEditor, Quill} from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import {useAppStore} from '@/stores/index';
import {useMeta} from '@/composables/use-meta';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {API} from '@/services/api';
import Select from '@/components/partials/Select.vue';
import {useUserStore} from "@/stores/user-store";
import {NOTIFY} from '@/services/notify';
import VueEasyLightbox from 'vue-easy-lightbox';
import {useRouter} from 'vue-router';
import {excludedEvents} from "vue-flatpickr-component/dist/types/events";
import moment from 'moment';
import 'moment/locale/es'
moment.locale('es');
moment.updateLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
    weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
});

useMeta({title: 'Tickets'});
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
const allTickets = ref(0)
const rangeCalendar = ref({
    mode: 'range',
    dateFormat: 'Y-m-d',
    position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left'
});
const rows: any = ref(null);
const states = ref([
    {id: 1,  name: 'Nuevo', class: 'text-info'},
    {id: 2,  name: 'En proceso', class: 'text-primary'},
    {id: 3,  name: 'Contestado', class: 'text-warning'},
    {id: 4,  name: 'Cerrado', class: 'text-success'}
])
const cols = ref([
    {field: 'id', title: 'ID', sort: false, width: '20px', hide: false},
    {field: 'message', title: 'Solicitudes', width: '400px', headerClass: 'justify-center', hide: false},
    {field: 'status', title: 'Estado', headerClass: 'justify-center', hide: false},
    {field: 'area.name', title: 'Area asignada', headerClass: 'justify-center', hide: true},
    {field: 'responsible', title: 'Responsable', headerClass: 'justify-center', hide: false},
    {field: 'updated_at_text', title: 'Ultima actualización', headerClass: 'justify-center', hide: true},
    {field: 'created_at', title: 'Creado el', headerClass: 'justify-center', hide: false},
    {field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center', hide: false},
]);
let timer: any;
const total_rows = ref(0);

const date = ref();
const params = reactive({
    current_page: 1,
    pagesize: 20,
    column_filters: [],
    sort_column: 'id',
    sort_direction: 'desc',
    search: null,
    date: {from: null, to: null},
    status: [1, 2, 3],
    assigned_id: userStore.id,
    rol_id: userStore.roles.map((x) => x.id),
    exclude_user_id: userStore.id,
    user_id: null
});
const selectedStates = ref([...params.status]);
watch(selectedStates, (newValues) => {
    params.status = newValues;
    getData();
});
const isShowMailMenu = ref(false);
const isEdit = ref(false);
const selectedTab = ref('inbox');
const selectedTicket: any = ref(null);
const isResponsibleModal = ref(false);
const router = useRouter();
const openResponsibleModal = (selectedTicket: any = null) => {

    if (selectedTicket.area) {
        rolSelected.value = {
            label: selectedTicket.area.name,
            value: selectedTicket.area.id
        };
        getUsersByRol();
    }

    if (selectedTicket.responsible) {
        userByRolSelected.value = {
            label: selectedTicket.responsible.first_name + ' ' + selectedTicket.responsible.last_name,
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

    let obj = {
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
            await api.put(`tickets/v1/tickets/${ticketId.value}`, obj);
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
        params.user_id = null
        params.rol_id = userStore.roles.map((x) => x.id)
        params.assigned_id = userStore.id
        params.exclude_user_id =userStore.id
    } else if (selectedTab.value === 'mytickets') {
        params.user_id = userStore.id
        params.rol_id = null
        params.assigned_id = null
        params.exclude_user_id =null
    }
    changeServer(params);
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
    router.push({name: 'tickets-create'});
};

const redirectToEdit = (id: number) => {
    router.push({name: 'tickets-edit', params: {id}});
};

const changeServer = (data: any) => {
    params.current_page = data.current_page;
    params.pagesize = data.pagesize;
    params.sort_column = data.sort_column;
    params.sort_direction = data.sort_direction;
    if(allTickets.value && selectedTab.value === 'inbox'){
        params.user_id = null;
        params.rol_id = null
        params.assigned_id = null
        params.exclude_user_id = userStore.id
    }else if (selectedTab.value === 'inbox') {
        params.user_id = null
        params.rol_id = userStore.roles.map((x) => x.id)
        params.assigned_id = userStore.id
        params.exclude_user_id = userStore.id
    }
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
watch( allTickets, (value) => {
    changeServer(params);
});
// Función para obtener los tickets
const getData = async () => {
    try {
        loading.value = true;
        const response = await api.get(`tickets/v1/tickets?filter={"search":"${params.search}",
            "order":{"field":"${params.sort_column}","way":"${params.sort_direction}"},
            "date":{"from":"${params.date.from}","to":"${params.date.to}"},
            "status":[${params.status}],"user_id":"${params.user_id}","rol_id":"${params.rol_id}","assigned_id":"${params.assigned_id}","exclude_user_id":"${params.exclude_user_id}"}&page=${params.current_page}&take=${params.pagesize}`);
        rows.value = response?.data;
        total_rows.value = response?.meta?.page?.total;
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
};

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
        } else {
            notify.showToast('Operación cancelada', 'info');
        }
    });
};

const setStatus = (id: number, status: number) => {
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

const getRoles = async () => {
    const response = await api.get(`user/roles?exclude=1,2,3`);
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
                .map(function (x: any) {
                    return {
                        label: x.full_name,
                        value: x.id
                    }
                })
        }
    } catch (error) {
        console.error('Error fetching data', error);
    }
};

function formatDate(date) {
    const inputDate = moment(date);
    const today = moment();

    if (inputDate.isSame(today, 'day')) {
        // If the date is equal to the current day, it returns only the time with am/pm
        return inputDate.format('hh:mm A');
    } else if (inputDate.isSame(today, 'year')) {
        // If the date is within the current year, show day and month
        return inputDate.format('DD-MMMM');
    } else {
        // If the date is more than a year ago or ahead, show day, month and year
        return inputDate.format('DD-MM-YYYY');
    }
}

// Lógica que corre cuando el componente es montado
onMounted(async () => {
    await getData();
    await getRoles();
});
</script>

<style>
.quill-editor {
    max-height: 200px;
    overflow-y: auto;
}

.quill-editor img {
    width: 15%;
}
</style>
