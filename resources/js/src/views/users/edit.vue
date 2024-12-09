<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'users'}" class="text-primary hover:underline">
                    Users
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Edit</span>
            </li>
        </ul>
        <div class="pt-5">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Configuración</h5>
            </div>
            <TabGroup>
                <TabList
                    class="flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                           class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                           :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <path opacity="0.5"
                                      d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                      stroke="currentColor" stroke-width="1.5"/>
                                <path d="M12 15L12 18" stroke="currentColor" stroke-width="1.5"
                                      stroke-linecap="round"/>
                            </svg>
                            Datos
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }" disabled>
                        <a href="javascript:;"
                           class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                           :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <path
                                    d="M17.2606 11.4402C19.8781 11.4402 22 9.3269 22 6.72008C22 4.11325 19.8781 2 17.2606 2C14.643 2 12.5211 4.11325 12.5211 6.72008C12.5211 7.92754 13.0722 8.80569 13.0722 8.80569L7.3408 14.5137C7.08363 14.7698 6.72357 15.4358 7.3408 16.0505L8.00212 16.7091C8.25929 16.9286 8.90589 17.236 9.43495 16.7091L10.2065 15.9407C10.978 16.7091 11.8598 16.27 12.1904 15.8309C12.7415 15.0625 12.0802 14.2942 12.0802 14.2942L12.3007 14.0746C13.3588 15.1284 14.2846 14.5137 14.6153 14.0746C15.1664 13.3062 14.6153 12.5378 14.6153 12.5378C14.3948 12.0988 13.954 12.0988 14.505 11.5499L15.1664 10.8913C15.6954 11.3304 16.7829 11.4402 17.2606 11.4402Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                                <path
                                    d="M22 14.993C21.9361 17.787 21.6692 19.419 20.5542 20.5341C19.0882 22 16.7288 22 12.0101 22C7.29127 22 4.93188 22 3.46594 20.5341C2 19.0681 2 16.7087 2 11.9899C2 7.27117 2 4.91177 3.46594 3.44584C4.58099 2.33078 6.21298 2.06388 9.00704 2"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Permisos
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                           class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                           :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <path
                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                    stroke="currentColor" stroke-width="1.5"/>
                                <path d="M12.0002 10V14M10.2678 11L13.7319 13M13.7317 11L10.2676 13"
                                      stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M6.73266 10V14M5.00023 11L8.46434 13M8.4641 11L5 13" stroke="currentColor"
                                      stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"
                                      stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Restaurar Contraseña
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                           class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                           :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.6807 14.5869C19.1708 14.5869 22 11.7692 22 8.29344C22 4.81767 19.1708 2 15.6807 2C12.1907 2 9.3615 4.81767 9.3615 8.29344C9.3615 9.90338 10.0963 11.0743 10.0963 11.0743L2.45441 18.6849C2.1115 19.0264 1.63143 19.9143 2.45441 20.7339L3.33616 21.6121C3.67905 21.9048 4.54119 22.3146 5.2466 21.6121L6.27531 20.5876C7.30403 21.6121 8.4797 21.0267 8.92058 20.4412C9.65538 19.4167 8.77362 18.3922 8.77362 18.3922L9.06754 18.0995C10.4783 19.5045 11.7128 18.6849 12.1537 18.0995C12.8885 17.075 12.1537 16.0505 12.1537 16.0505C11.8598 15.465 11.272 15.465 12.0067 14.7333L12.8885 13.8551C13.5939 14.4405 15.0439 14.5869 15.6807 14.5869Z"
                                    stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                                <path
                                    d="M17.8853 8.29353C17.8853 9.50601 16.8984 10.4889 15.681 10.4889C14.4635 10.4889 13.4766 9.50601 13.4766 8.29353C13.4766 7.08105 14.4635 6.09814 15.681 6.09814C16.8984 6.09814 17.8853 7.08105 17.8853 8.29353Z"
                                    stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            Api Key
                        </a>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div>
                            <form @submit.prevent="editData">
                                <div class="panel pb-1.5 mt-6">
                                    <div
                                        class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                                        <h6 class="text-lg font-bold mb-5">Información General</h6>
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                                <img src="/assets/images/profile-34.jpeg" alt=""
                                                     class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto"/>
                                            </div>
                                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label for="first_name">Nombres *</label>
                                                    <input id="first_name" type="text" placeholder="First Name"
                                                           class="form-input" v-model="userData.first_name" required/>
                                                </div>
                                                <div>
                                                    <label for="last_name">Apellidos *</label>
                                                    <input id="last_name" type="text" placeholder="Last Name"
                                                           class="form-input" v-model="userData.last_name" required/>
                                                </div>
                                                <div class="col-span-2">
                                                    <label for="email">Email *</label>
                                                    <input id="email" type="email" placeholder="info@ejesatelital.com"
                                                           class="form-input" v-model="userData.email" required/>
                                                </div>
                                                <div class="col-span-2">
                                                    <label for="phone">Telefono *</label>
                                                    <input id="phone" type="tel" placeholder="300 000 000"
                                                           class="form-input" v-model="userData.fields.phone" required/>
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
                                                <div>
                                                    <label for="">Estado</label>
                                                    <label class="inline-flex">
                                                        <input type="checkbox" v-model="userData.is_activated"
                                                               class="form-checkbox rounded-full peer"/>
                                                        <span
                                                            :class="userData.is_activated ? 'text-success' : 'text-danger'"
                                                            class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0 text-center">
                                                                {{ userData.is_activated ? 'Activo' : 'Inactivo' }}
                                                            </span>
                                                    </label>
                                                </div>
                                            </div>
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
                                        <div class="flex flex-wrap justify-end gap-2 mt-4">
                                            <button type="submit" class="btn btn-primary" :disabled="loading">Guardar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div>
                            <div class="panel pb-1.5 mt-6">
                                <!-- <Permission :rolData="rolData"/> -->
                                <div class="flex flex-wrap justify-end gap-2 my-5">
                                    <button type="submit" class="btn btn-primary" :disabled="loading">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div>
                            <form @submit.prevent="editPassword">
                                <div class="panel pb-1.5 mt-6">
                                    <div
                                        class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                                        <h6 class="text-lg font-bold mb-5">Cambiar Contraseña</h6>
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label for="password">Contraseña *</label>
                                                    <input id="password" type="password" placeholder="Nueva Contraseña"
                                                           class="form-input" v-model="newPassword"
                                                           @input="validatePassword" required/>
                                                    <span v-if="passwordError" class="text-red-500">{{
                                                            passwordError
                                                        }}</span>
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
                                                <div class="mt-6">
                                                    <h6 class="mb-3">o enviar un correo para restablecer la contraseña</h6>
                                                    <button @click="sendResetPassword" type="button"
                                                            class="btn btn-outline-primary">
                                                        Enviar correo para restablecer contraseña.
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                                            <button
                                                type="submit"
                                                class="btn btn-primary"
                                                :disabled="isDisabled"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </TabPanel>

                    <TabPanel>
                        <div>
                            <div class="panel pb-1.5 mt-6">
                                <label for="user_api_hash">User API Hash</label>
                                <div class="flex mt-3" v-for="token in tokenData" :key="token.id">
                                    <input :id="`user_api_hash_${token.id}`"
                                           :type="showPasswords[token.id] ? 'text' : 'password'"
                                           class="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                           v-model="token.access_token"
                                           readonly/>
                                    <div
                                        class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        <label class="w-7 h-4 relative cursor-pointer mb-0">
                                            <input type="checkbox"
                                                   :id="`user_api_hash_check_${token.id}`"
                                                   v-model="showPasswords[token.id]"
                                                   @click="togglePasswordVisibility(token.id)"
                                                   class="peer absolute w-full h-full opacity-0 z-10 focus:ring-0 focus:outline-none cursor-pointer"/>
                                            <span
                                                class="rounded-full border border-[#adb5bd] bg-white peer-checked:bg-primary peer-checked:border-primary dark:bg-dark block h-full before:absolute ltr:before:left-0.5 rtl:before:right-0.5 ltr:peer-checked:before:left-3.5 rtl:peer-checked:before:right-3.5 peer-checked:before:bg-white before:bg-[#adb5bd] dark:before:bg-white-dark before:bottom-[2px] before:w-3 before:h-3 before:rounded-full before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>
                                    <button type="button" class="btn btn-info" @click="copy(token.access_token)">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5 ltr:mr-2 rtl:ml-2"
                                        >
                                            <path
                                                d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            />
                                            <path
                                                opacity="0.5"
                                                d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                                                stroke="currentColor"
                                                stroke-width="1.5"
                                            />
                                        </svg>
                                        Copiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref, reactive, onMounted, computed, watch} from 'vue';
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue';
import {useAppStore} from '@/stores/index';
import {useMeta} from '@/composables/use-meta';
import Swal from 'sweetalert2';
import {useRoute} from 'vue-router';
import {API} from '@/services/api';
import {useCompanyStore} from '@/stores/company-store';
import {useUserStore} from '@/stores/user-store';
import Select from '@/components/partials/Select.vue';
import useClipboard from 'vue-clipboard3';
import Multiselect from "@suadelabs/vue3-multiselect";

