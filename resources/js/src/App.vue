<template>
    <div
        class="main-section antialiased relative font-nunito text-sm font-normal"
        :class="[store.sidebar ? 'toggle-sidebar' : '', store.menu, store.layout, store.rtlClass]"
    >
        <router-view/>
    </div>
</template>

<script lang="ts" setup>
    import { useAppStore } from '@/stores/index';
    import { useMeta } from '@/composables/use-meta';
    const store = useAppStore();
    // meta
    useMeta({ title: 'Eje Satelital SAS' });

</script>
