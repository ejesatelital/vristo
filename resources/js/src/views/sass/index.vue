<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Companies</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Index</span>
            </li>
        </ul>

        <div class="panel pb-1.5 mt-6">

            <div class="flex flex-wrap justify-end gap-2 mb-5">
                <button type="button" class="btn btn-sm btn-primary" v-tippy:edit @click="redirectToCreate()">
                    <svg width="24" height="24" viewBox="0 0 24 24" class="mr-3" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    Nueva Empresa
                </button>
            </div>

            <div class="datatable">
                <vue3-datatable
                    :rows="rows"
                    :columns="cols"
                    :totalRows="rows?.length"
                    :sortable="true"
                    :search="search"
                    skin="whitespace-nowrap bh-table-hover"
                    firstArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    lastArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M11 19L17 12L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path opacity="0.5" d="M6.99976 19L12.9998 12L6.99976 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg> '
                    previousArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                    nextArrow='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 rtl:rotate-180"> <path d="M9 5L15 12L9 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>'
                >
                    <template #actions="data">
                        <div class="flex justify-center">
                            <button type="button" class="btn btn-sm btn-info " v-tippy:edit @click="redirectToEdit(data.value.id)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5">
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
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>

    import { ref, reactive, onMounted } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useI18n } from 'vue-i18n';
    import { useMeta } from '@/composables/use-meta';
    import { useRouter } from 'vue-router';
    import { API } from '@/services/api';
    const api = new API();

    useMeta({ title: 'Devices' });

    const router = useRouter();
    const selectedRow = ref({});
    const info = ref(null);

    const redirectToCreate = () => {
        router.push({ name: 'companies.create' });
    };

    const redirectToEdit = (id: number) => {
        router.push({ name: 'companies.edit', params: { id } });
    };

    // multi language
    const i18n = reactive(useI18n());
    const search = ref('');

    const cols = ref([
    { field: 'id', title: 'Id' },
    { field: 'name', title: 'Nombre' },
    { field: 'email', title: 'Correo' },
    { field: 'address', title: 'Dirección' },
    { field: 'phone', title: 'Teléfono' },
    { field: 'updated_at', title: 'Creado el' },
    { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
  ]);

    const rows = ref<Record<string, unknown>[]>([]);

    async function getData() {
        try {
            const response = await api.get(`sass/v1/companies`);
            rows.value = response.data;
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    onMounted(getData);
</script>
