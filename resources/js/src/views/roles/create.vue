<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link to="/user/roles" class="text-primary hover:underline">
                    Roles
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Edit</span>
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
                            Rol
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
                            Permisos
                        </a>
                    </Tab>

                </TabList>

                <TabPanels>

                    <form @submit.prevent="createRol">
                    <TabPanel>
                        <div>
                                <div class="panel pb-1.5 mt-6">
                                    <div
                                        class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                                        <h6 class="text-lg font-bold mb-5">Información General</h6>

                                        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label for="name">Nombre del rol *</label>
                                                <input id="name" type="text" placeholder="Nombre del rol"
                                                    class="form-input" v-model="rolData.name" required />
                                            </div>
                                            <div>
                                                <label for="slug">Url amigable del rol *</label>
                                                <input id="slug" type="text" placeholder="Url amigable del rol"
                                                    class="form-input" v-model="rolData.slug" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-wrap justify-end gap-2 my-5">
                                        <button type="submit" class="btn btn-primary" :disabled="loading">Guardar</button>
                                    </div>
                                </div>

                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div class="panel pb-1.5">
                            <Permission :rolData="rolData"/>
                            <div class="flex flex-wrap justify-end gap-2 my-5">
                                <button type="submit" class="btn btn-primary" :disabled="loading">Guardar</button>
                            </div>
                        </div>
                    </TabPanel>
                    </form>

                </TabPanels>
            </TabGroup>
        </div>
    </div>
</template>
<script lang="ts" setup>

    import { ref, reactive } from 'vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

    import { useI18n } from 'vue-i18n';
    import { useMeta } from '@/composables/use-meta';
    import { useRoute, useRouter } from 'vue-router';
    import Swal from 'sweetalert2';
    import Permission from './partials/Permission.vue';
    import { API } from '@/services/api';

    const api = new API();

    const route = useRoute();
    const router = useRouter();

    useMeta({ title: 'Nuevo Rol' });

    const loading = ref(false);

    const rolData = reactive(
        {
            name: '',
            slug: '',
            permissions: {}
        }
    );

    const createRol = async () => {
        loading.value = true;

        const jsonData = {attributes: rolData};

        try {
            const response = await api.post(`/user/roles`, rolData);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Updating...',
                padding: '2em',
                customClass: 'sweet-alerts',
            })
            .then(() => {
                router.push('/user/roles');
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
        } finally {
            loading.value = false;
        }
    }

</script>
