<template>
    <div>
        <div v-if="contractData.signature">
            <div class="panel p-5 my-5">
                <div class="flex justify-between flex-wrap gap-4">
                    <div class="text-3xl font-semibold uppercase">{{contractData.company?.name || 'Contrato' }}</div>
                    <div class="shrink-0"  >
                        <img v-if="contractData.company?.logo" :src="`${contractData.company?.logo}`" alt="Logo de la empresa" class="w-20 ltr:ml-auto rtl:mr-auto" />
                        <img v-else src="/assets/images/logo.png" alt="Logo de la empresa" class="w-20 ltr:ml-auto rtl:mr-auto" />
                    </div>
                </div>
                <div class="ltr:text-right rtl:text-left px-4">
                    <div class="space-y-1 mt-6 text-white-dark">
                        <div>Se firmó en: {{ formatDate(contractData.updated_at) }}</div>
                        <div>IP del registro: {{  contractData.logs.ip_address }}</div>
                    </div>
                </div>
            </div>

            <div class="panel h-screen my-5">
                <div class="p-5 0 h-full">
                    <iframe
                        :src="`/contratos/pdf/${contractData.hash}`"
                        class="w-full h-full border rounded-lg"
                        frameborder="0"
                    ></iframe>
                </div>
            </div>

            <div class="panel my-5">
                <div class="mt-4" v-show="contractData.annex">
                    <div class="text-2xl mb-4">Adjuntos</div>
                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                    <div class="flex items-center flex-wrap mt-6">
                        <template v-for="(attachment, i) in contractData.annex" :key="i">
                            <a :href="attachment.url" :download="attachment.name">
                                <button type="button"
                                    class="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-[#e0e6ed] dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group">
                                    <template v-if="attachment.type === 'image'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                            <path
                                                d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                                stroke="currentColor" stroke-width="1.5" />
                                            <circle opacity="0.5" cx="16" cy="8" r="2" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <path opacity="0.5"
                                                d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001"
                                                stroke="currentColor" stroke-width="1.5"
                                                stroke-linecap="round" />
                                        </svg>
                                    </template>
                                    <template v-if="attachment.type === 'folder'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                            <path opacity="0.5" d="M18 10L13 10" stroke="currentColor"
                                                stroke-width="1.5" stroke-linecap="round" />
                                            <path
                                                d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                                                stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </template>
                                    <template v-if="attachment.type === 'zip'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                            <path
                                                d="M9.5 15.5V15.375C9.5 14.8918 9.89175 14.5 10.375 14.5H13.625C14.1082 14.5 14.5 14.8918 14.5 15.375V15.5C14.5 16.8807 13.3807 18 12 18C10.6193 18 9.5 16.8807 9.5 15.5Z"
                                                stroke="#8E93A6" stroke-width="1.5" stroke-linecap="round" />
                                            <path
                                                d="M9.5 3C9.5 2.5286 9.5 2.29289 9.64645 2.14645C9.79289 2 10.0286 2 10.5 2H11C11.4714 2 11.7071 2 11.8536 2.14645C12 2.29289 12 2.5286 12 3V3.5C12 3.9714 12 4.20711 11.8536 4.35355C11.7071 4.5 11.4714 4.5 11 4.5H10.5C10.0286 4.5 9.79289 4.5 9.64645 4.35355C9.5 4.20711 9.5 3.9714 9.5 3.5V3Z"
                                                stroke="#8E93A6" stroke-width="1.5" />
                                            <path
                                                d="M9.5 8C9.5 7.5286 9.5 7.29289 9.64645 7.14645C9.79289 7 10.0286 7 10.5 7H11C11.4714 7 11.7071 7 11.8536 7.14645C12 7.29289 12 7.5286 12 8V8.5C12 8.9714 12 9.20711 11.8536 9.35355C11.7071 9.5 11.4714 9.5 11 9.5H10.5C10.0286 9.5 9.79289 9.5 9.64645 9.35355C9.5 9.20711 9.5 8.9714 9.5 8.5V8Z"
                                                stroke="#8E93A6" stroke-width="1.5" />
                                            <path
                                                d="M12 5.5C12 5.0286 12 4.79289 12.1464 4.64645C12.2929 4.5 12.5286 4.5 13 4.5H13.5C13.9714 4.5 14.2071 4.5 14.3536 4.64645C14.5 4.79289 14.5 5.0286 14.5 5.5V6C14.5 6.4714 14.5 6.70711 14.3536 6.85355C14.2071 7 13.9714 7 13.5 7H13C12.5286 7 12.2929 7 12.1464 6.85355C12 6.70711 12 6.4714 12 6V5.5Z"
                                                stroke="#8E93A6" stroke-width="1.5" />
                                            <path
                                                d="M12 10.5C12 10.0286 12 9.79289 12.1464 9.64645C12.2929 9.5 12.5286 9.5 13 9.5H13.5C13.9714 9.5 14.2071 9.5 14.3536 9.64645C14.5 9.79289 14.5 10.0286 14.5 10.5V11C14.5 11.4714 14.5 11.7071 14.3536 11.8536C14.2071 12 13.9714 12 13.5 12H13C12.5286 12 12.2929 12 12.1464 11.8536C12 11.7071 12 11.4714 12 11V10.5Z"
                                                stroke="#8E93A6" stroke-width="1.5" />
                                            <path
                                                d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                                stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </template>
                                    <template
                                        v-if="attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder'">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                            <path
                                                d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z"
                                                fill="currentColor" />
                                            <path opacity="0.5" d="M6 14.5H14" stroke="currentColor"
                                                stroke-width="1.5" stroke-linecap="round" />
                                            <path opacity="0.5" d="M6 18H11.5" stroke="currentColor"
                                                stroke-width="1.5" stroke-linecap="round" />
                                            <path opacity="0.5"
                                                d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22"
                                                stroke="currentColor" stroke-width="1.5" />
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
                                        class="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block">
                                    </div>
                                    <div
                                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                            <path opacity="0.5"
                                                d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </button>
                            </a>
                        </template>
                    </div>
                </div>
            </div>
        </div>


        <div class="panel" v-if="!contractData.signature">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">{{ contractData.template?.name ?? 'Contrato' }}</h5>
            </div>

            <div class="mb-5">
                <form-wizard class="sm-circle" color="#4361ee" @on-complete="saveContract"
                    next-button-text="Siguiente" back-button-text="Atrás" finish-button-text="Finalizar" step-size="sm"
                    :steps="3">
                    <tab-content :selected="true" :before-change="() => beforeTabSwitch(1)"
                        customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531" stroke="currentColor" stroke-width="1.5"></path><path d="M11.7769 10L16.6065 11.2941" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path opacity="0.5" d="M11 12.8975L13.8978 13.6739" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>'>

                        <div class="output ql-snow my-2">
                            <div v-html="contractData.data"></div>
                        </div>
                        <div>
                            <label class="inline-flex items-center mt-1 cursor-pointer">
                                <input type="checkbox" class="form-checkbox" v-model="acceptContract"/>
                                <span class="text-white-dark">Aceptar los términos y condiciones.</span>
                            </label>
                        </div>
                    </tab-content>

                    <tab-content :before-change="() => beforeTabSwitch(2)"
                        v-if="contractData.template?.settings?.[0]?.document_photo"
                        customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="9" cy="9" r="2" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M13 15C13 16.1046 13 17 9 17C5 17 5 16.1046 5 15C5 13.8954 6.79086 13 9 13C11.2091 13 13 13.8954 13 15Z" stroke="currentColor" stroke-width="1.5"/>
                                        <path opacity="0.5" d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M19 12H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M19 9H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path opacity="0.9" d="M19 15H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>'>
                        <div v-if="currentStep <= 2 ">
                            <h5 class="font-semibold text-lg dark:text-white-light">Verificación de documentos</h5>

                            <p class="dark:text-white-light mt-4">Toma fotos de ambos lados de tu documento de identidad emitido por el gobierno</p>

                            <div class="flex flex-col rounded-md border border-[#e0e6ed] dark:border-[#1b2e4b] my-4">
                                <div class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">Carga una imagen completa de tu documento de identidad.</div>
                                <div class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">Asegúrate que todos los detalles sean legibles en la imagen.</div>
                                <div class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">Asegúrate de que el documento sea original y esté vigente.</div>
                                <div class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">Los documentos deben estar sobre un fondo unicolor.</div>
                            </div>
                            <div class="flex items-center justify-center">
                                <button type="button" class="btn btn-outline-dark" @click="openModal">Continuar</button>
                            </div>
                        </div>
                        <div v-else>
                            <h5 class="font-semibold text-lg dark:text-white-light">Documentos cargados con éxito!</h5>
                            <p class="dark:text-white-light mt-4">Se te notificará en caso de requerir información adicional.</p>
                        </div>
                    </tab-content>

                    <tab-content :before-change="() => beforeTabSwitch(3)"
                        v-if="contractData.template?.settings?.[0]?.attachments" customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.9175 17.8068L15.8084 10.2535C16.7558 9.34668 16.7558 7.87637 15.8084 6.96951M3 10.0346L9.40419 3.90441C12.0569 1.3652 16.3578 1.3652 19.0105 3.90441" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            <path opacity="0.5" d="M19.0105 13.0996L19.5291 13.6414L19.0105 13.0996ZM11.0624 20.7076L10.5438 20.1658L11.0624 20.7076ZM4.54388 14.4679L5.0625 15.0097L4.54388 14.4679ZM12.3776 6.9694L11.859 6.4276L12.3776 6.9694ZM19.5291 3.3625C19.2299 3.07608 18.7551 3.08646 18.4687 3.38568C18.1823 3.68491 18.1927 4.15967 18.4919 4.44609L19.5291 3.3625ZM18.4919 12.5578L10.5438 20.1658L11.581 21.2494L19.5291 13.6414L18.4919 12.5578ZM5.0625 15.0097L12.8962 7.51119L11.859 6.4276L4.02527 13.9262L5.0625 15.0097ZM16.327 6.4276C15.0896 5.24313 13.0964 5.24313 11.859 6.4276L12.8962 7.51119C13.5536 6.88194 14.6324 6.88194 15.2898 7.51119L16.327 6.4276ZM5.0625 20.1658C3.57096 18.7381 3.57096 16.4375 5.0625 15.0097L4.02527 13.9262C1.91671 15.9445 1.91671 19.2311 4.02527 21.2494L5.0625 20.1658ZM10.5438 20.1658C9.03379 21.6112 6.57253 21.6112 5.0625 20.1658L4.02527 21.2494C6.11533 23.25 9.49098 23.25 11.581 21.2494L10.5438 20.1658ZM18.4919 4.44609C20.8361 6.68999 20.8361 10.3139 18.4919 12.5578L19.5291 13.6414C22.4903 10.8069 22.4903 6.19703 19.5291 3.3625L18.4919 4.44609Z" fill="currentColor"/>
                                            </svg>'>
                        <div>
                            <label for="file" class="text-xl text-bold">Adjuntar archivos</label>
                            <input id="file" type="file"
                                class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                multiple accept="image/*,.zip,.pdf,.xls,.xlsx,.txt,.doc,.docx"
                                @change="handleFileResponseChange" />
                        </div>

                        <div class="mt-4" v-show="contractData.annex">
                            <div class="text-base mb-4">Adjuntos</div>
                            <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                            <div class="flex items-center flex-wrap mt-6">
                                <template v-for="(attachment, i) in contractData.annex" :key="i">
                                    <a :href="attachment.url" :download="attachment.name">
                                        <button type="button"
                                            class="flex items-center ltr:mr-4 rtl:ml-4 mb-4 border border-[#e0e6ed] dark:border-[#1b2e4b] rounded-md hover:text-primary hover:border-primary transition-all duration-300 px-4 py-2.5 relative group">
                                            <template v-if="attachment.type === 'image/jpeg'">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                    <path
                                                        d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                                        stroke="currentColor" stroke-width="1.5" />
                                                    <circle opacity="0.5" cx="16" cy="8" r="2" stroke="currentColor"
                                                        stroke-width="1.5" />
                                                    <path opacity="0.5"
                                                        d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001"
                                                        stroke="currentColor" stroke-width="1.5"
                                                        stroke-linecap="round" />
                                                </svg>
                                            </template>
                                            <template v-if="attachment.type === 'folder'">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                    <path opacity="0.5" d="M18 10L13 10" stroke="currentColor"
                                                        stroke-width="1.5" stroke-linecap="round" />
                                                    <path
                                                        d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                                                        stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </template>
                                            <template v-if="attachment.type === 'zip'">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                    <path
                                                        d="M9.5 15.5V15.375C9.5 14.8918 9.89175 14.5 10.375 14.5H13.625C14.1082 14.5 14.5 14.8918 14.5 15.375V15.5C14.5 16.8807 13.3807 18 12 18C10.6193 18 9.5 16.8807 9.5 15.5Z"
                                                        stroke="#8E93A6" stroke-width="1.5" stroke-linecap="round" />
                                                    <path
                                                        d="M9.5 3C9.5 2.5286 9.5 2.29289 9.64645 2.14645C9.79289 2 10.0286 2 10.5 2H11C11.4714 2 11.7071 2 11.8536 2.14645C12 2.29289 12 2.5286 12 3V3.5C12 3.9714 12 4.20711 11.8536 4.35355C11.7071 4.5 11.4714 4.5 11 4.5H10.5C10.0286 4.5 9.79289 4.5 9.64645 4.35355C9.5 4.20711 9.5 3.9714 9.5 3.5V3Z"
                                                        stroke="#8E93A6" stroke-width="1.5" />
                                                    <path
                                                        d="M9.5 8C9.5 7.5286 9.5 7.29289 9.64645 7.14645C9.79289 7 10.0286 7 10.5 7H11C11.4714 7 11.7071 7 11.8536 7.14645C12 7.29289 12 7.5286 12 8V8.5C12 8.9714 12 9.20711 11.8536 9.35355C11.7071 9.5 11.4714 9.5 11 9.5H10.5C10.0286 9.5 9.79289 9.5 9.64645 9.35355C9.5 9.20711 9.5 8.9714 9.5 8.5V8Z"
                                                        stroke="#8E93A6" stroke-width="1.5" />
                                                    <path
                                                        d="M12 5.5C12 5.0286 12 4.79289 12.1464 4.64645C12.2929 4.5 12.5286 4.5 13 4.5H13.5C13.9714 4.5 14.2071 4.5 14.3536 4.64645C14.5 4.79289 14.5 5.0286 14.5 5.5V6C14.5 6.4714 14.5 6.70711 14.3536 6.85355C14.2071 7 13.9714 7 13.5 7H13C12.5286 7 12.2929 7 12.1464 6.85355C12 6.70711 12 6.4714 12 6V5.5Z"
                                                        stroke="#8E93A6" stroke-width="1.5" />
                                                    <path
                                                        d="M12 10.5C12 10.0286 12 9.79289 12.1464 9.64645C12.2929 9.5 12.5286 9.5 13 9.5H13.5C13.9714 9.5 14.2071 9.5 14.3536 9.64645C14.5 9.79289 14.5 10.0286 14.5 10.5V11C14.5 11.4714 14.5 11.7071 14.3536 11.8536C14.2071 12 13.9714 12 13.5 12H13C12.5286 12 12.2929 12 12.1464 11.8536C12 11.7071 12 11.4714 12 11V10.5Z"
                                                        stroke="#8E93A6" stroke-width="1.5" />
                                                    <path
                                                        d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                                                        stroke="currentColor" stroke-width="1.5" />
                                                </svg>
                                            </template>
                                            <template
                                                v-if="attachment.type !== 'zip' && attachment.type !== 'image' && attachment.type !== 'folder'">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                    <path
                                                        d="M15.3929 4.05365L14.8912 4.61112L15.3929 4.05365ZM19.3517 7.61654L18.85 8.17402L19.3517 7.61654ZM21.654 10.1541L20.9689 10.4592V10.4592L21.654 10.1541ZM3.17157 20.8284L3.7019 20.2981H3.7019L3.17157 20.8284ZM20.8284 20.8284L20.2981 20.2981L20.2981 20.2981L20.8284 20.8284ZM14 21.25H10V22.75H14V21.25ZM2.75 14V10H1.25V14H2.75ZM21.25 13.5629V14H22.75V13.5629H21.25ZM14.8912 4.61112L18.85 8.17402L19.8534 7.05907L15.8947 3.49618L14.8912 4.61112ZM22.75 13.5629C22.75 11.8745 22.7651 10.8055 22.3391 9.84897L20.9689 10.4592C21.2349 11.0565 21.25 11.742 21.25 13.5629H22.75ZM18.85 8.17402C20.2034 9.3921 20.7029 9.86199 20.9689 10.4592L22.3391 9.84897C21.9131 8.89241 21.1084 8.18853 19.8534 7.05907L18.85 8.17402ZM10.0298 2.75C11.6116 2.75 12.2085 2.76158 12.7405 2.96573L13.2779 1.5653C12.4261 1.23842 11.498 1.25 10.0298 1.25V2.75ZM15.8947 3.49618C14.8087 2.51878 14.1297 1.89214 13.2779 1.5653L12.7405 2.96573C13.2727 3.16993 13.7215 3.55836 14.8912 4.61112L15.8947 3.49618ZM10 21.25C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981L2.64124 21.3588C3.38961 22.1071 4.33855 22.4392 5.51098 22.5969C6.66182 22.7516 8.13558 22.75 10 22.75V21.25ZM1.25 14C1.25 15.8644 1.24841 17.3382 1.40313 18.489C1.56076 19.6614 1.89288 20.6104 2.64124 21.3588L3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14H1.25ZM14 22.75C15.8644 22.75 17.3382 22.7516 18.489 22.5969C19.6614 22.4392 20.6104 22.1071 21.3588 21.3588L20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25V22.75ZM21.25 14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981L21.3588 21.3588C22.1071 20.6104 22.4392 19.6614 22.5969 18.489C22.7516 17.3382 22.75 15.8644 22.75 14H21.25ZM2.75 10C2.75 8.09318 2.75159 6.73851 2.88976 5.71085C3.02502 4.70476 3.27869 4.12511 3.7019 3.7019L2.64124 2.64124C1.89288 3.38961 1.56076 4.33855 1.40313 5.51098C1.24841 6.66182 1.25 8.13558 1.25 10H2.75ZM10.0298 1.25C8.15538 1.25 6.67442 1.24842 5.51887 1.40307C4.34232 1.56054 3.39019 1.8923 2.64124 2.64124L3.7019 3.7019C4.12453 3.27928 4.70596 3.02525 5.71785 2.88982C6.75075 2.75158 8.11311 2.75 10.0298 2.75V1.25Z"
                                                        fill="currentColor" />
                                                    <path opacity="0.5" d="M6 14.5H14" stroke="currentColor"
                                                        stroke-width="1.5" stroke-linecap="round" />
                                                    <path opacity="0.5" d="M6 18H11.5" stroke="currentColor"
                                                        stroke-width="1.5" stroke-linecap="round" />
                                                    <path opacity="0.5"
                                                        d="M13 2.5V5C13 7.35702 13 8.53553 13.7322 9.26777C14.4645 10 15.643 10 18 10H22"
                                                        stroke="currentColor" stroke-width="1.5" />
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
                                                class="bg-dark-light/40 z-[5] w-full h-full absolute ltr:left-0 rtl:right-0 top-0 rounded-md hidden group-hover:block">
                                            </div>
                                            <div
                                                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1 btn btn-primary hidden group-hover:block z-10">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                                    <path opacity="0.5"
                                                        d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </button>
                                    </a>
                                </template>
                            </div>
                        </div>
                    </tab-content>

                    <tab-content :before-change="() => beforeTabSwitch(4)"
                        v-if="contractData.template?.settings?.[0]?.signature" customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                            <path d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z" stroke="currentColor" stroke-width="1.5"/>
                                            <path opacity="0.5" d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9" stroke="currentColor" stroke-width="1.5"/>
                                            </svg>'>
                        <div>
                            <div class="flex justify-center border-b-4 border-dark pb-4">
                                <Vue3Signature ref="signature1" :sigOption="state.option" :w="'350px'" :h="'250px'"
                                    :disabled="state.disabled"
                                    class="border border-dark-light shadow shadow-dark-light "></Vue3Signature>
                            </div>
                            <div class="flex my-2 gap-3">
                                <button @click="clear" class="btn btn-sm btn-outline-danger">Limpiar</button>
                                <button @click="undo" class="btn btn-sm btn-outline-secondary">Retroceder</button>
                                <!-- <button @click="handleDisabled" class="btn btn-sm" :class="state.disabled?'btn-outline-info':'btn-outline-danger'">{{ state.disabled ? 'Habilitar':'Deshabilitar' }}</button> -->
                            </div>
                        </div>


                    </tab-content>

                </form-wizard>
            </div>

            <!-- Modal pictures -->
            <TransitionRoot appear :show="modalDocuments" as="template">
                <Dialog as="div" @close="openDocumentsModal" class="relative z-[51]">
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
                                <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        @click="closeDocumentsModal"
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
                                        class="text-2xl font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                    >
                                        Cargar documentos
                                    </div>
                                    <div class="p-5">
                                        <div v-if="currentStep === 1" class="mb-1">
                                            <h3><span class="font-semibold text-2xl text-primary dark:text-white">Paso 1:</span>  <span class="text-xl text-dark dark:text-white-light">Tomar foto frontal del documento.</span> </h3>
                                        </div>

                                        <div v-if="currentStep === 2" class="mb-1">
                                            <h3><span class="font-semibold text-2xl text-primary dark:text-white">Paso 2:</span> <span class="text-xl text-dark dark:text-white-light">Tomar foto de la parte posterior del documento.</span></h3>
                                        </div>

                                        <div v-if="currentStep <= 2" v-show="!capturedPhoto">
                                            <video ref="video" autoplay></video>
                                            <div class="flex items-center justify-end gap-3">
                                                <button @click="capturePhoto" :disabled="photos.length >= 2"
                                                    class="btn btn-sm btn-outline-primary gap-2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15 13H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        <path d="M12 10L12 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        <path d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z" stroke="currentColor" stroke-width="1.5"/>
                                                        <path d="M19 10H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                    </svg>Capturar Foto</button>
                                                <button @click="switchCamera" class="btn btn-sm btn-outline-secondary gap-2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z" stroke="currentColor" stroke-width="1.5"/>
                                                        <path d="M14.5197 10.6799L14.2397 10.4C13.0026 9.16288 10.9969 9.16288 9.75984 10.4C8.52276 11.637 8.52276 13.6427 9.75984 14.8798C10.9969 16.1169 13.0026 16.1169 14.2397 14.8798C14.7665 14.353 15.069 13.6868 15.1471 13M14.5197 10.6799L13 11M14.5197 10.6799V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>Cambiar Cámara</button>
                                            </div>
                                        </div>

                                        <!-- Foto capturada -->
                                        <div>
                                            <div v-if="capturedPhoto">
                                                <img :src="capturedPhoto" alt="Foto capturada" />
                                                <div class="flex items-center justify-end gap-3">
                                                    <button @click="acceptPhotoAndNextStep"
                                                    class="btn btn-outline-success" :disabled="uploadPhoto">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                            <path d="M13 7L15 9L20 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                            <path d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        </svg>
                                                    </button>
                                                    <button @click="discardPhoto" class="btn btn-outline-danger" :disabled="uploadPhoto">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                            <path d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                            <path d="M22 2.00002L16 8M16 2L21.9999 7.99998" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, onUnmounted } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import { FormWizard, TabContent } from 'vue3-form-wizard';
