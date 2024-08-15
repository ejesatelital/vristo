<template>
    <div>
      <label class="typo__label">Companies</label>
      <multiselect
        v-model="value"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="label"
        track-by="value"
        :options="options"
        :searchable="isSearchable"
        :multiple="isMultiple"
        :taggable="true"
        :preserve-search="true"
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
  const value = ref(props.modelValue);
  const isMultiple = ref(props.multiple);
  const isSearchable = ref(props.searchable);

  // Watch for changes in modelValue prop
  watch(() => props.modelValue, (newValue) => {
      value.value = newValue;
    });

    // Watch for changes in local value to update modelValue
    watch(value, (newValue) => {
        console.log(newValue);
        emit('update:modelValue', newValue);
  });
  </script>

  <style>
  .custom-multiselect {
    width: 100%; /* Adjust width as needed */
  }
  </style>
