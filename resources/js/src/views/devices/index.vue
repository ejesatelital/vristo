<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Dispositivos</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Index</span>
            </li>
        </ul>
        <div class="panel p-5">
            <div class="flex justify-between mb-5">
                <h6 class="text-xl font-bold">Dispositivos</h6>

                <button type="button" class="btn btn-outline-info btn-sm d-flex align-items-center" @click="syncData()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-1">
                        <path d="M12.0789 3V2.25V3ZM3.67981 11.3333H2.92981H3.67981ZM3.67981 13L3.15157 13.5324C3.44398 13.8225 3.91565 13.8225 4.20805 13.5324L3.67981 13ZM5.88787 11.8657C6.18191 11.574 6.18377 11.0991 5.89203 10.8051C5.60029 10.511 5.12542 10.5092 4.83138 10.8009L5.88787 11.8657ZM2.52824 10.8009C2.2342 10.5092 1.75933 10.511 1.46759 10.8051C1.17585 11.0991 1.17772 11.574 1.47176 11.8657L2.52824 10.8009ZM18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0001 7.42199 20.1103 6.96007 19.8934 6.60721L18.6156 7.39279ZM12.0789 2.25C7.03155 2.25 2.92981 6.3112 2.92981 11.3333H4.42981C4.42981 7.15072 7.84884 3.75 12.0789 3.75V2.25ZM2.92981 11.3333L2.92981 13H4.42981L4.42981 11.3333H2.92981ZM4.20805 13.5324L5.88787 11.8657L4.83138 10.8009L3.15157 12.4676L4.20805 13.5324ZM4.20805 12.4676L2.52824 10.8009L1.47176 11.8657L3.15157 13.5324L4.20805 12.4676ZM19.8934 6.60721C18.287 3.99427 15.3873 2.25 12.0789 2.25V3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279L19.8934 6.60721Z" fill="currentColor"></path>
                        <path opacity="0.5" d="M11.8825 21V21.75V21ZM20.3137 12.6667H21.0637H20.3137ZM20.3137 11L20.8409 10.4666C20.5487 10.1778 20.0786 10.1778 19.7864 10.4666L20.3137 11ZM18.1002 12.1333C17.8056 12.4244 17.8028 12.8993 18.094 13.1939C18.3852 13.4885 18.86 13.4913 19.1546 13.2001L18.1002 12.1333ZM21.4727 13.2001C21.7673 13.4913 22.2421 13.4885 22.5333 13.1939C22.8245 12.8993 22.8217 12.4244 22.5271 12.1332L21.4727 13.2001ZM5.31769 16.6061C5.10016 16.2536 4.63806 16.1442 4.28557 16.3618C3.93307 16.5793 3.82366 17.0414 4.0412 17.3939L5.31769 16.6061ZM11.8825 21.75C16.9448 21.75 21.0637 17.6915 21.0637 12.6667H19.5637C19.5637 16.8466 16.133 20.25 11.8825 20.25V21.75ZM21.0637 12.6667V11H19.5637V12.6667H21.0637ZM19.7864 10.4666L18.1002 12.1333L19.1546 13.2001L20.8409 11.5334L19.7864 10.4666ZM19.7864 11.5334L21.4727 13.2001L22.5271 12.1332L20.8409 10.4666L19.7864 11.5334ZM4.0412 17.3939C5.65381 20.007 8.56379 21.75 11.8825 21.75V20.25C9.09999 20.25 6.6656 18.7903 5.31769 16.6061L4.0412 17.3939Z" fill="currentColor"></path>
                    </svg>
                    {{ $t('sync') }}
                </button>
            </div>

            <!-- <div class="flex justify-end ltr:ml-auto rtl:mr-auto">
                <input v-model="search" type="text" class="form-input" placeholder="Buscar..."  debounce="300" />
            </div> -->
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
                @change="changeServer"
                skin="whitespace-nowrap bh-table-hover"
                firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
            >
        </vue3-datatable>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import Swal from 'sweetalert2';

    import { API } from '@/services/api';
    import {useCompanyStore} from "../../stores/company-store";

    useMeta({ title: 'Setting company' });

    const store = useAppStore();
    const companyStore = useCompanyStore();
    const api = new API();

    const search = ref('');
    const cols = ref([
        {field: 'id', title: 'Id'},
        {field: 'name', title: 'Nombre'},
        {field: 'odometer', title: 'Kilometraje'},
    ]);
    const rows: any = ref(null);
    const total_rows = ref(0);
    const params = reactive({
        current_page: 1,
        pagesize: 25,
        column_filters: [],
        sort_column: 'id',
        sort_direction: 'desc',
    });
    const loading = ref(true);

    const getDevicesData = async () => {
        try {
            loading.value = true;
            const response = await api.get(`devices/v1/devices?filter={"company_id":${companyStore.companiesSelect}}&page=${params.current_page}&take=${params.pagesize}`)
            rows.value = response?.data
            total_rows.value = response?.meta?.page?.total;
            loading.value = false;
        } catch (error) {
            console.error('Error fetching data', error);
            loading.value = false;
        } finally {
            loading.value = false;
        }
    }

    const changeServer = (data: any) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;
        params.sort_column = data.sort_column;
        params.sort_direction = data.sort_direction;
        getDevicesData();
    };

    const syncData = async () =>  {
        try {
            const response = await api.get(`devices`);
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
    onMounted(async () => {
       await getDevicesData();
    });
</script>
