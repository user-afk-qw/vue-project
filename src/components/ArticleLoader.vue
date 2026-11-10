<script setup>
import { useArticlesStore } from '../stores/articles'
import ArticleCard from './ArticleCard.vue'

const store = useArticlesStore()
const emit = defineEmits(['retry', 'toggle-publish', 'delete'])

if (store.articles.length === 0) {
  await store.fetchArticles()
}
</script>

<template>
  <div>
    <div v-if="store.status === 'FAILED'" class="error-msg">
      <p>{{ store.errorMessage }}</p>
      <button class="retry-btn" @click="emit('retry')">Повторить загрузку</button>
    </div>
    
    <div v-else class="grid-container">
      <ArticleCard 
        v-for="article in store.articles" 
        :key="article.id" 
        :article="article"
        @toggle-publish="emit('toggle-publish', $event)"
        @delete="emit('delete', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.error-msg { color: red; margin-top: 20px; padding: 16px; border: 1px solid red; border-radius: 8px; }
.retry-btn { margin-top: 10px; background: #42b983; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>