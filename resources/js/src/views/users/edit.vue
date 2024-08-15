<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link to="/user/users" class="text-primary hover:underline">
                    Users
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Edit</span>
            </li>
        </ul>
        <div class="pt-5">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Settings</h5>
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
                                    stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 15L12 18" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" />
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
                                    stroke="#1C274C" stroke-width="1.5" stroke-linejoin="round" />
                                <path
                                    d="M22 14.993C21.9361 17.787 21.6692 19.419 20.5542 20.5341C19.0882 22 16.7288 22 12.0101 22C7.29127 22 4.93188 22 3.46594 20.5341C2 19.0681 2 16.7087 2 11.9899C2 7.27117 2 4.91177 3.46594 3.44584C4.58099 2.33078 6.21298 2.06388 9.00704 2"
                                    stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            Permissions
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
                                    stroke="currentColor" stroke-width="1.5" />
                                <path d="M12.0002 10V14M10.2678 11L13.7319 13M13.7317 11L10.2676 13"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M6.73266 10V14M5.00023 11L8.46434 13M8.4641 11L5 13" stroke="currentColor"
                                    stroke-width="1.5" stroke-linecap="round" />
                                <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            Reset Password
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
                                        <h6 class="text-lg font-bold mb-5">General Information</h6>
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                                <img src="/assets//images/profile-34.jpeg" alt=""
                                                    class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                            </div>
                                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label for="first_name">First Name *</label>
                                                    <input id="first_name" type="text" placeholder="First Name"
                                                        class="form-input" v-model="userData.first_name" required />
                                                </div>
                                                <div>
                                                    <label for="last_name">Last Name *</label>
                                                    <input id="last_name" type="text" placeholder="Last Name"
                                                        class="form-input" v-model="userData.last_name" required />
                                                </div>
                                                <div>
                                                    <label for="email">Email *</label>
                                                    <input id="email" type="email" placeholder="info@ejesatelital.com"
                                                        class="form-input" v-model="userData.email" required />
                                                </div>
                                                <!-- <div>
                                                    <label for="phone">Phone *</label>
                                                    <input id="phone" type="text" placeholder="+57 300 912-2995"
                                                        class="form-input" v-model="userData.phone" required />
                                                </div>
                                                <div>
                                                    <label for="address">Address</label>
                                                    <input id="address" type="text" placeholder="Address"
                                                        class="form-input" v-model="userData.address" />
                                                </div>-->
                                                <div>
                                                    <label for="">Estado</label>
                                                    <label class="inline-flex">
                                                        <input type="checkbox" v-model="userData.is_activated"
                                                            class="form-checkbox rounded-full peer" />
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
                                        <button type="submit" class="btn btn-primary" :disabled="loading">Save</button>
                                    </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div>
                            <div class="panel pb-1.5 mt-6">
                                <Permission :rolData="rolData"/>
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
                                        <h6 class="text-lg font-bold mb-5">Change Password</h6>
                                        <div class="flex flex-col sm:flex-row">
                                            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label for="password">New Password *</label>
                                                    <input id="password" type="password" placeholder="New Password"
                                                        class="form-input" v-model="newPassword"
                                                        @input="validatePassword" required />
                                                    <span v-if="passwordError" class="text-red-500">{{ passwordError
                                                        }}</span>
                                                </div>
                                                <div>
                                                    <label for="cpassword">Confirm Password *</label>
                                                    <input id="cpassword" type="password" placeholder="Confirm Password"
                                                        class="form-input" v-model="confirmPassword"
                                                        @input="validateConfirmPassword" required />
                                                    <span v-if="confirmPasswordError" class="text-red-500">{{
                                                        confirmPasswordError }}</span>
                                                </div>
                                                <div class="mt-6">
                                                    <h6 class="mb-3">or, send reset password mail</h6>
                                                    <button @click="sendResetPassword" type="button"
                                                        class="btn btn-outline-primary">
                                                        send reset password mail.
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
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, reactive, onMounted, computed } from 'vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    import Swal from 'sweetalert2';
    import { useRoute } from 'vue-router';
    import { API } from '@/services/api';
    useMeta({ title: 'User Edit' });
    const route = useRoute();
    const store = useAppStore();
    const api = new API();
    const loading = ref(false);

    const isDisabled = computed(() => {
        return loading.value || !!passwordError.value || !!confirmPasswordError.value;
    });

    const userData = reactive(
        {
            first_name: null,
            last_name: null,
            identification: null,
            email: null,
            address: null,
            phone: null,
            avatar: null,
            is_activated: true
        }
    );

    const getData = async () => {
        try {
            const response = await api.post(`user/users/find/${route.params.id}`, '');

            if (response.status === 200) {
                const data = response.data.data;

                Object.assign(userData,
                    {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        identification: data.identification,
                        email: data.email,
                        // address: data.address,
                        // phone: data.phone,
                        avatar: data.avatar,
                        is_activated: data.is_activated,
                        last_login: data.last_login,
                    });

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
            const response = await api.post(`user/users/${route.params.id}/edit`,userData);
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
        Object.assign(userData, { password: newPassword.value, password_confirmation: confirmPassword.value});
        editData();
    };

    const sendResetPassword = async () => {
        try {
            const response = await api.get('user/user/sendResetPassword/{userId}');
            console.log(response.data);
            // Handle success
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    onMounted(() => {
        getData();
        // single image upload
        // new FileUploadWithPreview('myFirstImage', {
        //     images: {
        //         baseImage: '/assets/images/file-preview.svg',
        //         backgroundImage: '',
        //     },
        // });
    });
</script>
