<template>
<div v-for="(items, title) in permissions" :key="title">
    <h3 class="mb-5 text-primary">{{ title }}</h3>
    <div v-for="(perms, subtitle) in items" :key="subtitle">
        <div class="grid md:grid-cols-2 xs:grid-cols-1 gap-4 my-3">
            <h4 class="font-bold">{{ subtitle }}</h4>
            <div class="text-center">
                <a href="#" @click.prevent="selectAll(title, subtitle, '_allow')" class="font-bold text-info">Permitir todo</a> |
                <a href="#" @click.prevent="selectAll(title, subtitle, '_deny')" class="font-bold text-info">Denegar todo</a> |
                <a href="#" @click.prevent="selectAll(title, subtitle, '_inherit')" class="font-bold text-info">Todo inherente del rol</a>
            </div>
        </div>
        <div class="grid md:grid-cols-2 xs:grid-cols-1 gap-4 my-2 text-center" v-for="(permLabel, permAction) in perms" :key="permAction">
            <p class="md:text-right">
                {{ permLabel }} -- {{ permAction }}
            </p>
            <div class="flex justify-center items-center gap-3 fw-bolder" role="group">
                <input
                    class="hidden"
                    type="radio"
                    value="1"
                    :id="`${subtitle}${permAction}_allow`"
                    v-model="rolData.permissions[`${subtitle}.${permAction}`]" />
                <label
                class="btn btn-sm"
                :for="`${subtitle}${permAction}_allow`"
                :class="rolData.permissions[`${subtitle}.${permAction}`]==1?'btn-success':'btn-outline-success'">
                Permitir
                </label>

                <label
                    class="btn btn-sm"
                    :for="`${subtitle}${permAction}_deny`"
                    :class="rolData.permissions[`${subtitle}.${permAction}`]==0?'btn-danger':'btn-outline-danger'">
                    Denegar
                </label>
                <input
                    class="hidden"
                    type="radio"
                    value="0"
                    :id="`${subtitle}${permAction}_deny`"
                    v-model="rolData.permissions[`${subtitle}.${permAction}`]" />

                <label
                    class="btn btn-sm"
                    :for="`${subtitle}${permAction}_inherit`"
                    :class="rolData.permissions[`${subtitle}.${permAction}`]==-1?'btn-info':'btn-outline-info'">
                    Heredar de rol
                </label>
                <input
                    class="hidden"
                    type="radio"
                    value="-1"
                    :id="`${subtitle}${permAction}_inherit`"
                    v-model="rolData.permissions[`${subtitle}.${permAction}`]" />
            </div>

        </div>
    </div>
</div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { API } from '@/services/api';
    const api = new API();

    const props = defineProps({
        rolData: {
            type: Object,
            default: () => null,
            validator: (value) => {
            return value === null || (typeof value === 'object' && value !== null);
            }
        }
        
    });

    const permissions = ref({});

    // Initialize permissions with default values
    const initializePermissions = () => {
    if (!props.rolData) {
            props.rolData = { permissions: {} };
        } else if (typeof props.rolData.permissions !== 'object') {
            props.rolData.permissions = {};
        }
    };


    // Fetch permissions from the API and initialize localPermissions
    const fetchPermissions = async () => {
        try {
            const response = await api.get('user/permissions');
            permissions.value = response.permissions;
        } catch (error) {
            console.error('Error fetching permissions:', error);
        } finally {
            initializePermissions();
        }
    };

    const selectAll = (title, subtitle, action) => {
        const value = action === '_allow' ? 1 : action === '_deny' ? 0 : -1;
        Object.keys(permissions.value[title][subtitle]).forEach(key => {
            props.rolData.permissions[subtitle+'.'+key] = value;
        });
    };

    onMounted(() => {
        fetchPermissions();
    });
</script>



<style scoped>
    h3 {
        font-size: 1.6em;
    }
    h4 {
        font-size: 1.4em;
    }
</style>
