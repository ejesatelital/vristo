<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Dashboard</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>Apps</span>
            </li>
        </ul>

        <!-- Slider  -->
        <div class="panel lg:col-span-2">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">Featured Apps</h5>
            </div>
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
                        <div class="sm:text-3xl text-base font-bold">{{ item.title }}</div>
                        <div class="sm:mt-5 mt-1 w-4/5 text-base sm:block hidden font-medium">
                            {{ item.description }}
                        </div>
                        <button type="button" class="mt-4 btn btn-primary">
                            <a
                                :href="item.isActive ? `/signin` : `/detail`"
                                >
                                {{ item.isActive ? 'Abrir' : 'Obtener' }}
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
            <h5 class="font-semibold text-lg dark:text-white-light">List of Apps</h5>
            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="card in cards" :key="card.id"
                    class="card bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-4">
                    <a :href="card.isActive ? `/signin` : `/detail`" class="mt-6">
                        <div class="flex">
                            <div class="ltr:mr-4 rtl:ml-4">
                                <img :src="card.image" alt="" class="w-24 h-24 rounded" />
                            </div>
                            <div class="flex-1">
                                <h4 class="font-semibold text-lg mb-2 text-primary">
                                {{ card.title }}
                                <span class="ltr:float-right rtl:float-left" :class="card.isActive ? `badge bg-success`:`badge bg-info`"> {{ card.isActive ?  'Abrir' : 'Obtener' }}</span>
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
    import { ref } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Pagination, Autoplay } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import { useMeta } from '@/composables/use-meta';
    import { useAppStore } from '@/stores/index';
    useMeta({ title: 'Marketplace' });
    const store = useAppStore();
    const items = ref([
        {
            id: 1,
            image: '/assets/images/carousel1.jpeg',
            title: 'CLI Based',
            description: 'Etiam sed augue ac justo tincidunt posuere. Vivamus euismod eros, nec risus malesuada.',
            isActive: true,
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

    const cards = ref([
        {
            id: 1,
            image: '/assets/images/profile-28.jpeg',
            title: 'Forms',
            description: 'Etiam sed augue ac justo tincidunt posuere. Vivamus euismod eros, nec risus malesuada.',
            isActive: true,
        },
        {
            id: 2,
            image: '/assets/images/profile-29.jpeg',
            title: 'Maintenance',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.',
            isActive: false,
        },
        {
            id: 3,
            image: '/assets/images/profile-30.jpeg',
            title: 'Certificates',
            description: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
            isActive: true,
        },
        {
            id: 4,
            image: '/assets/images/profile-31.jpeg',
            title: 'TTM',
            description: 'Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet.',
            isActive: false,
        },
        {
            id: 5,
            image: '/assets/images/profile-5.jpeg',
            title: 'Certificates',
            description: 'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
            buttonText: 'Obtener',
            isActive: true,
        },
        {
            id: 6,
            image: '/assets/images/profile-6.jpeg',
            title: 'TTM',
            description: 'Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet.',
            buttonText: 'Get Started',
            isActive: false,
        },
    ]);
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
