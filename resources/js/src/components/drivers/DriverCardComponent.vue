<template>
    <div class="flex md:items-center md:flex-row flex-col mb-5 gap-5">
        <h5 class="font-semibold text-lg">Reporte de Conductores</h5>
        <div class="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
            <date-picker v-model="params" @update:model-value="changeServer"/>
        </div>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div class="panel pb-1.5 mt-6">
            <div class="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold" v-for="(item, i) in drivers">
                <div>
                    <div>
                        <div>Horas de {{ item.driver.user.full_name }}</div>
                        <div class="text-[#009688] text-lg">{{ fuel.sum_quantity }} G</div>
                    </div>
                    <apexchart height="58" :options="sumQuantity" :series="sumQuantitySeries" class="overflow-hidden">
                        <!-- loader -->
                        <div
                            class="min-h-[58px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                    <span
                                        class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"
                                    ></span>
                        </div>
                    </apexchart>
                </div>
            </div>
        </div>
    </div>
</template>
<!-- script -->
<script lang="ts" setup>

import {ref, computed, defineEmits, onMounted} from 'vue';
import apexchart from 'vue3-apexcharts';
import {useAppStore} from '@/stores/index';
import {API} from "@/services/api";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Spanish} from "flatpickr/dist/l10n/es.js"
import moment from "moment";
import 'moment/locale/es'
import DatePicker from "@/components/plugins/datePicker.vue";

const props = defineProps({
    deviceId: {
        type: Number,
        required: false,
        default: null
    }
})
const emit = defineEmits(['update:modelValue']);
const store = useAppStore();
const api = new API();
const fuel = ref({
    sum_quantity: '0',
    sum_cost: '0',
    total_distance: '0',
    cost_avg_km: '0',
    fuel_consumption_avg_km: '0',
})
const params = ref({
    dateStart: null,
    dateEnd: null,
    dateStartOld: null,
    dateEndOld: null,
    label: null,
    dateLabel: null,
    labelOld: null,
    devices: [],
})
const listSelect = ref()
const listClick = ref(false)
const closePopper = ref(false);
const drivers = ref([])
const sumQuantity = computed(() => {
    const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
    return {
        chart: {
            height: 58,
            type: 'line',
            fontFamily: 'Nunito, sans-serif',
            sparkline: {
                enabled: true,
            },
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#009688',
                opacity: 0.4,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        colors: ['#009688'],
        grid: {
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
        },
        tooltip: {
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: (val: any) => {
                        return '';
                    },
                },
            },
        },
    };
});
const sumQuantitySeries = ref([
    {
        data: [0],
    },
]);

const getFuel = async () => {
    try {
        const responseDiver = await api.get(`devices/v1/drivers?filter={"device_id":${props.deviceId},"type":1,"date":{"from":"${params.value.dateStart}","to":"${params.value.dateEnd}"}}`)
        const response = await api.get(`devices/v1/drivers?filter={"device_id":${props.deviceId},"type":2,"date":{"from":"${params.value.dateStart}","to":"${params.value.dateEnd}"}}`)
        if (responseDiver.data.length) {
            drivers.value = responseDiver.data
        }
    } catch (error) {
        console.error('Error fetching data', error);
    }
}
const changeServer = (value) => {
    let dateStart = null
    let dateEnd = null
    if (listSelect.value) {
        const listSelected = document.getElementById(listSelect.value)
        listSelected.classList.remove('bg-primary', 'text-white', 'shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)]', 'hover:text-black', 'dark:hover:text-white')
    }
    const list = document.getElementById(value);

    switch (value) {
        case "today":
            dateStart = moment().startOf('day')
            dateEnd = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            })
            params.value.dateLabel = `${dateStart.locale('es').format('DD MMM YYYY')}`
            params.value.label = "Hoy"
            break;
        case "yesterday":
            dateStart = moment().subtract(1, 'days').startOf('day');
            dateEnd = moment().subtract(1, 'days').set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.locale('es').format('DD MMM YYYY')}`
            params.value.label = "Ayer"
            break;
        case "this_week":
            dateStart = moment().subtract(7, 'days').startOf('day');
            dateEnd = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.locale('es').format('DD MMM')} - ${dateEnd.locale('es').format('DD MMM YYYY')}`
            params.value.label = "Esta semana"
            break;
        case "last_week":
            dateStart = moment().subtract(2, 'weeks').startOf('day');
            dateEnd = moment().subtract(1, 'weeks').set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "La semana pasada"
            break;
        case "last_28_days":
            dateStart = moment().subtract(28, 'days').startOf('day');
            dateEnd = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 28 dias"
            break;
        case "last_30_days":
            dateStart = moment().subtract(30, 'days').startOf('day');
            dateEnd = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 30 dias"
            break;
        case "last_90_days":
            dateStart = moment().subtract(90, 'days').startOf('day');
            dateEnd = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 90 dias"
            break;
        case "last_12_months":
            dateStart = moment().subtract(1, 'years').startOf('day');
            dateEnd = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 12 meses"
            break;
        case "this_year":
            dateStart = moment().set({
                'year': moment().year(),
                'month': 0,
                'date': 1
            }).startOf('day');
            dateEnd = moment().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            });
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Este año"
            break;
        case 'personalized':
            const dateSelect = date.value.split(' ');
            dateStart = moment(dateSelect[0]).startOf('day');
            if (dateSelect[2] !== undefined) {
                dateEnd = moment(dateSelect[2]).set({
                    hour: 23,
                    minute: 59,
                    second: 59,
                    millisecond: 999
                });
            } else {
                dateEnd = moment(dateSelect[0]).set({
                    hour: 23,
                    minute: 59,
                    second: 59,
                    millisecond: 999
                });
            }
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Personalizado"
            break;
        default:
            break;
    }
    params.value.dateStart = dateStart.format('YYYY-MM-DD HH:mm:ss');
    params.value.dateEnd = dateEnd.format('YYYY-MM-DD HH:mm:ss');
    emit('update:modelValue', params.value);
    date.value = `${params.value.dateStart} a ${params.value.dateEnd}`
    list.classList.add('bg-primary', 'text-white', 'shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)]', 'hover:text-black', 'dark:hover:text-white')
    listSelect.value = value
    listClick.value = true
    closePopper.value = false
    getFuel()
}
const personalized = () => {
    if (listClick.value) {
        listClick.value = false
    } else {
        if (listSelect.value) {
            const listSelected = document.getElementById(listSelect.value)
            listSelected.classList.remove('bg-primary', 'text-white', 'shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)]', 'hover:text-black', 'dark:hover:text-white')
        }
        params.value.label = "Personalizado"
        const list = document.getElementById('personalized');
        list.classList.add('bg-primary', 'text-white', 'shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)]', 'hover:text-black', 'dark:hover:text-white')
        listSelect.value = 'personalized'
    }
}
onMounted(async () => {
    await changeServer('last_28_days')
})

</script>

<style scoped>
.popper {
    width: 350px;
}
</style>