useMeta({title: 'User Edit'});
const route = useRoute();
const store = useAppStore();
const api = new API();
const loading = ref(false);
const companyStore = useCompanyStore();
const userStore = useUserStore();
const {toClipboard} = useClipboard();

const copy = async (msg) => {
    if (msg) {
        await toClipboard(msg);
        showMessage('Copiado exitosamente.');
    }
};

const showMessage = (msg = '', type = 'success') => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: {container: 'toast'},
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};

const companiesOptions = ref(companyStore.companyOptions ?? []);
const companiesSelected = ref();

const roles = ref();
const rolesSelected = ref();

const showPasswords = ref({});
const userData = ref(
    {
        first_name: null,
        last_name: null,
        identification: null,
        email: null,
        avatar: null,
        is_activated: true,
        fields: {
            phone: null
        },
        companies: [],
        roles: []
    }
);
const togglePasswordVisibility = (tokenId) => {
    showPasswords.value[tokenId] = !showPasswords.value[tokenId];
};

watch(companiesSelected, (newSelection) => {
    userData.value.companies = companiesSelected.value.map(x => x.value);
});

watch(rolesSelected, (newSelection) => {
    userData.value.roles = rolesSelected.value.map(x => x.value);
});

const isDisabled = computed(() => {
    return loading.value || !!passwordError.value || !!confirmPasswordError.value;
});


