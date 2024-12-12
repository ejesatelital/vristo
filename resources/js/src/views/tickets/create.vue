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
                <span>{{ $t('create') }}</span>
            </li>
        </ul>

        <div class="panel">
            <div class="p-4 flex items-center">
                <h4 class="text-2xl text-gray-600 dark:text-gray-400 font-medium font-semibold">Crear un nuevo
                    ticket</h4>

                <router-link class="ltr:ml-auto rtl:mr-auto hover:text-primary" :to="{name:'tickets'}"
                             @click="toggleMobileMenu">
                    <div class="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 rtl:rotate-180"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                        </svg>
                    </div>
                </router-link>
            </div>
            <div
                class="h-px bg-gradient-to-l from-indigo-900/20 via-black dark:via-white to-indigo-900/20 opacity-[0.1]"></div>
            <form class="p-6 grid gap-6" @submit.prevent="saveTicket">
                <div>
                    <label for="subject">Título</label>
                    <input id="subject" type="text" placeholder="Ingrese un título" class="form-input"
                           v-model="ticketData.subject"/>
                </div>

                <div class="flex-1">
                    <label for="priority">Prioridad</label>
                    <select id="priority" class="form-select" v-model="ticketData.priority">
                        <option value="1">Bajo</option>
                        <option value="2">Medio</option>
                        <option value="3">Alto</option>
                        <option value="4">Urgente</option>
                    </select>
                </div>

                <div class="flex-1">
                    <Select
                        :options="roles"
                        v-model="rolSelected"
                        titleSelect="Area"
                        name="roles"
                        @update:modelValue="getUsersByRol"
                    />
                </div>

                <div class="flex-1">
                    <Select
                        :options="usersByRol"
                        v-model="userByRolSelected"
                        titleSelect="Colaboradores"
                        name="usersByRol"
                    />
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
                    <label for="file" class="text-xl text-bold">Adjuntar archivos</label>
                    <input
                        id="file"
                        type="file"
                        class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                        multiple
                        accept="image/*,.zip,.pdf,.xls,.xlsx,.txt,.doc,.docx"
                        @change="handleFileChange"
                    />
                    <div class="mt-8" v-show="ticketData.message.attachments">
                        <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                        <div class="flex items-center flex-wrap mt-6">
                            <template v-for="(attachment, i) in ticketData.message.attachments" :key="i">
                                <a href="javascript:;" @click="removeFile(attachment)">
                                    <button
                                        type="button"
                                        class="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-[#e0e6ed] dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group"
                                    >
                                        <template v-if="attachment.type === 'image'">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                <path
                                                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                                <circle opacity="0.5" cx="16" cy="8" r="2" stroke="currentColor"
                                                        stroke-width="1.5"/>
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
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                <path opacity="0.5" d="M18 10L13 10" stroke="currentColor"
                                                    stroke-width="1.5" stroke-linecap="round"/>
                                                <path
                                                    d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                />
                                            </svg>
                                        </template>
                                        <template v-if="attachment.type === 'zip'">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
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
                                        <template
                                            v-if="attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder'">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                <path
                                                    d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z"
                                                    fill="currentColor"
                                                />
                                                <path opacity="0.5" d="M6 14.5H14" stroke="currentColor" stroke-width="1.5"
                                                    stroke-linecap="round"/>
                                                <path opacity="0.5" d="M6 18H11.5" stroke="currentColor" stroke-width="1.5"
                                                    stroke-linecap="round"/>
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
                                                <path d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22" stroke="currentColor" stroke-width="1.5"/>
                                                <path d="M15.3973 4.05365L14.8957 4.6112L15.3973 4.05365ZM19.3574 7.61654L18.8558 8.1741L19.3574 7.61654ZM21.6604 10.1541L20.9753 10.4593V10.4593L21.6604 10.1541ZM3.17196 20.8284L3.7022 20.298L3.7022 20.298L3.17196 20.8284ZM20.8346 20.8284L20.3043 20.298H20.3043L20.8346 20.8284ZM18.291 12.8571L18.707 12.233H18.707L18.291 12.8571ZM21.7207 12.8571L21.3048 12.233L21.3048 12.233L21.7207 12.8571ZM9.71681 12.8571L9.30088 12.233L9.71681 12.8571ZM12.2891 12.8571L12.705 12.233L12.2891 12.8571ZM6.28712 12.8571L5.87118 13.4812L6.28712 12.8571ZM3.71485 12.8571L3.29892 12.233L3.29891 12.233L3.71485 12.8571ZM18.291 16.8571L18.707 16.233H18.707L18.291 16.8571ZM21.7207 16.8571L22.1367 17.4812L22.1367 17.4812L21.7207 16.8571ZM15.7188 16.8571L15.3028 16.233L15.7188 16.8571ZM12.2891 16.8571L12.705 16.233L12.2891 16.8571ZM9.71681 16.8571L9.30088 16.233L9.71681 16.8571ZM15.7188 12.8571L15.3028 12.233L15.7188 12.8571ZM6.28712 16.8571L5.87118 17.4812L6.28712 16.8571ZM3.71485 16.8571L3.29892 16.233H3.29892L3.71485 16.8571ZM3.08865 17.2745L3.50458 17.8986H3.50458L3.08865 17.2745ZM2.27827 19.1149L3.00783 18.941H3.00783L2.27827 19.1149ZM21.9717 16.9978L22.721 17.0288L21.9717 16.9978ZM21.9999 12.3273L22.7498 12.3134V12.3134L21.9999 12.3273ZM2.21436 18.0728L2.91237 18.3472L2.91237 18.3472L2.21436 18.0728ZM2.00613 12.2421L2.75153 12.1591L2.75153 12.1591L2.00613 12.2421ZM3.45978 13.0198L3.80416 13.686L3.80416 13.686L3.45978 13.0198ZM14.0039 21.25H10.0026V22.75H14.0039V21.25ZM2.75 11.9397V10H1.25V11.9397H2.75ZM14.8957 4.6112L18.8558 8.1741L19.859 7.05899L15.899 3.49609L14.8957 4.6112ZM18.8558 8.1741C20.2096 9.39219 20.7093 9.86209 20.9753 10.4593L22.3455 9.84888C21.9194 8.89231 21.1144 8.18844 19.859 7.05899L18.8558 8.1741ZM10.0324 2.75C11.6147 2.75 12.2119 2.76157 12.7442 2.96576L13.2814 1.56527C12.4294 1.23843 11.5011 1.25 10.0324 1.25V2.75ZM15.899 3.49609C14.8126 2.51868 14.1334 1.89209 13.2814 1.56527L12.7442 2.96576C13.2766 3.16999 13.7256 3.55847 14.8957 4.6112L15.899 3.49609ZM10.0026 21.25C8.09518 21.25 6.74004 21.2484 5.712 21.1102C4.70551 20.975 4.12559 20.7213 3.7022 20.298L2.64171 21.3588C3.39028 22.1072 4.33946 22.4393 5.51219 22.5969C6.66337 22.7516 8.13758 22.75 10.0026 22.75V21.25ZM14.0039 22.75C15.869 22.75 17.3432 22.7516 18.4943 22.5969C19.6671 22.4393 20.6163 22.1072 21.3648 21.3588L20.3043 20.298C19.8809 20.7213 19.301 20.975 18.2945 21.1102C17.2665 21.2484 15.9114 21.25 14.0039 21.25V22.75ZM2.75 10C2.75 8.09317 2.75159 6.73853 2.8898 5.71088C3.02511 4.70484 3.27884 4.12521 3.7022 3.70199L2.64171 2.64116C1.89311 3.38951 1.56087 4.33848 1.40319 5.51094C1.24841 6.66181 1.25 8.13559 1.25 10H2.75ZM10.0324 1.25C8.15737 1.25 6.67597 1.24842 5.52009 1.40307C4.34322 1.56053 3.39086 1.89225 2.64171 2.64116L3.7022 3.70199C4.12501 3.27932 4.70671 3.02526 5.719 2.88982C6.75227 2.75158 8.11512 2.75 10.0324 2.75V1.25ZM17.8751 13.4812C19.1654 14.3412 20.8464 14.3412 22.1367 13.4812L21.3048 12.233C20.5183 12.7572 19.4935 12.7572 18.707 12.233L17.8751 13.4812ZM10.1327 13.4812C10.6597 13.1301 11.3462 13.1301 11.8731 13.4812L12.705 12.233C11.6743 11.5461 10.3316 11.5461 9.30088 12.233L10.1327 13.4812ZM5.87118 13.4812C7.16149 14.3412 8.84243 14.3412 10.1327 13.4812L9.30088 12.233C8.51433 12.7572 7.48959 12.7572 6.70305 12.233L5.87118 13.4812ZM4.13078 13.4812C4.65772 13.1301 5.34424 13.1301 5.87118 13.4812L6.70305 12.233C5.67234 11.5461 4.32962 11.5461 3.29892 12.233L4.13078 13.4812ZM17.8751 17.4812C19.1654 18.3412 20.8464 18.3412 22.1367 17.4812L21.3048 16.233C20.5183 16.7572 19.4935 16.7572 18.707 16.233L17.8751 17.4812ZM16.1347 17.4812C16.6616 17.1301 17.3482 17.1301 17.8751 17.4812L18.707 16.233C17.6763 15.5461 16.3335 15.5461 15.3028 16.233L16.1347 17.4812ZM11.8731 17.4812C13.1635 18.3412 14.8444 18.3412 16.1347 17.4812L15.3028 16.233C14.5163 16.7572 13.4916 16.7572 12.705 16.233L11.8731 17.4812ZM10.1327 17.4812C10.6597 17.1301 11.3462 17.1301 11.8731 17.4812L12.705 16.233C11.6743 15.5461 10.3316 15.5461 9.30088 16.233L10.1327 17.4812ZM16.1347 13.4812C16.6616 13.1301 17.3482 13.1301 17.8751 13.4812L18.707 12.233C17.6763 11.5461 16.3335 11.5461 15.3028 12.233L16.1347 13.4812ZM5.87118 17.4812C7.16149 18.3412 8.84243 18.3412 10.1327 17.4812L9.30088 16.233C8.51433 16.7572 7.48959 16.7572 6.70305 16.233L5.87118 17.4812ZM11.8731 13.4812C13.1635 14.3412 14.8444 14.3412 16.1347 13.4812L15.3028 12.233C14.5163 12.7572 13.4916 12.7572 12.705 12.233L11.8731 13.4812ZM4.13078 17.4812C4.65772 17.1301 5.34424 17.1301 5.87118 17.4812L6.70305 16.233C5.67234 15.5461 4.32962 15.5461 3.29892 16.233L4.13078 17.4812ZM3.50458 17.8986L4.13078 17.4812L3.29892 16.233L2.67271 16.6504L3.50458 17.8986ZM1.54871 19.2888C1.74368 20.1067 2.07472 20.792 2.64171 21.3588L3.7022 20.298C3.3767 19.9726 3.15508 19.5587 3.00783 18.941L1.54871 19.2888ZM21.2223 16.9667C21.145 18.8313 20.8923 19.7103 20.3043 20.298L21.3648 21.3588C22.3944 20.3296 22.643 18.9115 22.721 17.0288L21.2223 16.9667ZM22.7498 12.3134C22.7314 11.3207 22.665 10.566 22.3455 9.84888L20.9753 10.4593C21.1627 10.88 21.2321 11.3707 21.25 12.3412L22.7498 12.3134ZM22.1367 13.4812C22.5227 13.224 22.7585 12.7861 22.7498 12.3134L21.25 12.3412C21.2491 12.2936 21.2726 12.2545 21.3048 12.233L22.1367 13.4812ZM2.67272 16.6504C2.43437 16.8092 2.19984 16.964 2.01644 17.1213C1.81381 17.2951 1.63153 17.5054 1.51635 17.7984L2.91237 18.3472C2.91455 18.3416 2.91655 18.3375 2.92285 18.3293C2.93099 18.3187 2.95008 18.2967 2.99299 18.2599C3.09145 18.1754 3.23663 18.0771 3.50458 17.8986L2.67272 16.6504ZM3.00783 18.941C2.94379 18.6723 2.91452 18.5425 2.90515 18.4445C2.89892 18.3793 2.90528 18.3652 2.91237 18.3472L1.51635 17.7984C1.29891 18.3515 1.44462 18.8521 1.54871 19.2888L3.00783 18.941ZM22.1367 17.4812C21.7395 17.7459 21.2022 17.4512 21.2223 16.9667L22.721 17.0288C22.752 16.2805 21.9217 15.8219 21.3048 16.233L22.1367 17.4812ZM1.25 11.9397C1.25 12.0786 1.24872 12.217 1.26074 12.325L2.75153 12.1591C2.75254 12.1681 2.75135 12.1627 2.75067 12.1201C2.75002 12.0794 2.75 12.0246 2.75 11.9397H1.25ZM3.29891 12.233C3.22823 12.2801 3.18264 12.3105 3.1484 12.3325C3.11256 12.3556 3.10735 12.3577 3.11539 12.3535L3.80416 13.686C3.90065 13.6361 4.01511 13.5583 4.13078 13.4812L3.29891 12.233ZM1.26074 12.325C1.39654 13.5453 2.71386 14.2496 3.80416 13.686L3.11539 12.3535C2.95911 12.4343 2.7709 12.3331 2.75153 12.1591L1.26074 12.325Z" fill="currentColor"/>
                                            </svg>

                                        </div>
                                    </button>
                                </a>
                            </template>
                        </div>
                    </div>
                </div>

                <div class="flex items-center ltr:ml-auto rtl:mr-auto mt-8">
                    <button type="submit" class="btn btn-success ltr:mr-3 rtl:ml-3" :disabled="loading">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, reactive, watch} from 'vue';
