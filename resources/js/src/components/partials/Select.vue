<template>
    <div>
      <label class="typo__label">Companies</label>
      <multiselect
        v-model="companiesSelected"
        tag-placeholder="Asignar empresa"
        placeholder="Buscar empresa"
        label="label"
        track-by="value"
        :options="options"
        :searchable="isSearchable"
        :multiple="isMultiple"
        :taggable="true"
        :preserve-search="true"
        @select="handleSelection"
      ></multiselect>
    </div>
  </template>

  <script setup>
    import { ref, defineProps, defineEmits, watch } from 'vue';
    import Multiselect from 'vue-multiselect';

    // Define props
    const props = defineProps({
        options: {
            type: Array,
            required: true
        },
        modelValue: {
            type: Array,
            default: () => []
        },
        multiple: {
            type: Boolean,
            default: false
        },
        searchable: {
            type: Boolean,
            default: true
        }

    });

    // Define emits
    const emit = defineEmits(['update:modelValue']);

    // Local state
    const companiesSelected = ref(props.modelValue);
    const isMultiple = ref(props.multiple);
    const isSearchable = ref(props.searchable);

    // Watch for changes in modelValue prop
    watch(() => props.modelValue, (newValue) => {
      companiesSelected.value = newValue;
    });

    // Watch for changes in local value to update modelValue
    watch(companiesSelected, (newValue) => {
        emit('update:modelValue', newValue);
    });

    const handleSelection = (value) => {
        const companyIds = companiesSelected.value.map(option => option.value).join(',');
    };

  </script>

  <style>
  .custom-multiselect {
    width: 100%; /* Adjust width as needed */
  }
  </style>
