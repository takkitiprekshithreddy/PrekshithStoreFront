<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top shadow-sm">
    <div class="container-fluid">
      <img
        src="../../assets/PSFlogo.png"
        style="width: 80px"
        class="mx-3"
        alt="PrekshithStoreFront"
      />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.HOME }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.CART }"
            >
              Cart
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.WISHLIST }"
            >
              Wishlist
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.CONTACT_US }"
              >Contact Us</router-link
            >
          </li>
        </ul>
        <ul class="d-flex navbar-nav">
          <li class="nav-link" v-if="authStore.isAuthenticated">
            {{ authStore.user.email }}
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-laptop"></i>
            </a>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('light')">
                  <i class="bi bi-sun"></i> &nbsp; Light
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('dark')">
                  <i class="bi bi-moon-stars-fill"></i> &nbsp; Dark
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.SIGN_IN }"
              >Sign In</router-link
            >
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <router-link
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.SIGN_UP }"
              >Sign Up</router-link
            >
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <button
              @click="[authStore.signOutUser(), router.push({ name: APP_ROUTE_NAMES.HOME })]"
              class="nav-link"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { auth } from '@/utility/firebaseConfig'
const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()
</script>

<style scoped>
.navbar {
  background-color: #131921; /* Amazon dark navy background */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1030;
}

.navbar-nav .nav-link {
  color: #b8a74b; /* Gold-ish text */
  font-weight: 500;
  padding: 8px 16px;
  transition: color 0.2s ease-in-out;
}

.navbar-nav .nav-link:hover {
  color: #febd69; /* Amazon yellow on hover */
}
</style>
