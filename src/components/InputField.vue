<template>
  <div class="col-md-6 mb-3">
    <label :for="name">{{ label }}</label>
    <input 
      :id="name"
      :name="name"
      :type="type || 'text'" 
      class="form-control" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
    />
  </div>
</template>

<script setup>
const props = defineProps(['modelValue', 'label', 'type']);
const emit = defineEmits(['update:modelValue']);

const name = props.label.toLowerCase().replace(/\s+/g, '_');
</script>
