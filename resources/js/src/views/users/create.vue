<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'users'}" class="text-primary hover:underline">
                    Users
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>New User</span>
            </li>
        </ul>
        <div>
            <form @submit.prevent="createUser">
                <div class="panel pb-1.5 mt-6">
                    <div
                        class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                        <h6 class="text-lg font-bold mb-5">Información General</h6>
                        <div class="flex flex-col sm:flex-row">
                            <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                <img src="/assets//images/profile-34.jpeg" alt=""
                                     class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"/>
                            </div>

                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">

                                <div>
                                    <label for="first_name">Nombres *</label>
                                    <input id="first_name" type="text" placeholder="Nombres"
                                           class="form-input" v-model="userData.first_name" required/>
                                </div>
                                <div>
                                    <label for="last_name">Apellidos *</label>
                                    <input id="last_name" type="text" placeholder="Apellidos"
                                           class="form-input" v-model="userData.last_name" required/>
                                </div>
                                <div>
                                    <label for="first_name">Identificación *</label>
                                    <input id="first_name" type="text" placeholder="Identificación"
                                           class="form-input" v-model="userData.fields.identification" required/>
                                </div>
                                <div>
                                    <label for="last_name">Telefono *</label>
                                    <input id="last_name" type="text" placeholder="300 0000 000"
                                           class="form-input" v-model="userData.fields.phone" required/>
                                </div>

                                <div class="col-span-2">
                                    <div>
                                        <label for="email">Email *</label>
                                        <input id="email" type="email" placeholder="info@ejemplo.com"
                                               class="form-input" v-model="userData.email" required/>
                                    </div>
                                </div>

                                <div>
                                    <label for="password">Contraseña *</label>
                                    <input id="password" type="password" placeholder="New Password"
                                           class="form-input" v-model="newPassword"
                                           @input="validatePassword" required/>
                                    <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>
                                </div>
                                <div>
                                    <label for="cpassword">Confirmar Contraseña *</label>
                                    <input id="cpassword" type="password" placeholder="Confirmar Contraseña"
                                           class="form-input" v-model="confirmPassword"
                                           @input="validateConfirmPassword" required/>
                                    <span v-if="confirmPasswordError" class="text-red-500">{{
                                            confirmPasswordError
                                        }}</span>
                                </div>

                                <div class="col-span-2">
                                    <Select
                                        :options="companiesOptions"
                                        v-model="companiesSelected"
                                        :multiple="true"
                                        required
                                        :closeOnSelect="false"
                                        titleSelect="Compañias"
                                        name="companies"
                                    />
                                </div>

                                <div class="col-span-2" v-if="userStore.hasAccess('user.roles.index')">
                                    <Select
                                        :options="roles"
                                        v-model="rolesSelected"
                                        :multiple="true"
                                        required
                                        :closeOnSelect="false"
                                        titleSelect="Roles"
                                        name="roles"
                                    />
                                </div>

                            </div>
                        </div>
                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                            <button
                                type="submit"
                                class="btn btn-primary"
                                :disabled="isDisabled"
                            >
                                Save
                            </button>
                        </div>
                        <!-- <div class="mb-5">
                        <div class="custom-file-container" data-upload-id="myFirstImage">
                            <div class="label-container">
                                <label>avatar </label> <a href="javascript:;" class="custom-file-container__image-clear" title="Clear Image">×</a>
                            </div>
                            <label class="custom-file-container__custom-file">
                                <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <span class="custom-file-container__custom-file__custom-file-control ltr:pr-20 rtl:pl-20"></span>
                            </label>
                            <div class="custom-file-container__image-preview"></div>
                        </div>
                    </div> -->

                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref, reactive, computed, watch, onMounted} from 'vue';
import {useAppStore} from '@/stores/index';
import {useMeta} from '@/composables/use-meta';
import Swal from 'sweetalert2';
import {API} from '@/services/api';
import Select from '@/components/partials/Select.vue';
import {useCompanyStore} from '@/stores/company-store';

useMeta({title: 'Crear Usuario'});
import {useRoute, useRouter} from 'vue-router';
import {useUserStore} from '@/stores/user-store';

const route = useRoute();
const store = useAppStore();
const api = new API();
const loading = ref(false);
const companyStore = useCompanyStore();
const userStore = useUserStore();
const router = useRouter();

const companiesOptions = ref(companyStore.companyOptions ?? []);
const companiesSelected = ref();

const roles = ref();
const rolesSelected = ref();

watch(companiesSelected, (newSelection) => {
    userData.value.companies = companiesSelected.value.map(x => x.value);
});

watch(rolesSelected, (newSelection) => {
    userData.value.roles = rolesSelected.value.map(x => x.value);
});


const isDisabled = computed(() => {
    return loading.value || !!passwordError.value || !!confirmPasswordError.value;
});

const userData = ref(
    {
        first_name: null,
        last_name: null,
        email: null,
        avatar: null,
        is_activated: true,
        password: '',
        password_confirmation: '',
        fields: {
            address: null,
            identification: null,
            phone: null
        },
        companies: [],
        roles: []
    }
);

const createUser = async () => {
    loading.value = true;
    try {
        const response = await api.post(`user/users`, userData.value);
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Updating...',
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then(() => {
            loading.value = false;
            router.push({name: 'users'})
        });
    } catch (error) {
        console.error(error.response)
        loading.value = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error updating: ' + error.response,
            padding: '2em',
            customClass: 'sweet-alerts',
        });
    }
}

// Data properties
const newPassword = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');

const validatePassword = () => {
    if (newPassword.value.length < 8) {
        passwordError.value = 'Password must be at least 8 characters long.';
    } else {
        passwordError.value = '';
    }
    validateConfirmPassword();
};

const validateConfirmPassword = () => {
    if (confirmPassword.value !== newPassword.value) {
        confirmPasswordError.value = 'Passwords do not match.';
    } else {
        confirmPasswordError.value = '';
        userData.value.password = newPassword.value;
        userData.value.password_confirmation = confirmPassword.value;
    }
};

const getRoles = async () => {
    const response = await api.get(`user/roles`);
    if (response) {
        roles.value = response.data.map((x) => {
            return {
                label: x.name,
                value: x.id
            }
        })
    }
}

onMounted(async () => {
    if (userStore.hasAccess('sass.companies.indexall')) {
        await getRoles();
    } else {
        userData.value.roles = [3]
    }
    // single image upload
    // new FileUploadWithPreview('myFirstImage', {
    //     images: {
    //         baseImage: '/assets/images/file-preview.svg',
    //         backgroundImage: '',
    //     },
    // });
});
</script>