import 'vue3-form-wizard/dist/style.css';
import { useMeta } from '@/composables/use-meta';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Vue3Signature from "vue3-signature";
import { NOTIFY } from '@/services/notify';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
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

useMeta({ title: 'Contrato' });

const router = useRouter();
const notify = new NOTIFY();
const route = useRoute();
const state = reactive({
    count: 0,
    option: {
        penColor: "rgb(0, 0, 0)",
        backgroundColor: "rgb(255,255,255)"
    },
    disabled: false
});

const modalDocuments = ref(false);

const loading = ref(false);
const signature1: any = ref(null);
const contractData: any = ref({
    template_id: null,
    data: [],
    hash: null,
    accept: false,
    options: {
        name: null,
        email: null
    },
    attachments: [],
    template: [],
    logs: {
        navigator: null,
        ip_address: null,
        operating_system: null
    },
    signature: null,
    company: []
});
const step = ref(0);
// variables For The Document Verification
const video = ref(null);
const photos = ref([]);
const capturedPhoto = ref(null);
const currentStep = ref(1);
let stream = null;
let currentCamera = "environment";
const uploadPhoto = ref(false);
const acceptContract = ref(false);
const beforeTabSwitch = async (tab) => {
    step.value = tab;

    // Solo valida si se está intentando avanzar
    if (!acceptContract.value) {
        notify.showToast('Por favor, acepte los términos y condiciones antes de continuar.', 'warning');
        return false; // Impide el cambio de tab
    }

    // Solo valida si se está intentando avanzar
    if (contractData.value.template?.settings?.[0]?.document_photo && tab == 2 && currentStep.value < 3) {
        notify.showToast('Por favor, termine el proceso de verificación de documentos.', 'warning');
        return false; // Impide el cambio de tab
    }

    if (signature1.value.isEmpty() && tab == 4  ) {
        notify.showToast('Por favor, firme el contrato.', 'warning');
        return false;
    }

    // Permite el cambio
    return true;
};
const getContract = async () => {
    try {
        const response = await axios.get(`/api/singit/v1/contracts/${route.params.hash}/sign`);
        contractData.value = response.data;
    } catch (error) {
        console.error('Error fetching data', error);
    }
};
// Función para manejar la selección de archivos y subirlos al servidor
const handleFileResponseChange = async (event) => {
    const files = event.target.files;  // Obtener los archivos seleccionados
    if (files.length === 0) return;  // Verificar si hay archivos seleccionados

    try {
        // Crear un array de promesas para subir todos los archivos
        const uploadPromises = Array.from(files).map(file =>
            uploadFile(file, contractData.value.id, 2)
        );

        // Esperar que todos los archivos se suban
        const uploadedFiles = await Promise.all(uploadPromises);

        // Almacenar las URLs de los archivos subidos (puedes ajustar lo que necesitas)
        contractData.value.attachments = uploadedFiles;

        // Opcional: Mostrar un mensaje o actualizar la UI
        notify.showToast("Archivos subidos exitosamente.");
    } catch (error) {
        console.error("Error al subir los archivos:", error);
        notify.showToast("Hubo un error al subir los archivos. Por favor, intenta de nuevo.");
    }
};

