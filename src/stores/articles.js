import { defineStore } from 'pinia'
import { fetchArticlesFromApi, createArticleOnApi, deleteArticleFromApi } from '../services/articles'
import { watch } from 'vue'

export const Types = {
  request_status: {
    REQUESTED: 'REQUESTED',
    SUCCEEDED: 'SUCCEEDED',
    FAILED: 'FAILED',
  },
}

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [],
    status: null,
    errorMessage: '',
    abortController: null,
  }),

  getters: {
    getArticleById: (state) => {
      return (id) => state.articles.find((a) => a.id === Number(id))
    },
  },

  actions: {
    async fetchArticles() {
      if (this.status === Types.request_status.REQUESTED) return

      this.status = Types.request_status.REQUESTED
      this.errorMessage = ''
      this.abortController = new AbortController()

      try {
        const data = await fetchArticlesFromApi(this.abortController.signal)
        this.articles = data
        this.status = Types.request_status.SUCCEEDED
      } catch (err) {
        if (err.name === 'AbortError') {
          this.status = Types.request_status.FAILED
          this.errorMessage = 'Загрузка отменена'
        } else {
          this.status = Types.request_status.FAILED
          this.errorMessage = err.message || 'Не удалось загрузить данные'
        }
      }
    },

    cancelFetch() {
      if (this.abortController) this.abortController.abort()
    },

    async addArticle(article) {
      try {
        const savedArticle = await createArticleOnApi(article)
        this.articles.push(savedArticle)
        console.log(`➕ Добавлена статья: "${savedArticle.title}" (id: ${savedArticle.id})`)
      } catch (error) {
        console.error('❌ Ошибка при добавлении:', error)
        alert('Не удалось добавить статью. Проверьте сервер.')
        throw error
      }
    },

    // НОВЫЙ ЭКШЕН ДЛЯ УДАЛЕНИЯ
    async deleteArticle(id) {
      try {
        await deleteArticleFromApi(id)
        // Фильтруем массив, оставляя только те статьи, у которых id НЕ равен удаляемому
        this.articles = this.articles.filter((a) => a.id !== id)
        console.log(`🗑️ Статья с id ${id} удалена`)
      } catch (error) {
        console.error('❌ Ошибка при удалении:', error)
        alert('Не удалось удалить статью.')
      }
    },

    togglePublish(id) {
      const article = this.articles.find((a) => a.id === id)
      if (article) {
        article.isPublished = !article.isPublished
      }
    },

    clearError() {
      this.status = null
      this.errorMessage = ''
    },
  },
})

export function initStoreWatchers() {
  const store = useArticlesStore()
  watch(
    () => store.articles.map((a) => ({ id: a.id, title: a.title, isPublished: a.isPublished })),
    (newVal, oldVal) => {
      newVal.forEach((newArt, index) => {
        const oldArt = oldVal[index]
        if (oldArt && newArt.isPublished !== oldArt.isPublished) {
          console.log(`🔔 Статья "${newArt.title}" (id: ${newArt.id}): статус изменён с "${oldArt.isPublished}" на "${newArt.isPublished}"`)
        }
      })
    },
    { deep: true }
  )
}