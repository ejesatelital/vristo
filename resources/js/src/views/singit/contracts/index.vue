<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{{ $t('contract') }}</span>
            </li>
        </ul>

        <div class="mt-5 panel p-5 border-0 overflow-hidden">
            <h2 class="text-2xl font-semibold mb-2"> {{ $t('contracts') }}</h2>
            <div class="flex items-center justify-between gap-4 my-4">
                <div>
                    <button type="button" class="btn btn-sm btn-primary gap-2" @click="isResponsibleModal = true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
                            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        {{$t("new_contract")}}
                    </button>
                </div>
                <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">

                    <div class="relative">
                        <input v-model="params.search" type="text" class="form-input py-2 ltr:pr-11 rtl:pl-11 peer w-full pr-10" placeholder="Buscar..."/>
                        <button v-if="params.search" @click="clearSearch" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" >
                            ✕
                        </button>
                        <div v-else class="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

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
                    <template #actions="data">
                        <div class="flex justify-center gap-3">

                            <button type="button" class="btn btn-sm btn-primary" @click="copyContractURL(data.value.url)">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2">
                                    <path
                                    d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    />
                                    <path
                                    opacity="0.5"
                                    d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    />
                                </svg>
                                Copiar URL
                            </button>

                            <!-- <template v-if="userStore.hasAccess('sass.companies.edit')"> -->
                                <button type="button" class="btn btn-sm btn-info" v-tippy:edit  @click="redirectToEdit(data.value.id)">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path opacity="0.5" d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M8 8H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M8 16H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>

                                </button>
                                <tippy target="edit">{{ $t('edit') }}</tippy>
                            <!-- </template> -->

                            <!-- <template v-if="userStore.hasAccess('sass.companies.destroy')"> -->
                                <button type="button" class="btn btn-sm btn-danger" v-tippy:delete @click="deleteRow(data.value.id)">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>
                                    </svg>
                                </button>
                                <tippy target="delete">{{ $t('delete') }}</tippy>
                            <!-- </template> -->

                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>


        <!-- add project modal -->
        <TransitionRoot appear :show="isResponsibleModal" as="template"  @close="isResponsibleModal = true ">
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
                            <DialogPanel class="panel border-0 p-0 w-full max-w-5xl text-black dark:text-white-dark">
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
                                <div class="text-lg rounded-lg font-semibold font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px] dark:text-white-light">
                                    {{$t("new_contract")}}
                                </div>
                                <div class="p-5 mb-5">

                                    <form-wizard color="#4361ee" class="circle" @on-complete="saveContract" step-size="sm" :preventJump="true">
                                        <tab-content
                                            title="Home"
                                            customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M18.18 8.03933L18.6435 7.57589C19.4113 6.80804 20.6563 6.80804 21.4241 7.57589C22.192 8.34374 22.192 9.58868 21.4241 10.3565L20.9607 10.82M18.18 8.03933C18.18 8.03933 18.238 9.02414 19.1069 9.89309C19.9759 10.762 20.9607 10.82 20.9607 10.82M18.18 8.03933L13.9194 12.2999C13.6308 12.5885 13.4865 12.7328 13.3624 12.8919C13.2161 13.0796 13.0906 13.2827 12.9882 13.4975C12.9014 13.6797 12.8368 13.8732 12.7078 14.2604L12.2946 15.5L12.1609 15.901M20.9607 10.82L16.7001 15.0806C16.4115 15.3692 16.2672 15.5135 16.1081 15.6376C15.9204 15.7839 15.7173 15.9094 15.5025 16.0118C15.3203 16.0986 15.1268 16.1632 14.7396 16.2922L13.5 16.7054L13.099 16.8391M13.099 16.8391L12.6979 16.9728C12.5074 17.0363 12.2973 16.9867 12.1553 16.8447C12.0133 16.7027 11.9637 16.4926 12.0272 16.3021L12.1609 15.901M13.099 16.8391L12.1609 15.901" stroke="currentColor" stroke-width="1.5"></path><path d="M8 13H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 9H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 17H9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path opacity="0.5" d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="currentColor" stroke-width="1.5"></path></svg>'
                                        >

                                            <div class="flex-1">
                                                <Select
                                                    :options="templates"
                                                    v-model="templateSelected"
                                                    titleSelect="Select template"
                                                    name="plantilla"
                                                    @update:modelValue="getAttributesTemplate"
                                                />
                                            </div>

                                            <!-- Renderiza atributos si existen -->
                                            <div v-if="templateData?.attributes?.length > 0">
                                                <div
                                                    class="row my-2"
                                                    v-for="(field, index) in templateData.attributes"
                                                    :key="index"
                                                >
                                                    <label>{{ field.label || '' }}</label>

                                                    <div v-if="['text', 'number', 'date', 'email'].includes(field.type)">
                                                        <input
                                                            :type="field.type || 'text'"
                                                            :name="field.name"
                                                            v-model="field.value"
                                                            :placeholder="field.placeholder"
                                                            :required="field.required || true"
                                                            class="form-input"
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                        </tab-content>
                                        <tab-content
                                            title="Contract"
                                            customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531" stroke="currentColor" stroke-width="1.5"></path><path d="M11.7769 10L16.6065 11.2941" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path opacity="0.5" d="M11 12.8975L13.8978 13.6739" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>'
                                        >
                                            <button @click="replaceTemplateVariables" class="btn btn-outline-primary">Generar Contrato</button>
                                            <div class="output ql-snow my-2">
                                                <div v-html="contractData.data"></div>
                                            </div>

                                        </tab-content>
                                        <tab-content
                                            title="Annex"
                                            customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M7.9175 17.8068L15.8084 10.2535C16.7558 9.34668 16.7558 7.87637 15.8084 6.96951M3 10.0346L9.40419 3.90441C12.0569 1.3652 16.3578 1.3652 19.0105 3.90441" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path opacity="0.5" d="M19.0105 13.0996L19.5291 13.6414L19.0105 13.0996ZM11.0624 20.7076L10.5438 20.1658L11.0624 20.7076ZM4.54388 14.4679L5.0625 15.0097L4.54388 14.4679ZM12.3776 6.9694L11.859 6.4276L12.3776 6.9694ZM19.5291 3.3625C19.2299 3.07608 18.7551 3.08646 18.4687 3.38568C18.1823 3.68491 18.1927 4.15967 18.4919 4.44609L19.5291 3.3625ZM18.4919 12.5578L10.5438 20.1658L11.581 21.2494L19.5291 13.6414L18.4919 12.5578ZM5.0625 15.0097L12.8962 7.51119L11.859 6.4276L4.02527 13.9262L5.0625 15.0097ZM16.327 6.4276C15.0896 5.24313 13.0964 5.24313 11.859 6.4276L12.8962 7.51119C13.5536 6.88194 14.6324 6.88194 15.2898 7.51119L16.327 6.4276ZM5.0625 20.1658C3.57096 18.7381 3.57096 16.4375 5.0625 15.0097L4.02527 13.9262C1.91671 15.9445 1.91671 19.2311 4.02527 21.2494L5.0625 20.1658ZM10.5438 20.1658C9.03379 21.6112 6.57253 21.6112 5.0625 20.1658L4.02527 21.2494C6.11533 23.25 9.49098 23.25 11.581 21.2494L10.5438 20.1658ZM18.4919 4.44609C20.8361 6.68999 20.8361 10.3139 18.4919 12.5578L19.5291 13.6414C22.4903 10.8069 22.4903 6.19703 19.5291 3.3625L18.4919 4.44609Z" fill="currentColor"></path></svg>'
                                        >

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

                                        </tab-content>
                                        <tab-content
                                            title="Send"
                                            customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M6 18L21 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>'
                                        >

                                            <div>
                                                <label for="subject">Nombre completo *</label>
                                                <input id="subject" type="text" placeholder="Ingrese el nombre completo" class="form-input" v-model="contractData.options.name" required />
                                            </div>
                                            <div>
                                                <label for="subject">Correo *</label>
                                                <input id="subject" type="email" placeholder="Ingrese el correo" class="form-input" v-model="contractData.options.email" required />
                                            </div>

                                        </tab-content>
                                    </form-wizard>

                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>


    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive, watch } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';
    import { useAppStore } from '@/stores/index';
    import { useI18n } from 'vue-i18n';
    import { API } from '@/services/local';
    import { NOTIFY } from '@/services/notify';
    import {useCompanyStore} from "@/stores/company-store";
    import { useRouter } from 'vue-router';
    import Select from '@/components/partials/Select.vue';
    import {useUserStore} from "@/stores/user-store";

    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import { FormWizard, TabContent } from 'vue3-form-wizard';
    import 'vue3-form-wizard/dist/style.css';
    import useClipboard from 'vue-clipboard3';

    const { toClipboard } = useClipboard();

    const notify = new NOTIFY();
    const companyStore = useCompanyStore();
    const loading = ref(true);
    const store = useAppStore();
    const i18n = reactive(useI18n());
    const api = new API();
    const router = useRouter();
    const userStore = useUserStore();
    const templates = ref();
    const templateData:any = ref({
        attributes:[],
        description: null
    });
    const templateSelected = ref();

    const isResponsibleModal = ref(false);

    useMeta({ title: 'Tabs' });

    const cols = ref([
        { field: 'id', title: 'Id'},
        { field: 'options.name', title: 'Nombre'},
        { field: 'options.email', title: 'Correo'},
        { field: 'template.name', title: 'Plantilla'},
        { field: 'created_at', title: 'Registrado el', type:"date"},
        { field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center' },
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

    const defaultData = ref({
        template_id: null,
        user_id: userStore.id,
        data:[],
        hash:null,
        options:{
            name: null,
            email: null
        },
        attachments: [],
    });

    const contractData: any = ref(defaultData.value);

    const deleteRow = (id: number) => {
        notify.showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer',
            'warning',
            'Sí, eliminar',
            'Cancelar'
            ).then(isConfirmed => {
            if (isConfirmed) {
                api.delete(`singit/v1/contracts/${id}`)
                .then(async response => {
                    await getData();
                    notify.showToast('Registro eliminado exitosamente!', 'success');
                })
                .catch(error => {
                    notify.showToast('Hubo un problema al eliminar el registro: '+error.value?.errors, 'error');
                });
            }
        });
    };

    // Función para manejar la selección de archivos
    const handleFileResponseChange = (event) => {
        contractData.value.attachments = event.target.files;
    };

    const getData = async () => {
        try {
            loading.value = true;
            const response = await api.get(`singit/v1/contracts?filter={"search":"${params.search}"}&page=${params.current_page}&take=${params.pagesize}`)
            rows.value = response?.data;
            console.log("🚀 ~ getData ~ rows:", rows)
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

    // Cerrar el modal
    const closeResponsibleModal = () => {
        isResponsibleModal.value = false;
    };

    // Function to get templates data
    const getAttributesTemplate = async () => {
        try {
            const responseGetTemplate = await api.get(`singit/v1/templates/${templateSelected.value.value}`);
            templateData.value = responseGetTemplate.data || { attributes: [] };
            contractData.value.template_id = responseGetTemplate.data.id;
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const getTemplates = async () =>
    {
        const response = await api.get(`singit/v1/templates`);
        if (response) {
            templates.value = response.data
            // .filter((x: any) => x.id >= 5 && x.id <= 9)
            .map(function (x: any) {
                return {
                    label: x.name,
                    value: x.id
                }
            })
        }
    }

    const replaceTemplateVariables = () => {
        if (!templateData.value.description) return;

        let updatedDescription = templateData.value.description;

        // Iterar sobre los atributos para reemplazar las variables
        templateData.value.attributes.forEach((attr) => {
            const variablePattern = new RegExp(`{{\\s*${attr.label}\\s*}}`, 'g'); // Crear regex dinámico para {{ variable }}
            updatedDescription = updatedDescription.replace(variablePattern, attr.value || '');
        });
        // Actualizar el contenido de la descripción
        contractData.value.data = updatedDescription;
    };

    const saveContract = async () => {
        await api.post('singit/v1/contracts', contractData.value, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        closeResponsibleModal();
        // limpiamos template data
        templateData.value.attributes = [];
        templateData.value.description = null;
        contractData.value.options.name = null;
        contractData.value.options.email = null;
        contractData.value.attachments = [];

        notify.showToast('Contrato guardado exitosamente!', 'success');
    };

    watch (
        () => templateData.value.attributes,
        () => {
            replaceTemplateVariables();
        },
        { deep: true } // Escucha cambios profundos
    );

    const redirectToEdit = (id: number) => {
        router.push({ name: 'contracts-edit', params: { id } });
    };

    const copyContractURL = async (msg) => {
        if (msg) {
            await toClipboard(msg);
            notify.showToast('URL copiada exitosamente!', 'success');
        }
    };
    onMounted(async () => {
       await getData();
       await getTemplates();
    });
</script>
