<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'devices'}" class="text-primary hover:underline">
                    Dispositivos
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Reporte de Conductores </span>
            </li>
        </ul>
        <div class="panel pb-1.5 mt-6 ">
            <div class="flex flex-col sm:flex-row sm:justify-between items-center mb-3">
                <h6 class="text-xl font-bold">Reporte de conductores de <span
                    class="text-primary">{{ device.name }}</span></h6>
                <div class="flex flex-col sm:flex-row gap-3 items-center">
                    <div class="relative max-w-xs flex-1">
                        <date-picker v-model="params" @update:model-value="changeDatePicker"/>
                    </div>
                    <button v-tippy:infoReport type="button"
                            class="btn btn-outline-info btn-sm d-flex align-items-center"
                            @click="reportExcel()" :disabled="reportDisabled">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5"
                                  d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5" stroke="currentColor" stroke-width="1.5"
                                  stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Generar Reporte
                    </button>
                    <tippy  target="infoReport" :extra="{ theme: 'dark' }">El reporte solo se puede
                        generar con un máximo
                        de 30 días
                    </tippy>
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
                    <div v-if="data.value.driver_id !== undefined">
                        {{ data.value.driver?.user?.full_name }}
                    </div>
                    <div class="text-danger" v-else>
                        <span>Sin conductor registrado</span>
                    </div>

                </template>
                <template #start_date="data">
                    <div :class="data.value.driver_id !== undefined?'':'text-danger'">
                        {{ moment(data.value.start_date).format('DD-MM-YYYY h:mm:ss a') }}
                    </div>
                </template>
                <template #end_date="data">
                    <div :class="data.value.driver_id !== undefined?'':'text-danger'">
                        {{ moment(data.value.end_date).format('DD-MM-YYYY h:mm:ss a') }}
                    </div>
                </template>
                <template #total_time="data">
                    <div :class="data.value.driver_id !== undefined?'':'text-danger'">
                        <span class="badge badge-outline-secondary"> {{ data.value.total_time }}</span>
                    </div>

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
import DatePicker from "@/components/plugins/datePicker.vue";

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
    {field: 'start_date', title: 'Ignición ON'},
    {field: 'end_date', title: 'Ignición OFF'},
    {field: 'total_time', title: 'Tiempo'},
]);
const rows: any = ref(null);
const total_rows = ref(0);
const params = ref({
    dateStart: null,
    dateEnd: null,
    dateStartOld: null,
    dateEndOld: null,
    label: null,
    dateLabel: null,
    labelOld: null,
    current_page: 1,
    pagesize: 10,
    column_filters: [],
    sort_column: 'id',
    sort_direction: 'desc',
    search: null
});
const device = ref({name:''})
const reportDisabled = ref(false)
let timer: any;

const loading = ref(true);

const getDriversData = async () => {
    try {
        loading.value = true;
        const response = await api.get(`devices/v1/drivers?filter={"device_id":${route.params.id},"date":{"from":"${params.value.dateStart}","to":"${params.value.dateEnd}"}}&page=${params.value.current_page}&take=${params.value.pagesize}`)
        rows.value = response?.data
        total_rows.value = response?.meta?.page?.total;
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
}
const getDevice = async () => {
    try {
        loading.value = true;
        const response = await api.get(`devices/v1/devices/${route.params.id}`)
        device.value = response?.data
        loading.value = false;
    } catch (error) {
        console.error('Error fetching data', error);
        loading.value = false;
    }
}

const changeServer = (data: any) => {
    params.value.current_page = data.current_page;
    params.value.pagesize = data.pagesize;
    params.value.sort_column = data.sort_column;
    params.value.sort_direction = data.sort_direction;
    if (data.change_type === 'search') {
        clearTimeout(timer);
        timer = setTimeout(() => {
            getDriversData();
        }, 500);
    } else {
        getDriversData();
    }
};

const changeDatePicker = () => {
    if (params.value.current_page !== undefined) {
        getDriversData()
    }
    reportDisabled.value = moment(params.value.dateEnd).diff(moment(params.value.dateStart), 'days') > 30;

}
const clearSearch = () => {
    params.value.search = null;
    clearTimeout(timer);
};

const reportExcel = () => {
    window.open(`/drivers/${route.params.id}/report/excel?filter={"device_id":${route.params.id},"date":{"from":"${params.value.dateStart}","to":"${params.value.dateEnd}"}}`, '_blank');
}
onMounted(async () => {
    //await getDriversData();
    await getDevice()
});
</script>
