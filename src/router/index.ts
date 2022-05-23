import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomePage from '../components/pages/HomePage.vue';
import ArticleView from '../components/pages/ArticleView.vue';
import LoginForm from '../components/forms/LoginForm.vue';
import SignupForm from '../components/forms/SignupForm.vue';
import TestFile from '../components/pages/TestFile.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupForm,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/test',
      name: 'test',
      component: TestFile,
    },
  ],
});

const getCurrentUser = () => new Promise((resolve, reject) => {
  const removeListener = onAuthStateChanged(
    getAuth(),
    (user) => {
      removeListener();
      resolve(user);
    },
    reject,
  );
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You Don't' Have Access Login Please");
      next('/');
    }
  } else {
    next();
  }
});

export default router;