// Función para manejar la firma
const clear = () => {
    signature1.value.clear()
};

const undo = () => {
    signature1.value.undo();
};
const openDocumentsModal = () => {
    modalDocuments.value = true;
    startCamera();
};

const closeDocumentsModal = () => {
    modalDocuments.value = false;
    stopCamera();
};

const getIpAddress = async () => {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const logs = await response.json();
        return logs.ip;
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

    return { browser, os };
};

// Abrir modal y activar la cámara
const openModal = async () => {
    modalDocuments.value = true; // Mostrar modal
    await startCamera(); // Iniciar la cámara
};

const startCamera = async () => {
    try {
        const constraints = { video: { facingMode: currentCamera } };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (video.value) {
            video.value.srcObject = stream;
        }
    } catch (error) {
        console.error("Error al acceder a la cámara:", error);
    }
};

const stopCamera = () => {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
    }
};

const capturePhoto = () => {
    if (!video.value) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;

    context.drawImage(video.value, 0, 0, canvas.width, canvas.height);
    capturedPhoto.value = canvas.toDataURL("image/jpeg", 0.6);
};

const dataURLToFile = (dataURL, fileName) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
};

const acceptPhotoAndNextStep = async () => {
    uploadPhoto.value = true;
    if (capturedPhoto.value) {
        try {
            // Convertir la imagen Base64 a Blob
            const compressedFile = dataURLToFile(capturedPhoto.value, `photo-step-${currentStep.value}.png`);

            // Crear el payload para enviar
            await uploadFile(compressedFile,contractData.value.id,1)

            // habilitamos de nuevo el botón de siguiente
            uploadPhoto.value = false;

            // Guardar la foto en la lista local después de enviarla
            photos.value.push(capturedPhoto.value);

            // Limpiar el estado de la foto actual
            capturedPhoto.value = null;

            // Avanzar al siguiente paso o finalizar
            if (currentStep.value < 2) {
                currentStep.value++; // Avanza al siguiente paso
            } else {
                currentStep.value = 3; // Finaliza el flujo
                cerrarModalDocumentsPhoto();
            }
        } catch (error) {
            console.error("Error al enviar la foto:", error);
            notify.showToast("Hubo un error al enviar la foto. Por favor, intenta de nuevo.", "error");
        }
    }
};

