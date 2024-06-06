import { createRouter, createWebHistory } from 'vue-router'
import AuthenticateUser from '@/views/AuthenticateUser.vue'
import Home from '@/views/Home.vue'
import firebase from 'firebase/app'



const routes = [
  { path: '/recipes', name: 'RView',component: () => import('../views/RView.vue'), 
    meta: { requiresAuth: true }
  },
  { path: '/profile', component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  { path: '/', 
  name: 'authenticate', 
  component: AuthenticateUser }
  ,
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/PDView/:id',
    name: 'PostDetailView',
    component: () => import('../views/PostDetailView.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/tags/:tag',
    name: 'TagRout',
    component:Home,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/ArticleEdition/:id',
    name: 'ArticleEdit',
    component: () => import('../views/ArticleEditView.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/CreatePost',
    name: 'RecipeEdition',
    component: () => import('../views/CreatePostView.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const user = firebase.auth().currentUser

  if (requiresAuth && !user) {
    next('/')
  } else {
    next()
  }
})


export default router
