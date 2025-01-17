<template>
    <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
        <h5 class="font-semibold text-lg">Reporte de vehiculos</h5>
        <div class="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
            <date-picker v-model="params" @update:model-value="changeServer"/>
        </div>
    </div>
    <div class="grid gap-6 mb-6">
        <div class="panel pb-1.5 mt-6">
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
                    {{ data.value?.driver?.device?.name}}
                </template>
                <template #start_date="data">
                    <div>
                        {{ moment(data.value.start_date).format('YYYY-MM-DD hh:mm a') }}
                    </div>
                </template>
                <template #end_date="data">
                    <div>
                        {{ moment(data.value.end_date).format('YYYY-MM-DD hh:mm a') }}
                    </div>
                </template>
                <template #total_time="data">
                    <span class="badge badge-outline-secondary"> {{data.value.total_time}}</span>
                </template>
            </vue3-datatable>
        </div>
    </div>
</template>
<!-- script -->
<script lang="ts" setup>

import {ref, computed, defineEmits, onMounted, reactive} from 'vue';
import apexchart from 'vue3-apexcharts';
import {useAppStore} from '@/stores/index';
import {API} from "@/services/api";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Spanish} from "flatpickr/dist/l10n/es.js"
import moment from "moment";
import 'moment/locale/es'
import DatePicker from "@/components/plugins/datePicker.vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";

const props = defineProps({
    driverId: {
        type: Number,
        required: false,
        default: null
    }
})
const emit = defineEmits(['update:modelValue']);
const store = useAppStore();
const api = new API();
const cols = ref([
    {field: 'device.name', title: 'Dispositivo'},
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

let timer: any;

const loading = ref(true);

const getDriversData = async () => {
    try {
        loading.value = true;
        const response = await api.get(`devices/v1/drivers?filter={"driver_id":${props.driverId},"date":{"from":"${params.value.dateStart}","to":"${params.value.dateEnd}"}}&include=device&page=${params.value.current_page}&take=${params.value.pagesize}`)
        rows.value = response?.data
        total_rows.value = response?.meta?.page?.total;
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
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
const clearSearch = () => {
    params.value.search = null;
    clearTimeout(timer);
};

onMounted(async () => {
    //await getDriversData();
});

</script>

<style scoped>
.popper {
    width: 350px;
}
</style>
