<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesStore } from '../stores/articles'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'

const store = useArticlesStore()
const router = useRouter()
const submitted = ref(false)

const article = reactive({
  title: '',
  author: '',
  body: '',
  date: null,
  isPublished: false
})

async function handleSubmit() {
  submitted.value = true
  
  if (!article.title.trim() || !article.author.trim() || !article.body.trim()) {
    return
  }

  try {
    await store.addArticle({ 
      title: article.title,
      author: article.author,
      body: article.body,
      date: article.date,
      isPublished: article.isPublished
    })
    
    router.push('/')
  } catch (e) {
    // Ошибка уже обрабатывается (alert) внутри Pinia store
    console.error('Не удалось сохранить статью', e)
  }
}
</script>

<template>
  <div class="form-container">
    <h1>Добавить статью</h1>
    
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <div class="field">
        <label for="title">Заголовок *</label>
        <InputText 
          id="title" 
          v-model="article.title" 
          :invalid="submitted && !article.title" 
          placeholder="Введите заголовок" 
        />
        <small v-if="submitted && !article.title" class="p-error">Заголовок обязателен</small>
      </div>

      <div class="field">
        <label for="author">Автор *</label>
        <InputText 
          id="author" 
          v-model="article.author" 
          :invalid="submitted && !article.author" 
          placeholder="Введите имя автора" 
        />
        <small v-if="submitted && !article.author" class="p-error">Автор обязателен</small>
      </div>

      <div class="field">
        <label for="body">Текст статьи *</label>
        <Textarea 
          id="body" 
          v-model="article.body" 
          rows="5" 
          :invalid="submitted && !article.body" 
          placeholder="Введите текст" 
        />
        <small v-if="submitted && !article.body" class="p-error">Текст обязателен</small>
      </div>

      <div class="field">
        <label for="date">Дата публикации</label>
        <DatePicker id="date" v-model="article.date" dateFormat="dd.mm.yy" showIcon />
      </div>

      <div class="field-checkbox">
        <input type="checkbox" id="published" v-model="article.isPublished" />
        <label for="published">Опубликовать сразу</label>
      </div>

      <Button type="submit" label="Добавить статью" icon="pi pi-check" />
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.field label {
  font-weight: bold;
  color: #333;
}

.field-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.field-checkbox label {
  cursor: pointer;
}
</style>