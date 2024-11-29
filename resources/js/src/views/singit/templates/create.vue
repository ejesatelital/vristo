<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{ name: 'dashboard' }" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'templates'}" class="text-primary hover:underline">
                    <span>{{ $t('templates') }}</span>
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{{ $t('create') }}</span>
            </li>
        </ul>
        <!-- Line -->
        <div class="panel">
            <TabGroup as="div" class="mb-5">
                <TabList class="flex flex-wrap mt-3 mb-5 border-b border-white-light dark:border-[#191e3a]">
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="p-5 py-3 -mb-[1px] flex items-center hover:border-b border-transparent hover:!border-secondary hover:text-secondary !outline-none transition duration-300"
                            :class="{ 'border-b !border-secondary text-secondary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.9426 1.25L13.5 1.25C13.9142 1.25 14.25 1.58579 14.25 2C14.25 2.41421 13.9142 2.75 13.5 2.75H12C9.62177 2.75 7.91356 2.75159 6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09825 18.6648 3.42514 19.4355 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.5749 19.4355 20.9018 18.6648 21.0736 17.3864C21.2484 16.0864 21.25 14.3782 21.25 12V10.5C21.25 10.0858 21.5858 9.75 22 9.75C22.4142 9.75 22.75 10.0858 22.75 10.5V12.0574C22.75 14.3658 22.75 16.1748 22.5603 17.5863C22.366 19.031 21.9607 20.1711 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.03933 20.1711 1.63399 19.031 1.43975 17.5863C1.24998 16.1748 1.24999 14.3658 1.25 12.0574V11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25ZM16.7705 2.27592C18.1384 0.908029 20.3562 0.908029 21.7241 2.27592C23.092 3.6438 23.092 5.86158 21.7241 7.22947L15.076 13.8776C14.7047 14.2489 14.4721 14.4815 14.2126 14.684C13.9069 14.9224 13.5761 15.1268 13.2261 15.2936C12.929 15.4352 12.6169 15.5392 12.1188 15.7052L9.21426 16.6734C8.67801 16.8521 8.0868 16.7126 7.68711 16.3129C7.28742 15.9132 7.14785 15.322 7.3266 14.7857L8.29477 11.8812C8.46079 11.3831 8.56479 11.071 8.7064 10.7739C8.87319 10.4239 9.07761 10.0931 9.31605 9.78742C9.51849 9.52787 9.7511 9.29529 10.1224 8.924L16.7705 2.27592ZM20.6634 3.33658C19.8813 2.55448 18.6133 2.55448 17.8312 3.33658L17.4546 3.7132C17.4773 3.80906 17.509 3.92327 17.5532 4.05066C17.6965 4.46372 17.9677 5.00771 18.48 5.51999C18.9923 6.03227 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.1909 6.52273 20.2868 6.54543L20.6634 6.16881C21.4455 5.38671 21.4455 4.11867 20.6634 3.33658ZM19.1051 7.72709C18.5892 7.50519 17.9882 7.14946 17.4193 6.58065C16.8505 6.01185 16.4948 5.41082 16.2729 4.89486L11.2175 9.95026C10.801 10.3668 10.6376 10.532 10.4988 10.7099C10.3274 10.9297 10.1804 11.1676 10.0605 11.4192C9.96337 11.623 9.88868 11.8429 9.7024 12.4017L9.27051 13.6974L10.3026 14.7295L11.5983 14.2976C12.1571 14.1113 12.377 14.0366 12.5808 13.9395C12.8324 13.8196 13.0703 13.6726 13.2901 13.5012C13.468 13.3624 13.6332 13.199 14.0497 12.7825L19.1051 7.72709Z"
                                    fill="currentColor" />
                            </svg>
                            {{ $t('designer') }}
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a href="javascript:;"
                            class="p-5 py-3 -mb-[1px] flex items-center hover:border-b border-transparent hover:!border-secondary hover:text-secondary !outline-none transition duration-300"
                            :class="{ 'border-b !border-secondary text-secondary': selected }">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:mr-2 rtl:ml-2">
                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                                <path opacity="0.5" d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" stroke-width="1.5"/>
                            </svg>
                            {{ $t('settings') }}
                        </a>
                    </Tab>

                </TabList>
                <TabPanels class="flex-1 text-sm">
                    <form class="p-4 grid"  @submit.prevent="saveTemplate">
                        <TabPanel>
                            <h4 class="font-semibold text-2xl mb-4">Diseña tu contrato</h4>

                            <div class="mb-4">
                                <label for="nametemplate" class="block text-sm font-medium">Nombre de la plantilla</label>
                                <input type="text" id="nametemplate" v-model="templateData.name" class="form-input mt-1 w-full" required />
                            </div>

                            <div class="mb-4" v-if="userStore.hasAccess('sass.companies.indexall')">
                                <Select
                                :options="companies"
                                v-model="companiesSelected"
                                :closeOnSelect="true"
                                titleSelect="Empresa"
                                name="companies"
                                :allow-empty="false"
                                />
                            </div>

                            <div class="h-fit mb-8">
                                <quillEditor id="message" ref="editor" v-model:value="templateData.description"
                                    :options="editorOptions" style="min-height: 300px"
                                    @ready="quillEditorReady($event)"></quillEditor>
                            </div>

                            <!-- <div class="output ql-snow my-2">
                                <div v-html="templateData.description"></div>
                            </div> -->

                        </TabPanel>
                        <TabPanel>
                            <h4 class="font-semibold text-2xl mb-4">Agregar opciones</h4>
                            <div class="mb-4">
                                <div class="space-y-2">
                                    <div>
                                        <label class="inline-flex">
                                            <input type="checkbox" v-model="templateData.settings[0].document_photo" class="form-checkbox outline-primary"  />
                                            <span>Foto documento de identidad.</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label class="inline-flex">
                                            <input type="checkbox" v-model="templateData.settings[0].attachments" class="form-checkbox outline-primary" />
                                            <span>Anexar documentos.</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label class="inline-flex">
                                            <input type="checkbox" v-model="templateData.settings[0].signature" class="form-checkbox outline-primary" />
                                            <span>Firmar.</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center ltr:ml-auto rtl:mr-auto mt-4">
                                <button type="submit" class="btn btn-outline-success ltr:mr-3 rtl:ml-3"
                                :disabled="loading">Guardar plantilla</button>
                            </div>

                        </TabPanel>
                    </form>
                </TabPanels>
            </TabGroup>
        </div>

        <!-- add project modal -->
        <TransitionRoot appear :show="isResponsibleModal" as="template">
            <Dialog as="div" @close="closeResponsibleModal()" class="relative z-[51]">
                <TransitionChild
                as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center px-4 py-8">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="panel border-0 p-0 w-full max-w-lg text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="closeResponsibleModal()"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="w-6 h-6"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                                <div class="text-lg rounded-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                   Agregar Variable
                                </div>
                                <div class="p-5">
                                    <form @submit.prevent="addVariable">
                                        <div class="mb-4">
                                            <label for="label" class="block text-sm font-medium">Etiqueta del campo<strong>*</strong></label>
                                            <input type="text" id="label" v-model="variableForm.label" @input="validateName" class="form-input mt-1 w-full" required />
                                        </div>
                                        <div class="mb-4">
                                            <label for="type" class="block text-sm font-medium">Tipo del campo <strong>*</strong></label>
                                            <select id="type" v-model="variableForm.type" class="form-input mt-1 w-full" required>
                                                <option value="text">Texto</option>
                                                <option value="number">Número</option>
                                                <option value="date">Fecha</option>
                                                <option value="email">Email</option>
                                            </select>
                                        </div>
                                        <div class="mb-4">
                                            <label for="name" class="block text-sm font-medium">Nombre de la variable</label>
                                            <input type="text" id="name" v-model="variableForm.name" class="form-input mt-1 w-full" readonly />
                                        </div>

                                        <div class="flex justify-end items-center mt-8">
                                            <button type="button" class="btn btn-outline-danger" @click="closeResponsibleModal()">Cancelar</button>
                                            <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel, TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';

    import { useAppStore } from '@/stores/index';
    import { useUserStore } from "@/stores/user-store";
    import { useMeta } from '@/composables/use-meta';
    import { quillEditor, Quill } from 'vue3-quill';
    import 'vue3-quill/lib/vue3-quill.css';
    import { API } from '@/services/local';
    import { NOTIFY } from '@/services/notify';
    import Select from '@/components/partials/Select.vue';
    import slugify from "slugify";
    import { useCompanyStore } from '@/stores/company-store';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const companyStore = useCompanyStore();
    const companies: any = ref(companyStore.companyOptions);
    const companiesSelected = ref();

    useMeta({ title: 'Templates' });

    const store = useAppStore();
    const userStore = useUserStore();
    const api = new API();
    const notify = new NOTIFY();

    const loading = ref(false);

    const defaultData = ref({
        id: null,
        name: null,
        description: '',
        user_id: userStore.id,
        status: null,
        company_id: null,
        settings: [{
            document_photo:false,
            attachments: false,
            signature: true,
        }],
        attributes: [],
    });

    const templateData: any = ref(defaultData.value);
    const cursorPosition: any = ref(null);

    const quillEditorObj: any = ref([]);
    const editorOptions = ref({
        modules: {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike', 'link'],
                    [{ indent: '+1' }, { indent: '-1' }],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ align: [] }],
                    ['clean'],
                    ['showInsertVariable'], // Botón personalizado
                ],
                handlers: {
                    showInsertVariable() {
                        // Obtener la posición actual del cursor
                        cursorPosition.value = quillEditorObj.value.getSelection()?.index;
                        isResponsibleModal.value = true;
                    }
                }

            }
        },
        placeholder: 'Escribe aquí...',
        _content: '',
    });

    const quillEditorReady = (quill: any) => {
        quillEditorObj.value = quill;

        // Escuchar cambios en el contenido
        quill.on('text-change', validateVariables);
    };
    const isResponsibleModal = ref(false);

    const variableForm = reactive({
        label: '',
        type: 'text',
        name: ''
    });

    // Validar el campo `name` y generar slug
    const validateName = () => {
        // Generar el slug automáticamente
        variableForm.name = slugify(variableForm.label, {
            replacement: '_', // replace spaces with replacement character, defaults is `-`
            lower: true, // Convierte a minúsculas
            strict: true, // Elimina caracteres especiales
        });
    };

    const attributes = ref<Array<{ name: string; type: string; label: string }>>([]);

    // Lógica para guardar el formulario
    const saveTemplate = async () => {
        loading.value = true;
        if (!templateData.value.name) {
            notify.showToast('Debes llenar el campo de etiqueta del campo!', 'warning');
            loading.value = false;
            return false;
        }

        if (companiesSelected.value === null || companiesSelected.value === undefined) {
            notify.showToast('Debes seleccionar una empresa!', 'warning');
            loading.value = false;
            return false;
        }

        templateData.value.company_id = companiesSelected.value.value;
        templateData.value.attributes = attributes.value;

        try {
            const isConfirmed = await notify.showConfirm(
                'Confirmar Envío',
                '¿Guardar registro?',
                'question',
                'Sí, enviar',
                'Cancelar'
            );
            if (isConfirmed) {
                await api.post('/singit/v1/templates', templateData.value);
                router.push({ name: 'templates' });
                notify.showToast('Template guardado correctamente!', 'success');
            } else {
                notify.showToast('Operación cancelada', 'info');
            }
        } catch (error) {
            console.error(error);
            notify.showToast('Error al guardar el template!', 'error');

        } finally {
            loading.value = false;
        }

    };

    // Cerrar el modal
    const closeResponsibleModal = () => {
        isResponsibleModal.value = false;
        cursorPosition.value = null;
        resetVariableForm();
    };

    // Resetear el formulario del modal
    const resetVariableForm = () => {
        variableForm.label = '';
        variableForm.type = "text";
        variableForm.name = '';
    };

    // Agregar una nueva variable
    const addVariable = () => {
        const variableText = `{{${variableForm.label}}}`;

        if (cursorPosition.value === null || cursorPosition.value === undefined) {
            // Si no hay un cursor activo, insertar al final del contenido
            const contentLength = quillEditorObj.value.getLength(); // Longitud total del contenido
            quillEditorObj.value.insertText(contentLength - 1, variableText); // Insertar al final
            quillEditorObj.value.setSelection(contentLength + variableText.length - 1); // Ajustar el cursor al final
        } else {
            // Insertar en la posición del cursor actual
            quillEditorObj.value.insertText(cursorPosition.value, variableText);
            quillEditorObj.value.setSelection(cursorPosition.value + variableText.length); // Ajustar el cursor al final de la variable
        }

        // Cerrar el modal
        closeResponsibleModal();
    };

    const validateVariables = () => {
        // Obtener el contenido actual del editor
        const editorContent = quillEditorObj.value.getText();

        // Buscar todas las variables en el contenido (usando una expresión regular)
        const currentVariables = editorContent.match(/{{\s*[^{}]+\s*}}/g) || [];

        // Extraer solo los nombres de las variables sin las llaves {{ }}
        const variableNames = currentVariables.map((v) => v.replace(/{{\s*|\s*}}/g, '').trim());

        // Eliminar del JSON las variables que ya no están en el contenido del editor
        attributes.value = attributes.value.filter((attr) => variableNames.includes(attr.label));

        // Añadir al JSON las variables que están en el editor pero no en el arreglo `attributes`
        for (const variableName of variableNames) {
            const existsInAttributes = attributes.value.some((attr) => attr.label === variableName);
            if (!existsInAttributes) {
                // Si no existe, se añade con un tipo y etiqueta predeterminados
                // Generar slug para la nueva variable
                const generatedName = slugify(variableName, {
                    replacement: '_', // Reemplazar espacios por "_"
                    lower: true, // Convertir a minúsculas
                    strict: true, // Eliminar caracteres especiales
                });
                // Guardar la variable en la lista de atributos
                attributes.value.push({
                    label: variableForm.label || variableName,
                    name: generatedName,
                    type: variableForm.type || 'text'
                });

            }
        }
    };


    // Lógica que corre cuando el componente es montado
    onMounted(async () => {

    });

</script>

<style>
    .ql-editor {
        max-height: 400px !important;
        overflow-y: auto !important;
    }

    .quill-editor img {
        width: 15%;
    }

    .ql-toolbar .ql-showInsertVariable {
        display: inline-flex; /* Permite flexibilidad en el contenido */
        align-items: center; /* Centra verticalmente el contenido */
        justify-content: center; /* Centra horizontalmente */
        padding: 4px 10px; /* Espaciado interno */
        min-width: 100px; /* Define un ancho mínimo */
        max-width: auto; /* Permite que crezca según el contenido */
        height: 36px; /* Igual a la altura de otros botones */
        text-align: center; /* Asegura que el texto esté centrado */
        font-size: 14px; /* Tamaño del texto */
        white-space: nowrap; /* Evita que el texto se rompa en dos líneas */
    }

    .ql-toolbar .ql-showInsertVariable::before {
        content: 'Agregar Variable 📌';
        font-size: 14px;
        color: #333; /* Color del texto */
        margin: 0; /* Elimina márgenes adicionales */
    }
</style>
