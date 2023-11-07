import { createWebHistory, createRouter } from 'vue-router';
import FlashCardPage from '@/views/FlashCardPage.vue';
import HomePage from '@/views/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/flashcard/:module/:chapterName',
    name: 'flashcard',
    component: FlashCardPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
