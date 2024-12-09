<template>
    <div class="panel mb-5">
        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Usuarios</h5>
        </div>
        <div class="mb-5">
            <div class="space-y-2 font-semibold">
                <div
                    class="space-y-2 p-4 text-white-dark text-[13px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">

                    <div class="space-y-5">
                        <div class="mb-5">
                            <div class="flex justify-end mb-5 gap-3">
                                <div class="relative max-w-xs">
                                    <multiselect
                                        v-model="userSelect"
                                        tag-placeholder="Buscar Usuarios"
                                        placeholder="Buscar Usuarios"
                                        label="label"
                                        track-by="value"
                                        :options="optionUsers"
                                        class="custom-multiselect"
                                        :searchable="true"
                                        :allow-empty="true"
                                        @select="addUser"
                                    ></multiselect>
                                </div>
                                <button type="button" class="btn btn-sm btn-primary gap-2" @click="newUser()">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                                            stroke="currentColor" stroke-width="1.5"/>
                                        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor"
                                              stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                    Nuevo usuario
                                </button>
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
                                            <template v-if="userStore.hasAccess('user.users.destroy')">
                                                <button type="button" class="btn btn-sm btn-danger" v-tippy:delete
                                                        @click="deleteUser(data.value.id)">
                                                    Quitar usuario
                                                </button>
                                                <tippy target="delete">Quitar</tippy>
                                            </template>
                                        </div>
                                    </template>
                                </vue3-datatable>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from 'vue';
import {API} from '@/services/api';
import {useUserStore} from "@/stores/user-store";
import {useCompanyStore} from "@/stores/company-store";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import {useRouter} from "vue-router";
import Multiselect from "vue-multiselect";

const api = new API();
let timer: any;
const showPasswords = ref({
    password_tracking: false,
    user_api_hash: false,
    email_password: false,
    whatsapp_token: false
});
const emit = defineEmits(['updateUsers'])
const props = defineProps({
    companyData: {
        type: Object,
        default: () => null,
        validator: (value) => {
            return value === null || (typeof value === 'object' && value !== null);
        }
    }
});
const userStore = useUserStore();
const companyStore = useCompanyStore();
const router = useRouter();
const cols = ref([
    {field: 'id', title: 'Id'},
    {field: 'fullname', title: 'Nombre'},
    {field: 'email', title: 'Correo'},
    {field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center'},
]);
const loading = ref(true);
const rows: any = ref([]);
const total_rows = ref(0);
const optionUsers = ref([]);
const users = ref([]);
const params = reactive({
    current_page: 1,
    pagesize: 50,
    column_filters: [],
    sort_column: 'id',
    sort_direction: 'desc',
    search: ''
});
const userSelect = ref({})
watch(() => companyStore.companiesSelect, () => {
    getData();
});
const getData = async () => {
    try {
        loading.value = true;
        let companies: any = companyStore.companiesSelect;
        if (userStore.hasAccess('sass.companies.indexall') && companies.length > 1) {
            companies = null
        } else if (!companyStore.companiesSelect) {
            companies = companyStore.companies.map(x=>x.id);
        } else {
            companies = `[${companyStore.companiesSelect}]`;
        }
        const response = await api.get(`user/users?search=${params.search}&company_id=${companies}&page=${params.current_page}&per_page=${params.pagesize}`)
        const userslist = []
        response?.data.map(function (x: any) {
            let user = null
            if (rows.value !== undefined) {
                user = rows.value.find(({id}) => id === x.id)
            }
            if (!user || user === undefined) {
                userslist.push({
                    label: x.fullname,
                    value: x.id
                })
            }
        });
        users.value = response?.data
        optionUsers.value = userslist
        total_rows.value = response?.meta?.total;
    } catch (error) {
        console.error('Error fetching data', error);
    } finally {
        loading.value = false;
    }
}
const addUser = () => {
    const user = users.value.find(({id}) => id === userSelect.value.value)
    rows.value.push(user)
    props.companyData.users.push(user.id);
    let option = []
    optionUsers.value.map((x: any) => {
        if (x.value === userSelect.value.value) {
            return null
        } else {
            option.push(x)
            return x
        }
    });
    optionUsers.value = option
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
    params.search = '';
    clearTimeout(timer);
};
const deleteUser = (id: number) => {
    let users = []
    let row = []
    props.companyData.users.map((x: any) => {
        if (x === id) {
            return null
        } else {
            users.push(x)
            return x
        }
    });
    rows.value.map((x: any) => {
        console.log(x)
        if (x.id === id) {
            return null
        } else {
            row.push(x)
            return x
        }
    });
    rows.value = row
    props.companyData.users=users
    getData()
    emit("updateUsers",users)

};
onMounted(async () => {
    await getData();
    rows.value = props.companyData.users_data ?? []
    let option=[]
    console.log(props.companyData.users.includes(2))
    optionUsers.value.map((x: any) => {
        if (props.companyData.users.includes(x.value)) {
            return null
        } else {
            option.push(x)
            return x
        }
    });
    optionUsers.value = option
});

const redirectToCreate = () => {
    router.push({name: 'users.create'});
};

const newUser = () => {
    router.push({name: 'users.create'});
};

</script>
