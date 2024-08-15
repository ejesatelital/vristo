<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link to="/user/users" class="text-primary hover:underline">
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


                                <div class="col-span-2">
                                    <div>
                                        <label for="email">Email *</label>
                                        <input id="email" type="email" placeholder="info@ejesatelital.com"
                                            class="form-input" v-model="userData.email" required />
                                    </div>
                                </div>

                                <div>
                                    <label for="password">New Password *</label>
                                    <input id="password" type="password" placeholder="New Password"
                                        class="form-input" v-model="newPassword"
                                        @input="validatePassword" required />
                                    <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>
                                </div>
                                <div>
                                    <label for="cpassword">Confirm Password *</label>
                                    <input id="cpassword" type="password" placeholder="Confirm Password"
                                        class="form-input" v-model="confirmPassword"
                                        @input="validateConfirmPassword" required />
                                    <span v-if="confirmPasswordError" class="text-red-500">{{ confirmPasswordError }}</span>
                                </div>

                                <div class="col-span-2">
                                    <Select
                                    :options="dynamicOptions"
                                    v-model="selectedTags"
                                    :multiple="true"
                                    />
                                    <pre class="language-json"><code>{{ selectedTags }}</code></pre>

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
    import { ref, reactive, onMounted, computed } from 'vue';
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    import Swal from 'sweetalert2';
    import { API } from '@/services/api';
    import Select from '@/components/partials/Select.vue';
    import { useCompanyStore } from '@/stores/company-store';
    useMeta({ title: 'Create User' });
    const api = new API();
    const store = useAppStore();

    const companyStore = useCompanyStore();

    const dynamicOptions = ref(companyStore.companyOptions);

    const selectedTags = ref([]);

    const handleSelection = (value) => {
        console.log(value);
        // if (value.value === 0) {
        //     const companyIds = options.value.map(option => option.value).join(',');
        //     console.log(companyIds);
        //     companyStore.setCompaniesSelect(companyIds);
        // } else {
        //     companyStore.setCompaniesSelect(value.value);
        // }
    };

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
        is_activated: true,
        last_login: "2024-07-15 12:21:09",
        password: '',
        password_confirmation: ''
    }
);

const createUser = async () => {
    loading.value = true;
    try {
        const response = await api.post(`user/users`, userData);
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
        userData.password = newPassword.value;
        userData.password_confirmation = confirmPassword.value;
    }
};

</script>
