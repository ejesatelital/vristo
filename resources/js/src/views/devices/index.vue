<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Dispositivos</span>
            </li>
        </ul>
        <div class="panel pb-1.5 mt-6 ">
            <div class="flex flex-col sm:flex-row sm:justify-between items-center mb-3">
                <h6 class="text-xl font-bold">Dispositivos</h6>
                <div class="flex flex-col sm:flex-row gap-3 items-center">
                    <div class="dropdown">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="0"
                                class="align-middle">
                            <button
                                type="button"
                                class="flex items-center border font-semibold border-[#e0e6ed] dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                            >
                                <span class="ltr:mr-1 rtl:ml-1">Columnas</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                    <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5"
                                          stroke-linecap="round" stroke-linejoin="round"/>
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
                                                    <span :for="`chk-${i}`" class="ltr:ml-2 rtl:mr-2">{{
                                                            col.title
                                                        }}</span>
                                                </label>
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                    <div class="relative max-w-xs flex-1">
                        <input v-model="params.search" type="text" class="form-input w-full pr-10"
                               placeholder="Buscar..." @input="handleInput"/>
                        <button v-if="params.search" @click="clearSearch"
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            ✕
                        </button>
                    </div>
                    <button type="button" class="btn btn-outline-info btn-sm d-flex align-items-center"
                            @click="syncData()">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                             class="mr-1">
                            <path
                                d="M12.0789 3V2.25V3ZM3.67981 11.3333H2.92981H3.67981ZM3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333L2.92981 13H4.42981L4.42981 11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z"
                                fill="currentColor"></path>
                            <path opacity="0.5"
                                  d="M11.8825 21V21.75V21ZM20.3137 12.6667H21.0637H20.3137ZM20.3137 11L20.8409 10.4666C20.5487 10.1778 20.0786 10.1778 19.7864 10.4666L20.3137 11ZM18.1002 12.1333C17.8056 12.4244 17.8028 12.8993 18.094 13.1939C18.3852 13.4885 18.86 13.4913 19.1546 13.2001L18.1002 12.1333ZM21.4727 13.2001C21.7673 13.4913 22.2421 13.4885 22.5333 13.1939C22.8245 12.8993 22.8217 12.4244 22.5271 12.1332L21.4727 13.2001ZM5.31769 16.6061C5.10016 16.2536 4.63806 16.1442 4.28557 16.3618C3.93307 16.5793 3.82366 17.0414 4.0412 17.3939L5.31769 16.6061ZM11.8825 21.75C16.9448 21.75 21.0637 17.6915 21.0637 12.6667H19.5637C19.5637 16.8466 16.133 20.25 11.8825 20.25V21.75ZM21.0637 12.6667V11H19.5637V12.6667H21.0637ZM19.7864 10.4666L18.1002 12.1333L19.1546 13.2001L20.8409 11.5334L19.7864 10.4666ZM19.7864 11.5334L21.4727 13.2001L22.5271 12.1332L20.8409 10.4666L19.7864 11.5334ZM4.0412 17.3939C5.65381 20.007 8.56379 21.75 11.8825 21.75V20.25C9.09999 20.25 6.6656 18.7903 5.31769 16.6061L4.0412 17.3939Z"
                                  fill="currentColor"></path>
                        </svg>
                        {{ $t('sync') }}
                    </button>
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
                <template #odometer="data">
                    <div>
                        <span class="badge badge-outline-secondary">{{ data.value.options.odometer }}</span>
                    </div>
                </template>
                <template #last_driver="data">
                    <div v-if="data.value?.last_driver">
                        <span>{{ data.value.last_driver.user.full_name }}</span>
                    </div>
                    <div v-else>
                        <span>Sin Conductor Anterior</span>
                    </div>
                </template>
                <template #driver_current="data">
                    <div v-if="data.value?.driver_current">
                        <span>{{ data.value.driver_current.user.full_name }}</span>
                    </div>
                    <div v-else>
                        <span>Sin Conductor Actual</span>
                    </div>
                </template>
                <template #engine_status="data">
                    <div v-if="data.value?.device_data">
                        <span class="badge"
                              :class="data.value.device_data.engine_status ? 'badge-outline-success':'badge-outline-danger'">{{
                                data.value.device_data.engine_status ? 'Encendido' : 'Apagado'
                            }}</span>
                    </div>
                </template>
                <template #time="data">
                        {{ moment(data.value.device_data.time, 'DD-MM-YYYY hh:mm:ss A').format('DD-MM-YYYY h:mm a') }}
                </template>
                <template #actions="data" v-if="companyStore.settings?.sync_driver">
                    <div class="flex justify-center gap-3">
                            <button type="button" class="btn btn-sm btn-info"  v-tippy:edit
                                    @click="redirectToReport(data.value.id)">
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
                            <tippy target="edit">Reporte de Conductores</tippy>

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
import {useCompanyStore} from "../../stores/company-store";
import Pusher from "pusher-js";
import {useUserStore} from "@/stores/user-store";
import {useRouter} from "vue-router";
import moment from 'moment';

