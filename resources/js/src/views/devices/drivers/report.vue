<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Reporte de Conductores</span>
            </li>
        </ul>
        <div class="panel pb-1.5 mt-6 ">
            <div class="flex flex-col sm:flex-row sm:justify-between items-center mb-3">
                <h6 class="text-xl font-bold">Reporte de Conductores</h6>
                <div class="flex flex-col sm:flex-row gap-3 items-center">
                    <div class="relative max-w-xs flex-1">
                        <input v-model="params.search" type="text" class="form-input w-full pr-10"
                               placeholder="Buscar..." @input="handleInput"/>
                        <button v-if="params.search" @click="clearSearch"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ✕
                        </button>
                    </div>
                </div>
            </div>

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
                <template #full_name="data">
                    {{ data.value?.driver?.user?.full_name}}
                </template>
                <template #start_date="data">
                    <div v-if="moment().diff(moment(data.value.start_date),'hours')<=23">
                        {{ moment(data.value.start_date).format('HH:mm a') }}
                    </div>
                    <div v-else>
                        {{ moment(data.value.start_date).format('MMM DD') }}
                    </div>
                </template>
                <template #end_date="data">
                        <div v-if="moment().diff(moment(data.value.end_date),'hours')<=23">
                            {{ moment(data.value.end_date).format('HH:mm a') }}
                        </div>
                        <div v-else>
                            {{ moment(data.value.end_date).format('MMM DD') }}
                        </div>
                </template>
                <template #total_time="data">
                    <span class="badge badge-outline-secondary"> {{data.value.total_time}}</span>
                </template>
            </vue3-datatable>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref, onMounted, reactive, watch} from 'vue';
import {useAppStore} from '@/stores/index';
import {useMeta} from '@/composables/use-meta';
import Vue3Datatable from '@bhplugin/vue3-datatable';
import Swal from 'sweetalert2';

import {API} from '@/services/api';
import {useCompanyStore} from "@/stores/company-store";
import Pusher from "pusher-js";
import {useUserStore} from "@/stores/user-store";
import {useRoute, useRouter} from "vue-router";
import moment from "moment/moment";

const store = useAppStore();
const companyStore = useCompanyStore();
const userStore = useUserStore();
const api = new API();
const route = useRoute();
const router = useRouter();
useMeta({title: 'Devices'});

watch(() => companyStore.companiesSelect, () => {
    getDriversData();
});

const cols = ref([
    {field: 'full_name', title: 'Conductor'},
    {field: 'start_date', title: 'Fecha de Inicio'},
    {field: 'end_date', title: 'Fecha de Finalización'},
    {field: 'total_time', title: 'Horas'},
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

const loading = ref(true);

const getDriversData = async () => {
    try {
        loading.value = true;
        const response = await api.get(`devices/v1/drivers?filter={"device_id":${route.params.id},"search":"${params.search}"}&page=${params.current_page}&take=${params.pagesize}`)
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
            getDriversData();
        }, 500);
    } else {
        getDriversData();
    }
};
const clearSearch = () => {
    params.search = null;
    clearTimeout(timer);
};

onMounted(async () => {
    await getDriversData();
});
</script>
