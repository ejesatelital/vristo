<template>
    <div>
        <a
            href="javascript:;"
            v-show="store.theme === 'light'"
            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="store.toggleTheme('dark')"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5"/>
                <path d="M12 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M12 20V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M4 12L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M22 12L20 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path opacity="0.5" d="M19.7778 4.22266L17.5558 6.25424" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round"/>
                <path opacity="0.5" d="M4.22217 4.22266L6.44418 6.25424" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round"/>
                <path opacity="0.5" d="M6.44434 17.5557L4.22211 19.7779" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round"/>
                <path opacity="0.5" d="M19.7778 19.7773L17.5558 17.5551" stroke="currentColor" stroke-width="1.5"
                      stroke-linecap="round"/>
            </svg>
        </a>
        <a
            href="javascript:;"
            v-show="store.theme === 'dark'"
            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="store.toggleTheme('system')"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6444 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
                    fill="currentColor"
                />
            </svg>
        </a>
        <a
            href="javascript:;"
            v-show="store.theme === 'system'"
            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="store.toggleTheme('light')"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3 9C3 6.17157 3 4.75736 3.87868 3.87868C4.75736 3 6.17157 3 9 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V14C21 15.8856 21 16.8284 20.4142 17.4142C19.8284 18 18.8856 18 17 18H7C5.11438 18 4.17157 18 3.58579 17.4142C3 16.8284 3 15.8856 3 14V9Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                />
                <path opacity="0.5" d="M22 21H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path opacity="0.5" d="M15 15H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </a>
    </div>
    <div v-if="!userStore.id">
        <!-- Botón para abrir/cerrar el menú en pantallas pequeñas -->
        <button @click="toggleMenu"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60 sm:hidden">
            Menu
        </button>

        <!-- Menú desplegable en pantallas pequeñas -->
        <div v-show="menuOpen" class="sm:hidden absolute top-12 right-0 bg-white dark:bg-dark rounded shadow-lg">
            <router-link
                to="/auth/login"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            >
                Iniciar Sesión
            </router-link>
            <router-link
                to="/auth/register"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            >
                Registrarme
            </router-link>
        </div>

        <!-- Enlaces fijos para pantallas más grandes -->
        <div class="hidden sm:flex space-x-4">
            <router-link
                to="/auth/login"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            >
                Iniciar Sesión
            </router-link>
            <router-link
                to="/auth/register"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            >
                Registrarme
            </router-link>
        </div>
    </div>
    <div v-if="userStore.id" class="sm:ltr:mr-auto sm:rtl:ml-auto">
        <div v-if="options.length>1">
            <multiselect
                v-model="selectedOption"
                :options="displayOptions"
                class="custom-multiselect"
                :searchable="true"
                :allow-empty="true"
                placeholder="Seleccionar una empresa"
                value="value"
                label="label"
                selected-label=""
                select-label=""
                deselect-label=""
                @select="handleSelection"
            >
            </multiselect>
        </div>
        <div v-else>
            <multiselect
                v-model="selectedOption"
                :options="options"
                class="custom-multiselect"
                value="value"
                label="label"
                :allow-empty="false"
                :preselect-first="true"
                selected-label=""
                select-label=""
                deselect-label=""
                @select="handleSelection"
                hideSelect
            >
            </multiselect>
        </div>
    </div>
    <div v-if="userStore.id" class="dropdown shrink-0">
        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="8">
            <button
                type="button"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22 10C22.0185 10.7271 22 11.0542 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <path
                        d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <circle cx="19" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
                </svg>
            </button>
            <template #content="{ close }">
                <ul class="top-11 !py-0 text-dark dark:text-white-dark w-[300px] sm:w-[375px] text-xs">
                    <li class="mb-5">
                        <div class="overflow-hidden relative rounded-t-md !p-5 text-white">
                            <div
                                class="absolute h-full w-full bg-[url('/assets/images/menu-heade.jpg')] bg-no-repeat bg-center bg-cover inset-0"
                            ></div>
                            <h4 class="font-semibold relative z-10 text-lg">Messages</h4>
                        </div>
                    </li>
                    <template v-for="msg in messages" :key="msg.id">
                        <li>
                            <div class="flex items-center py-3 px-5">
                                <div v-html="msg.image"></div>
                                <span class="px-3 dark:text-gray-500">
                                                    <div class="font-semibold text-sm dark:text-white-light/90"
                                                         v-text="msg.title"></div>
                                                    <div v-text="msg.message"></div>
                                                </span>
                                <span
                                    class="font-semibold bg-white-dark/20 rounded text-dark/60 px-1 ltr:ml-auto rtl:mr-auto whitespace-pre dark:text-white-dark ltr:mr-2 rtl:ml-2"
                                    v-text="msg.time"
                                ></span>
                                <button type="button" class="text-neutral-300 hover:text-danger"
                                        @click="removeMessage(msg.id)">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="1.5"/>
                                        <path
                                            d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </template>
                    <template v-if="messages.length">
                        <li class="border-t border-white-light text-center dark:border-white/10 mt-5">
                            <div
                                class="flex items-center py-4 px-5 text-primary font-semibold group dark:text-gray-400 justify-center cursor-pointer"
                                @click="close()"
                            >
                                <span class="group-hover:underline ltr:mr-1 rtl:ml-1">VIEW ALL ACTIVITIES</span>

                                <svg
                                    class="w-4 h-4 group-hover:translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 12H20M20 12L14 6M20 12L14 18"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </div>
                        </li>
                    </template>
                    <template v-if="!messages.length">
                        <li class="mb-5">
                            <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                    <svg width="40" height="40" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                No data available.
                            </div>
                        </li>
                    </template>
                </ul>
            </template>
        </Popper>
    </div>
    <div v-if="userStore.id" class="dropdown shrink-0">
        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8">
            <button
                type="button"
                class="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                    />
                    <path
                        d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                    <path d="M12 6V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>

                <span class="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                    <span
                                        class="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"
                                    ></span>
                                    <span class="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                </span>
            </button>
            <template #content="{ close }">
                <ul class="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                    <li>
                        <div class="flex items-center px-4 py-2 justify-between font-semibold">
                            <h4 class="text-lg">Notification</h4>
                            <template v-if="notifications.length">
                                <span class="badge bg-primary/80" v-text="notifications.length + ' New'"></span>
                            </template>
                        </div>
                    </li>
                    <template v-for="notification in notifications" :key="notification.id">
                        <li class="dark:text-white-light/90">
                            <div class="group flex items-center px-4 py-2">
                                <div class="grid place-content-center rounded">
                                    <div class="w-12 h-12 relative">
                                        <img
                                            class="w-12 h-12 rounded-full object-cover"
                                            :src="`/assets/images/${notification.profile}`"
                                            alt=""
                                        />
                                        <span
                                            class="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                    </div>
                                </div>
                                <div class="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                    <div class="ltr:pr-3 rtl:pl-3">
                                        <h6 v-html="notification.message"></h6>
                                        <span class="text-xs block font-normal dark:text-gray-500"
                                              v-text="notification.time"></span>
                                    </div>
                                    <button
                                        type="button"
                                        class="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                        @click="removeNotification(notification.id)"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor"
                                                    stroke-width="1.5"/>
                                            <path
                                                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </template>
                    <template v-if="notifications.length">
                        <li>
                            <div class="p-4">
                                <button class="btn btn-primary block w-full btn-small" @click="close()">Read All
                                    Notifications
                                </button>
                            </div>
                        </li>
                    </template>
                    <template v-if="!notifications.length">
                        <li>
                            <div class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                <div class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                    <svg width="40" height="40" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                No data available.
                            </div>
                        </li>
                    </template>
                </ul>


            </template>
        </Popper>
    </div>
    <div v-if="userStore.id" class="dropdown shrink-0">
        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8"
                class="!block">
            <button type="button" class="relative group block">
                <img
                    class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    :src="userStore.avatar"
                    alt=""
                />
            </button>
            <template #content="{ close }">
                <ul class="text-dark dark:text-white-dark !py-0 w-[250px] font-semibold dark:text-white-light/90">
                    <li>
                        <div class="flex items-center px-4 py-4">
                            <div class="flex-none">
                                <img class="rounded-md w-10 h-10 object-cover"
                                     :src="userStore.avatar" :alt="userStore.fullname"/>
                            </div>
                            <div class="ltr:pl-4 rtl:pr-4 truncate">
                                <h4 class="text-base">
                                    {{ userStore.first_name }}<span
                                    class="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">{{
                                        userStore.roles[0].name
                                    }}</span>
                                </h4>
                                <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                   href="javascript:;"
                                >{{ userStore.email }}</a
                                >
                            </div>
                        </div>
                    </li>
                    <li>
                        <router-link :to="{name:'dashboard'}" class="dark:hover:text-white"
                                     @click="close()">
                            <svg class="group-hover:!text-primary shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path opacity="0.5" d="M6.22209 4.60105C6.66665 4.304 7.13344 4.04636 7.6171 3.82976C8.98898 3.21539 9.67491 2.9082 10.5875 3.4994C11.5 4.09061 11.5 5.06041 11.5 7.00001V8.50001C11.5 10.3856 11.5 11.3284 12.0858 11.9142C12.6716 12.5 13.6144 12.5 15.5 12.5H17C18.9396 12.5 19.9094 12.5 20.5006 13.4125C21.0918 14.3251 20.7846 15.011 20.1702 16.3829C19.9536 16.8666 19.696 17.3334 19.399 17.7779C18.3551 19.3402 16.8714 20.5578 15.1355 21.2769C13.3996 21.9959 11.4895 22.184 9.64665 21.8175C7.80383 21.4509 6.11109 20.5461 4.78249 19.2175C3.45389 17.8889 2.5491 16.1962 2.18254 14.3534C1.81598 12.5105 2.00412 10.6004 2.72315 8.86451C3.44218 7.12861 4.65982 5.64492 6.22209 4.60105Z"
                                      fill="currentColor" />
                                <path d="M21.446 7.06901C20.6342 5.00831 18.9917 3.36579 16.931 2.55398C15.3895 1.94669 14 3.34316 14 5.00002V9.00002C14 9.5523 14.4477 10 15 10H19C20.6569 10 22.0533 8.61055 21.446 7.06901Z"
                                      fill="currentColor" />
                            </svg>
                            <span class="px-2">{{ $t('Dashboard') }}</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'profile'}" class="dark:hover:text-white"
                                     @click="close()">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            Perfil
                        </router-link>
                    </li>
                    <li v-if="companyStore.companiesSelect.length===1">
                        <router-link :to="{name:'company'}" class="dark:hover:text-white"
                                     @click="close()">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0">
                                <path d="M22 22L2 22" stroke="currentColor" stroke-width="1.5"
                                      stroke-linecap="round"/>
                                <path
                                    d="M17 22V6C17 4.11438 17 3.17157 16.4142 2.58579C15.8284 2 14.8856 2 13 2H11C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6V22"
                                    stroke="currentColor" stroke-width="1.5"/>
                                <path
                                    d="M21 22V11.5C21 10.0955 21 9.39331 20.6629 8.88886C20.517 8.67048 20.3295 8.48298 20.1111 8.33706C19.6067 8 18.9045 8 17.5 8"
                                    stroke="currentColor" stroke-width="1.5"/>
                                <path
                                    d="M3 22V11.5C3 10.0955 3 9.39331 3.33706 8.88886C3.48298 8.67048 3.67048 8.48298 3.88886 8.33706C4.39331 8 5.09554 8 6.5 8"
                                    stroke="currentColor" stroke-width="1.5"/>
                                <path d="M12 22V19" stroke="currentColor" stroke-width="1.5"
                                      stroke-linecap="round"/>
                                <path d="M10 5H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M10 8H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M10 11H14" stroke="currentColor" stroke-width="1.5"
                                      stroke-linecap="round"/>
                                <path d="M10 14H14" stroke="currentColor" stroke-width="1.5"
                                      stroke-linecap="round"/>
                                <circle cx="19" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            Empresa
                        </router-link>
                    </li>
                    <li class="border-t border-white-light dark:border-white-light/10">
                        <button class="text-danger !py-3" @click="logout()">
                            <svg
                                class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    opacity="0.5"
                                    d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                />
                                <path
                                    d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </template>
        </Popper>
    </div>
