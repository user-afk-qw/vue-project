import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import ConfirmationService from 'primevue/confirmationservice'
import App from './App.vue'
import router from './router'
import GlobalButton from './components/GlobalButton.vue'
import { initStoreWatchers } from './stores/articles'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.my-app-dark',
    }
  },
  licenseKey: 'eyJpZCI6IjRhMDhjMTM4LWNjZTYtNGZlYy05ZWMwLTQ5OTBmN2FjOWFmNCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTQyOTAwNTcsImV4cCI6MTgyNTgyNjA1N30',
  locale: {
    accept: 'Да',
    reject: 'Нет',
    choose: 'Выбрать',
    upload: 'Загрузить',
    cancel: 'Отмена',
    dateFormat: 'dd.mm.yy',
    firstDayOfWeek: 1,
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dayNamesMin: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    today: 'Сегодня',
    clear: 'Очистить'
  },
  
})
app.use(ConfirmationService)
app.component('GlobalButton', GlobalButton)

initStoreWatchers()

app.mount('#app')