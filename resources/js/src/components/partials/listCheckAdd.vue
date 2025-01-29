<template>
    <div class="mb-5">
        <label for="dateEnd">{{ title }}</label>
        <div class="mb-5">
            <div class="flex">
                <input id="newCheckList" type="text" v-model="newCheckList"
                    :placeholder="placeholder"
                    class="form-input ltr:rounded-r-none rtl:rounded-l-none"/>
                <button type="button"
                        class="btn btn-secondary ltr:rounded-l-none rtl:rounded-r-none"
                        @click="addCheckList">Agregar
                </button>
            </div>
        </div>

        <div class="flex flex-col rounded-md border border-[#e0e6ed] dark:border-[#1b2e4b] max-h-60 overflow-y-auto">
            <div v-for="(item, i) in modelValue" :key="i"
                class="flex items-center justify-between border-b px-4 py-3 hover:bg-gray-100"
            >
                <div>
                    <label class="inline-flex items-center mt-1 cursor-pointer">
                        <input type="checkbox" class="form-checkbox"
                            :id="`checklist${i}`"
                            v-model="item.value"/>
                        <span class="ml-2 text-gray-800"> {{ item.label }}</span>
                    </label>
                </div>

                <!-- Botón de eliminar -->
                <button
                    class="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    @click="deleteCheckList(item.id)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>

        <div class="text-danger mt-2" id="endDateErr"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps({
    modelValue: Array, // Prop para v-model
    title: {
        type: String,
        default: "Lista de checkeo",
    },
    placeholder: {
        type: String,
        default: "Agregar ítem",
    }
});

const emit = defineEmits(["update:modelValue"]);

const newCheckList = ref("");

const addCheckList = () => {
    if (!newCheckList.value) return;

    const data = {
        id: props.modelValue.length + 1,
        label: newCheckList.value,
        value: false
    };

    emit("update:modelValue", [...props.modelValue, data]); // Actualiza la lista
    newCheckList.value = "";
};

const deleteCheckList = (id: number) => {
    const updatedList = props.modelValue.filter(item => item.id !== id);
    emit("update:modelValue", updatedList);
};
</script>