</template>

<script lang="ts" setup>

import {ref, onMounted, computed, reactive, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import appSetting from '@/app-setting';
import {useUserStore} from '@/stores/user-store';
import {useCompanyStore} from '@/stores/company-store';
import {useRoute} from 'vue-router';
import {useAppStore} from '@/stores/index';
import {API} from '@/services/api';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import RightSidebarComponent from "../partials/rightSidebarComponent.vue";

const store = useAppStore();
const route = useRoute();
const search = ref(false);
const api = new API();
const companyStore = useCompanyStore();
const userStore = useUserStore();

const menuOpen = ref(false);

function toggleMenu() {
    menuOpen.value = !menuOpen.value;
}

const options = ref(companyStore.companyOptions);
const displayOptions = computed(() => [
    {label: 'Ver Todas', value: 0},
    ...options.value
]);
const selectedOption = ref();

const handleSelection = (option) => {
    if (option.value === 0) {
        const companyIds = options.value.map(option => option.value);
        companyStore.setCompaniesSelect(companyIds);
        companyStore.clearCompany()
    } else {
        companyStore.setCompaniesSelect([option.value]);
        const company = companyStore.companies.find(x => x.id === option.value)
        companyStore.setCompany(company)
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
    console.log(userStore.id, companyStore.id)
    if (userStore.id && companyStore.id) {
        selectedOption.value = { label:companyStore.name,value:companyStore.id }
    }
    setActiveDropdown();
});

watch(route, (to, from) => {
    setActiveDropdown();
});

const logout = async () => {
    await userStore.logout();
    window.location.replace('/auth/logout')
}

</script>

<style>
    .custom-multiselect {
        width: 300px; /* Ajusta el ancho fijo que desees */
        max-width: 100%; /* Asegura que no se expanda más allá del contenedor */
    }

    .custom-multiselect .multiselect__content-wrapper {
        max-height: 200px; /* Altura máxima del menú desplegable */
    }
</style>