const tokenData = reactive({});

const getData = async () => {
    try {
        const response = await api.post(`user/users/find/${route.params.id}`, '');

        if (response.status === 200) {
            const data = response.data.data;

            console.log(data.companies_name)
            userData.value.first_name = data.first_name
            userData.value.last_name = data.last_name
            userData.value.identification = data.identification
            userData.value.email = data.email
            //userData.value.address: data.address
            userData.value.fields.phone = data.fields?.phone ?? null
            userData.value.avatar = data.avatar
            userData.value.is_activated = data.is_activated
            if (data.companies_name.length > 0) {
                userData.value.companies = data.companies
                companiesSelected.value = data.companies_name.map((x) => {
                    return {label: x.name, value: x.id}
                })
            }
            if (data.roles_name.length > 0) {
                userData.value.roles = data.roles
                rolesSelected.value = data.roles_name.map((x) => {
                    return {label: x.name, value: x.id}
                })
            }
        } else {
            throw new Error('Hubo un problema al obtener la lista de vehículos desde el API.');
        }
    } catch (error) {
        console.error(error.response);
    }
};

const editData = async () => {
    loading.value = true;
    try {
        console.log(userData.value)
        const response = await api.post(`user/users/${route.params.id}/edit`, userData.value);
        loading.value = false;
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Updating...',
            padding: '2em',
            customClass: 'sweet-alerts',
        });
    } catch (error) {
        console.error(error.response)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error updating: ' + error.response,
            padding: '2em',
            customClass: 'sweet-alerts',
        });
        loading.value = false;
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
    }
};

const editPassword = async () => {
    if (passwordError.value || confirmPasswordError.value) {
        return;
    }
    loading.value = true;
    userData.value.password = newPassword.value
    userData.value.password_confirmation = confirmPassword.value
    editData();
};

const sendResetPassword = async () => {
    try {
        const response = await api.post('auth/reset', userData.value.email);
        console.log(response.data);
        // Handle success
    } catch (error) {
        console.error(error);
        // Handle error
    }
};

const getRoles = async () => {
    try {

        const response = await api.get(`user/roles`);
        if (response) {
            roles.value = response.data.map((x) => {
                return {label: x.name, value: x.id}
            })
        } else {
            throw new Error('Hubo un problema al obtener la lista de roles desde el API.');
        }
    } catch (error) {
        console.error(error.response);
    }
}

const getToken = async () => {
    try {
        const response = await api.get(`user/account/api-keys`);
        if (response) {
            Object.assign(tokenData, response.data);
        } else {
            throw new Error('Hubo un problema al obtener la lista de tokens desde el API.');
        }
    } catch (error) {
        console.error(error.response);
    }
}

onMounted(async () => {
    getData();
    if (userStore.hasAccess('sass.companies.indexall')) {
        await getRoles();
    }

    await getToken();

    // single image upload
    // new FileUploadWithPreview('myFirstImage', {
    //     images: {
    //         baseImage: '/assets/images/file-preview.svg',
    //         backgroundImage: '',
    //     },
    // });
});
</script>
