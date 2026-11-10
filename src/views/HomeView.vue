<script setup>
import { ref } from 'vue'
import { useArticlesStore } from '../stores/articles'
import ArticleLoader from '../components/ArticleLoader.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'

const store = useArticlesStore()
const confirm = useConfirm()
const loaderKey = ref(0)

function cancelFetch() {
  store.cancelFetch()
}

function handleRetry() {
  store.clearError() 
  loaderKey.value++  
}

function togglePublish(id) {
  store.togglePublish(id)
}

// ОБНОВЛЕННАЯ ФУНКЦИЯ УДАЛЕНИЯ
function confirmDelete(id) {
  confirm.require({
    message: 'Вы уверены, что хотите удалить эту статью?',
    header: 'Подтверждение',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Отмена',
    acceptLabel: 'Удалить',
    acceptClass: 'p-button-danger',
    accept: () => {
      store.deleteArticle(id) // <-- Вызываем удаление из Pinia
    }
  })
}
</script>

<template>
  <div>
    <div class="header-actions">
      <h1>Мои статьи</h1>
      <RouterLink to="/new">
        <Button label="Добавить статью" icon="pi pi-plus" />
      </RouterLink>
    </div>

    <div v-if="true" :key="loaderKey">
      <Suspense>
        <template #default>
          <ArticleLoader 
            @retry="handleRetry"
            @toggle-publish="togglePublish"
            @delete="confirmDelete"
          />
        </template>
        <template #fallback>
          <div class="loading-container">
            <div class="spinner"></div>
            <p>Загрузка статей...</p>
            <Button label="Отменить загрузку" severity="danger" @click="cancelFetch" />
          </div>
        </template>
      </Suspense>
    </div>

    <ConfirmDialog />
  </div>
</template>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 10px;
}
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>