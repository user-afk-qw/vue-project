<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'

const router = useRouter()

const items = ref([
  { label: 'Главная', icon: 'pi pi-home', command: () => router.push('/') },
  { label: 'О нас', icon: 'pi pi-info-circle', command: () => router.push('/about') },
  { label: 'Добавить статью', icon: 'pi pi-plus', command: () => router.push('/new') },
])
</script>

<template>
  <div class="layout">
    <header class="layout-header">
      <Menubar :model="items" />
    </header>
    
    <main class="layout-main">
      <RouterView />
    </main>
  </div>
</template>

<style>
:root {
  --p-primary-color: #42b983;
  --p-primary-hover-color: #369870;
}
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f8f9fa;
}
</style>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.layout-header {
  padding: 10px;
  background: white;
  border-bottom: 1px solid #ddd;
}
.layout-main {
  padding: 20px;
  flex-grow: 1;
}
@media (min-width: 768px) {
  .layout {
    flex-direction: row;
  }
  .layout-header {
    width: 250px;
    border-bottom: none;
    border-right: 1px solid #ddd;
    padding: 20px 10px;
  }
  .layout-main {
    padding: 40px;
    flex-grow: 1;
  }
  :deep(.p-menubar-root-list) {
    flex-direction: column;
    width: 100%;
  }
  :deep(.p-menubar-item) {
    width: 100%;
  }
  :deep(.p-menubar-item-content) {
    border-radius: 6px;
    margin-bottom: 4px;
  }
}
</style>