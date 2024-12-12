<template>
    <div>
      <label class="typo__label">{{ isTitleSelect }}</label>
      <multiselect
        v-model="optionsSelected"
        :tag-placeholder="isTitleSelect"
        :placeholder="isTitleSelect"
        :label="isLabel"
        :track-by="isValue"
        :options="options"
        :searchable="isSearchable"
        :multiple="isMultiple"
        :taggable="true"
        :preserve-search="true"
        :close-on-select="isCloseOnSelect"
        :disabled="isDisabled"
        :loading="isLoading"
        allow-empty="false"
      ></multiselect>
    </div>
  </template>

  <script setup>
    import { ref, defineProps, defineEmits, watch } from 'vue';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
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
        },
        closeOnSelect: {
            type: Boolean,
            default: true
        },
        titleSelect:{
            type: String,
            default: "Options"
        },
        label:{
            type: String,
            default: "label"
        },
        value:{
            type: String,
            default: "value"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
    });

    // Define emits
    const emit = defineEmits(['update:modelValue']);

    // Local state
    const optionsSelected = ref(props.modelValue);
    const isMultiple = ref(props.multiple);
    const isSearchable = ref(props.searchable);
    const isCloseOnSelect = ref(props.closeOnSelect);
    const isTitleSelect = ref(props.titleSelect);
    const isLabel = ref(props.label);
    const isValue = ref(props.value);
    const isDisabled = ref(props.disabled);
    const isLoading = ref(props.loading);

    // Watch for changes in modelValue prop
    watch(() => props.modelValue, (newValue) => {
      optionsSelected.value = newValue;
    });

    // Watch for changes in local value to update modelValue
    watch(optionsSelected, (newValue) => {
        emit('update:modelValue', newValue);
    });

    // Watch for changes in `disabled` prop
    watch(() => props.disabled, (newValue) => {
        isDisabled.value = newValue;
    });

    // Watch for changes in `loading` prop
    watch(() => props.loading, (newValue) => {
        isLoading.value = newValue;
    });

  </script>

  <style>
  .custom-multiselect {
    width: 100%; /* Adjust width as needed */
  }
  </style>
