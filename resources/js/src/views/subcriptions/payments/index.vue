<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Pagos</span>
            </li>
        </ul>

        <div class="mt-5 panel p-0 border-0 overflow-hidden">
            <div class="flex items-center justify-between gap-4 p-5">
                <h2 class="text-xl text-bold"> {{ $t('payments') }}</h2>
                <div class="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
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
                                {{ data.value.name ? data.value.name.charAt(0) : ''}}
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
                                    <ellipse opacity="0.5" cx="12" cy="17" rx="7" ry="4" stroke="currentColor" stroke-width="1.5"></ellipse>
                                </svg>
                            </div>
                            <div>{{ data.value.name ?? null }}</div>
                        </div>
                    </template>
                    <template #actions="data">
                        <div class="flex justify-center gap-3">
                            <!-- <template v-if="userStore.hasAccess('sass.companies.edit')"> -->
                                <button type="button" class="btn btn-sm btn-info" v-tippy:edit>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
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
                                <button type="button" class="btn btn-sm btn-danger" v-tippy:delete @click="deleteRow(data.value.id)">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="currentColor" stroke-width="1.5"></path>
                                    </svg>
                                </button>
                                <tippy target="delete">borrar</tippy>
                            <!-- </template> -->

                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted, reactive} from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import Swal from 'sweetalert2';
    import { useMeta } from '@/composables/use-meta';
    import { useAppStore } from '@/stores/index';
    import { useI18n } from 'vue-i18n';
    import { API } from '@/services/api';
    import { NOTIFY } from '@/services/notify';
    import {useCompanyStore} from "@/stores/company-store";
    const notify = new NOTIFY();

    useMeta({ title: 'Payments' });
    const companyStore = useCompanyStore();
    const loading = ref(true);
    const store = useAppStore();
    // multi language
    const i18n = reactive(useI18n());

    const api = new API();

    const cols = ref([
        { field:'id', title: 'Id', hide: true},
        { field:'amount_paid', title: 'Pago', hide: false},
        { field:'gangway', title: 'Pasarela', hide: false},
        { field:'payment_date', title: 'Fecha de pago', hide: false, type:"date"},
        { field:'merchant_public_key', title: 'Id del pago', hide: true},
        { field:'currency', title: 'Moneda', hide: true},
        { field:'data', title: 'Fecha', hide: true, type:"date"},
        { field:'transaction_id', title: 'Id de la transacción', hide: false},
        { field:'order_id', title: 'Id de la compra', hide: false},
        { field:'status', title: 'Estado', hide: false},
        { field: 'created_at', title: 'Registrado el', hide: true, type:"date"},
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

    const deleteRow = (id: number) => {
        notify.showConfirm(
            '¿Estás seguro?',
            'Esta acción no se puede deshacer',
            'warning',
            'Sí, eliminar',
            'Cancelar'
            ).then(isConfirmed => {
            if (isConfirmed) {
                api.delete(`subscriptions/v1/payments/${id}`)
                .then(async response => {
                    await getData();
                    notify.showToast('Registro eliminado exitosamente!', 'success');
                })
                .catch(error => {
                    notify.showToast('Hubo un problema al eliminar el registro.', 'error');
                });
            }
        });
    };

    const getData = async () => {
        try {
            loading.value = true;
            const response = await api.get(`subscriptions/v1/payments?filter={"search":"${params.search}"}&page=${params.current_page}&take=${params.pagesize}`)
            console.log(response);

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

    onMounted(async () => {
       await getData();
    });
</script>
