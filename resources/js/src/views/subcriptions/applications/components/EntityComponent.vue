<template>
    <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-5">
        <div class="mb-5">
            <label for="number">Modulo</label>
            <input id="number" type="text" placeholder="Nombre del Modulo"
                   class="form-input" v-model="model"/>
        </div>
        <div class="mb-5">
            <label for="number">Entidad</label>
            <input id="number" type="text" placeholder="Nombre del Modulo"
                   class="form-input" v-model="entity"/>
        </div>
    </div>
    <div class="mb-5">
        <label for="dateEnd">Lista de Permisos</label>
        <div class="mb-5">
            <div class="flex">
                <input id="newCheckList" type="text"
                       v-model="newPermissionsList"
                       placeholder=""
                       class="form-input ltr:rounded-r-none rtl:rounded-l-none"/>
                <button type="button"
                        class="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none"
                        @click="addPermissionsList">Agregar
                </button>
            </div>
        </div>
        <div
            class="flex flex-col rounded-md border border-[#e0e6ed] dark:border-[#1b2e4b]">
            <div v-for="(item , i) in permissions" :key="i"
                 class="flex space-x-4 rtl:space-x-reverse border-b border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5 hover:bg-[#eee] dark:hover:bg-[#eee]/10">
                <label for="tack_checkbox1" class="mb-0 cursor-pointer"
                >{{ item.label }}
                    <button
                        class="badge bg-danger my-auto ltr:ml-auto rtl:mr-auto hover:top-0 align-content-between"
                        @click="deletePermissionsList(item.id)">
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
                </label
                >
            </div>
        </div>
        <div class="text-danger mt-2" id="endDateErr"></div>
    </div>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref, defineEmits, watch} from "vue";

const props = defineProps({
    app: {
        type: Object,
        required: false,
        default: {}
    },
    companyId: {
        type: Number,
        required: false,
        default: null
    }
})
const emit = defineEmits(['permissions']);
const loading = ref(false)
const model = ref()
const entity = ref()
const permissions = ref({})
const newPermissionsList = ref()
const addPermissionsList = () => {
    if (!newPermissionsList.value) {
        return true;
    }
    const data = {
        id: permissions.value.length + 1,
        label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.${newPermissionsList.value.toLowerCase()}`
    }
    permissions.value.push(data)
    newPermissionsList.value = null
}
const deletePermissionsList = (id) => {
    const items = <any>[]
    permissions.value.map(function (x: any) {
        if (x.id === id) {
            return null
        } else {
            items.push(x)
            return x
        }
    })
    permissions.value = items
}

watch(permissions.value, () => {
    emit('permissions', permissions.value);
})
watch(() => model.value, (value) => {
    if (permissions.value.length < 1) {
        permissions.value = [
            {id: 1, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.index`},
            {id: 2, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.create`},
            {id: 3, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.edit`},
            {id: 4, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.destroy`}
        ]
    } else {
        permissions.value = permissions.value.map(x => {
            const permission = x.label.split(".")
            console.log(permission)
            return {
                id: x.id,
                label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.${permission[2]}`
            }
        })
    }

});
watch(() => entity.value, (value) => {
    if (permissions.value.length < 1) {
        permissions.value = [
            {id: 1, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.index`},
            {id: 2, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.create`},
            {id: 3, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.edit`},
            {id: 4, label: `${model.value.toLowerCase()}.${entity.value.toLowerCase()}.destroy`}
        ]
    } else {
        permissions.value = app.value.permissions.map(x => {
            const permission = x.label.split(".")
            console.log(permission)
            return {
                id: x.id,
                label: `${app.value.model.toLowerCase()}.${app.value.entity.toLowerCase()}.${permission[2]}`
            }
        })
    }
});
</script>
<style scoped>

</style>
