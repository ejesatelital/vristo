<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{ name: 'dashboard' }" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'tickets'}" class="text-primary hover:underline">
                    <span>{{ $t('tickets') }}</span>
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{{ $t('edit') }}</span>
            </li>
        </ul>
        <div class="panel ">
            <div class="flex items-center justify-between flex-wrap p-4" :class="`bg-${selectedTicket.status_class}-light`">
                <div class="flex items-center">
                    <button type="button" class="ltr:mr-2 rtl:ml-2 hover:text-primary" >
                        <router-link :to="{ name: 'tickets' }">
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
                        </router-link>
                    </button>
                    <h4 class="text-base md:text-lg font-medium ltr:mr-2 rtl:ml-2">
                        #{{ selectedTicket.id  }} - {{ selectedTicket.subject }}
                    </h4>
                    <div class="badge bg-info hover:top-0" :class="`bg-${selectedTicket.status_class}`"> {{ selectedTicket.status }}</div>
                </div>
                <!-- <div>
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
                </div> -->
            </div>
            <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

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
                                        class="w-3 h-3 rounded-full"
                                        :class="`bg-${selectedTicket.priority_class}`"
                                    ></div>
                                    <tippy target="priority" class="capitalize">{{ selectedTicket.priority }}</tippy>
                                </div>
                            </div>
                            <div class="text-white-dark whitespace-nowrap"> Creado {{ selectedTicket.created_at_text }}</div>
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
                                        <ul class="sm:w-80">
                                            <li>
                                                <div class="flex items-center px-4 py-2">
                                                    <div class="text-white-dark ltr:mr-2 rtl:ml-2 w-1/4">Actualizado</div>
                                                    <div class="flex-1">
                                                        {{ selectedTicket.updated_at_text }}
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </div> -->
                        </div>
                    </div>
                    <div v-if="selectedTicket.status_id != 4">
                        <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                            <div class="dropdown">
                                <Popper
                                    :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'"
                                    offsetDistance="0"
                                    class="align-middle"
                                >
                                    <div>
                                        <button type="button" v-tippy:settings class="hover:text-primary">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"></circle>
                                                <path
                                                    opacity="0.5"
                                                    d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                ></path>
                                            </svg>
                                        </button>
                                        <tippy target="settings">Opciones</tippy>
                                    </div>
                                    <template #content="{ close }">
                                        <ul @click="close()" class="whitespace-nowrap">
                                            <!-- <li>
                                                <a href="javascript:;" class="w-full text-primary gap-2" @click="openResponsibleModal(selectedTicket)">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                                        <path d="M9.5 14C11.1569 14 12.5 15.3431 12.5 17C12.5 18.6568 11.1569 20 9.5 20C7.84315 20 6.5 18.6568 6.5 17C6.5 15.3431 7.84315 14 9.5 14Z" stroke="currentColor" stroke-width="1.5"/>
                                                        <path d="M14.5 3.99998C12.8431 3.99998 11.5 5.34312 11.5 6.99998C11.5 8.65683 12.8431 9.99998 14.5 9.99998C16.1569 9.99998 17.5 8.65683 17.5 6.99998C17.5 5.34312 16.1569 3.99998 14.5 3.99998Z" stroke="currentColor" stroke-width="1.5"/>
                                                        <path opacity="0.5" d="M13 17L22 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        <path opacity="0.5" d="M11 7L2 6.9585" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        <path opacity="0.5" d="M2 17L6 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        <path opacity="0.5" d="M22 7L18 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                    </svg>
                                                    {{ selectedTicket.assigned_id ? 'Reasignar ticket':'Asignar ticket' }}
                                                </a>
                                            </li> -->
                                            <li v-if="selectedTicket.user_id == userStore.id">
                                                <a href="javascript:;" class="w-full text-success gap-2" @click="setStatus(selectedTicket.id, 4)">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                                        <path opacity="0.5" d="M12 2L12 10M12 10L15 7M12 10L9 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                        <path opacity="0.5" d="M2 13H5.16026C6.06543 13 6.51802 13 6.91584 13.183C7.31367 13.3659 7.60821 13.7096 8.19729 14.3968L8.80271 15.1032C9.39179 15.7904 9.68633 16.1341 10.0842 16.317C10.482 16.5 10.9346 16.5 11.8397 16.5H12.1603C13.0654 16.5 13.518 16.5 13.9158 16.317C14.3137 16.1341 14.6082 15.7904 15.1973 15.1032L15.8027 14.3968C16.3918 13.7096 16.6863 13.3659 17.0842 13.183C17.482 13 17.9346 13 18.8397 13H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        <path d="M17 2.12695C18.6251 2.28681 19.7191 2.64808 20.5355 3.46455C22 4.92902 22 7.28604 22 12.0001C22 16.7141 22 19.0712 20.5355 20.5356C19.0711 22.0001 16.714 22.0001 12 22.0001C7.28595 22.0001 4.92893 22.0001 3.46447 20.5356C2 19.0712 2 16.7141 2 12.0001C2 7.28604 2 4.92902 3.46447 3.46455C4.28094 2.64808 5.37486 2.28681 7 2.12695" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                    </svg>
                                                    Cerrar ticket
                                                </a>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] mt-4"></div>

                <div class="mt-4 prose dark:prose-p:text-white max-w-full prose-img:m-0" v-html="selectedTicket.message.description" @click="handleImageClick"></div>

                <div class="mt-8" v-show="selectedTicket.message.attachments">
                    <div class="text-base mb-4">Adjuntos</div>
                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                    <div class="flex items-center flex-wrap mt-6">
                        <template v-for="(attachment, i) in selectedTicket.message.attachments" :key="i">
                            <a :href="attachment.url" :download="attachment.name">
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
                            </a>
                        </template>
                    </div>
                </div>

            </div>
        </div>

        <div class="my-2">
            <p class="text-bold text-xl text-primary">Respuestas</p>
            <div class="sm:pb-0 pb-[68px] sm:min-h-[300px] min-h-[500px]" v-if="responsesByTicket?.length > 0">
                <div v-for="responseTicket in responsesByTicket" :key="responseTicket">
                    <div class="panel mt-2">
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
                        <div
                            class="mt-4 prose dark:prose-p:text-white max-w-full prose-img:m-0"
                            v-html="responseTicket.message.description"
                            @click="handleImageClick"></div>
                            <!-- Componente de Lightbox -->
                            <vue-easy-lightbox
                                escDisabled
                                :visible="visible"
                                :imgs="images"
                                :index="currentImageIndex"
                                @hide="visible = false"
                                prevent-scroll
                            />

                        <div class="mt-4" v-show="responseTicket.message.attachments">
                            <div class="text-base mb-4">Adjuntos</div>
                            <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                            <div class="flex items-center flex-wrap mt-6">
                                <template v-for="(attachment, i) in responseTicket.message.attachments" :key="i">
                                    <a :href="attachment.url" :download="attachment.name">
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
                                    </a>
                                </template>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div v-else>
                <div class="panel">
                    <p>No se han agregado respuestas todavía.</p>
                </div>
            </div>
        </div>

        <div class="panel" v-if="selectedTicket.status_id != 4">
            <form class="grid gap-4">
                <div class="h-fit">
                    <label for="response" class="text-xl text-bold">Responder</label>
                    <quillEditor
                        id="message"
                        ref="editor"
                        v-model:value="ticketResponseData.message.description"
                        :options="editorOptions"
                        style="min-height: 300px"
                        @ready="quillEditorReady($event)"
                    ></quillEditor>
                </div>
                <div>
                    <label for="file" class="text-xl text-bold">Adjuntar archivos</label>
                    <input
                        id="file"
                        type="file"
                        class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                        multiple
                        accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                        @change="handleFileResponseChange"
                    />
                </div>
                <div class="flex items-center ltr:ml-auto rtl:mr-auto mt-5">
                    <button type="button" class="btn btn-outline-danger ltr:mr-3 rtl:ml-3" @click="clearForm">Cancelar</button>

                    <button
                        type="button"
                        class="btn btn-outline-success gap-2"
                        @click="sendResponse(selectedTicket.id)"
                    >
                        Enviar
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                            <path
                                d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z"
                                stroke="currentColor"
                                stroke-width="1.5"
                            />
                            <path opacity="0.5" d="M6 18L21 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import { quillEditor, Quill } from 'vue3-quill';
    import 'vue3-quill/lib/vue3-quill.css';
    import { API } from '@/services/api';
    import { NOTIFY } from '@/services/notify';
    import VueEasyLightbox from 'vue-easy-lightbox';
    import { useRoute, useRouter } from 'vue-router';
    import { useMeta } from '@/composables/use-meta';
    import { useUserStore } from "../../stores/user-store";
    import { useAppStore } from '@/stores/index';

    useMeta({ title: 'Ticket Detail' });
    const route = useRoute();
    const router = useRouter();
    const store = useAppStore();
    const selectedTicket: any = ref(null);
    const userStore = useUserStore();
    const api = new API();
    const notify = new NOTIFY();
    const total_responses_rows = ref(0);
    const paramsResponses = reactive({
        current_page: 1,
        pagesize: 10,
        column_filters: [],
        sort_column: 'id',
        sort_direction: 'desc',
        search: null
    });
    const responsesByTicket: any = ref();
    const defaultResponseData = ref({
        message: {
                description: null,
            },
        ticket_id: null,
        user_id: userStore.id,
    });
    const ticketResponseData: any = ref(defaultResponseData.value);
    const quillEditorObj: any = ref(null);
    const visible = ref(false); // Controla si el lightbox está visible o no
    const images = ref<string[]>([]); // Almacena las URLs de las imágenes
    const currentImageIndex: any = ref(null); // Índice de la imagen seleccionada

    const editorOptions = ref({
        modules: {
            toolbar: [
                        ['bold', 'italic', 'underline', 'strike', 'link', 'image'],
                        [{ indent: '+1' }, { indent: '-1' }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],
                        ['clean'],
                    ],
        },
        placeholder: 'Escribe aquí...',
    });

    const quillEditorReady = (quill: any) => {
        quillEditorObj.value = quill;
    };
    const getTicket = async () => {
        try {

            const response = await api.get(`tickets/v1/tickets/${route.params.id}`);

            selectedTicket.value = response.data;

            // Procesa el contenido del ticket seleccionado
            const description = response.data.message.description;

            // Analiza las imágenes dentro de la descripción del ticket seleccionado
            const parser = new DOMParser();
            const doc = parser.parseFromString(description, 'text/html');
            const imageTags = doc.querySelectorAll('img');

            // Agrega las imágenes encontradas en el ticket a la lista global `images`
            images.value = Array.from(imageTags).map((img) => (img as HTMLImageElement).src);

            // Llama a getResponseData para procesar las imágenes de las respuestas asociadas
            await getResponseData(response.data.id);

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const sendResponse = async (id: any) => {
        let obj: any = {
            message: {
                description: ticketResponseData.value.message.description
            },
            ticket_id: id,
            user_id: userStore.id,
            file: ticketResponseData.value.message.attachments
        };

        try {
            const isConfirmed = await notify.showConfirm(
                'Confirmar Envío',
                '¿Estás seguro de que deseas enviar esta respuesta?',
                'question',
                'Sí, enviar',
                'Cancelar'
            );
            if (isConfirmed) {
                await api.post(`tickets/v1/responses`, obj, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                notify.showToast('Respuesta guardada exitosamente', 'success');
                await getResponseData(id);
                clearForm();
                await getTicket();
            } else {
                notify.showToast('Envío cancelado', 'info');
            }
        } catch (error) {
            console.error('Error fetching data', error);
            notify.showToast('Error al guardar la respuesta', 'error');
        }
    };

    // Función para manejar la selección de archivos
    const handleFileResponseChange = (event) => {
        ticketResponseData.value.message.attachments = event.target.files;
    };

    // Función para manejar clics en las imágenes
    const handleImageClick = (event: Event) => {
        const target = event.target as HTMLImageElement;

        if (target.tagName === 'IMG') {
            const imgSrc = target.src;

            // Busca la imagen en el arreglo considerando su posición
            const index = Array.from(document.querySelectorAll('img')).findIndex(
                (img) => img.src === imgSrc
            );

            if (index !== -1) {
                currentImageIndex.value = index;
                visible.value = true;
            }
        }
    };

    // Función para obtener las respuestas de los tickets
    const getResponseData = async (id: number) => {
        try {
            const response = await api.get(`tickets/v1/responses?filter={"ticket_id":${id}}&page=${paramsResponses.current_page}&take=${paramsResponses.pagesize}`);
            responsesByTicket.value = response?.data;

            // Recorre todas las respuestas para procesar sus descripciones
            responsesByTicket.value.forEach((ticketResponse) => {
                const description = ticketResponse.message.description;
                if (description) {
                    // Analiza el contenido de `description` para buscar imágenes
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(description, 'text/html');
                    const imageTags = doc.querySelectorAll('img');
                    images.value.push(...Array.from(imageTags).map((img) => (img as HTMLImageElement).src)); // Añade imágenes sin sobrescribir las existentes
                }
            });

            // Actualiza el total de respuestas
            total_responses_rows.value = response?.meta?.page?.total;

        } catch (error) {
            console.error('Error fetching responses', error);
        }
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
                    router.push({ name: 'tickets' });
                    notify.showToast('Ticket cerrado exitosamente!', 'success');
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

    const clearForm = () => {
        // Reiniciar los valores a los predeterminados
        ticketResponseData.value = { ...defaultResponseData.value };

        // Limpiar el contenido del editor de Quill si está listo
        if (quillEditorObj.value) {
            quillEditorObj.value.setText(''); // Limpia el contenido del editor
        }

        // Limpiar el campo de archivos, si corresponde
        const fileInput = document.getElementById('file') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    // Lógica que corre cuando el componente es montado
    onMounted(async () => {
       await getTicket();
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
