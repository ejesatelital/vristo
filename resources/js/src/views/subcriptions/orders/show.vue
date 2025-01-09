<template>
    <div>

        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <router-link :to="{name:'dashboard'}" class="text-primary hover:underline">
                    Escritorio
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <router-link :to="{name:'orders'}" class="text-primary hover:underline">
                    {{ $t('orders') }}
                </router-link>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>{{ $t('details') }}</span>
            </li>
        </ul>


        <!-- Current Statement -->
        <div class="panel overflow-hidden">
            <div class="flex items-center">
                <div>
                    <div class="text-lg font-bold">{{ $t('current_statement') }}</div>
                    <div class="text-danger" v-if="data?.status===1">Debe pagarse antes de {{ data?.due_date }}</div>
                </div>
            </div>
            <div class="relative mt-4">
                <div class="absolute -bottom-12 ltr:-right-12 rtl:-left-12 w-24 h-24">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="text-success opacity-20 w-24 h-full"
                    >
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M12 17V17.5V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M12 6V6.5V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>

                </div>

                <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div>
                        <div class="text-primary">{{ $t('subtotal') }}</div>
                        <div class="mt-2 font-semibold text-2xl">${{data?.subtotal}}</div>
                    </div>
                    <div>
                        <div class="text-primary">IVA</div>
                        <div class="mt-2 font-semibold text-2xl">${{data?.iva}}</div>
                    </div>
                    <div>
                        <div class="text-primary">{{ $t('discount') }}</div>
                        <div class="mt-2 font-semibold text-2xl">${{data?.discount}}</div>
                    </div>
                    <div>
                        <div class="text-primary">{{ $t('invoice_total') }}</div>
                        <div class="mt-2 font-semibold text-2xl">${{data?.total}}</div>
                    </div>
                    <div>
                        <div class="text-success">{{ $t('payment_total') }}</div>
                        <div class="mt-2 font-semibold text-2xl">${{data?.payment_total}}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel p-5 mt-4">
            <h6 class="text-lg font-bold">{{ $t('details') }}</h6>
            <div class="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                <div class="xl:1/3 lg:w-2/5 sm:w-1/2">
                    <div class="flex-1">
                        <div class="space-y-1 text-white-dark">
                            <div>{{ $t('bills_to') }}:</div>
                            <div class="text-black dark:text-white font-semibold">{{data?.payment_data?.name}}</div>
                            <div>{{data?.payment_data?.address}}</div>
                            <div>{{data?.payment_data?.email}}</div>
                            <div>{{data?.payment_data?.phone}}</div>
                        </div>
                    </div>
                </div>
                <div class="xl:1/3 lg:w-2/5 sm:w-1/2">
                    <div class="flex items-center w-full justify-between mb-2">
                        <div class="text-white-dark">{{ $t('order_id') }}:</div>
                        <div>#{{data?.id}}</div>
                    </div>
                    <div class="flex items-center w-full justify-between mb-2">
                        <div class="text-white-dark">{{ $t('issue_date') }}:</div>
                        <div>{{data?.start_date}}</div>
                    </div>
                    <div class="flex items-center w-full justify-between mb-2">
                        <div class="text-white-dark">{{ $t('due_date') }}:</div>
                        <div>{{data?.due_date}}</div>
                    </div>
                    <div class="flex items-center w-full justify-between">
                        <div class="text-white-dark">{{ $t('generated_by') }}:</div>
                        <div>{{data?.user.full_name}}</div>
                    </div>
                </div>
            </div>

            <div class="table-responsive mt-4">
                <table>
                    <thead>
                        <tr>
                            <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                            <th>{{ $t('sku') }}</th>
                            <th>{{ $t('name') }}</th>
                            <th>{{ $t('description') }}</th>
                            <th>{{ $t('quantity') }}</th>
                            <th>{{ $t('unit_value') }}</th>
                            <th>IVA</th>
                            <th>{{ $t('discount') }}</th>
                            <th>{{ $t('total') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Recorremos data.payments -->
                        <tr v-for="(item, i) in data?.items" :key="i">
                            <td class="font-semibold">{{ item.id }}</td>
                            <td class="whitespace-nowrap">{{ item.sku }}</td>
                            <td class="whitespace-nowrap">{{ item.name }}</td>
                            <td class="whitespace-nowrap">{{ item.description || 'N/A' }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>${{ item.unit_value }}</td>
                            <td>{{ data.type_iva == 1 ? '%' : '$' }}{{ item.iva }}</td>
                            <td>{{ data.type_discount == 1 ? '%' : '$' }}{{ item.discount }}</td>
                            <td>${{ calculateItemTotal(item) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                <div></div>
                <div class="ltr:text-right rtl:text-left space-y-2">
                    <div class="flex items-center">
                        <div class="flex-1">{{ $t('subtotal') }}</div>
                        <div class="w-[37%]">${{data?.subtotal}}</div>
                    </div>
                    <div class="flex items-center">
                        <div class="flex-1">IVA</div>
                        <div class="w-[37%]">${{data?.iva}}</div>
                    </div>
                    <div class="flex items-center">
                        <div class="flex-1">{{ $t('discount') }}</div>
                        <div class="w-[37%]">${{ data?.discount }}</div>
                    </div>
                    <div class="flex items-center font-semibold text-lg">
                        <div class="flex-1">{{ $t('total') }}</div>
                        <div class="w-[37%]">${{data?.total}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="panel mt-4">
            <div class="flex items-center justify-between mb-5">
                <h5 class="text-lg font-bold">
                    {{ $t('payments') }}
                </h5>
                <div>
                    <template v-if="userStore.hasAccess('subscriptions.payments.create')">
                        <button type="button" class="btn btn-info w-full gap-2"  @click="modalAddPayment = true" v-if="data?.status===1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                                class="w-5 h-5" >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            {{ $t('add_payment') }}
                        </button>
                    </template>
                </div>
            </div>
            <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                            <th>{{ $t('date') }}</th>
                            <th>{{ $t('currency') }}</th>
                            <th>{{ $t('amount') }}</th>
                            <th>{{ $t('gangway') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Recorremos data.payments -->
                        <tr v-for="(payment, i) in data?.payments" :key="i">
                            <td class="font-semibold">{{ payment.id }}</td>
                            <td class="whitespace-nowrap">{{ new Date(payment.payment_date).toLocaleDateString() }}</td>
                            <td class="whitespace-nowrap">{{ payment.currency }}</td>
                            <td>${{ payment.amount_paid }}</td>
                            <td class="whitespace-nowrap">{{ payment.gangway }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <TransitionRoot appear :show="modalAddPayment" as="template">
            <Dialog as="div" class="relative z-50">
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
                    <div class="flex min-h-full items-start justify-center px-4 py-8">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-5xl text-black dark:text-white-dark">
                                <button
                                    type="button"
                                    class="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    @click="modalAddPayment = false"
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
                                <div
                                    class="text-lg font-bold bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]"
                                >
                                    <h6 class="text-2xl font-bold">{{ $t('new_payment') }}</h6>
                                </div>
                                <div>
                                    <payments-create-component :order-id="route.params.id" @close-modal="closeModal()"></payments-create-component>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { API } from '@/services/local';
    import {  useRoute } from 'vue-router';
    import PaymentsCreateComponent from '@/components/payments/PaymentsCreateComponent.vue';
    import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
    import { useUserStore } from '@/stores/user-store';
    useMeta({ title: 'Ver pedido' });
    const userStore = useUserStore();
    const route = useRoute();
    const api = new API();
    const loading = ref(false);
    const data:any=ref();
    const modalAddPayment = ref(false);
    const getOrder = async () =>
    {
        loading.value = true;
        try {
            const response = await api.get(`subscriptions/v1/orders/${route.params.id}`);
            data.value = response.data;
        } catch (error) {
            console.error(error.response);
        } finally {
            loading.value = false;
        }
    }

    const calculateItemTotal = (item) => {
        // Convertir a número en caso de que sean strings
        const unitValue = parseFloat(item.unit_value);
        const quantity = parseFloat(item.quantity);
        const discount = parseFloat(item.discount);
        const iva = parseFloat(item.iva);

        // Calcular monto base
        let baseAmount = unitValue * quantity;
        // Aplicar descuento
        if (data.value.type_discount == 1) {
            baseAmount -= baseAmount * (discount / 100); // Descuento en porcentaje
        } else {
            baseAmount -= discount; // Descuento como cantidad fija
        }

        // Aplicar IVA
        if (data.value.type_iva == 1) {
            baseAmount += baseAmount * (iva / 100); // IVA en porcentaje
        } else {
            baseAmount += iva; // IVA como cantidad fija
        }

        return baseAmount.toFixed(2); // Retornar con 2 decimales
    };


    const closeModal = () => {
        modalAddPayment.value = false;
        getOrder();
    }

    onMounted(async () => {
        await getOrder();
    });


</script>
