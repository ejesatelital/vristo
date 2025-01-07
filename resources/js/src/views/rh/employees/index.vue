<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Colaborador</span>
            </li>
        </ul>

        <div class="panel pb-1.5 mt-6">
            <div class="flex justify-end mb-5 gap-3">
                <div class="relative max-w-xs">
                    <input v-model="params.search" type="text" class="form-input w-full pr-10" placeholder="Buscar..."/>
                    <button v-if="params.search" @click="clearSearch"
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                        ✕
                    </button>
                </div>
                <template v-if="userStore.hasAccess('rh.employees.create')">
                    <div class="flex flex-wrap justify-end gap-2">
                        <button type="button" class="btn btn-sm btn-primary" v-tippy:edit @click="redirectToCreate()">
                            <svg width="24" height="24" viewBox="0 0 24 24" class="mr-3" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                    stroke="currentColor" stroke-width="1.5"/>
                                <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor"
                                      stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Nuevo Colaborador
                        </button>
                    </div>
                </template>
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
                    <!--                    <template #parent="data">
                                            <div v-if="data.value.parent_id">
                                                <span class="badge badge-outline-success">{{data.value.parent.name}}</span>
                                            </div>
                                        </template>-->
                    <template #actions="data">
                        <div class="flex justify-center gap-3">
                            <template v-if="userStore.hasAccess('rh.employees.edit')">
                                <button type="button" class="btn btn-sm btn-info"
                                        v-tippy:edit @click="redirectToEdit(data.value.id)">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
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
                                <tippy target="edit">Editar Colaborador</tippy>
                            </template>
                            <template v-if="userStore.hasAccess('rh.employees.destroy')">
                                <button type="button" class="btn btn-sm btn-danger" v-tippy:delete
                                        @click="deleteEmployee(data.value.id)">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
                                        <path d="M20.5001 6H3.5" stroke="currentColor" stroke-width="1.5"
                                              stroke-linecap="round"></path>
                                        <path
                                            d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" stroke-width="1.5"
                                              stroke-linecap="round"></path>
                                        <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" stroke-width="1.5"
                                              stroke-linecap="round"></path>
                                        <path opacity="0.5"
                                              d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                                              stroke="currentColor" stroke-width="1.5"></path>
                                    </svg>
                                </button>
                                <tippy target="delete">borrar</tippy>
                            </template>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>

import {ref, reactive, onMounted, watch} from 'vue';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import {useI18n} from 'vue-i18n';
import {useMeta} from '@/composables/use-meta';
import {useRouter} from 'vue-router';
import {API} from '@/services/api';
import {useUserStore} from "@/stores/user-store";
import {useCompanyStore} from "@/stores/company-store";
import {NOTIFY} from '@/services/notify';

const notify = new NOTIFY();

useMeta({title: 'Colaboradores'});
const api = new API();
const userStore = useUserStore();
const companyStore = useCompanyStore();
const router = useRouter();

const redirectToCreate = () => {
    router.push({name: 'employees-create'});
};
const redirectToEdit = (id: number) => {
    router.push({name: 'employees-edit', params: {id}});
};
// multi language
const i18n = reactive(useI18n());

const cols = ref([
    {field: 'id', title: 'Id'},
    {field: 'user.full_name', title: 'Nombre'},
    {field: 'user.email', title: 'Correo'},
    {field: 'company.name', title: 'Empresa'},
    {field: 'department.name', title: 'Area'},
    {field: 'address', title: 'Dirección'},
    {field: 'phone', title: 'Teléfono'},
    {field: 'created_at', title: 'Creado el'},
    {field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center'},
]);
let timer: any;
const loading = ref(true);
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

watch(() => companyStore.companiesSelect, () => {
    getData();
});

const getData = async () => {
    try {
        loading.value = true;
        let response: any = null;
        if (userStore.hasAccess('rh.employee.indexall')) {
             response = await api.get(`rh/v1/employees?filter={"search":"${params.search}"}&include=company,department&page=${params.current_page}&take=${params.pagesize}`)
        } else {
            const companies = companyStore.companiesSelect;
            console.log(companies);
             response = await api.get(`rh/v1/employees?filter={"search":"${params.search}","company_id":[${companies}]}&include=company,department&page=${params.current_page}&take=${params.pagesize}`)
        }
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
};

const deleteEmployee = (id: number) => {
    notify.showConfirm(
        '¿Estás seguro?',
        'Esta acción no se puede deshacer',
        'warning',
        'Sí, eliminar',
        'Cancelar'
    ).then(isConfirmed => {
        if (isConfirmed) {
            api.delete(`rh/v1/employees/${id}`)
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

onMounted(async () => {
    await getData();
});

</script>