const store = useAppStore();
const companyStore = useCompanyStore();
const userStore = useUserStore();
const api = new API();
const router = useRouter();
useMeta({title: 'Devices'});

watch(() => companyStore.companiesSelect, () => {
    getDevicesData();
    colsHide();
});

const cols = ref([
    {field: 'name', title: 'Placa', hide: false},
    {field: 'odometer', title: 'Kilometraje', hide: false},
    {field: 'last_driver', title: 'Conductor anterior', hide: true},
    {field: 'driver_current', title: 'Conductor actual', hide: true},
    {field: 'engine_status', title: 'Estado del vehículo', hide: false},
    {field: 'time', title: 'Última actualización', type: 'date', hide: false},
    {field: 'device_id', title: 'Id Rastreo', hide: true},
    {field: 'actions', title: 'Acciones', sort: false, headerClass: 'justify-center'},
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

const getDevicesData = async () => {
    try {
        loading.value = true;
        const response = await api.get(`devices/v1/devices?filter={"company_id":[${companyStore.companiesSelect}],"search":"${params.search}"}&page=${params.current_page}&take=${params.pagesize}`)
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
            getDevicesData();
        }, 500);
    } else {
        getDevicesData();
    }
};
const clearSearch = () => {
    params.search = null;
    clearTimeout(timer);
};
const syncData = async () => {
    try {
        const response = await api.get(`devices/v1/devices?filter={"company_id":${companyStore.companiesSelect}}&page=${params.current_page}&take=${params.pagesize}`);
        Swal.fire({
            icon: 'success',
            title: 'Obteniendo Estado...',
            text: 'Comando Enviado',
            padding: '2em',
            customClass: 'sweet-alerts',
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error Obteniendo Estado: ' + error.response,
            padding: '2em',
            customClass: 'sweet-alerts',
        });
    }
}

Pusher.logToConsole = true;

var pusher = new Pusher('1a3ed9fce586aff12654', {
    channelAuthorization: {
        endpoint: "/broadcasting/auth",
        headers: { "authorization": userStore.api_token },
    },
    cluster: 'us2'
});

var channel = pusher.subscribe('private-company-' + companyStore.id);
channel.bind('update-devices', function (data) {
    getDevicesData()
});

onMounted(async () => {
    await getDevicesData();
    colsHide();
});

const colsHide = () => {
    console.log(companyStore.settings);
    if (companyStore.settings?.sync_driver) {
        cols.value[2].hide = false;
        cols.value[3].hide = false;
        cols.value[5].hide = false;
    } else {
        cols.value[2].hide = true;
        cols.value[3].hide = true;
        cols.value[5].hide = true;
    }
    console.log(cols.value);
}
const redirectToReport = (id: number) => {
    router.push({ name: 'driver-report', params: { id } });
}
</script>