import {NOTIFY} from '@/services/notify';
import {useRouter} from 'vue-router';
import {quillEditor, Quill} from 'vue3-quill';
import 'vue3-quill/lib/vue3-quill.css';
import {useUserStore} from "../../stores/user-store";
import {API} from '@/services/api';
import Select from '@/components/partials/Select.vue';
import appSetting from "@/app-setting";
import {useAppStore} from "@/stores";

const api = new API();
const store = useAppStore();
const loading = ref(false);
const roles = ref();
const usersByRol = ref();
const rolSelected = ref();
const userByRolSelected = ref();

const userStore = useUserStore();
const editorOptions = ref({
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', 'image'],
            [{indent: '+1'}, {indent: '-1'}],
            [{list: 'ordered'}, {list: 'bullet'}],
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            [{size: ['small', false, 'large', 'huge']}],
            [{color: []}, {background: []}],
            [{font: []}],
            [{align: []}],
            ['clean'],
        ],
    },
    placeholder: 'Escribe aquí...',
});
const quillEditorObj: any = ref(null);

const notify = new NOTIFY();

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
    rol_id: null,
    data: {
        navigator: null,
        ip_address: null,
        operating_system: null
    },
});

const ticketData: any = ref(defaultData.value);
const router = useRouter();

const params = reactive({
    current_page: 1,
    pagesize: 10,
    column_filters: [],
    sort_column: 'id',
    sort_direction: 'desc',
    search: null,
    status: [1, 2, 3],
    user_id: null
});

