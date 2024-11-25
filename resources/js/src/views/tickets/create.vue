<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{ name: 'dashboard' }" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'tickets'}" class="text-primary hover:underline">
                    <span>{{ $t('tickets') }}</span>
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{{ $t('create') }}</span>
            </li>
        </ul>

        <div class="panel">
            <div class="p-4 flex items-center">
                <h4 class="text-2xl text-gray-600 dark:text-gray-400 font-medium font-semibold">Crear un nuevo ticket</h4>

                <router-link class="ltr:ml-auto rtl:mr-auto hover:text-primary" :to="{name:'tickets'}" @click="toggleMobileMenu">
                    <div class="flex items-center">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5 rtl:rotate-180"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                    </div>
                </router-link>
            </div>
            <div class="h-px bg-gradient-to-l from-indigo-900/20 via-black dark:via-white to-indigo-900/20 opacity-[0.1]"></div>
            <form class="p-6 grid gap-6" @submit.prevent="saveTicket">
                <div>
                    <label for="subject">Título</label>
                    <input id="subject" type="text" placeholder="Ingrese un título" class="form-input" v-model="ticketData.subject" />
                </div>

                <div class="flex-1">
                    <label for="priority">Prioridad</label>
                    <select id="priority" class="form-select" v-model="ticketData.priority">
                        <option value="1">Bajo</option>
                        <option value="2">Medio</option>
                        <option value="3">Alto</option>
                        <option value="4">Urgente</option>
                    </select>
                </div>

                <div class="flex-1">
                    <Select
                        :options="roles"
                        v-model="rolSelected"
                        titleSelect="Area"
                        name="roles"
                        @update:modelValue="getUsersByRol"
                    />
                </div>

                <div class="flex-1">
                    <Select
                        :options="usersByRol"
                        v-model="userByRolSelected"
                        titleSelect="Colaboradores"
                        name="usersByRol"
                    />
                </div>

                <div class="h-fit">
                    <label for="message">Descripción del caso</label>
                    <quillEditor
                        id="message"
                        ref="editor"
                        v-model:value="ticketData.message.description"
                        :options="editorOptions"
                        style="min-height: 200px"
                        @ready="quillEditorReady($event)"
                    ></quillEditor>
                </div>
                <div>
                    <label for="file">Adjuntar archivos</label>
                    <input
                        id="file"
                        type="file"
                        class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                        multiple
                        accept="image/*,.zip,.pdf,.xls,.xlsx,.txt.doc,.docx"
                        @change="handleFileChange"
                    />
                </div>

                <div class="flex items-center ltr:ml-auto rtl:mr-auto mt-8">
                    <button type="submit" class="btn btn-success ltr:mr-3 rtl:ml-3" :disabled="loading">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted, reactive} from 'vue';
    import { NOTIFY } from '@/services/notify';
    import { useRouter } from 'vue-router';
    import { quillEditor, Quill } from 'vue3-quill';
    import 'vue3-quill/lib/vue3-quill.css';
    import {useUserStore} from "../../stores/user-store";
    import { API } from '@/services/api';
    import Select from '@/components/partials/Select.vue';

    const api = new API();

    const loading = ref(false);
    const roles = ref();
    const usersByRol = ref();
    const rolSelected = ref();
    const userByRolSelected = ref();

    const userStore = useUserStore();
    const editorOptions = ref({
        modules: {
            toolbar: [
                        ['bold', 'italic', 'underline', 'strike', 'link', 'image'],
                        [{ indent: '+1' }, { indent: '-1' }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ color: [] }, { background: [] }],
                        [{ font: [] }],
                        [{ align: [] }],
                        ['clean'],
                    ],
        },
        placeholder: 'Escribe aquí...',
    });
    const quillEditorObj: any = ref(null);

    const notify = new NOTIFY();

    const defaultData = ref({
        id: null,
        subject: null,
        message: {
            description: null,
            attachments: []
        },
        code: 1,
        status: 1,
        priority: 1,
        assigned_id: null,
        user_id: userStore.id,
        rol_id: null,
        data: {
            navigator:null,
            ip_address:null,
            operating_system :null
        },
    });

    const ticketData: any = ref(defaultData.value);
    const router = useRouter();

    const params = reactive({
        current_page: 1,
        pagesize: 10,
        column_filters: [],
        sort_column: 'id',
        sort_direction: 'desc',
        search: null,
        status:[1,2,3],
        user_id: null
    });


    // Función para manejar la selección de archivos
    const handleFileChange = (event) => {
        ticketData.value.message.attachments = event.target.files;
    };

    const saveTicket = async (id: any) => {
        if (!ticketData.value.subject) {
            notify.showToast('Debes asignar un título al caso.', 'warning');
            return false;
        }

        if (!ticketData.value.priority) {
            notify.showToast('Debes asignar una prioridad del caso.', 'warning');
            return false;
        }

        if (!rolSelected.value) {
            notify.showToast('Debes asignar un área al caso.', 'warning');
            return false;
        }

        if (!ticketData.value.message?.description || ticketData.value.message.description.trim() === '') {
            notify.showToast('Debes agregar una descripción al caso.', 'warning');
            return false;
        }

        loading.value = true;

        const { browser, os } = getBrowserInfo();
        const ipAddress = await getIpAddress();

        let obj: any = {
            subject: ticketData.value.subject,
            message: {
                description: ticketData.value.message.description
            },
            code: 1,
            status: ticketData.value.status,
            priority: ticketData.value.priority,
            rol_id: rolSelected.value.value,
            assigned_id: userByRolSelected.value?.value || null,
            user_id: userStore.id,
            data: {
                navigator: browser,
                ip_address: ipAddress,
                operating_system: os
            },
            file: ticketData.value.message.attachments || []
        };

        try {
            const isConfirmed = await notify.showConfirm(
                'Confirmar Envío',
                '¿Estás seguro de que deseas asignar este caso?',
                'question',
                'Sí, enviar',
                'Cancelar'
            );
            if (isConfirmed) {
                await api.post(`tickets/v1/tickets`, obj, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                router.push({ name: 'tickets' });
                notify.showToast('Ticket creado exitosamente', 'success');
            } else {
                notify.showToast('Operación cancelada', 'info');
            }
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            loading.value = false;
        }

    };


    const quillEditorReady = (quill: any) => {
        quillEditorObj.value = quill;
    };

    const getIpAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return null;
        }
    };

    const getBrowserInfo = () => {
        const userAgent = navigator.userAgent;
        let browser = 'Unknown';
        let os = 'Unknown';

        // Detectar el navegador
        if (userAgent.indexOf('Firefox') > -1) {
            browser = 'Mozilla Firefox';
        } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
            browser = 'Opera';
        } else if (userAgent.indexOf('Chrome') > -1) {
            browser = 'Google Chrome';
        } else if (userAgent.indexOf('Safari') > -1) {
            browser = 'Safari';
        } else if (userAgent.indexOf('MSIE') > -1 || !!document.documentMode === true) {
            browser = 'Internet Explorer';
        }

        // Detectar el sistema operativo
        if (userAgent.indexOf('Win') > -1) {
            os = 'Windows';
        } else if (userAgent.indexOf('Mac') > -1) {
            os = 'MacOS';
        } else if (userAgent.indexOf('Linux') > -1) {
            os = 'Linux';
        } else if (userAgent.indexOf('Android') > -1) {
            os = 'Android';
        } else if (userAgent.indexOf('like Mac') > -1) {
            os = 'iOS';
        }

        return { browser, os };
    };

    const getRoles = async () =>
    {
        const response = await api.get(`user/roles`);
        if (response) {
            roles.value = response.data
            // .filter((x: any) => x.id >= 5 && x.id <= 9)
            .map(function (x: any) {
                return {
                    label: x.name,
                    value: x.id
                }
            })
        }
    }

    // Función para obtener los tickets
    const getUsersByRol = async () => {
        try {
            userByRolSelected.value = null;
            const responseUsersByRol = await api.get(`user/users?page=${params.current_page}&per_page=${params.pagesize}&roles=[${rolSelected.value.value}]`);
            if (responseUsersByRol) {
                usersByRol.value = responseUsersByRol.data
                // .filter((x: any) => x.id >= 5 && x.id <= 9)
                .map(function (x: any) {
                    return {
                        label: x.first_name+' '+x.last_name,
                        value: x.id
                    }
                })
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    // Lógica que corre cuando el componente es montado
    onMounted(async () => {
       await getRoles();
    });
</script>

<style>
    .quill-editor {
        max-height: 200px;
        overflow-y: auto;
    }

    .quill-editor img {
        width: 15%;
    }
</style>
