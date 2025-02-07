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
                <span>Actualizar suscripción</span>
            </li>
        </ul>

        <div class="panel pb-1.5 mt-6">
            <form @submit.prevent="editSubscription">
                <div class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-2 bg-white dark:bg-[#0e1726]">
                    <h6 class="text-lg font-bold mb-5">Actualizar suscripción</h6>
                    <div class="grid grid-cols-1 sm:grid-cols-2 my-2 gap-4">
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
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 my-2 gap-4">
                        <div>
                            <label for="value">Valor suscripción</label>
                            <input id="value" type="number" v-model="subscriptionData.value"
                            placeholder="Valor de la mensualidad a pagar"
                            class="form-input" required />
                        </div>
                        <div>
                            <label for="type_discount">Descuento</label>
                            <div class="flex-1 sm:flex-row flex-col">
                                <div class="flex gap-4">
                                    <div class="mb-1">
                                        <label class="inline-flex mt-1 cursor-pointer">
                                            <input type="radio" name="type_discount" class="form-radio" value="1" v-model="subscriptionData.type_discount" />
                                            <span class="text-white-dark">Porcentual</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label class="inline-flex mt-1 cursor-pointer">
                                            <input type="radio" name="type_discount" class="form-radio" value="2" v-model="subscriptionData.type_discount" />
                                            <span class="text-white-dark">Valor</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 my-2 gap-4">
                        <div>
                            <label for="value">Valor descuento</label>
                            <div class="flex">
                                <div
                                    class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-2 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                    {{ subscriptionData.type_discount == 1 ? '%' : '$' }}
                                </div>
                                <input type="number"
                                    placeholder="Ingresa el descuento"
                                    v-model="subscriptionData.discount" min="0"
                                    :max="subscriptionData.type_discount == 1 ? 100 : null"
                                    class="form-input w-32 ltr:rounded-l-none rtl:rounded-r-none flex-1" />
                            </div>
                        </div>
                        <div>
                            <label for="value">Duración del descuento</label>
                            <input id="value" type="number" min="0" step="1" v-model="subscriptionData.period"
                            placeholder="Ingrese la cantidad de periodos"
                            class="form-input" required />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 my-2 gap-4">
                        <div class="font-semibold">
                            <label for="value">Valor bruto</label>
                            ${{ subscriptionData.value }}
                        </div>
                        <div class="font-semibold">
                            <label for="value">Con descuento</label>
                            ${{ calculateTotal(subscriptionData) }}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 my-2 gap-4">
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
                                    :checked="subscriptionData.renewal"
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
    import {useCompanyStore} from "@/stores/company-store";
    // import Select from '@/components/partials/Select.vue';
    import { NOTIFY } from '@/services/notify';
    import { useRouter, useRoute } from 'vue-router';
    useMeta({ title: 'Subscription create' });
    const router = useRouter();
    const route = useRoute();
    const notify = new NOTIFY();
    const companyStore = useCompanyStore();
    const api = new API();
    const loading = ref(false);

    const subscriptionData = reactive(
        {
            description:null,
            start_date:null,
            end_date:null,
            renewal:false,
            value:null,
            // applications:[]
            type_discount:2,
            discount:0,
            period:0,
        }
    );

    const editSubscription = async () => {
        loading.value = true;
        // Object.assign(subscriptionData.applications, applicationsIds.value);
        try {
            await api.put(`subscriptions/v1/subscriptions/${route.params.id}`, subscriptionData);
            loading.value = false;
            notify.showToast('Registro editado exitosamente', 'success');
            router.push({ name: 'subscriptions' })
        } catch (error) {
            notify.showAlert('Error!',  'No se pudo actualizar: '+ error.response, 'error');
            loading.value = false;
        }
    };

    // const applications = ref();
    // let applicationsIds: any = ref([]);
    // interface Application {
    //     id: number;
    //     name: string;
    // }

    // const applicationsSelected = ref<Application[]>([]);
    // watch(applicationsSelected, (newSelection: Application[]) => {
    //     applicationsIds.value = newSelection.map((option: Application) => option.id);
    // });

    // const getApplications = async () =>
    // {
    //     try {
    //         const response = await api.get(`subscriptions/v1/applications`);
    //         if (response) {
    //             applications.value = response.data
    //         }
    //         else {
    //             throw new Error('Hubo un problema al obtener la lista de applications desde el API.');
    //         }
    //     } catch (error) {
    //         console.error(error.response);
    //     }
    // }

    const getSubscription = async () =>
    {
        try {
            const response = await api.get(`subscriptions/v1/subscriptions/${route.params.id}`);
            const data = response.data;
            Object.assign(subscriptionData, {
                description:data.description,
                start_date:data.start_date,
                end_date:data.end_date,
                status:data.status,
                renewal:data.renewal,
                value:data.value,
                period:data.period,
                type_discount:data.type_discount,
                discount:data.discount
            });
                // applicationsSelected.value = data.application;
                // console.log(applicationsSelected);
        } catch (error) {
            loading.value = true;
            console.error(error.response);
        }
    }

    const calculateTotal = (item) => {
        let baseAmount = item.value;
        if (item.type_discount == 1) {
            baseAmount -= baseAmount * (item.discount / 100);
        } else {
            baseAmount -= item.discount; // Discount as a fixed amount
        }
        return baseAmount.toFixed(2);
    };

    onMounted(async () => {
    //    await getApplications();
       await getSubscription();

    });
</script>