watch(loading, (value) => {
    store.isShowMainLoader = loading.value;
});

// Función para manejar la selección de archivos
const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Archivos seleccionados en el input
    const existingFiles = ticketData.value.message.attachments || []; // Archivos ya almacenados

    // Crear un mapa para verificar duplicados basado en el nombre del archivo
    const existingFileNames = new Set(existingFiles.map(file => file.name));

    // Filtrar los archivos que ya existen
    const newFiles = selectedFiles.filter(file => !existingFileNames.has(file.name));

    // Agregar los nuevos archivos al array existente
    ticketData.value.message.attachments = [...existingFiles, ...newFiles];
};

// Eliminar archivo de la lista
const removeFile = (attachmentToRemove) => {
    // notify.showConfirm(
    //     '¿Estás seguro?',
    //     'Deseas quitar el archivo de la selección?',
    //     'warning',
    //     'Sí',
    //     'No'
    // ).then(isConfirmed => {
    //     if (isConfirmed) {
            ticketData.value.message.attachments = Array.from(ticketData.value.message.attachments).filter(file => file !== attachmentToRemove);
    //     }
    // });
};

const saveTicket = async (id: any) => {
    if (!ticketData.value.subject) {
        notify.showToast('Debes asignar un título al caso.', 'warning');
        return false;
    }

    if (!ticketData.value.priority) {
        notify.showToast('Debes asignar una prioridad del caso.', 'warning');
        return false;
    }

    if (!rolSelected.value) {
        notify.showToast('Debes asignar un área al caso.', 'warning');
        return false;
    }

    if (!ticketData.value.message?.description || ticketData.value.message.description.trim() === '') {
        notify.showToast('Debes agregar una descripción al caso.', 'warning');
        return false;
    }

    const {browser, os} = getBrowserInfo();
    const ipAddress = await getIpAddress();

    let obj: any = {
        subject: ticketData.value.subject,
        message: {
            description: ticketData.value.message.description
        },
        code: 1,
        status: ticketData.value.status,
        priority: ticketData.value.priority,
        rol_id: rolSelected.value.value,
        assigned_id: userByRolSelected.value?.value || null,
        user_id: userStore.id,
        data: {
            navigator: browser,
            ip_address: ipAddress,
            operating_system: os
        },
        file: ticketData.value.message.attachments || []
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
            loading.value = true;
            await api.postForm(`tickets/v1/tickets`, obj).then(()=>{
                loading.value = false;
            }).catch((e)=>{

                loading.value = false;
            });
            router.push({name: 'tickets'});
            notify.showToast('Ticket creado exitosamente', 'success');
        } else {
            notify.showToast('Operación cancelada', 'info');
        }
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }

};


const quillEditorReady = (quill: any) => {
    quillEditorObj.value = quill;
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

    return {browser, os};
};

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
                // .filter((x: any) => x.id >= 5 && x.id <= 9)
                .map(function (x: any) {
                    return {
                        label: x.first_name + ' ' + x.last_name,
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
