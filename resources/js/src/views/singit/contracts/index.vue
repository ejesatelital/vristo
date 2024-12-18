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
                    <button type="button" class="btn btn-sm btn-primary gap-2" @click="openModal()">
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
                            <!-- <template v-if="userStore.hasAccess('sass.companies.edit')"> -->

                                    <button type="button" class="btn btn-sm btn-info" v-tippy:copy @click="copyContractURL(data.value.url)" >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
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
                                    </button>
                                    <tippy target="copy">Copiar URL</tippy>

                        <!-- </template> -->
                        <!-- <template v-if="userStore.hasAccess('sass.companies.edit')"> -->
                            <div v-if="!data.value.signature">
                                <button type="button" class="btn btn-sm btn-primary" v-tippy:edit @click="openModal(data.value)">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                        <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M17.3009 2.80624L16.652 3.45506L10.6872 9.41993C10.2832 9.82394 10.0812 10.0259 9.90743 10.2487C9.70249 10.5114 9.52679 10.7957 9.38344 11.0965C9.26191 11.3515 9.17157 11.6225 8.99089 12.1646L8.41242 13.9L8.03811 15.0229C7.9492 15.2897 8.01862 15.5837 8.21744 15.7826C8.41626 15.9814 8.71035 16.0508 8.97709 15.9619L10.1 15.5876L11.8354 15.0091C12.3775 14.8284 12.6485 14.7381 12.9035 14.6166C13.2043 14.4732 13.4886 14.2975 13.7513 14.0926C13.9741 13.9188 14.1761 13.7168 14.5801 13.3128L20.5449 7.34795L21.1938 6.69914C22.2687 5.62415 22.2687 3.88124 21.1938 2.80624C20.1188 1.73125 18.3759 1.73125 17.3009 2.80624Z" stroke="currentColor" stroke-width="1.5"/>
                                        <path opacity="0.5" d="M16.6522 3.45508C16.6522 3.45508 16.7333 4.83381 17.9499 6.05034C19.1664 7.26687 20.5451 7.34797 20.5451 7.34797M10.1002 15.5876L8.4126 13.9" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                </button>
                                <tippy target="edit">{{ $t('edit') }}</tippy>
                            </div>
                             <div v-else>
                                <button type="button" class="btn btn-sm btn-success" v-tippy:show @click="redirectToShow(data.value.hash)">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                        <path opacity="0.5" d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M8 12H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M8 8H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                        <path d="M8 16H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                </button>
                                <tippy target="show">{{ $t('show_contract') }}</tippy>
                            </div>
                        <!-- </template> -->

                            <!-- <template v-if="userStore.hasAccess('sass.companies.destroy')"> -->
                                <button type="button" class="btn btn-sm btn-danger" v-tippy:delete @click="deleteRow(data.value.id)" :disabled="data.value.signature">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
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
        <TransitionRoot appear :show="btnModalOpen" as="template"  @close="btnModalOpen=true">
            <Dialog as="div" @close="closeModal()" class="relative z-[51]">
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
                                    @click="closeModal()"
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
                                    <div v-if="!contractData.signature">
                                        <form-wizard color="#4361ee" class="sm-circle" @on-complete="saveContract" step-size="sm"
                                            next-button-text="Siguiente" back-button-text="Atrás" finish-button-text="Finalizar" :preventJump="true">
                                            <tab-content
                                                title="Home" :before-change="() => beforeTabSwitch(1)"
                                                customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M18.18 8.03933L18.6435 7.57589C19.4113 6.80804 20.6563 6.80804 21.4241 7.57589C22.192 8.34374 22.192 9.58868 21.4241 10.3565L20.9607 10.82M18.18 8.03933C18.18 8.03933 18.238 9.02414 19.1069 9.89309C19.9759 10.762 20.9607 10.82 20.9607 10.82M18.18 8.03933L13.9194 12.2999C13.6308 12.5885 13.4865 12.7328 13.3624 12.8919C13.2161 13.0796 13.0906 13.2827 12.9882 13.4975C12.9014 13.6797 12.8368 13.8732 12.7078 14.2604L12.2946 15.5L12.1609 15.901M20.9607 10.82L16.7001 15.0806C16.4115 15.3692 16.2672 15.5135 16.1081 15.6376C15.9204 15.7839 15.7173 15.9094 15.5025 16.0118C15.3203 16.0986 15.1268 16.1632 14.7396 16.2922L13.5 16.7054L13.099 16.8391M13.099 16.8391L12.6979 16.9728C12.5074 17.0363 12.2973 16.9867 12.1553 16.8447C12.0133 16.7027 11.9637 16.4926 12.0272 16.3021L12.1609 15.901M13.099 16.8391L12.1609 15.901" stroke="currentColor" stroke-width="1.5"></path><path d="M8 13H10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 9H14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path d="M8 17H9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path opacity="0.5" d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="currentColor" stroke-width="1.5"></path></svg>'
                                                >

                                                <div class="mb-2" v-if="!companyStore.id">
                                                    <Select :options="companyStore.companyOptions" v-model="companySelected"
                                                        titleSelect="Compañia *" name="companies"
                                                        @update:modelValue="handleCompanySelect" />
                                                </div>

                                                <div class="my-2">
                                                    <Select
                                                        :options="templates"
                                                        v-model="templateSelected"
                                                        titleSelect="Seleccionar plantilla *"
                                                        name="plantilla"
                                                        :loading="loadingTe"
                                                        @update:modelValue="handleTemplateSelect"
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
                                                                :required="field.required"
                                                                class="form-input"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </tab-content>
                                            <tab-content
                                                title="Contract"  :before-change="() => beforeTabSwitch(2)"
                                                customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M20.3116 12.6473L20.8293 10.7154C21.4335 8.46034 21.7356 7.3328 21.5081 6.35703C21.3285 5.58657 20.9244 4.88668 20.347 4.34587C19.6157 3.66095 18.4881 3.35883 16.2331 2.75458C13.978 2.15033 12.8504 1.84821 11.8747 2.07573C11.1042 2.25537 10.4043 2.65945 9.86351 3.23687C9.27709 3.86298 8.97128 4.77957 8.51621 6.44561C8.43979 6.7254 8.35915 7.02633 8.27227 7.35057L8.27222 7.35077L7.75458 9.28263C7.15033 11.5377 6.84821 12.6652 7.07573 13.641C7.25537 14.4115 7.65945 15.1114 8.23687 15.6522C8.96815 16.3371 10.0957 16.6392 12.3508 17.2435L12.3508 17.2435C14.3834 17.7881 15.4999 18.0873 16.415 17.9744C16.5152 17.9621 16.6129 17.9448 16.7092 17.9223C17.4796 17.7427 18.1795 17.3386 18.7203 16.7612C19.4052 16.0299 19.7074 14.9024 20.3116 12.6473Z" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M16.415 17.9741C16.2065 18.6126 15.8399 19.1902 15.347 19.6519C14.6157 20.3368 13.4881 20.6389 11.2331 21.2432C8.97798 21.8474 7.85044 22.1495 6.87466 21.922C6.10421 21.7424 5.40432 21.3383 4.86351 20.7609C4.17859 20.0296 3.87647 18.9021 3.27222 16.647L2.75458 14.7151C2.15033 12.46 1.84821 11.3325 2.07573 10.3567C2.25537 9.58627 2.65945 8.88638 3.23687 8.34557C3.96815 7.66065 5.09569 7.35853 7.35077 6.75428C7.77741 6.63996 8.16368 6.53646 8.51621 6.44531" stroke="currentColor" stroke-width="1.5"></path><path d="M11.7769 10L16.6065 11.2941" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path opacity="0.5" d="M11 12.8975L13.8978 13.6739" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>'
                                            >
                                                <div class="output ql-snow my-2">
                                                    <div v-html="contractData.data"></div>
                                                </div>

                                            </tab-content>
                                            <tab-content
                                                title="Annex" :before-change="() => beforeTabSwitch(3)"
                                                customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M7.9175 17.8068L15.8084 10.2535C16.7558 9.34668 16.7558 7.87637 15.8084 6.96951M3 10.0346L9.40419 3.90441C12.0569 1.3652 16.3578 1.3652 19.0105 3.90441" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path><path opacity="0.5" d="M19.0105 13.0996L19.5291 13.6414L19.0105 13.0996ZM11.0624 20.7076L10.5438 20.1658L11.0624 20.7076ZM4.54388 14.4679L5.0625 15.0097L4.54388 14.4679ZM12.3776 6.9694L11.859 6.4276L12.3776 6.9694ZM19.5291 3.3625C19.2299 3.07608 18.7551 3.08646 18.4687 3.38568C18.1823 3.68491 18.1927 4.15967 18.4919 4.44609L19.5291 3.3625ZM18.4919 12.5578L10.5438 20.1658L11.581 21.2494L19.5291 13.6414L18.4919 12.5578ZM5.0625 15.0097L12.8962 7.51119L11.859 6.4276L4.02527 13.9262L5.0625 15.0097ZM16.327 6.4276C15.0896 5.24313 13.0964 5.24313 11.859 6.4276L12.8962 7.51119C13.5536 6.88194 14.6324 6.88194 15.2898 7.51119L16.327 6.4276ZM5.0625 20.1658C3.57096 18.7381 3.57096 16.4375 5.0625 15.0097L4.02527 13.9262C1.91671 15.9445 1.91671 19.2311 4.02527 21.2494L5.0625 20.1658ZM10.5438 20.1658C9.03379 21.6112 6.57253 21.6112 5.0625 20.1658L4.02527 21.2494C6.11533 23.25 9.49098 23.25 11.581 21.2494L10.5438 20.1658ZM18.4919 4.44609C20.8361 6.68999 20.8361 10.3139 18.4919 12.5578L19.5291 13.6414C22.4903 10.8069 22.4903 6.19703 19.5291 3.3625L18.4919 4.44609Z" fill="currentColor"></path></svg>'
                                            >
                                            <div>
                                                <label for="file" class="text-xl text-bold">Adjuntar archivos</label>
                                                <input
                                                    id="file"
                                                    type="file"
                                                    class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                                    multiple
                                                    accept="image/*,.zip,.pdf,.xls,.xlsx,.txt,.doc,.docx"
                                                    @change="handleFileResponseChange"
                                                />
                                                <div class="mt-8" v-show="contractData.attachments">
                                                    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>
                                                    <div class="flex items-center flex-wrap mt-6">
                                                        <template v-for="(attachment, i) in contractData.attachments" :key="i">
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


                                            </tab-content>
                                            <tab-content
                                                title="Send" :before-change="() => beforeTabSwitch(4)"
                                                customIcon='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"><path d="M17.4975 18.4851L20.6281 9.09373C21.8764 5.34874 22.5006 3.47624 21.5122 2.48782C20.5237 1.49939 18.6511 2.12356 14.906 3.37189L5.57477 6.48218C3.49295 7.1761 2.45203 7.52305 2.13608 8.28637C2.06182 8.46577 2.01692 8.65596 2.00311 8.84963C1.94433 9.67365 2.72018 10.4495 4.27188 12.0011L4.55451 12.2837C4.80921 12.5384 4.93655 12.6658 5.03282 12.8075C5.22269 13.0871 5.33046 13.4143 5.34393 13.7519C5.35076 13.9232 5.32403 14.1013 5.27057 14.4574C5.07488 15.7612 4.97703 16.4131 5.0923 16.9147C5.32205 17.9146 6.09599 18.6995 7.09257 18.9433C7.59255 19.0656 8.24576 18.977 9.5522 18.7997L9.62363 18.79C9.99191 18.74 10.1761 18.715 10.3529 18.7257C10.6738 18.745 10.9838 18.8496 11.251 19.0285C11.3981 19.1271 11.5295 19.2585 11.7923 19.5213L12.0436 19.7725C13.5539 21.2828 14.309 22.0379 15.1101 21.9985C15.3309 21.9877 15.5479 21.9365 15.7503 21.8474C16.4844 21.5244 16.8221 20.5113 17.4975 18.4851Z" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M6 18L21 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>'
                                            >
                                                <div>
                                                    <label for="send_name">Nombre completo *</label>
                                                    <input id="send_name" type="text" placeholder="Ingrese el nombre completo" class="form-input" v-model="contractData.options.send.name" required />
                                                </div>
                                                <div class="mt-3">
                                                    <label for="send_email">Correo *</label>
                                                    <input id="send_email" type="email" placeholder="Ingrese el correo" class="form-input" v-model="contractData.options.send.email" required />
                                                </div>

                                            </tab-content>

                                        </form-wizard>
                                    </div>

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
    import { API } from '@/services/api';
    import { NOTIFY } from '@/services/notify';
    import {useCompanyStore} from "@/stores/company-store";
    import { useRouter } from 'vue-router';
    import Select from '@/components/partials/Select.vue';
    import {useUserStore} from "@/stores/user-store";
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import { FormWizard, TabContent } from 'vue3-form-wizard';
    import 'vue3-form-wizard/dist/style.css';
    import useClipboard from 'vue-clipboard3';
    useMeta({ title: 'Contratos' });
    const { toClipboard } = useClipboard();
    const notify = new NOTIFY();
    const companyStore = useCompanyStore();
    const store = useAppStore();
    const i18n = reactive(useI18n());
    const router = useRouter();
    const userStore = useUserStore();
    const api = new API();
    const loading = ref(true);
    const templates = ref();
    const templateData:any = ref({
        attributes:[],
        description: null
    });
    const loadingTe = ref(false)
    const companySelected = ref(companyStore.id);
    const templateSelected = ref();
    const btnModalOpen = ref(false);
    const formTemplateValues = ref({});
    const step = ref(0);
    const beforeTabSwitch = async (tab) => {
        step.value = tab;

        // Solo valida si se está intentando avanzar
        if (!templateSelected.value) {
            notify.showToast('Por favor, seleccione una plantilla de contrato.', 'warning');
            return false; // Impide el cambio de tab
        }
        // Permite el cambio
        return true;
    };

    const cols = ref([
        { field: 'id', title: 'Id'},
        { field: 'options.send.name', title: 'Enviado a'},
        { field: 'options.send.email', title: 'Correo'},
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
        id: null,
        template_id: null,
        user_id: userStore.id,
        data:[],
        hash:null,
        options:{
            send:{
                name: '',
                email: ''
            },
            data:[]
        },
        attachments: [],
        company_id: companyStore.id
    });

    const contractData: any = ref(defaultData.value);

    const openModal = async (data?) =>{
        if (data){
            console.log("estoy aqui");

            templateSelected.value = {
                label: data.template.name,
                value: data.template.id
            };

            templateData.value.attributes = data.options.data;
            templateData.value.description = data.template.description;

            contractData.value = {
                id:data.id,
                user_id: userStore.id,
                data: data.data,
                hash: data.hash,
                options: {
                    data: data.options.data||[],
                    send: {
                        name: data.options.send.name||'',
                        email: data.options.send.email||'',
                    },
                },
                attachments: data.annexes||[],
                company_id: data.company_id
            }
        }
        else
        {
            contractData.value = {
                template_id: null,
                user_id: userStore.id,
                data:[],
                options:{
                    send:{
                        name: '',
                        email: ''
                    },
                    data:[]
                },
                attachments: [],
                company_id: companyStore.id
            }
        }
        btnModalOpen.value = true;
    }

    // Manejar el evento de selección de archivos
    const handleFileResponseChange = async (event) => {
        const files = Array.from(event.target.files); // Archivos seleccionados en el input
        if (files.length === 0) return; // Si no hay archivos, salir

        if (contractData.value.id) {
            try {
                // Crear un array de promesas para subir todos los archivos
                const uploadPromises = files.map(file =>
                    uploadFile(file, contractData.value.id, 2)
                );

                // Esperar que todos los archivos se suban
                await Promise.all(uploadPromises);

                // Opcional: Mostrar un mensaje o actualizar la UI
                notify.showToast("Archivos subidos exitosamente.", 'success');
            } catch (error) {
                console.error("Error al subir los archivos:", error);
                notify.showToast("Hubo un error al subir los archivos. Por favor, intenta de nuevo.", 'error');
            }
        } else {
            // Si no existe `contractData.id`, es un flujo de creación
            const existingFiles = contractData.value.attachments || []; // Archivos existentes

            // Crear un mapa para verificar duplicados basado en el nombre del archivo
            const existingFileNames = new Set(existingFiles.map((file) => file.name));

            // Filtrar los archivos nuevos que no están en los existentes
            const newFiles = files.filter((file) => !existingFileNames.has(file.name));

            // Agregar los nuevos archivos al array de archivos existentes
            contractData.value.attachments = [...existingFiles, ...newFiles];
        }
    };

    // Eliminar archivo de la lista
    const removeFile = async (attachmentToRemove) => {
        // notify.showConfirm(
        //     '¿Estás seguro?',
        //     'Deseas quitar el archivo de la selección?',
        //     'warning',
        //     'Sí',
        //     'No'
        // ).then(isConfirmed => {
        //     if (isConfirmed) {
            if (contractData.value.id) {
                await api.delete(`singit/v1/annexes/${attachmentToRemove.id}`)
            }
            contractData.value.attachments = Array.from(contractData.value.attachments).filter(file => file !== attachmentToRemove);

        //     }
        // });
    };

    const getData = async () => {
        try {
            loading.value = true;
            let companies: any = `[${companyStore.companiesSelect}]`;

            if(userStore.hasAccess('sass.companies.indexall') && companyStore.companiesSelect.length > 1){
                companies = null;
            }

            const response = await api.get(`singit/v1/contracts?filter={"search":"${params.search}",company_id=${companies}}&page=${params.current_page}&take=${params.pagesize}`)
            rows.value = response?.data;
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

    // Close the modal
    const closeModal = () => {
        btnModalOpen.value = false;
        contractData.value = defaultData.value;
        templateData.value.attributes = [];
        templateData.value.description = null;
        templateSelected.value = null;
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
        const company_id = contractData.value.company_id;
        const response = await api.get(`singit/v1/templates?filter={"company_id":${company_id}}`);
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

    const uploadFile = async (file, contract_id, type) => {

        const formData = new FormData();
        // Agregar el archivo al FormData
        formData.append("attachments", file);
        formData.append("contract_id", contract_id);
        formData.append("type_id", type);
        formData.append("user_id", userStore.id);

        try {
        // Enviar archivo al servidor
        let response = await api.post('singit/v1/annexes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response) {
                const newAttachment = response.data.data;

                // Verificar si el archivo ya existe en los attachments
                const exists = contractData.value.attachments.some(
                    (attachment) => attachment.name === newAttachment.name // Cambia 'name' si usas otra propiedad única
                );

                if (!exists) {
                    // Agregar el nuevo documento al array de attachments si no existe
                    contractData.value.attachments = [
                        ...contractData.value.attachments,
                        newAttachment,
                    ];
                } else {
                    console.warn("El archivo ya existe en los attachments:", newAttachment.name);
                }
            }

            return response.data.data;

        } catch (error) {
            console.error("Error al subir el archivo:", error);
            throw error; // Lanza el error para que pueda manejarse en otro lugar
        }
    };

    const saveContract = async () => {
        loading.value = true;
        try {
            if (contractData.value.id) {
                await api.put(`singit/v1/contracts/${contractData.value.id}`, contractData.value);
            } else {
                await api.post('singit/v1/contracts', contractData.value, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
            }
        getData();
        closeModal();
        notify.showToast('Contrato guardado exitosamente!', 'success');
        } catch (error) {
            notify.showToast('Hubo un problema al guardar el registro.', 'error');
        } finally {
            loading.value = false;
        }
    };

    watch (
        () => templateData.value.attributes,
        () => {
            contractData.value.options.data = templateData.value.attributes;
            replaceTemplateVariables();
        },
        { deep: true } // Listen to deep changes
    );

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


    watch(() => companyStore.id, (value) => {
            getData();
            getTemplates();
            // contractData.value.company_id = companyStore.id
    });

    watch(() => contractData.value.company_id, (value) => {
        templates.value = [];
        if(!contractData.value.company_id) return false;
        getTemplates();
    });

    function handleCompanySelect() {
        contractData.value.company_id = companySelected.value.value;
    }

    function handleTemplateSelect() {
        templateData.value.attributes = [];
        templateData.value.description = null;
        if (!templateSelected.value) return false;
        getAttributesTemplate();
    }

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

    const redirectToShow = (hash: string) => {
        const url = router.resolve({ name: 'contracts-signature', params: { hash } }).href;
        window.open(url, '_blank');
    };

    const copyContractURL = async (msg) => {
        if (msg) {
            await toClipboard(msg);
            notify.showToast('URL copiada exitosamente!', 'success');
        }
    };
    onMounted(async () => {
       await getData();
       if (companyStore.id) {
            getTemplates();
        }
    });
</script>
