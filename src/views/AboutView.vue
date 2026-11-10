<script setup>
import { ref } from 'vue'
import Carousel from 'primevue/carousel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import OrderList from 'primevue/orderlist'

const carouselItems = ref([
  { id: 1, title: 'Наш офис в Москве', text: 'Главный офис с 2010 года.' },
  { id: 2, title: 'Команда', text: 'Более 500 сотрудников по всей России.' },
  { id: 3, title: 'Разработка', text: 'Собственный отдел инноваций.' }
])

const offices = ref([
  { id: 1, city: 'Москва', employees: 300, year: 2010 },
  { id: 2, city: 'Санкт-Петербург', employees: 150, year: 2015 },
  { id: 3, city: 'Казань', employees: 50, year: 2018 }
])

const values = ref([
  { id: 1, name: 'Клиентоориентированность' },
  { id: 2, name: 'Инновации' },
  { id: 3, name: 'Качество' },
  { id: 4, name: 'Командная работа' }
])
</script>

<template>
  <div class="about-page">
    <h1>О нашей компании</h1>
    <p class="intro">
      Мы — ведущая IT-компания, специализирующаяся на разработке веб-приложений и внедрении инновационных решений с 2010 года.
    </p>

    <!-- КАРУСЕЛЬ -->
    <h2>Наши преимущества</h2>
    <Carousel :value="carouselItems" :numVisible="1" :numScroll="1" circular class="mb-4">
      <template #item="slotProps">
        <div class="carousel-item">
          <h3>{{ slotProps.data.title }}</h3>
          <p>{{ slotProps.data.text }}</p>
        </div>
      </template>
    </Carousel>

    <!-- СПИСОК (OrderList) - ИСПРАВЛЕННЫЙ ВАРИАНТ -->
    <h2>Наши ценности</h2>
    <p>Вы можете изменить порядок приоритета, перетаскивая элементы:</p>
    
    <div class="order-list-wrapper">
      <!-- Используем :modelValue вместо v-model -->
      <OrderList 
        :modelValue="values" 
        @update:modelValue="values = $event"
        dataKey="id"
        class="w-full"
      >
        <!-- В PrimeVue 4 слот называется #option, а не #item -->
        <template #option="slotProps">
          <div style="display: flex; align-items: center; gap: 10px; padding: 8px;">
            <i class="pi pi-check-circle" style="color: #42b983; font-size: 1.2rem;"></i>
            <span style="font-size: 1rem; color: #333;">{{ slotProps.option.name }}</span>
          </div>
        </template>
      </OrderList>
    </div>

    <!-- ТАБЛИЦА (DataTable) -->
    <h2>Наши филиалы</h2>
    <DataTable :value="offices" tableStyle="min-width: 50rem">
      <Column field="city" header="Город" sortable></Column>
      <Column field="employees" header="Сотрудников" sortable></Column>
      <Column field="year" header="Год открытия" sortable></Column>
    </DataTable>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  color: #333;
}

h2 {
  margin-top: 40px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 8px;
}

.intro {
  font-size: 18px;
  color: #555;
  margin-bottom: 24px;
}

.mb-4 {
  margin-bottom: 24px;
}

.carousel-item {
  background: white;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #ddd;
  text-align: center;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.carousel-item h3 {
  color: #42b983;
  margin: 0 0 10px 0;
}

.carousel-item p {
  margin: 0;
}

/* Стили для списка */
.order-list-wrapper {
  margin-bottom: 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

/* Принудительно задаем высоту списка */
:deep(.p-orderlist-list) {
  min-height: 200px;
  padding: 10px;
  background: white;
}

:deep(.p-orderlist-item) {
  border-radius: 4px;
  margin-bottom: 4px;
  transition: background 0.2s;
}

:deep(.p-orderlist-item:hover) {
  background: #f0fdf4;
}
</style>