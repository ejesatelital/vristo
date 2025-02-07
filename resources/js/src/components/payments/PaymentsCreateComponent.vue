<template>
    <div class="panel p-5">
        <p class="my-2">Ingresa los detalles generales asociados al pago.</p>
        <form @submit.prevent="save">
            <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:flex-1" >
                <div>
                    <label for="billingDate">{{ $t('date') }} *</label>
                    <flat-pickr v-model="params.payment_date" class="form-input" :config="basic" readonly></flat-pickr>
                </div>
            </div>

            <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="reciever-reference" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('reference') }} *</label>
                    <input  id="reciever-reference" type="text" name="reciever-reference" class="form-input flex-1" v-model="params.transaction_id" :placeholder="$t('reference')" required/>
                </div>
                <div>
                    <label for="reciever-total" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('total') }} *</label>
                    <input  id="reciever-total" class="form-input flex-1" type="text" name="reciever-total" v-model="params.amount_paid" :placeholder="$t('total')" required/>
                </div>

            </div>

            <div class="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="payment-method">{{ $t('payment_via') }} *</label>
                    <select id="payment-method" name="payment-method" class="form-select" v-model="params.gangway" required>
                        <option value="">{{ $t('payment_via') }}</option>
                        <option value="bank">{{ $t('bank_account') }}</option>
                        <option value="wompi">{{ $t('wompi') }}</option>
                        <option value="cash">{{ $t('cash') }}</option>
                    </select>
                </div>

                <div>
                    <label for="currency">{{ $t('currency') }} *</label>
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
                <label for="description">{{ $t('notes') }}</label>
                <textarea id="description" name="description" class="form-textarea min-h-[100px]" :placeholder="$t('notes')" v-model="params.description"></textarea>
            </div>

            <p class="text-dark">Los campos marcados con <span class="text-primary font-semibold text-2xl">*</span> son obligatorios.</p>

            <div class="flex justify-end items-center mt-4">
                <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">{{ $t('save') }}</button>
            </div>
        </form>

    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
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
        total: {
            type: Number,
            required: false,
            default: null
        },
    })
    const params = ref({
        id: null,
        amount_paid:props.total,
        status:null,
        payment_date:moment().format('YYYY-MM-DD'),
        currency:'COP',
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
        'COP',
        'USD',
        'EUR',
    ]);

    const emit = defineEmits(['close-modal']);

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
                await api.post('/subscriptions/v1/payments', params.value, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                emit("close-modal");
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
