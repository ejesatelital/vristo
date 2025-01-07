<template>
    <div>
        <div class="panel p-5 mt-5">
            <h6 class="text-2xl font-bold">{{ $t('new_payment') }}</h6>

            <form @submit.prevent="save">
                <p class="my-2">Ingresa los detalles generales asociados al pago.</p>
                <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:flex-1" >
                    <div>
                        <label for="billingDate">Fecha *</label>
                        <flat-pickr v-model="params.payment_date" class="form-input" :config="basic" readonly></flat-pickr>
                    </div>
                </div>

                <!-- <div class="mb-5">
                    <h5 class="font-semibold text-lg mb-4">Añade el metodo de pago</h5>
                </div> -->

                <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="reciever-reference" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('reference') }} *</label>
                        <input  id="reciever-reference" type="text" name="reciever-reference" class="form-input flex-1" v-model="params.transaction_id" placeholder="Enter transaction ID" required/>
                    </div>
                    <div>
                        <label for="reciever-total" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('total') }} *</label>
                        <input  id="reciever-total" class="form-input flex-1" type="text" name="reciever-total" v-model="params.amount_paid" placeholder="Enter total" required/>
                    </div>

                </div>

                <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="payment-method">Accept Payment Via *</label>
                        <select id="payment-method" name="payment-method" class="form-select" v-model="params.gangway" required>
                            <option value="">Select Payment</option>
                            <option value="bank">Bank Account</option>
                            <option value="wompi">Wompi</option>
                            <option value="cash">Cash</option>
                        </select>
                    </div>

                    <div>
                        <label for="currency">Currency *</label>
                        <select id="currency" name="currency" class="form-select" v-model="params.currency" required>
                            <template v-for="(currency, i) in currencyList" :key="i">
                                <option :value="currency">{{ currency }}</option>
                            </template>
                        </select>
                    </div>
                </div>

                <div>
                    <label for="file" class="text-xl text-bold">Adjuntar archivos</label>
                    <file-uploader
                        id="my-file-uploader"
                        ref="fileUploaderRef"
                        v-model="params.data.attachments"
                        :multiple="true"
                        :accept="'image/*,.pdf,.xls,.xlsx,.txt,.doc,.docx'"
                        />
                </div>

                <div class="mt-4">
                    <label for="description">Notes</label>
                    <textarea id="description" name="description" class="form-textarea min-h-[100px]" placeholder="Notes...." v-model="params.description"></textarea>
                </div>

                <p class="text-dark">Los campos marcados con <span class="text-primary font-semibold text-2xl">*</span> son obligatorios.</p>

                <div class="flex justify-end items-center mt-4">
                    <!-- <button type="button" class="btn btn-outline-danger">Cancelar</button> -->
                    <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">{{ $t('save') }}</button>
                </div>
            </form>

        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { useCompanyStore } from '@/stores/company-store';
    import { useUserStore } from '@/stores/user-store';
    import { API } from '@/services/local';
    import { NOTIFY } from '@/services/notify';
    import { useRouter, useRoute } from 'vue-router';
    import FileUploader from "@/components/partials/FileUploader.vue";

    import moment from 'moment';
    // flatpickr
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    useMeta({ title: 'Nuevo pedido' });
    const router = useRouter();
    const route = useRoute();
    const companyStore = useCompanyStore();
    const userStore = useUserStore();
    const api = new API();
    const notify = new NOTIFY();
    // Fecha inicial usando Moment.js
    const basic: any = ref({
        dateFormat: 'Y-m-d',
        position:'auto right',
    });
    const props = defineProps({
        orderId: {
            type: Number,
            required: false,
            default: null
        },
    })
    const params = ref({
        id: null,
        amount_paid:null,
        status:null,
        payment_date:moment().format('YYYY-MM-DD'),
        currency:'COP - Peso colombiano',
        merchant_public_key:null,
        gangway:'',
        transaction_id:null,
        order_id:props.orderId,
        user_id:userStore.id,
        description:null,
        data:{
            attachments: <any>[],
        }
    });

    const loading = ref(false);

    const currencyList = ref([
        'COP - Peso colombiano',
        'USD - US Dollar',
        'EUR - Germany (Euro)',
    ]);

    const save = async () =>
    {
        loading.value = true;
        try {
            const isConfirmed = await notify.showConfirm(
                'Confirmar Envío',
                '¿Guardar registro?',
                'question',
                'Sí, enviar',
                'Cancelar'
            );
            if (isConfirmed) {
                console.log(params.value);
                await api.post('/subscriptions/v1/payments', params.value, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                // router.push({ name: 'payments' });
                notify.showToast('Registro guardado correctamente!', 'success');
            } else {
                notify.showToast('Operación cancelada', 'info');
            }
        } catch (error) {
            console.error(error);
            notify.showToast('Error al guardar el registro!', 'error');

        } finally {
            loading.value = false;
        }

    }

</script>
