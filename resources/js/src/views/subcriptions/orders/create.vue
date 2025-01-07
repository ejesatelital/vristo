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
                <span>{{ $t('new_orders') }}</span>
            </li>
        </ul>

        <div class="panel p-5">
            <h6 class="text-2xl font-bold mb-5">{{ $t('new_orders') }}</h6>

            <form @submit.prevent="saveOrder">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="phone">Inicio de vigencia*</label>
                        <input id="start_date" type="date" name="inv-date" class="form-input lg:w-[250px]" required
                            v-model="params.start_date" />
                    </div>
                    <div>
                        <label for="due_date">Fecha de vencimiento</label>
                        <input id="due_date" type="date" name="due-date" class="form-input lg:w-[250px]"
                            v-model="params.due_date" />
                    </div>
                </div>
                <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />
                <div>
                    <div class="flex lg:flex-row flex-col">
                        <div class="lg:w-2/3 w-full ltr:lg:mr-6 rtl:lg:ml-6">
                            <div class="text-xl semibold">{{ $t('bill_to') }}</div>

                            <div class="mb-4" v-if="!companyStore.id">
                                <Select
                                :options="companies"
                                v-model="companySelected"
                                :closeOnSelect="true"
                                titleSelect="Empresa"
                                name="companies"
                                :allow-empty="false"
                                @update:modelValue="handleCompanySelect" />
                            </div>

                            <div class="my-2">
                                <label class="flex items-center cursor-pointer">
                                    <input type="checkbox" class="form-checkbox" v-model="btnBillTo" :checked="btnBillTo" />
                                    <span class=" text-white-dark">Facturar a</span>
                                </label>
                            </div>

                            <div class="my-2 sm:flex items-center">
                                <label for="reciever-identification" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('identification') }} *</label>
                                <input  id="reciever-identification" class="form-input flex-1" type="text" name="reciever-identification" v-model="params.payment_data.identification" placeholder="Enter Identification" :disabled="!btnBillTo" required />
                            </div>

                            <div class="my-2 sm:flex items-center">
                                <label for="reciever-name" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('name') }} *</label>
                                <input  id="reciever-name" type="text" name="reciever-name" class="form-input flex-1" v-model="params.payment_data.name" placeholder="Enter Name" :disabled="!btnBillTo" required />
                            </div>

                            <div class="my-2 sm:flex items-center">
                                <label for="reciever-email" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('email') }} *</label>
                                <input  id="reciever-email" type="email" name="reciever-email" class="form-input flex-1" v-model="params.payment_data.email" placeholder="Enter Email" :disabled="!btnBillTo" required />
                            </div>

                            <div class="my-2 sm:flex items-center">
                                <label for="reciever-address" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('address') }} *</label>
                                <input  id="reciever-address" type="text" name="reciever-address" class="form-input flex-1" v-model="params.payment_data.address" placeholder="Enter Address" :disabled="!btnBillTo" required />
                            </div>

                            <div class="my-2 sm:flex items-center">
                                <label for="reciever-number" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">{{ $t('phone_number') }} *</label>
                                <input  id="reciever-number" type="text" name="reciever-number" class="form-input flex-1" v-model="params.payment_data.phone" placeholder="Enter Phone number" :disabled="!btnBillTo" required />
                            </div>
                        </div>

                    </div>
                </div>

                <hr class="border-[#e0e6ed] dark:border-[#1b2e4b] my-6" />

                <div class="text-xl semibold">{{ $t('details_items') }}</div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div class="my-2 sm:flex items-center">
                        <label for="type_iva" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Iva</label>
                        <div class="flex-1 sm:flex-row flex-col">
                            <div class="flex gap-4">
                                <div class="mb-1">
                                    <label class="inline-flex mt-1 cursor-pointer">
                                        <input type="radio" name="type_iva" class="form-radio" value="1" v-model="type_iva" />
                                        <span class="text-white-dark">Porcentual</span>
                                    </label>
                                </div>
                                <div>
                                    <label class="inline-flex mt-1 cursor-pointer">
                                        <input type="radio" name="type_iva" class="form-radio text-secondary" value="2" v-model="type_iva" />
                                        <span class="text-white-dark">Valor</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="my-2 sm:flex items-center">
                        <label for="type_discount" class="ltr:mr-2 rtl:ml-2 w-1/3 mb-0">Descuento</label>
                        <div class="flex-1 sm:flex-row flex-col">
                            <div class="flex gap-4">
                                <div class="mb-1">
                                    <label class="inline-flex mt-1 cursor-pointer">
                                        <input type="radio" name="type_discount" class="form-radio" value="1" v-model="type_discount" />
                                        <span class="text-white-dark">Porcentual</span>
                                    </label>
                                </div>
                                <div>
                                    <label class="inline-flex mt-1 cursor-pointer">
                                        <input type="radio" name="type_discount" class="form-radio text-secondary" value="2" v-model="type_discount" />
                                        <span class="text-white-dark">Valor</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th class="w-1">Item</th>
                                    <th class="w-1">Nombre</th>
                                    <th class="w-1">Cantidad *</th>
                                    <th class="w-1">Vlr. Unitario *</th>
                                    <th class="w-1">Iva</th>
                                    <th class="w-1">Descuento</th>
                                    <th>Total</th>
                                    <th class="w-1">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16 4C18.175 4.01211 19.3529 4.10856 20.1213 4.87694C21 5.75562 21 7.16983 21 9.99826V15.9983C21 18.8267 21 20.2409 20.1213 21.1196C19.2426 21.9983 17.8284 21.9983 15 21.9983H9C6.17157 21.9983 4.75736 21.9983 3.87868 21.1196C3 20.2409 3 18.8267 3 15.9983V9.99826C3 7.16983 3 5.75562 3.87868 4.87694C4.64706 4.10856 5.82497 4.01211 8 4"
                                                stroke="currentColor" stroke-width="1.5" />
                                            <path
                                                d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                                                stroke="currentColor" stroke-width="1.5" />
                                            <path d="M14.5 11L9.50004 16M9.50002 11L14.5 16" stroke="currentColor"
                                                stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="items.length <= 0">
                                    <tr>
                                        <td colspan="7" class="!text-center font-semibold">No hay articulo disponible</td>
                                    </tr>
                                </template>
                                <template v-for="(item, i) in items" :key="i">
                                    <tr class="align-top">
                                        <td>
                                            <input type="text" class="form-input min-w-[150px]" placeholder="Referencia" v-model="item.sku" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-input min-w-[220px]" placeholder="Ingrese el item *" v-model="item.name" required />
                                            <textarea class="form-textarea mt-3" placeholder="Enter Description" v-model="item.description"></textarea>
                                        </td>
                                        <td>
                                            <input type="number" class="form-input w-32" placeholder="Cantidad" v-model="item.quantity" min="0" required />
                                        </td>
                                        <td>
                                            <input type="number" class="form-input w-32" placeholder="Valor unitario" v-model="item.unit_value" min="0" required />
                                        </td>
                                        <td>
                                            <div class="flex">
                                                <div
                                                    class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-2 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    {{ type_iva == 1 ? '%' : '$' }}
                                                </div>
                                                <input type="number" placeholder="Iva" v-model="item.iva" min="0" class="form-input w-32 ltr:rounded-l-none rtl:rounded-r-none flex-1" />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="flex">
                                                <div
                                                    class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-2 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                    {{ type_discount == 1 ? '%' : '$' }}
                                                </div>
                                                <input type="number" placeholder="Descuento" v-model="item.discount" min="0"
                                                :max="type_discount == 1 ? 100 : null"
                                                :maxlength="type_discount == 1 ? 4 : 14"
                                                class="form-input w-32 ltr:rounded-l-none rtl:rounded-r-none flex-1" />
                                            </div>
                                        </td>
                                        <td>${{ calculateItemTotal(item) }}</td>
                                        <td>
                                            <button type="button" @click="removeItem(item)">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                                    stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex justify-between sm:flex-row flex-col mt-6">
                        <div class="sm:mb-0 mb-6">
                            <button type="button" class="btn btn-info" @click="addItem()">Add Item</button>
                        </div>
                        <div class="sm:w-2/5">
                            <div class="flex items-center justify-between">
                                <div>Subtotal</div>
                                <div>${{ formatNumber(subtotal) }}</div>
                            </div>
                            <div class="flex items-center justify-between mt-4">
                                <div>IVA</div>
                                <div>${{ formatNumber(ivaTotal) }}</div>
                            </div>
                            <div class="flex items-center justify-between mt-4">
                                <div>Descuento</div>
                                <div>${{ formatNumber(discountTotal) }}</div>
                            </div>
                            <div class="flex items-center justify-between mt-4 font-semibold">
                                <div>Total</div>
                                <div>${{ formatNumber(total) }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <label for="description">Notes</label>
                    <textarea id="description" name="description" class="form-textarea min-h-[130px]" placeholder="Notes...." v-model="params.description"></textarea>
                </div>

                <div class="flex justify-end items-center mt-4">
                    <!-- <button type="button" class="btn btn-outline-danger">Cancelar</button> -->
                    <button type="submit" class="btn btn-primary ltr:ml-4 rtl:mr-4">Guardar</button>
                </div>
            </form>

        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import { useMeta } from '@/composables/use-meta';
    import { useCompanyStore } from '@/stores/company-store';
    import { useUserStore } from '@/stores/user-store';
    import { API } from '@/services/local';
    import { NOTIFY } from '@/services/notify';
    import Select from '@/components/partials/Select.vue';
    import { useRouter } from 'vue-router';
    useMeta({ title: 'Nuevo pedido' });
    const router = useRouter();
    const type_iva = ref(1);
    const type_discount = ref(2);
    const companyStore = useCompanyStore();
    const userStore = useUserStore();
    const api = new API();
    const notify = new NOTIFY();
    const companies: any = ref(companyStore.companyOptions);
    const companySelected = ref();
    const btnBillTo = ref(0);
    const items: any = ref([]);
    const params = ref({
        id: null,
        payment_data:{
            identification:null,
            name: '',
            email: '',
            address: '',
            phone: ''
        },
        start_date: '',
        due_date: '',
        items:[],
        description: '',
        company_id: companyStore.id,
        user_id: userStore.id
    });
    const loading = ref(false);

    // Subtotal calculation (sum of all item prices without taxes or discounts)
    const subtotal = computed(() => {
        return items.value.reduce((sum, item) => {
            return sum + (item.unit_value * item.quantity);
        }, 0);
    });

    // IVA calculation
    const ivaTotal = computed(() => {
        return items.value.reduce((sum, item) => {
            if (type_iva.value == 1) {
                const ivaRate = item.iva / 100; // Convert IVA to decimal if percentage
                return sum + (item.unit_value * item.quantity * ivaRate);
            } else {
                return sum + item.iva; // If iva is a fixed value
            }
        }, 0);
    });

    // Discount calculation
    const discountTotal = computed(() => {
        return items.value.reduce((sum, item) => {
            if (type_discount.value == 1) {
                const discountRate = item.discount / 100; // Convert discount to decimal if percentage
                return sum + (item.unit_value * item.quantity * discountRate);
            } else {
                return sum + item.discount; // If discount is a fixed value
            }
        }, 0);
    });

    // Total calculation (Subtotal + IVA - Discount)
    const total = computed(() => {
        return subtotal.value + ivaTotal.value - discountTotal.value;
    });

    function formatNumber(value) {
        if (!value) return 0;
        return parseFloat(value).toFixed(2);
    }

    const calculateItemTotal = (item) => {
        let baseAmount = item.unit_value * item.quantity;
        if (type_iva.value == 1) {
            baseAmount += baseAmount * (item.iva / 100);
        } else {
            baseAmount += item.iva; // VAT as a fixed amount
        }
        if (type_discount.value == 1) {
            baseAmount -= baseAmount * (item.discount / 100);
        } else {
            baseAmount -= item.discount; // Discount as a fixed amount
        }
        return baseAmount.toFixed(2);
    };

    const addItem = () => {
        let maxId = 0;
        if (items.value && items.value.length) {
            maxId = items.value.reduce((max: number, character: any) => (character.id > max ? character.id : max), items.value[0].id);
        }
        items.value.push({
            id: maxId + 1,
            order_id: null,
            sku: '',
            name: '',
            description: '',
            quantity: 0,
            iva: 0,
            discount: 0,
            unit_value: 0,
        });
    };

    const removeItem = (item: any = null) => {
        items.value = items.value.filter((d: any) => d.id != item.id);
    };

    function handleCompanySelect() {
        const selectedCompany = companyStore.companies.find(
            (company) => company.id === companySelected.value?.value
        );
        setCompanyDetails(selectedCompany);
    }

    watch(() => companyStore.id, (value) => {
        const selectedCompany = companyStore.companies.find(
            (company) => company.id === companyStore.id
        );
        companySelected.value = { label: selectedCompany?.name, value: selectedCompany?.id } ?? null;
        setCompanyDetails(selectedCompany);
    });

    /**
     * Update the company's details and assign them to Payment_Data.
     * @param {Object} company companySelected.
     */
    function setCompanyDetails(company) {
        params.value.company_id = company?.id;
        params.value.payment_data = {
            address: company?.address ?? null,
            phone: company?.phone ?? null,
            name: company?.name ?? null,
            email: company?.email ?? null,
            identification: company?.identification ?? null,
        }
    }

    const saveOrder = async () =>
    {
        params.value.items = items.value;
        loading.value = true;
        if (companySelected.value === null || companySelected.value === undefined) {
            notify.showToast('Debes seleccionar una empresa!', 'warning');
            loading.value = false;
            return false;
        }
        try {
            const isConfirmed = await notify.showConfirm(
                'Confirmar Envío',
                '¿Guardar registro?',
                'question',
                'Sí, enviar',
                'Cancelar'
            );
            if (isConfirmed) {
                await api.post('/subscriptions/v1/orders', params.value);
                router.push({ name: 'orders' });
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

    onMounted(() => {
        //set default data
        items.value.push({
            id: 1,
            order_id: null,
            sku: '',
            name: '',
            description: '',
            quantity: 0,
            iva: 0,
            discount: 0,
            unit_value: 0,
        });

        if (companyStore.id) {
            const selectedCompany = companyStore.companies.find(
                (company) => company.id === companyStore.id
            );
            companySelected.value = { label: selectedCompany?.name, value: selectedCompany?.id } ?? null;
            setCompanyDetails(selectedCompany);
        }
    });

</script>
