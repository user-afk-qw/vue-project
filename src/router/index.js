import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/new', name: 'new-article', component: () => import('../views/NewArticleView.vue') },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/ArticleView.vue'),
      props: true,
    },
  ],
})

export default router