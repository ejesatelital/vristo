<template>
    <div>
        <div class="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full ">
            <div
                class="overlay bg-black/60 z-[5] w-full h-full absolute rounded-md hidden"
                :class="{ '!block xl:!hidden': isShowMailMenu }"
                @click="isShowMailMenu = !isShowMailMenu"
            ></div>

            <div
                class="panel xl:block p-4 dark:gray-50 w-[250px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden"
                :class="{ '!block': isShowMailMenu }"
            >
                <div class="flex flex-col h-full pb-16">
                    <div class="pb-5">
                        <button class="btn btn-primary w-full" type="button" @click="openTicket('add', null)">Nuevo ticket</button>
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
                                class="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                                :class="{
                                    'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': !isEdit && selectedTab === 'inbox',
                                }"
                                @click="tabChanged('inbox')"
                            >
                                <div class="flex items-center">
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

                                    <div class="ltr:ml-3 rtl:mr-3">Inbox</div>
                                </div>
                                <!-- <div class="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                                    {{ ticketList && ticketList.filter((d) => d.type == 'inbox').length }}
                                </div> -->
                            </button>

                            <button
                                type="button"
                                class="w-full flex items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                                :class="{
                                    'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]': !isEdit && selectedTab === 'important',
                                }"
                                @click="tabChanged('important')"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0">
                                    <path
                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                    />
                                </svg>

                                <div class="ltr:ml-3 rtl:mr-3">Important</div>
                            </button>

                        </div>
                    </perfect-scrollbar>
                </div>
            </div>

            <div class="panel p-0 flex-1 overflow-x-hidden h-full">
                <div v-show="!selectedTicket && !isEdit" class="flex flex-col h-full">
                    <div class="flex justify-between items-center flex-wrap-reverse gap-4 p-4">
                        <div class="flex items-center w-full sm:w-auto">
                            <ul class="flex grow items-center sm:flex-none gap-4 ltr:sm:mr-4 rtl:sm:ml-4">
                                <li>
                                    <div class="dropdown">
                                        <Popper
                                            :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                            offsetDistance="0"
                                            class="align-middle"
                                        >
                                            <div>
                                                <button type="button" v-tippy:group class="hover:text-primary flex items-center">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-5 h-5"
                                                    >
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                                        <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" />
                                                        <path opacity="0.5" d="M15 9L19 5" stroke="currentColor" stroke-width="1.5" />
                                                        <path opacity="0.5" d="M5 19L9 15" stroke="currentColor" stroke-width="1.5" />
                                                        <path opacity="0.5" d="M9 9L5 5" stroke="currentColor" stroke-width="1.5" />
                                                        <path opacity="0.5" d="M19 19L15 15" stroke="currentColor" stroke-width="1.5" />
                                                    </svg>
                                                </button>
                                                <tippy target="group">Asignar a</tippy>
                                            </div>
                                            <template #content="{ close }">
                                                <ul @click="close()">
                                                    <li>
                                                        <a href="javascript:;" @click="setGroup('Abierto')">
                                                            <div class="w-2 h-2 rounded-full bg-primary ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                            Abierto
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" @click="setGroup('Pendiente')">
                                                            <div class="w-2 h-2 rounded-full bg-warning ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                            Pendiente
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" @click="setGroup('En espera')">
                                                            <div class="w-2 h-2 rounded-full bg-secondary ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                            En espera
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" @click="setGroup('Resuelto')">
                                                            <div class="w-2 h-2 rounded-full bg-success ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                            Resuelto
                                                        </a>
                                                    </li>
                                                </ul>
                                            </template>
                                        </Popper>
                                    </div>
                                </li>
                                <li>
                                    <div class="dropdown">
                                        <Popper
                                            :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                            offsetDistance="0"
                                            class="align-middle"
                                        >
                                            <button type="button" class="hover:text-primary flex items-center">
                                                <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="w-5 h-5 rotate-90 opacity-70"
                                                >
                                                    <circle cx="5" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                                    <circle cx="19" cy="12" r="2" stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </button>
                                            <template #content="{ close }">
                                                <ul @click="close()" class="whitespace-nowrap">
                                                    <li>
                                                        <a href="javascript:;" class="w-full" @click="setAction('read')">
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0"
                                                            >
                                                                <path
                                                                    d="M20.082 3.01787L20.1081 3.76741L20.082 3.01787ZM16.5 3.48757L16.2849 2.76907V2.76907L16.5 3.48757ZM13.6738 4.80287L13.2982 4.15375L13.2982 4.15375L13.6738 4.80287ZM3.9824 3.07501L3.93639 3.8236L3.9824 3.07501ZM7 3.48757L7.19136 2.76239V2.76239L7 3.48757ZM10.2823 4.87558L9.93167 5.5386L10.2823 4.87558ZM13.6276 20.0694L13.9804 20.7312L13.6276 20.0694ZM17 18.6335L16.8086 17.9083H16.8086L17 18.6335ZM19.9851 18.2229L20.032 18.9715L19.9851 18.2229ZM10.3724 20.0694L10.0196 20.7312H10.0196L10.3724 20.0694ZM7 18.6335L7.19136 17.9083H7.19136L7 18.6335ZM4.01486 18.2229L3.96804 18.9715H3.96804L4.01486 18.2229ZM2.75 16.1437V4.99792H1.25V16.1437H2.75ZM22.75 16.1437V4.93332H21.25V16.1437H22.75ZM20.0559 2.26832C18.9175 2.30798 17.4296 2.42639 16.2849 2.76907L16.7151 4.20606C17.6643 3.92191 18.9892 3.80639 20.1081 3.76741L20.0559 2.26832ZM16.2849 2.76907C15.2899 3.06696 14.1706 3.6488 13.2982 4.15375L14.0495 5.452C14.9 4.95981 15.8949 4.45161 16.7151 4.20606L16.2849 2.76907ZM3.93639 3.8236C4.90238 3.88297 5.99643 3.99842 6.80864 4.21274L7.19136 2.76239C6.23055 2.50885 5.01517 2.38707 4.02841 2.32642L3.93639 3.8236ZM6.80864 4.21274C7.77076 4.46663 8.95486 5.02208 9.93167 5.5386L10.6328 4.21257C9.63736 3.68618 8.32766 3.06224 7.19136 2.76239L6.80864 4.21274ZM13.9804 20.7312C14.9714 20.2029 16.1988 19.6206 17.1914 19.3587L16.8086 17.9083C15.6383 18.2171 14.2827 18.8702 13.2748 19.4075L13.9804 20.7312ZM17.1914 19.3587C17.9943 19.1468 19.0732 19.0314 20.032 18.9715L19.9383 17.4744C18.9582 17.5357 17.7591 17.6575 16.8086 17.9083L17.1914 19.3587ZM10.7252 19.4075C9.71727 18.8702 8.3617 18.2171 7.19136 17.9083L6.80864 19.3587C7.8012 19.6206 9.0286 20.2029 10.0196 20.7312L10.7252 19.4075ZM7.19136 17.9083C6.24092 17.6575 5.04176 17.5357 4.06168 17.4744L3.96804 18.9715C4.9268 19.0314 6.00566 19.1468 6.80864 19.3587L7.19136 17.9083ZM21.25 16.1437C21.25 16.8295 20.6817 17.4279 19.9383 17.4744L20.032 18.9715C21.5062 18.8793 22.75 17.6799 22.75 16.1437H21.25ZM22.75 4.93332C22.75 3.47001 21.5847 2.21507 20.0559 2.26832L20.1081 3.76741C20.7229 3.746 21.25 4.25173 21.25 4.93332H22.75ZM1.25 16.1437C1.25 17.6799 2.49378 18.8793 3.96804 18.9715L4.06168 17.4744C3.31831 17.4279 2.75 16.8295 2.75 16.1437H1.25ZM13.2748 19.4075C12.4825 19.8299 11.5175 19.8299 10.7252 19.4075L10.0196 20.7312C11.2529 21.3886 12.7471 21.3886 13.9804 20.7312L13.2748 19.4075ZM13.2982 4.15375C12.4801 4.62721 11.4617 4.65083 10.6328 4.21257L9.93167 5.5386C11.2239 6.22189 12.791 6.18037 14.0495 5.452L13.2982 4.15375ZM2.75 4.99792C2.75 4.30074 3.30243 3.78463 3.93639 3.8236L4.02841 2.32642C2.47017 2.23065 1.25 3.49877 1.25 4.99792H2.75Z"
                                                                    fill="currentColor"
                                                                />
                                                                <path opacity="0.5" d="M12 5.854V20.9999" stroke="currentColor" stroke-width="1.5" />
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M5 9L9 10"
                                                                    stroke="currentColor"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                />
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M19 9L15 10"
                                                                    stroke="currentColor"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                />
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M5 13L9 14"
                                                                    stroke="currentColor"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                />
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M19 13L15 14"
                                                                    stroke="currentColor"
                                                                    stroke-width="1.5"
                                                                    stroke-linecap="round"
                                                                />
                                                            </svg>

                                                            Mark as Read
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" class="w-full" @click="setAction('unread')">
                                                            <svg
                                                                width="24"
                                                                height="24"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                class="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0"
                                                            >
                                                                <path
                                                                    d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z"
                                                                    stroke="currentColor"
                                                                    stroke-width="1.5"
                                                                />
                                                                <path
                                                                    opacity="0.5"
                                                                    d="M6.12132 16.1022L5.92721 15.3778L6.12132 16.1022ZM3.27556 18.0294C3.16835 18.4295 3.40579 18.8408 3.80589 18.948C4.20599 19.0552 4.61724 18.8178 4.72444 18.4177L3.27556 18.0294ZM6.25 16C6.25 16.4142 6.58579 16.75 7 16.75C7.41421 16.75 7.75 16.4142 7.75 16H6.25ZM7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5H7.75ZM7.89778 16.75H19.8978V15.25H7.89778V16.75ZM7.89778 15.25C7.01609 15.25 6.42812 15.2436 5.92721 15.3778L6.31543 16.8267C6.57752 16.7564 6.91952 16.75 7.89778 16.75V15.25ZM5.92721 15.3778C4.63311 15.7245 3.62231 16.7353 3.27556 18.0294L4.72444 18.4177C4.9325 17.6412 5.53898 17.0347 6.31543 16.8267L5.92721 15.3778ZM7.75 16V2.5H6.25V16H7.75Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>

                                                            Mark as Unread
                                                        </a>
                                                    </li>
                                                </ul>
                                            </template>
                                        </Popper>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="flex justify-between items-center sm:w-auto w-full">
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <button type="button" class="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" @click="isShowMailMenu = !isShowMailMenu">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                                        <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    </svg>
                                </button>
                                <div class="relative group">
                                    <input
                                        type="text"
                                        placeholder="Buscar..."
                                        class="form-input ltr:pr-8 rtl:pl-8 peer"
                                        v-model="searchText"
                                        @keyup="searchMails()"
                                    />
                                    <div class="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4">
                                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5"></circle>
                                            <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <flat-pickr v-model="date3" class="form-input lg:w-[215px]" :config="rangeCalendar" placeholder="Buscar por fecha..."></flat-pickr>
                            </div>
                        </div>
                    </div>
                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                    <div class="flex flex-wrap flex-col md:flex-row xl:w-auto justify-between items-center px-4 pb-4">
                        <div class="sm:w-auto gap-3 mt-4">
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
                                            Filtrar por
                                        </button>
                                        <tippy target="group">Estados</tippy>
                                    </div>
                                    <template #content="{ close }">
                                        <ul @click="close()">
                                            <li>
                                                    <a href="javascript:;" @click="tabChanged('En espera')">
                                                        <div class="w-2 h-2 rounded-full bg-primary ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                        Abierto
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" @click="tabChanged('En espera')">
                                                        <div class="w-2 h-2 rounded-full bg-warning ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                        Pendiente
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" @click="tabChanged('En espera')">
                                                        <div class="w-2 h-2 rounded-full bg-secondary ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                        En espera
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" @click="tabChanged('En espera')">
                                                        <div class="w-2 h-2 rounded-full bg-success ltr:mr-3 rtl:ml-3 shrink-0"></div>
                                                        Resuelto
                                                    </a>
                                                </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </div>
                        </div>
                        <div class="mt-4 md:flex-auto flex-1">
                            <div class="flex items-center md:justify-end justify-center">
                                <div class="ltr:mr-3 rtl:ml-3">
                                    {{ pager.startIndex + 1 + '-' + (pager.endIndex + 1) + ' of ' + filteredMailList.length }}
                                </div>
                                <button
                                    type="button"
                                    :disabled="pager.currentPage == 1"
                                    class="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 ltr:mr-3 rtl:ml-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                    @click="pager.currentPage--, searchMails(false)"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 rtl:rotate-180"
                                    >
                                        <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    :disabled="pager.currentPage == pager.totalPages"
                                    class="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed"
                                    @click="pager.currentPage++, searchMails(false)"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 ltr:rotate-180"
                                    >
                                        <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
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
                            :hasCheckbox="true"
                            @change="changeServer"
                            class="cursor-pointer"
                            skin="whitespace-nowrap bh-table-hover"
                            firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                            previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                            nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                        >

                            <template #id="data">
                                <div class="flex items-center whitespace-nowrap">
                                    <div class="ltr:mr-2 rtl:ml-2">
                                        <button
                                            type="button"
                                            v-tippy:star
                                            class="enabled:hover:text-warning disabled:opacity-60 flex items-center"
                                            :class="{ 'text-warning': data.value.isImportant }"
                                            @click.stop="setImportant(data.value.id)"
                                            :disabled="selectedTab === 'trash'"
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-5 h-5"
                                                :class="{ 'fill-warning': data.value.isImportant }"
                                            >
                                                <path
                                                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                            </svg>
                                        </button>
                                        <tippy target="star">Importante</tippy>
                                    </div>
                                </div>
                            </template>

                            <template #message="data">
                                <div @click="selectTicket(data)" class="flex flex-col">

                                    <!-- Nombre del responsable -->
                                    <div
                                        class="group-hover:text-primary font-semibold text-base"
                                        :class="{ 'line-through': data.value.status === 'complete' }"
                                    >
                                        {{ data.value.requester.first_name ?? '' + ' ' + data.value.requester.last_name ?? '' }}
                                    </div>

                                    <!-- Contenedor con overflow-hidden -->
                                    <div
                                        class="text-white-dark overflow-hidden max-w-[500px] whitespace-nowrap text-ellipsis"
                                        :class="{ 'line-through': data.value.status === 'complete' }"
                                    >
                                        <span>{{ data.value.subject }}</span> &minus;
                                        <span>{{ data.value.message }}</span>
                                    </div>
                                </div>
                            </template>

                            <template>
                                <div class="flex items-center ltr:justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                                    <template v-if="mail.group">
                                        <div class="dropdown">
                                            <Popper
                                            :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                            offsetDistance="0"
                                            class="align-middle"
                                            @open:popper="isGroupMenu = mail.id"
                                            @close:popper="isGroupMenu = null"
                                            >
                                            <a
                                                href="javascript:;"
                                                class="badge capitalize hover:top-0 hover:text-white"
                                                :class="getGroupClass(mail.group, isGroupMenu, mail.id)"
                                            >
                                                {{ getGroupText(mail.group) }}
                                            </a>
                                            <template #content="{ close }">
                                                <ul @click="close()" class="text-sm text-medium">
                                                <li>
                                                    <button
                                                    type="button"
                                                    class="w-full text-primary ltr:text-left rtl:text-right"
                                                    @click="setGroupIndividual(mail, 'Abierto')"
                                                    >
                                                    Abierto
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                    type="button"
                                                    class="w-full text-secondary ltr:text-left rtl:text-right"
                                                    @click="setGroupIndividual(mail, 'Pendiente')"
                                                    >
                                                    Pendiente
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                    type="button"
                                                    class="w-full text-warning ltr:text-left rtl:text-right"
                                                    @click="setGroupIndividual(mail, 'En espera')"
                                                    >
                                                    En espera
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                    type="button"
                                                    class="w-full text-success ltr:text-left rtl:text-right"
                                                    @click="setGroupIndividual(mail, 'Resuelto')"
                                                    >
                                                    Resuelto
                                                    </button>
                                                </li>
                                                </ul>
                                            </template>
                                            </Popper>
                                        </div>
                                    </template>
                                </div>
                            </template>

                            <template>
                                <div class="flex items-center ltr:justify-end rtl:justify-start space-x-2 rtl:space-x-reverse">
                                    <template v-if="mail.priority">
                                    <div class="dropdown">
                                        <Popper
                                        :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                        offsetDistance="0"
                                        class="align-middle"
                                        @open:popper="isPriorityMenu = mail.id"
                                        @close:popper="isPriorityMenu = null"
                                        >
                                        <a
                                            href="javascript:;"
                                            class="badge capitalize hover:top-0 hover:text-white"
                                            :class="getPriorityClass(mail.priority, isPriorityMenu, mail.id)"
                                        >
                                            {{ getPriorityText(mail.priority) }}
                                        </a>
                                        <template #content="{ close }">
                                            <ul @click="close()" class="text-sm text-medium">
                                            <li>
                                                <button
                                                type="button"
                                                class="w-full text-danger ltr:text-left rtl:text-right"
                                                @click="setPriority(mail, 'high')"
                                                >
                                                High
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                type="button"
                                                class="w-full text-primary ltr:text-left rtl:text-right"
                                                @click="setPriority(mail, 'medium')"
                                                >
                                                Medium
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                type="button"
                                                class="w-full text-warning ltr:text-left rtl:text-right"
                                                @click="setPriority(mail, 'low')"
                                                >
                                                Low
                                                </button>
                                            </li>
                                            </ul>
                                        </template>
                                        </Popper>
                                    </div>
                                    </template>
                                </div>
                            </template>

                            <template #actions="data">
                                <div class="flex items-center justify-between w-max">
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
                                                        <a href="javascript:;" @click="deleteTicket(data.value.id)">
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

                <template v-if="selectedTicket && !isEdit">
                    <div>
                        <div class="flex items-center justify-between flex-wrap p-4">
                            <div class="flex items-center">
                                <button type="button" class="ltr:mr-2 rtl:ml-2 hover:text-primary" @click="selectedTicket = null">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5 rtl:rotate-180"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                    </svg>
                                </button>
                                <h4 class="text-base md:text-lg font-medium ltr:mr-2 rtl:ml-2">
                                    {{ selectedTicket.subject }}
                                </h4>
                                <div class="badge bg-info hover:top-0">{{ selectedTicket.code }}</div>
                            </div>
                            <div>
                                <button type="button" v-tippy:print>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                        <path
                                            d="M6 17.9827C4.44655 17.9359 3.51998 17.7626 2.87868 17.1213C2 16.2426 2 14.8284 2 12C2 9.17157 2 7.75736 2.87868 6.87868C3.75736 6 5.17157 6 8 6H16C18.8284 6 20.2426 6 21.1213 6.87868C22 7.75736 22 9.17157 22 12C22 14.8284 22 16.2426 21.1213 17.1213C20.48 17.7626 19.5535 17.9359 18 17.9827"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                        <path opacity="0.5" d="M9 10H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M19 14L5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path
                                            d="M18 14V16C18 18.8284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V14"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M17.9827 6C17.9359 4.44655 17.7626 3.51998 17.1213 2.87868C16.2427 2 14.8284 2 12 2C9.17158 2 7.75737 2 6.87869 2.87868C6.23739 3.51998 6.06414 4.44655 6.01733 6"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                        />
                                        <circle opacity="0.5" cx="17" cy="10" r="1" fill="currentColor" />
                                        <path opacity="0.5" d="M15 16.5H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <path opacity="0.5" d="M13 19H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                                <tippy target="print">Print</tippy>
                            </div>
                        </div>
                        <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] mt-4"></div>
                        <div class="p-4 relative">
                            <div class="flex flex-wrap">
                                <div class="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                                    <img
                                        v-show="selectedTicket.path"
                                        :src="`/assets/images/${selectedTicket.path}`"
                                        class="h-12 w-12 rounded-full object-cover"
                                        alt="avatar"
                                    />
                                    <div v-show="!selectedTicket.path" class="border border-gray-300 dark:border-gray-800 rounded-full p-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                            <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5" />
                                            <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ltr:mr-2 rtl:ml-2 flex-1">
                                    <div class="flex items-center">
                                        <div class="text-lg ltr:mr-4 rtl:ml-4 whitespace-nowrap">
                                            {{ selectedTicket.requester.first_name + ' ' + selectedTicket.requester.last_name }}
                                        </div>
                                        <div>
                                            <div v-show="selectedTicket.priority" class="ltr:mr-4 rtl:ml-4">
                                                <div
                                                    v-tippy:priority
                                                    class="w-3 h-3 rounded-full bg-info"
                                                    :class="{
                                                        'bg-success': selectedTicket.priority === 'Low',
                                                        'bg-primary': selectedTicket.priority === 'Medium',
                                                        'bg-warning': selectedTicket.priority === 'High',
                                                        'bg-danger': selectedTicket.priority === 'Urgent',
                                                    }"
                                                ></div>
                                                <tippy target="priority" class="capitalize">{{ selectedTicket.priority }}</tippy>
                                            </div>
                                        </div>
                                        <div class="text-white-dark whitespace-nowrap"> {{ selectedTicket.created_at_text }}</div>
                                    </div>
                                    <div class="text-white-dark flex items-center">
                                        <div class="ltr:mr-1 rtl:ml-1">
                                            {{ selectedTicket.requester.email }}
                                        </div>
                                        <!-- <div class="dropdown">
                                            <Popper
                                                :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                                offsetDistance="0"
                                                class="align-middle"
                                            >
                                                <button type="button" class="mt-1.5">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-5 h-5"
                                                    >
                                                        <path
                                                            d="M19 9L12 15L5 9"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                                <template #content>
                                                    <ul class="sm:w-56">
                                                        <li>
                                                            <div class="flex items-center px-4 py-2">
                                                                <div class="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">From:</div>
                                                                <div class="flex-1">
                                                                    {{ selectedTicket.type === 'sent_mail' ? 'tailly@gmail.com' : selectedTicket.email }}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </template>
                                            </Popper>
                                        </div> -->
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                                        <button
                                            type="button"
                                            v-tippy:important
                                            class="enabled:hover:text-warning disabled:opacity-60"
                                            :class="{ 'text-warning': selectedTicket.isStar }"
                                            @click="setImportant(selectedTicket.id)"
                                            :disabled="selectedTab === 'trash'"
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-5 h-5"
                                                :class="{ 'fill-warning': selectedTicket.isStar }"
                                            >
                                                <path
                                                    d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                            </svg>
                                        </button>
                                        <tippy target="important">Importante</tippy>
                                    </div>
                                </div>
                            </div>
                            <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] mt-4"></div>

                            <!-- <div class="panel border border-primary"> -->
                                <p class="mt-4 text-bold text-3xl text-primary">Descripción del caso</p>
                                <div
                                    class="mt-4 prose dark:prose-p:text-white prose-p:text-sm md:prose-p:text-sm max-w-full prose-img:inline-block prose-img:m-0"
                                    v-html="selectedTicket.message"
                                ></div>
                                <div class="mt-8" v-show="selectedTicket.attachments">
                                    <div class="text-base mb-4">Attachments</div>
                                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                                    <div class="flex items-center flex-wrap mt-6">
                                        <template v-for="(attachment, i) in selectedTicket.attachments" :key="i">
                                            <button
                                                type="button"
                                                class="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-[#e0e6ed] dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group"
                                            >
                                                <template v-if="attachment.type === 'image'">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                        <path
                                                            d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                        />
                                                        <circle opacity="0.5" cx="16" cy="8" r="2" stroke="currentColor" stroke-width="1.5" />
                                                        <path
                                                            opacity="0.5"
                                                            d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                        />
                                                    </svg>
                                                </template>
                                                <template v-if="attachment.type === 'folder'">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                        <path opacity="0.5" d="M18 10L13 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                        <path
                                                            d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                        />
                                                    </svg>
                                                </template>
                                                <template v-if="attachment.type === 'zip'">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                        <path
                                                            d="M9.5 15.5V15.375C9.5 14.8918 9.89175 14.5 10.375 14.5H13.625C14.1082 14.5 14.5 14.8918 14.5 15.375V15.5C14.5 16.8807 13.3807 18 12 18C10.6193 18 9.5 16.8807 9.5 15.5Z"
                                                            stroke="#8E93A6"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                        />
                                                        <path
                                                            d="M9.5 3C9.5 2.5286 9.5 2.29289 9.64645 2.14645C9.79289 2 10.0286 2 10.5 2H11C11.4714 2 11.7071 2 11.8536 2.14645C12 2.29289 12 2.5286 12 3V3.5C12 3.9714 12 4.20711 11.8536 4.35355C11.7071 4.5 11.4714 4.5 11 4.5H10.5C10.0286 4.5 9.79289 4.5 9.64645 4.35355C9.5 4.20711 9.5 3.9714 9.5 3.5V3Z"
                                                            stroke="#8E93A6"
                                                            stroke-width="1.5"
                                                        />
                                                        <path
                                                            d="M9.5 8C9.5 7.5286 9.5 7.29289 9.64645 7.14645C9.79289 7 10.0286 7 10.5 7H11C11.4714 7 11.7071 7 11.8536 7.14645C12 7.29289 12 7.5286 12 8V8.5C12 8.9714 12 9.20711 11.8536 9.35355C11.7071 9.5 11.4714 9.5 11 9.5H10.5C10.0286 9.5 9.79289 9.5 9.64645 9.35355C9.5 9.20711 9.5 8.9714 9.5 8.5V8Z"
                                                            stroke="#8E93A6"
                                                            stroke-width="1.5"
                                                        />
                                                        <path
                                                            d="M12 5.5C12 5.0286 12 4.79289 12.1464 4.64645C12.2929 4.5 12.5286 4.5 13 4.5H13.5C13.9714 4.5 14.2071 4.5 14.3536 4.64645C14.5 4.79289 14.5 5.0286 14.5 5.5V6C14.5 6.4714 14.5 6.70711 14.3536 6.85355C14.2071 7 13.9714 7 13.5 7H13C12.5286 7 12.2929 7 12.1464 6.85355C12 6.70711 12 6.4714 12 6V5.5Z"
                                                            stroke="#8E93A6"
                                                            stroke-width="1.5"
                                                        />
                                                        <path
                                                            d="M12 10.5C12 10.0286 12 9.79289 12.1464 9.64645C12.2929 9.5 12.5286 9.5 13 9.5H13.5C13.9714 9.5 14.2071 9.5 14.3536 9.64645C14.5 9.79289 14.5 10.0286 14.5 10.5V11C14.5 11.4714 14.5 11.7071 14.3536 11.8536C14.2071 12 13.9714 12 13.5 12H13C12.5286 12 12.2929 12 12.1464 11.8536C12 11.7071 12 11.4714 12 11V10.5Z"
                                                            stroke="#8E93A6"
                                                            stroke-width="1.5"
                                                        />
                                                        <path
                                                            d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                        />
                                                    </svg>
                                                </template>
                                                <template v-if="attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder'">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                        <path
                                                            d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z"
                                                            fill="currentColor"
                                                        />
                                                        <path opacity="0.5" d="M6 14.5H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                        <path opacity="0.5" d="M6 18H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                        <path
                                                            opacity="0.5"
                                                            d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                        />
                                                    </svg>
                                                </template>
                                                <div class="ltr:ml-3 rtl:mr-3">
                                                    <p class="text-xs text-primary font-semibold">
                                                        {{ attachment.name }}
                                                    </p>
                                                    <p class="text-[11px] text-gray-400 dark:text-gray-600">
                                                        {{ attachment.size }}
                                                    </p>
                                                </div>
                                                <div
                                                    class="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block"
                                                ></div>
                                                <div
                                                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10"
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                        <path
                                                            opacity="0.5"
                                                            d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                        <path
                                                            d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                        </template>
                                    </div>
                                </div>
                            <!-- </div> -->

                            <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] my-4"></div>

                            <p class="my-4 text-bold text-3xl text-primary">Respuestas</p>
                            <perfect-scrollbar class="relative h-full sm:h-[calc(100vh_-_300px)] chat-conversation-box">
                                <div class="space-y-5 p-4 sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[400px]">
                                    <template v-if="responsesByTicket">
                                        <div v-for="responseTicket in responsesByTicket" :key="responseTicket">
                                            <div class="panel border border-primary mt-2">
                                                <div class="flex flex-wrap">
                                                    <div class="flex-shrink-0 ltr:mr-2 rtl:ml-2">
                                                        <img
                                                            v-show="selectedTicket.path"
                                                            :src="`/assets/images/${selectedTicket.path}`"
                                                            class="h-12 w-12 rounded-full object-cover"
                                                            alt="avatar"
                                                        />
                                                        <div v-show="!selectedTicket.path" class="border border-gray-300 dark:border-gray-800 rounded-full p-3">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                                <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5" />
                                                                <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor" stroke-width="1.5" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="ltr:mr-2 rtl:ml-2 flex-1">
                                                        <div class="flex items-center justify-between">
                                                            <div class="text-lg ltr:mr-4 rtl:ml-4 whitespace-nowrap">
                                                                {{ responseTicket.user.first_name + ' ' + responseTicket.user.last_name }}
                                                            </div>
                                                            <div class="text-white-dark whitespace-nowrap"> {{responseTicket.created_at_text}}</div>
                                                        </div>
                                                        <div class="text-white-dark flex items-center">
                                                            <div class="ltr:mr-1 rtl:ml-1">
                                                                {{ responseTicket.user.email }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] mt-4"></div>

                                                <p class="mt-4">{{responseTicket.response}}</p>
                                            </div>

                                        </div>
                                    </template>
                                </div>
                            </perfect-scrollbar>


                        </div>

                    </div>
                </template>

                <template v-if="isEdit">
                    <div class="relative">
                        <div class="py-4 px-6 flex items-center">
                            <button type="button" class="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3" @click="isShowMailMenu = !isShowMailMenu">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                                    <path d="M20 7L4 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    <path d="M20 17L4 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                </svg>
                            </button>
                            <h4 class="text-lg text-gray-600 dark:text-gray-400 font-medium">Crear un nuevo ticket</h4>
                        </div>
                        <div class="h-px bg-gradient-to-l from-indigo-900/20 via-black dark:via-white to-indigo-900/20 opacity-[0.1]"></div>
                        <form class="p-6 grid gap-6">
                            <div>
                                <label for="subject">Título</label>
                                <input id="subject" type="text" placeholder="Ingrese un título" class="form-input" v-model="ticketData.subject" />
                            </div>

                            <div class="flex justify-between gap-4">
                                <!-- <div class="flex-1">
                                    <label for="tag">Area</label>
                                    <select id="tag" class="form-select" v-model="ticketData.tag">
                                        <option value="">Seleccionar area</option>
                                        <option value="team">Comercial</option>
                                        <option value="update">Operaciones</option>
                                        <option value="team">Facturación</option>
                                        <option value="update">Sistemas</option>
                                    </select>
                                </div> -->
                                <div class="flex-1">
                                    <label for="priority">Prioridad</label>
                                    <select id="priority" class="form-select" v-model="ticketData.priority">
                                        <option value="">Seleccionar prioridad</option>
                                        <option value="1">Bajo</option>
                                        <option value="2">Medio</option>
                                        <option value="3">Alto</option>
                                        <option value="4">Urgente</option>
                                    </select>
                                </div>
                            </div>

                            <div class="flex-1">
                                <label for="assigned_id">Responsable</label>
                                <select id="assigned_id" class="form-select" v-model="ticketData.assigned_id">
                                    <option value="" >Asignar responsable</option>
                                    <option value="1">Davilson</option>
                                    <option value="2">Marcos</option>
                                </select>
                            </div>

                            <div class="h-fit">
                                <label for="message">Descripción del caso</label>
                                <quillEditor
                                    id="message"
                                    ref="editor"
                                    v-model:value="ticketData.message.description"
                                    :options="editorOptions"
                                    style="min-height: 200px"
                                    @ready="quillEditorReady($event)"
                                ></quillEditor>
                            </div>
                            <div>
                                <label for="file">Adjuntar archivos</label>
                                <input
                                    id="file"
                                    type="file"
                                    class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                    multiple
                                    accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                                    @change="handleFileChange"
                                />
                            </div>

                            <div class="flex items-center ltr:ml-auto rtl:mr-auto mt-8">
                                <button type="button" class="btn btn-success ltr:mr-3 rtl:ml-3" @click="saveTicket('save', null)">Guardar</button>
                                <button type="button" class="btn btn-outline-danger ltr:mr-3 rtl:ml-3" @click="closeMsgPopUp">Cerrar</button>
                                <!-- <button type="button" class="btn btn-primary" @click="saveTicket('send', ticketData.id)">Send</button> -->
                            </div>
                        </form>
                    </div>
                </template>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
    import { ref, computed, onMounted, reactive } from 'vue';
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
    import { quillEditor, Quill } from 'vue3-quill';
    import 'vue3-quill/lib/vue3-quill.css';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import Swal from 'sweetalert2';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    //flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import { API } from '@/services/local';
    import {useUserStore} from "../../stores/user-store";
    const userStore = useUserStore();

    useMeta({ title: 'Mailbox' });
    const api = new API();
    const store = useAppStore();
    const loading = ref(true);

    const isGroupMenu: any = ref(null);

    const setGroupIndividual = (mail: any, name: string = '') => {
        let item = filteredMailList.value.find((d) => d.id === mail.id);
        item.group = name;
        searchMails(false);
    };

    const isPriorityMenu: any = ref(null);
    const setPriority = (mail: any, name: string = '') => {
        let item = filteredMailList.value.find((d) => d.id === mail.id);
        item.priority = name;
        searchMails(false);
    };

    const date3 = ref();
    const rangeCalendar: any = ref({
        dateFormat: 'Y-m-d',
        mode: 'range',
        position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
    });

    const defaultData = ref({
        id: null,
        subject: null,
        message: {
            description: null,
            attachments: []
        },
        code: 1,
        status: 1,
        priority: 1,
        assigned_id: null,
        user_id: userStore.id,
        rol_id: userStore.roles[0].id,
        data: {
            navigator:null,
            ip_address:null,
            operating_system :null
        },
    });
    const isShowMailMenu = ref(false);
    const isEdit = ref(false);
    const selectedTab = ref('inbox');
    const filteredMailList: any = ref([]);
    const ids: any = ref([]);
    const searchText = ref('');
    const selectedTicket: any = ref(null);
    const ticketData: any = ref(defaultData.value);

    // const ticketList = ref([
    //     {
    //         id: 1,
    //         userId: 1,
    //         path: 'profile-15.jpeg',
    //         firstName: 'Laurie',
    //         lastName: 'Fox',
    //         name: 'Laurie Fox',
    //         email: 'laurieFox@mail.com',
    //         date: new Date(),
    //         time: '2:00 PM',
    //         title: 'Promotion Page',
    //         priority: 'low',
    //         displayDescription:
    //             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pulvinar feugiat consequat. Duis lacus nibh, sagittis id varius vel, aliquet non augue.',
    //         type: 'inbox',
    //         isImportant: false,
    //         group: 'Abierto',
    //         isUnread: false,
    //         attachments: [
    //             {
    //                 name: 'Confirm File.txt',
    //                 size: '450KB',
    //                 type: 'file',
    //             },
    //             {
    //                 name: 'Important Docs.xml',
    //                 size: '2.1MB',
    //                 type: 'file',
    //             },
    //         ],
    //         responses: [
    //             {
    //                 fromUserId: 0,
    //                 toUserId: 1,
    //                 text: 'Hi, I am back from vacation',
    //             },
    //             {
    //                 fromUserId: 0,
    //                 toUserId: 1,
    //                 text: 'How are you?',
    //             },
    //             {
    //                 fromUserId: 1,
    //                 toUserId: 0,
    //                 text: 'Welcom Back',
    //             },
    //             {
    //                 fromUserId: 1,
    //                 toUserId: 0,
    //                 text: 'I am all well',
    //             },
    //             {
    //                 fromUserId: 0,
    //                 toUserId: 1,
    //                 text: 'Coffee?',
    //             },
    //         ],
    //         message: null,
    //     }
    // ]);

    const pagedMails: any = ref([]);

    const editorOptions = ref({
        modules: {
            toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'link', 'image', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['clean']],
        },
        placeholder: '',
    });
    const quillEditorObj: any = ref(null);

    const quillEditorReady = (quill: any) => {
        quillEditorObj.value = quill;
    };

    const searchMails = (isResetPage = true) => {
        if (isResetPage) {
            pager.value.currentPage = 1;
        }

        let res;
        if (selectedTab.value === 'important') {
            // res = ticketList.value.filter((d) => d.isImportant);
        } else if (selectedTab.value === 'Abierto' || selectedTab.value === 'Pendiente' || selectedTab.value === 'En espera' || selectedTab.value === 'Resuelto') {
            // res = ticketList.value.filter((d) => d.group === selectedTab.value);
        } else {
            // res = ticketList.value.filter((d) => d.type === selectedTab.value);
        }
        filteredMailList.value = res.filter(
            (d) =>
                (d.title && d.title.toLowerCase().includes(searchText.value)) ||
                (d.firstName && d.firstName.toLowerCase().includes(searchText.value)) ||
                (d.lastName && d.lastName.toLowerCase().includes(searchText.value)) ||
                (d.displayDescription && d.displayDescription.toLowerCase().includes(searchText.value))
        );
        if (filteredMailList.value.length) {
            pager.value.totalPages = pager.value.pageSize < 1 ? 1 : Math.ceil(filteredMailList.value.length / pager.value.pageSize);
            if (pager.value.currentPage > pager.value.totalPages) {
                pager.value.currentPage = 1;
            }
            pager.value.startIndex = (pager.value.currentPage - 1) * pager.value.pageSize;
            pager.value.endIndex = Math.min(pager.value.startIndex + pager.value.pageSize - 1, filteredMailList.value.length - 1);
            pagedMails.value = filteredMailList.value.slice(pager.value.startIndex, pager.value.endIndex + 1);
        } else {
            pagedMails.value = [];
            pager.value.startIndex = -1;
            pager.value.endIndex = -1;
        }
        clearSelection();
    };

    const clearSelection = () => {
        ids.value = [];
    };

    const tabChanged = (tabType: any) => {
        isEdit.value = false;
        selectedTab.value = tabType;
        isShowMailMenu.value = false;
        selectedTicket.value = null;
        searchMails();
    };

    const setImportant = (mailId: number) => {
        if (mailId) {
            let item = filteredMailList.value.find((d: any) => d.id === mailId);
            item.isImportant = !item.isImportant;
            setTimeout(() => {
                searchMails(false);
            });
        }
    };

    const refreshTickets = () => {
        searchText.value = '';
        searchMails(false);
    };

    const setGroup = (group: any) => {
        if (ids.value.length) {
            let items = filteredMailList.value.filter((d: any) => ids.value.includes(d.id));
            for (let item of items) {
                item.group = group;
            }
            showMessage(ids.value.length + ' Mail has been grouped as ' + group.toUpperCase());
            clearSelection();
            setTimeout(() => {
                searchMails(false);
            });
        }
    };

    const setAction = (type: any) => {
        if (ids.value.length) {
            const totalSelected = ids.value.length;
            let items = filteredMailList.value.filter((d: any) => ids.value.includes(d.id));
            for (let item of items) {
                if (type === 'trash') {
                    item.type = 'trash';
                    item.group = '';
                    item.isStar = false;
                    item.isImportant = false;
                    showMessage(totalSelected + ' Mail has been deleted.');
                    searchMails(false);
                } else if (type === 'read') {
                    item.isUnread = false;
                    showMessage(totalSelected + ' Mail has been marked as Read.');
                } else if (type === 'unread') {
                    item.isUnread = true;
                    showMessage(totalSelected + ' Mail has been marked as UnRead.');
                } else if (type === 'important') {
                    item.isImportant = true;
                    showMessage(totalSelected + ' Mail has been marked as Important.');
                } else if (type === 'unimportant') {
                    item.isImportant = false;
                    showMessage(totalSelected + ' Mail has been marked as UnImportant.');
                }
            }
            clearSelection();
        }
    };

    // Función para manejar la selección de archivos
    const handleFileChange = (event) => {
        ticketData.value.message.attachments = event.target.files;
    };

    const saveTicket = async (id: any) => {
        // if (!ticketData.value.title) {
        //     showMessage('Title of email is required.', 'error');
        //     return false;
        // }

        console.log( quillEditorObj.value);


        const { browser, os } = getBrowserInfo();

        // Obtener la IP
        const ipAddress = await getIpAddress();

        let obj: any = {
            subject: ticketData.value.subject,
            message: {
                description: ticketData.value.message.description,
                attachments: [], // Iniciamos con un array vacío para los archivos
            },
            code: 1,
            status: ticketData.value.status,
            priority: ticketData.value.priority,
            assigned_id: ticketData.value.assigned_id,
            user_id: userStore.id,
            rol_id: userStore.roles[0].id,
            data: {
                navigator: browser,
                ip_address: ipAddress,
                operating_system: os
            },
            file: ticketData.value.message.attachments
        };

        // Verificar si hay archivos seleccionados
        if (ticketData.value.message.attachments && ticketData.value.message.attachments.length) {
            for (let file of ticketData.value.message.attachments) {
                let flObj = {
                    name: file.name,
                    size: getFileSize(file.size),
                    type: getFileType(file.type),
                };
                obj.message.attachments.push(flObj);
            }
        }

        console.log(obj);
        try {
            await api.post(`tickets/v1/tickets`, obj, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
            getData();
        } catch (error) {
            console.error('Error fetching data', error);
        }
        // selectedTicket.value = null;
        // isEdit.value = false;
    };

    const getIpAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return null;
        }
    };

    // Función para obtener el tamaño del archivo
    const getFileSize = (total_bytes) => {
        let size = '';
        if (total_bytes < 1000000) {
            size = Math.floor(total_bytes / 1000) + 'KB';
        } else {
            size = Math.floor(total_bytes / 1000000) + 'MB';
        }
        return size;
    };

    // Función para obtener el tipo del archivo
    const getFileType = (file_type) => {
        let type = 'file';
        if (file_type.includes('image/')) {
            type = 'image';
        } else if (file_type.includes('application/x-zip')) {
            type = 'zip';
        }
        return type;
    };

    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent;
        let browser = 'Unknown';
        let os = 'Unknown';

        // Detectar el navegador
        if (userAgent.indexOf('Firefox') > -1) {
            browser = 'Mozilla Firefox';
        } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
            browser = 'Opera';
        } else if (userAgent.indexOf('Chrome') > -1) {
            browser = 'Google Chrome';
        } else if (userAgent.indexOf('Safari') > -1) {
            browser = 'Safari';
        } else if (userAgent.indexOf('MSIE') > -1 || !!document.documentMode === true) {
            browser = 'Internet Explorer';
        }

        // Detectar el sistema operativo
        if (userAgent.indexOf('Win') > -1) {
            os = 'Windows';
        } else if (userAgent.indexOf('Mac') > -1) {
            os = 'MacOS';
        } else if (userAgent.indexOf('Linux') > -1) {
            os = 'Linux';
        } else if (userAgent.indexOf('Android') > -1) {
            os = 'Android';
        } else if (userAgent.indexOf('like Mac') > -1) {
            os = 'iOS';
        }

        return { browser, os };
    };

    const responsesByTicket: any = ref();
    const paramsResponses = reactive({
        current_page: 1,
        pagesize: 10,
        column_filters: [],
        sort_column: 'id',
        sort_direction: 'desc',
        search: null
    });

    const selectTicket = async (item) => {
        console.log(item.value);

        selectedTicket.value = item.value;
        try {
            const response = await api.get(`tickets/v1/responses?filter={"ticket_id":${item.value.id}}&page=${paramsResponses.current_page}&take=${paramsResponses.pagesize}`);
            responsesByTicket.value = response?.data
            // scrollToBottom();
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const openTicket = (type: string, item: any) => {
        if (type === 'add') {
            isShowMailMenu.value = false;
            ticketData.value = JSON.parse(JSON.stringify(defaultData.value));
        }
        isEdit.value = true;
    };

    const closeMsgPopUp = () => {
        isEdit.value = false;
        selectedTab.value = 'inbox';
        searchMails();
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const textMessage = ref('');

    const sendMessage = () => {

    };

    let timer: any;

    const total_rows = ref(0);

    const pager = ref({
        currentPage: 1,
        totalPages: 0,
        pageSize: 10,
        startIndex: 0,
        endIndex: 0,
    });

    const params = reactive({
        current_page: 1,
        pagesize: 10,
        column_filters: [],
        sort_column: 'id',
        sort_direction: 'desc',
        search: null
    });

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
    };

    const rows: any = ref(null);

    const cols = ref([
        { field: 'id', title: '', sort: false, width: '20px'},
        { field: 'message', title: 'Petición', width: '400px'},
        { field: 'status', title: 'Estado' },
        { field: 'priority', title: 'Prioridad' },
        { field: 'responsible.first_name', title: 'Area asignada' },
        { field: 'responsible.email', title: 'Responsable' },
        { field: 'created_at_text', title: 'Creado el' },
        { field: 'updated_at', title: 'Ultima actualización' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);

    // Función para obtener los detalles de la carpeta actual y actualizar la navegación
    const getData = async () => {
        try {
            loading.value = true;
            const response = await api.get(`tickets/v1/tickets?filter={"search":${params.search},"order":{"field":"${params.sort_column}","way":"${params.sort_direction}"}}&page=${params.current_page}&take=${params.pagesize}`)
            rows.value = response?.data
            total_rows.value = response?.meta?.page?.total;
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            loading.value = false;
        }
    };

    // Función que devuelve la clase CSS dependiendo del grupo
    const getGroupClass = (group, isGroupMenu, mailId) => {
        switch (group) {
            case 'Nuevo':
                return isGroupMenu === mailId ? 'text-white bg-info' : 'badge-outline-info hover:bg-info';
            case 'Abierto':
                return isGroupMenu === mailId ? 'text-white bg-primary' : 'badge-outline-primary hover:bg-primary';
            case 'Pendiente':
                return isGroupMenu === mailId ? 'text-white bg-secondary' : 'badge-outline-secondary hover:bg-secondary';
            case 'En espera':
                return isGroupMenu === mailId ? 'text-white bg-warning' : 'badge-outline-warning hover:bg-warning';
            case 'Resuelto':
                return isGroupMenu === mailId ? 'text-white bg-success' : 'badge-outline-success hover:bg-success';
            case 'Cerrado':
                return isGroupMenu === mailId ? 'text-white bg-danger' : 'badge-outline-danger hover:bg-danger';
            default:
                return 'badge-outline-secondary';
        }
    };

    // Función que devuelve el texto del grupo
    const getGroupText = (group) => {
        switch (group) {
            case 'Nuevo':
                return 'Nuevo';
            case 'Abierto':
                return 'Abierto';
            case 'Pendiente':
                return 'Pendiente';
            case 'En espera':
                return 'En espera';
            case 'Resuelto':
                return 'Resuelto';
            case 'Cerrado':
                return 'Cerrado';
            default:
                return 'Grupo desconocido';
        }
    };

    // Función que devuelve la clase CSS dependiendo de la prioridad
    const getPriorityClass = (priority, isPriorityMenu, mailId) => {
        switch (priority) {
            case 'high':
                return isPriorityMenu === mailId ? 'text-white bg-danger' : 'badge-outline-danger hover:bg-danger';
            case 'medium':
                return isPriorityMenu === mailId ? 'text-white bg-primary' : 'badge-outline-primary hover:bg-primary';
            case 'low':
                return isPriorityMenu === mailId ? 'text-white bg-warning' : 'badge-outline-warning hover:bg-warning';
            default:
                return 'badge-outline-secondary';
        }
    };

    // Función que devuelve el texto de la prioridad
    const getPriorityText = (priority) => {
        switch (priority) {
            case 'high':
                return 'High';
            case 'medium':
                return 'Medium';
            case 'low':
                return 'Low';
            default:
                return 'Unknown Priority';
        }
    };

    // const isShowUserChat = ref(false);

    // const scrollToBottom = () => {
    //     if (isShowUserChat.value) {
    //         setTimeout(() => {
    //             const element: any = document.querySelector('.chat-conversation-box');
    //             element.behavior = 'smooth';
    //             element.scrollTop = element.scrollHeight;
    //         });
    //     }
    // };

    onMounted(async () => {
       await getData();
       searchMails();
    });
</script>

<style>
    .quill-editor img {
        width: 15%;
    }
</style>
