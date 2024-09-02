<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'subscriptions'}" class="text-primary hover:underline">
                    Suscripciones
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Nueva suscripción</span>
            </li>
        </ul>

        <div class="panel pb-1.5 mt-6">
            <form @submit.prevent="createSubscription">
                <div class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                    <h6 class="text-lg font-bold mb-5">Ingresar nueva suscripción</h6>

                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div class="col-span-2">
                            <Select
                            :options="companies"
                            v-model="companiesSelected"
                            required
                            :closeOnSelect="true"
                            titleSelect="Companies"
                            name="companies"
                            />
                        </div>
                        <div class="col-span-2">
                            <Select
                            :options="applications"
                            v-model="applicationsSelected"
                            required
                            :closeOnSelect="false"
                            titleSelect="Applications"
                            :multiple="true"
                            value="id"
                            label="name"
                            />
                        </div>
                        <div>
                            <label for="phone">Fecha de inicio *</label>
                            <input id="phone" type="date" v-model="subscriptionData.start_date"
                                class="form-input" required />
                        </div>
                        <div>
                            <label for="email">Fecha de finalización</label>
                            <input id="email" type="date" v-model="subscriptionData.end_date"
                                class="form-input" />
                        </div>
                        <div>
                            <label for="value">Valor suscripción</label>
                            <input id="value" type="number" v-model="subscriptionData.value"
                            placeholder="Ingresa el valor de la mensualidad a pagar"
                            class="form-input" required />
                        </div>
                        <div class="col-span-2">
                            <label for="description">Descripción</label>
                            <textarea
                                id="address"
                                rows="3"
                                placeholder="Ingresa una descripción"
                                class="form-textarea resize-none min-h-[100px]"
                                v-model="subscriptionData.description"
                            ></textarea>
                        </div>
                        <div>
                            <label for="">Renovación automatica?</label>
                            <label class="inline-flex">
                                <input type="checkbox" v-model="subscriptionData.renewal"
                                    class="form-checkbox rounded-full peer" />
                                <span
                                    :class="subscriptionData.renewal ? 'text-success' : 'text-danger'"
                                    class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0 text-center">
                                    {{ subscriptionData.renewal ? 'Activo' : 'Inactivo' }}
                                </span>
                            </label>
                        </div>

                    </div>
                </div>
                <div class="flex flex-wrap justify-end gap-2 mt-5">
                    <button type="submit" class="btn btn-primary" :disabled="loading">Save</button>
                </div>
            </form>
        </div>

    </div>
</template>
<script lang="ts" setup>

    import { ref, reactive, watch, onMounted } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { useMeta } from '@/composables/use-meta';
    import { API } from '@/services/api';
    import {useCompanyStore} from "../../stores/company-store";
    import Select from '@/components/partials/Select.vue';
    import { NOTIFY } from '@/services/notify';
    import { useRouter } from 'vue-router';

    useMeta({ title: 'Subscription create' });
    const router = useRouter();
    const notify = new NOTIFY();
    const companyStore = useCompanyStore();
    const api = new API();
    const loading = ref(false);

    const subscriptionData = reactive(
        {
            company_id:null,
            description:null,
            start_date:null,
            end_date:null,
            status:null,
            renewal:0,
            value:null,
            applications:[]
        }
    );
    const companies: any = ref(companyStore.companyOptions);
    const companiesSelected = ref();

    const createSubscription = async () => {
        loading.value = true;
        subscriptionData.company_id = companiesSelected.value.value;
        Object.assign(subscriptionData.applications, applicationsIds.value);
        try {
            const response = await api.post(`subscriptions/v1/subscriptions`, subscriptionData);

            loading.value = false;
            notify.showToast('Registro editado exitosamente', 'Success').then(
                router.push({ name: 'subscriptions' })
            );
        } catch (error) {
            notify.showAlert('Error obteniendo los datos:'+ error.response, 'error');
            loading.value = false;
        }
    };

    const applications = ref();
    let applicationsIds: any = ref([]);
    interface Application {
        id: number;
        name: string;
    }

    const applicationsSelected = ref<Application[]>([]);
    watch(applicationsSelected, (newSelection: Application[]) => {
        applicationsIds.value = newSelection.map((option: Application) => option.id);
    });

    const getApplications = async () =>
    {
        try {
            const response = await api.get(`subscriptions/v1/applications`);
            if (response) {
                applications.value = response.data
            }
            else {
                throw new Error('Hubo un problema al obtener la lista de applications desde el API.');
            }
        } catch (error) {
            notify.showAlert('Error obteniendo las aplicaciones:'+ error.response, 'error');
        }
    }

    onMounted(async () => {
       await getApplications();
    });
</script>