const uploadFile = async (file, contract_id, type) => {

    const formData = new FormData();
    // Agregar el archivo al FormData
    formData.append("attachments", file);
    formData.append("contract_id", contract_id);
    formData.append("type_id", type);
    try {
      // Enviar archivo al servidor
      let response = await axios.post('/contratos/annexes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response){
            // Agregar el nuevo annexo al array del contrato annex
            contractData.value.annex = [...contractData.value.annex, response.data.data];
        }

        return response.data.data;

    } catch (error) {
        console.error("Error al subir el archivo:", error);
        throw error; // Lanza el error para que pueda manejarse en otro lugar
    }
};

const discardPhoto = () => {
    capturedPhoto.value = null;
};

const switchCamera = async () => {
    currentCamera = currentCamera === "user" ? "environment" : "user";
    stopCamera();
    await startCamera();
};

const cerrarModalDocumentsPhoto = async () => {
    modalDocuments.value = false;
    console.log(photos.value);
};

// Finalize The Process
const saveContract = async () => {
    try {
        const { browser, os } = getBrowserInfo();
        const ipAddress = await getIpAddress();

        // Add the browser and IP information to the log
        contractData.value.logs = {
            navigator: browser,
            ip_address: ipAddress,
            operating_system: os
        };

        // Save the contractdata firm
        const signature = signature1.value.save();

        contractData.value.signature = signature;
        contractData.value.accept = acceptContract.value;

        // Here you can implement the contract sending if the signature is valid
        const isConfirmed = await notify.showConfirm(
            'Confirmar Envío',
            '¿Estás seguro de que deseas firmar este contrato?',
            'question',
            'Sí, enviar',
            'Cancelar'
        );

        if (isConfirmed) {
            await axios.put(`${contractData.value.id}/edit`, contractData.value);
            notify.showToast('Contrato firmado exitosamente!', 'success');
        } else {
            notify.showToast('Operación cancelada', 'info');
        }

    } catch (error) {
        notify.showToast('Error al guardar el contrato.', 'error');
        console.error("Error al guardar el contrato:", error);
    } finally {
        loading.value = false;
    }
};

function formatDate (date) {
    return moment(date).format('LL, HH:mm:ss');
}

onUnmounted(() => {
    stopCamera();
});

onMounted(async () => {
    await getContract();
});
</script>

<style>
video {
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}

img {
    width: 100%;
    max-width: 200px;
    margin: 10px 0;
    display: block;
}
iframe {
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>
