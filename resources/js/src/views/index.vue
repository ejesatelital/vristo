<template>
    <div>
        <!-- Slider  -->
        <div class="panel lg:col-span-2">
            <swiper
            :modules="[Navigation, Pagination, Autoplay]"
            :navigation="{ nextEl: '.swiper-button-next-ex5', prevEl: '.swiper-button-prev-ex5' }"
            :pagination="{ clickable: true }"
            :autoplay="{ delay: 2000 }"
            :breakpoints="{
                1024: { slidesPerView: 3, spaceBetween: 30 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                320: { slidesPerView: 1, spaceBetween: 20 },
            }"
            id="slider5"
            :dir="store.rtlClass"
            :key="store.rtlClass === 'rtl' ? 'true' : 'false'"
            >
            <template v-for="(item, i) in items" :key="i">
                <swiper-slide>
                    <img :src="`${item.image}`" class="w-full max-h-80 object-cover" alt="" />
                    <div class="absolute z-[999] text-white top-1/4 ltr:left-12 rtl:right-12">
                        <div class="sm:text-3xl text-base font-bold">{{ item.name }}</div>
                        <div class="sm:mt-5 mt-1 w-4/5 text-base sm:block hidden font-medium">
                            {{ item.description }}
                        </div>
                        <button type="button" class="mt-4 btn btn-primary">
                            <a
                                :href="item.status ? `/signin` : `/detail`"
                                >
                                {{ item.status ? 'Abrir' : 'Obtener' }}
                            </a>
                        </button>
                    </div>
                </swiper-slide>
            </template>
            <a
                href="javascript:;"
                class="swiper-button-prev-ex5 grid place-content-center ltr:left-2 rtl:right-2 p-1 transition text-primary hover:text-white border border-primary hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:rotate-180">
                <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
            <a
                href="javascript:;"
                class="swiper-button-next-ex5 grid place-content-center ltr:right-2 rtl:left-2 p-1 transition text-primary hover:text-white border border-primary hover:border-primary hover:bg-primary rounded-full absolute z-[999] top-[44%] -translate-y-1/2"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ltr:rotate-180">
                <path d="M15 5L9 12L15 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
            </swiper>
        </div>

        <!-- Cards -->
        <div class="pt-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Aplicaciones principales</h5>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="card in rows" :key="card.id"
                class="card bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-4">
                    <a :href="card.url??'/detail'" class="mt-6">
                        <div class="flex">
                            <div v-show="card.image" class="ltr:mr-4 rtl:ml-4">
                                <img
                                    :src="`${card.image}`"
                                    class="w-24 h-24 object-cover mb-5"
                                    alt="avatar"
                                />
                            </div>
                            <div
                                v-show="!card.image && card.name"
                                class="grid place-content-center h-24 w-24 text-white ltr:mr-2 rtl:ml-2 text-5xl rounded font-semibold"
                                :style="{ backgroundColor: card.color }"
                            >
                                {{ card.name ? card.name.charAt(0) : ''}}
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-lg mb-2 text-primary"  :style="{ color: card.color }">
                                    {{ card.name }}
                                <span class="ltr:float-right rtl:float-left" :class="getStatusClass(card.status) ? `badge bg-success`:`badge bg-info`"> {{ getStatusText(card.status) }}</span>
                                </h4>
                                <p class="media-text">
                                    {{ card.description }}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>
<script lang="ts" setup>
    import { ref, onMounted, reactive } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Pagination, Autoplay } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import { useMeta } from '@/composables/use-meta';
    import { useAppStore } from '@/stores/index';
    import { API } from '@/services/local';
    import axios from 'axios';
    import { useCompanyStore } from '../stores/company-store';
    const api = new API();
    const companyStore = useSubscriptionsStore();

    useMeta({ title: 'Marketplace' });
    const store = useAppStore();
    const items = ref([
        {
            id: 1,
            image: '/assets/images/carousel1.jpeg',
            name: 'CLI Based',
            description: 'Etiam sed augue ac justo tincidunt posuere. Vivamus euismod eros, nec risus malesuada.',
            status: true,
        },
        {
            id: 2,
            image: '/assets/images/carousel2.jpeg',
            title: 'Web Based',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
            isActive: false,
        },
        {
            id: 3,
            image: '/assets/images/carousel3.jpeg',
            title: 'Mobile Based',
            description: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
            isActive: true,
        },
        {
            id: 4,
            image: '/assets/images/carousel1.jpeg',
            title: 'Mobile Based',
            description: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
            isActive: true,
        },
        {
            id: 5,
            image: '/assets/images/carousel2.jpeg',
            title: 'Mobile Based',
            description: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
            isActive: true,
        },
    ]);
    const loading = ref(true);
    let timer: any;

    const rows: any = ref({
        id: null,
        name: '',
        description: '',
        media_single: {zone:{}, image:{}},
        version: '',
        color: '#0B39EF',
        status: 'Obtener',
    });

    const params = reactive({
        current_page: 1,
        pagesize: 10,
        column_filters: [],
        sort_column: 'id',
        sort_direction: 'desc',
        search: null
    });

    const changeServer = (data: any) => {
        params.current_page = data.current_page;
        params.pagesize = data.pagesize;
        params.sort_column = data.sort_column;
        params.sort_direction = data.sort_direction;
        if (data.change_type === 'search') {
            clearTimeout(timer);
            timer = setTimeout(() => {
                getApplications();
            }, 500);
        } else {
            getApplications();
        }
    };

    const clearSearch = () => {
        params.search = null;
        clearTimeout(timer);
    };

    const getApplications = async () => {
        try {
            loading.value = true;
            const response = await axios.get(`http://127.0.0.1:8000/api/subscriptions/v1/applications?filter={"search":"${params.search}"}&page=${params.current_page}&take=${params.pagesize}`);
            rows.value = response?.data.data.map(function (x: any) {
                return {
                        id: x.id,
                        name: x.name,
                        description: x.description,
                        version: x.version,
                        color: x.color,
                        status: x.status,
                        url: x.url
                    }
            });

        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            loading.value = false;
        }
    }

    const getSubscriptions = async () => {
        try {
            loading.value = true;
            const subscriptions = companyStore?.companySubscriptions;
            console.log(subscriptions);

        } catch (error) {
            console.error('Error fetching subscriptions', error);
        } finally {
            loading.value = false;
        }
    };

    const getStatusClass = (status) => {
      switch (status) {
        case 'true' || true || 1 || 'active' || 'online':
          return 'badge badge-outline-success';
        case 'false' || false || 0 || 'deactive' || 'offline':
          return 'badge badge-outline-danger';
        default:
          return 'badge badge-outline-secondary';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'true' || true || 1 || 'active' || 'online':
          return 'Activo';
        case 'false' || false || 0 || 'deactive' || 'offline':
          return 'Inactivo';
        default:
          return status;
      }
    };

    onMounted(async () => {
       await getApplications();
    });

</script>
<style>
    .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .card:hover {
    transform: scale(1.06);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
</style>
