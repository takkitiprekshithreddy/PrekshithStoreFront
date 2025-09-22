import { createRouter, createWebHistory } from 'vue-router'
import AccessDenied from '@/views/auth/AccessDenied.vue'
import NotFound from '@/views/auth/NotFound.vue'
import SignIn from '@/views/auth/SignIn.vue'
import SignUp from '@/views/auth/SignUp.vue'
import ContactUs from '@/views/home/ContactUs.vue'
import Home from '@/views/home/Home.vue'
import ProductList from '@/views/product/ProductList.vue'
import ProductUpsert from '@/views/product/ProductUpsert.vue'
import Cart from '@/views/home/Cart.vue'
import WishList from '@/views/home/WishList.vue'
//importing routename constants from routeNames.js
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: APP_ROUTE_NAMES.HOME,
      component: Home,
    },
    {
      path: '/access-denied',
      name: APP_ROUTE_NAMES.ACCESS_DENIED,
      component: AccessDenied,
    },
    {
      path: '/not-found',
      name: APP_ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
    },
    {
      path: '/sign-in',
      name: APP_ROUTE_NAMES.SIGN_IN,
      component: SignIn,
    },
    {
      path: '/sign-up',
      name: APP_ROUTE_NAMES.SIGN_UP,
      component: SignUp,
    },
    {
      path: '/contact-us',
      name: APP_ROUTE_NAMES.CONTACT_US,
      component: ContactUs,
    },
    {
      path: '/product-list',
      name: APP_ROUTE_NAMES.ADMIN_PANEL,
      component: ProductList,
      beforeEnter: [isAdmin],
    },
    {
      path: '/product-create',
      name: APP_ROUTE_NAMES.PRODUCT_CREATE,
      component: ProductUpsert,
      beforeEnter: [isAdmin],
    },
    {
      path: '/product-update/:id',
      name: APP_ROUTE_NAMES.PRODUCT_UPDATE,
      component: ProductUpsert,
      beforeEnter: [isAdmin],
    },
    {
      path: '/cart',
      name: APP_ROUTE_NAMES.CART,
      component: Cart,
    },
    {
      path: '/wishlist',
      name: APP_ROUTE_NAMES.WISHLIST,
      component: WishList,
    },
    {
      path: '/:pathMatch(.*)*',
      name: APP_ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
    },
  ],
})

//navigationgaurd
router.beforeEach(async (toString, from) => {
  const authStore = useAuthStore()
  if (!authStore.initialized) {
    await authStore.initializeAuth()
  }
})

function isAdmin() {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return true
    } else {
      return { name: APP_ROUTE_NAMES.ACCESS_DENIED }
    }
  } else {
    return { name: APP_ROUTE_NAMES.SIGN_IN }
  }
}

function isAuthenticated() {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    return true
  } else {
    return { name: APP_ROUTE_NAMES.SIGN_IN }
  }
}
export default router
