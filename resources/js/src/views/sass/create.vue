<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'companies'}" class="text-primary hover:underline">
                    Empresas
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Nueva empresa</span>
            </li>
        </ul>

        <div class="pt-5">
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
                            Home
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary !outline-none"
                            :class="{ '!border-primary text-primary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path
                                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                            API Configurations
                        </a>
                    </Tab>

                </TabList>
                <TabPanels>

                    <form @submit.prevent="createCompany">
                        <TabPanel>
                            <div>
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
                                                    <label for="name">Name *</label>
                                                    <input id="name" type="text" placeholder="Company Name" v-model="companyData.name"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="identification">Identification *</label>
                                                    <input id="identification" type="text" placeholder="Company identification" v-model="companyData.identification"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="address">Address *</label>
                                                    <input id="address" type="text" placeholder="Company Address" v-model="companyData.address"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="phone">Phone *</label>
                                                    <input id="phone" type="text" placeholder="+57 300 912-2995" v-model="companyData.phone"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="email">Email *</label>
                                                    <input id="email" type="email" placeholder="info@ejesatelital.com" v-model="companyData.email"
                                                        class="form-input" required />
                                                </div>
                                                <div>
                                                    <label for="web">Website</label>
                                                    <input id="web" type="text"
                                                        placeholder="https://www.ejesatelital.com/" class="form-input" v-model="companyData.web" />
                                                </div>
                                            </div>
                                        </div>

                                    <!-- <div class="mb-5">
                                        <div class="custom-file-container" data-upload-id="myFirstImage">
                                            <div class="label-container">
                                                <label>Logo </label> <a href="javascript:;" class="custom-file-container__image-clear" title="Clear Image">×</a>
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
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div>
                                <apiConfigurations :companyData="companyData" />
                            </div>
                        </TabPanel>
                        <div class="flex flex-wrap justify-end gap-2 mt-5">
                            <button type="submit" class="btn btn-primary" :disabled="loading">Save</button>
                        </div>
                    </form>
                    </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>
<script lang="ts" setup>

    import { ref, reactive, onMounted } from 'vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

    import { useI18n } from 'vue-i18n';
    import { useMeta } from '@/composables/use-meta';
    import VueCollapsible from 'vue-height-collapsible/vue3';
    import FileUploadWithPreview from 'file-upload-with-preview';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';
    import apiConfigurations from './partials/apisComponent.vue';

    import { API } from '@/services/api';
    const api = new API();

    const router = useRouter();

    const accordians: any = ref();

    useMeta({ title: 'Company create' });

    const loading = ref(false);

    const companyData = reactive(
        {
            name: null,
            identification: null,
            email: null,
            address: null,
            phone: null,
            logo: null,
            web: null,
            settings: {
                user_tracking: null,
                password_tracking: null,
                user_api_hash: null,
                user_api_devices: false,
                sync_time: null,
                email_host: null,
                email_port: null,
                email_username: null,
                email_password: null,
                email_encryption: null,
                email_from_address: null,
                email_from_name: null,
                email_subject: null,
                email_message: null,
                whatsapp_token: null,
                whatsapp_sender: null,
                whatsapp_message: null,
                whatsapp_template: null,
                whatsapp_version: "v16.0"
            }
        }
    );

    const createCompany = async () => {
        loading.value = true;
        try {
            const response = await api.post(`sass/v1/companies`, companyData);

            loading.value = false;
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Create...',
                padding: '2em',
                customClass: 'sweet-alerts',
            }).then(() => {
                router.push({name: 'companies'});
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
    };



</script>
