<template>
    <div class="dropdown">
        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0"
                class="align-middle" :show="closePopper">
            <button type="button" class="btn btn-outline-dark dropdown-toggle p-0.5" @click="closePopper=!closePopper">
                <span class="badge bg-dark mt-0 mb-0 mr-2">{{ params.label }}</span> {{ params.dateLabel }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     class="ltr:ml-1 rtl:mr-1 inline-block" data-v-5784ed69-s="">
                    <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round"></path>
                </svg>
            </button>
            <template #content="{ close }">
                <div class="mt-1 px-4 panel">
                    <div class="panel-body">
                        <div class="flex justify-between lg:flex-row flex-col">
                            <div class="lg:w-1/2 w-full ltr:lg:mr-6 rtl:lg:ml-6 mb-6">
                                <div
                                    class="flex flex-col rounded-md border border-[#e0e6ed] dark:border-[#1b2e4b]"
                                    style="width: 300px">
                                    <a href="javascript:;" id="personalized"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Personalizado
                                    </a>
                                    <a href="javascript:;" id="today" @click="changeServer('today')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Hoy
                                    </a>
                                    <a href="javascript:;" id="yesterday" @click="changeServer('yesterday')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Ayer
                                    </a>
                                    <a href="javascript:;" id="this_week" @click="changeServer('this_week')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Esta semana
                                    </a>
                                    <a href="javascript:;" id="last_week" @click="changeServer('last_week')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        La semana pasada
                                    </a>
                                    <a href="javascript:;" id="last_28_days"
                                       @click="changeServer('last_28_days')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10 ">
                                        Los últimos 28 dias
                                    </a>
                                    <a href="javascript:;" id="last_30_days"
                                       @click="changeServer('last_30_days')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Los úlltimos 30 dias
                                    </a>
                                    <a href="javascript:;" id="last_90_days"
                                       @click="changeServer('last_90_days')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Los úlltimos 90 dias
                                    </a>
                                    <a href="javascript:;" id="last_12_months"
                                       @click="changeServer('last_12_months')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Los úlltimos 12 meses
                                    </a>
                                    <a href="javascript:;" id="this_year" @click="changeServer('this_year')"
                                       class="border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                                        Este año (de enero a hoy)
                                    </a>
                                </div>
                            </div>
                            <div class="w-full">
                                <flat-pickr v-model="date" class="form-input" :config="rangeCalendar"
                                            @on-change="personalized()"></flat-pickr>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer" v-if="listSelect==='personalized'">
                        <button class="btn btn-outline btn-primary  ltr:ml-auto rtl:mr-auto" @click="changeServer('personalized')">
                            Filtrar
                        </button>
                    </div>
                </div>
            </template>
        </Popper>
    </div>
</template>
<script setup lang="ts">
import {ref, defineEmits, onMounted} from 'vue';
import {useAppStore} from "@/stores";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import {Spanish} from "flatpickr/dist/l10n/es.js"
import moment from "moment";
import 'moment/locale/es'

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    defaultSelect: {
        type: String,
        required: false,
        default: 'last_28_days'
    }
})
const store = useAppStore();
const date = ref();
const rangeCalendar: any = ref({
    locale: Spanish,
    dateFormat: 'Y-m-d',
    mode: 'range',
    inline: true,
    position: store.rtlClass === 'rtl' ? 'auto right' : 'auto left',
});
const params = ref({
    dateStart: null,
    dateEnd: null,
    dateStartOld: null,
    dateEndOld: null,
    label: null,
    dateLabel: null,
    labelOld: null,
})
const listSelect = ref()
const listClick = ref(false)
const closePopper = ref(false);
const changeServer = (value) => {
    let dateStart = null
    let dateEnd = null
    let dateStartOld = null
    let dateEndOld = null
    if (listSelect.value) {
        const listSelected = document.getElementById(listSelect.value)
        listSelected.classList.remove('bg-primary', 'text-white', 'shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)]', 'hover:text-black', 'dark:hover:text-white')
    }
    const list = document.getElementById(value);

    switch (value) {
        case "today":
            dateStart = moment().startOf('day')
            dateEnd = moment().endOf('day')
            dateStartOld = moment().subtract(1, 'days').startOf('day')
            dateEndOld = moment().subtract(1, 'days').endOf('day')
            params.value.dateLabel = `${dateStart.locale('es').format('DD MMM YYYY')}`
            params.value.label = "Hoy"
            params.value.labelOld = "Ayer"
            break;
        case "yesterday":
            dateStart = moment().subtract(1, 'days').startOf('day');
            dateEnd = moment().subtract(1, 'days').endOf('day');
            dateStartOld = moment().subtract(2, 'days').startOf('day');
            dateEndOld = moment().subtract(2, 'days').endOf('day');
            params.value.dateLabel = `${dateStart.locale('es').format('DD MMM YYYY')}`
            params.value.label = "Ayer"
             params.value.labelOld = "Anteayer"
            break;
        case "this_week":
            dateStart = moment().subtract(1, 'weeks').startOf('day');
            dateEnd = moment().endOf('day');
            dateStartOld = moment().subtract(1, 'days').subtract(2, 'weeks').startOf('day');
            dateEndOld = moment().subtract(1, 'days').subtract(1, 'weeks').endOf('day');
            params.value.dateLabel = `${dateStart.locale('es').format('DD MMM')} - ${dateEnd.locale('es').format('DD MMM YYYY')}`
            params.value.label = "Esta semana"
            params.value.labelOld = "La semana pasada"
            break;
        case "last_week":
            dateStart = moment().subtract(2, 'weeks').startOf('day');
            dateEnd = moment().subtract(1, 'weeks').endOf('day');
            dateStartOld = moment().subtract(1, 'days').subtract(3, 'weeks').startOf('day');
            dateEndOld = moment().subtract(1, 'days').subtract(2, 'weeks').endOf('day');
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "La semana pasada"
             params.value.labelOld = "La semana ante pasada"
            break;
        case "last_28_days":
            dateStart = moment().subtract(28, 'days').startOf('day');
            dateEnd = moment().endOf('day');
            dateStartOld = moment().subtract(1, 'days').subtract(56, 'days').startOf('day');
            dateEndOld = moment().subtract(1, 'days').subtract(28, 'days').endOf('day');
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 28 dias"
            params.value.labelOld = `${dateStartOld.format('DD MMM')} - ${dateEndOld.format('DD MMM YYYY')}`
            break;
        case "last_30_days":
            dateStart = moment().subtract(30, 'days').startOf('day');
            dateEnd = moment().endOf('day');
            dateStartOld = moment().subtract(1, 'days').subtract(60, 'days').startOf('day');
            dateEndOld = moment().subtract(1, 'days').subtract(30, 'days').endOf('day');
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 30 dias"
            params.value.labelOld = `${dateStartOld.format('DD MMM')} - ${dateEndOld.format('DD MMM YYYY')}`
            break;
        case "last_90_days":
            dateStart = moment().subtract(90, 'days').startOf('day');
            dateEnd = moment().endOf('day');
            dateStartOld = moment().subtract(1, 'days').subtract(180, 'days').startOf('day');
            dateEndOld = moment().subtract(1, 'days').subtract(90, 'days').endOf('day');
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 90 dias"
            params.value.labelOld = `${dateStartOld.format('DD MMM')} - ${dateEndOld.format('DD MMM YYYY')}`
            break;
        case "last_12_months":
            dateStart = moment().subtract(1, 'years').startOf('day');
            dateEnd = moment().endOf('day');
            dateStartOld = moment().subtract(2, 'years').startOf('day');
            dateEndOld = moment().subtract(1, 'years').endOf('day');
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Los últimos 12 meses"
            params.value.labelOld = `${dateStartOld.format('DD MMM')} - ${dateEndOld.format('DD MMM YYYY')}`
            break;
        case "this_year":
            dateStart = moment().startOf('year').startOf('day');
            dateEnd = moment().endOf('day');
            dateStartOld = moment().startOf('year').subtract(1, 'years').startOf('day');
            dateEndOld = moment().subtract(1, 'years').endOf('day');
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Este año"
            params.value.labelOld = "El año pasado"
            break;
        case 'personalized':
            const dateSelect = date.value.split(' ');
            dateStart = moment(dateSelect[0]).startOf('day');
            if (dateSelect[2] !== undefined) {
                dateEnd = moment(dateSelect[2]).endOf('day');
            } else {
                dateEnd = moment(dateSelect[0]).endOf('day');
            }
            dateStartOld = moment().subtract(1, 'months').startOf('day');
            dateEndOld = moment().subtract(1, 'months').endOf('day');
            params.value.dateLabel = `${dateStart.format('DD MMM')} - ${dateEnd.format('DD MMM YYYY')}`
            params.value.label = "Personalizado"
            params.value.labelOld = `${dateStartOld.format('DD MMM')} - ${dateEndOld.format('DD MMM YYYY')}`
            break;
        default:
            break;
    }
    params.value.dateStart = dateStart.format('YYYY-MM-DD HH:mm:ss');
    params.value.dateEnd = dateEnd.format('YYYY-MM-DD HH:mm:ss');
    params.value.dateStartOld = dateStartOld.format('YYYY-MM-DD HH:mm:ss');
    params.value.dateEndOld = dateEndOld.format('YYYY-MM-DD HH:mm:ss');
    emit('update:modelValue', params.value);
    date.value = `${params.value.dateStart} a ${params.value.dateEnd}`
    list.classList.add('bg-primary', 'text-white', 'shadow-[0_1px_15px_1px_rgba(67,97,238,0.15)]', 'hover:text-black', 'dark:hover:text-white')
    listSelect.value = value
    listClick.value = true
    closePopper.value = false
    console.log(params.value)
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
        listSelect.value='personalized'
    }
}
onMounted(async () => {
    changeServer(props.defaultSelect)
})
</script>
<style scoped>

</style>
