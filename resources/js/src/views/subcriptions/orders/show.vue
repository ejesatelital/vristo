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

        <div class="panel p-5">
            <h6 class="text-2xl font-bold">{{ $t('details') }}</h6>
            <div class="panel">
                <div class="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                    <div class="flex-1">
                        <div class="space-y-1 text-white-dark">
                            <div>Bills to:</div>
                            <div class="text-black dark:text-white font-semibold">{{data?.payment_data?.name}}</div>
                            <div>{{data?.payment_data?.address}}</div>
                            <div>{{data?.payment_data?.email}}</div>
                            <div>{{data?.payment_data?.phone}}</div>
                        </div>
                    </div>
                    <div class="flex justify-between sm:flex-row flex-col gap-6 lg:w-2/3">
                        <div class="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div class="flex items-center w-full justify-between mb-2">
                                <div class="text-white-dark">Order ID:</div>
                                <div>#{{data?.id}}</div>
                            </div>
                            <div class="flex items-center w-full justify-between mb-2">
                                <div class="text-white-dark">Inicio de vigencia:</div>
                                <div>{{data?.start_date}}</div>
                            </div>
                            <div class="flex items-center w-full justify-between mb-2">
                                <div class="text-white-dark">Fin de vigencia:</div>
                                <div>{{data?.id}}</div>
                            </div>
                            <div class="flex items-center w-full justify-between">
                                <div class="text-white-dark">Generado por:</div>
                                <div>{{data?.user.full_name}}</div>
                            </div>
                        </div>
                        <div class="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div class="flex items-center w-full justify-between mb-2">
                                <div class="text-white-dark">Subtotal:</div>
                                <div class="whitespace-nowrap">${{data?.subtotal}}</div>
                            </div>
                            <div class="flex items-center w-full justify-between mb-2">
                                <div class="text-white-dark">IVA:</div>
                                <div>${{data?.iva}}</div>
                            </div>
                            <div class="flex items-center w-full justify-between mb-2">
                                <div class="text-white-dark">Descuento:</div>
                                <div>${{data?.discount}}</div>
                            </div>
                            <div class="flex items-center w-full justify-between mb-2">
                                <div class="text-white-dark">Total:</div>
                                <div>${{data?.total}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <payments-create-component :order-id="route.params.id"></payments-create-component>

    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { API } from '@/services/local';
    import {  useRoute } from 'vue-router';
    import PaymentsCreateComponent from '@/components/payments/PaymentsCreateComponent.vue';
    useMeta({ title: 'Ver pedido' });
    const route = useRoute();
    const api = new API();

    const loading = ref(false);
    const data:any=ref();
    const getOrder = async () =>
    {
        try {
            const response = await api.get(`subscriptions/v1/orders/${route.params.id}`);
            data.value = response.data;
        } catch (error) {
            loading.value = true;
            console.error(error.response);
        }
    }

    onMounted(async () => {
        await getOrder();
    });


</script>
