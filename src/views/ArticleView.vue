<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useArticlesStore } from '../stores/articles'
import Button from 'primevue/button'

const store = useArticlesStore()
const route = useRoute()

const article = computed(() => store.getArticleById(route.params.id))
</script>

<template>
  <div class="article-page">
    <template v-if="article">
      <h1>{{ article.title }}</h1>
      <p class="author">Автор: {{ article.author }}</p>
      <p>{{ article.body }}</p>
      <p>
        Статус:
        <strong>{{ article.isPublished ? 'Опубликована' : 'Не опубликована' }}</strong>
      </p>
      <Button
        :label="article.isPublished ? 'Снять с публикации' : 'Опубликовать'"
        @click="store.togglePublish(article.id)"
      />
    </template>
    <p v-else>Статья не найдена</p>

    <RouterLink to="/" class="back">← Назад к списку</RouterLink>
  </div>
</template>

<style scoped>
.author { color: #666; font-style: italic; margin-bottom: 16px; }
.back { display: inline-block; margin-top: 24px; color: #42b983; text-decoration: none; }
.back:hover { text-decoration: underline; }
</style>