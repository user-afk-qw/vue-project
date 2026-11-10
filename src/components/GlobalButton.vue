<script setup>
defineProps({
  label: { type: String, default: 'Кнопка' },
  type: { type: String, default: 'button' },
})
defineEmits(['click'])
</script>

<template>
  <button class="global-btn" :type="type" @click="$emit('click', $event)">
    {{ label }}
  </button>
</template>

<style scoped>
.global-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}
.global-btn:hover {
  background-color: #369870;
}
</style>