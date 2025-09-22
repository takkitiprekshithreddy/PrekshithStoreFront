<template>
  <footer class="footer bg-dark text-white mt-5 py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-center text-md-start">
          <h5 class="footer-title">Prekshith Store</h5>
          <p class="footer-description">
            Discover, Shop, and Shine — Your one-stop online store for all your favorite products.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <p class="copyright">© 2025 PrekshithManagement. All rights reserved.</p>
        </div>
      </div>
      <hr class="footer-divider" />
      <div class="row">
        <div class="col-12 text-center">
          <nav class="footer-nav">
            <router-link :to="{ name: APP_ROUTE_NAMES.HOME }" class="footer-link">
              Home
            </router-link>
            |
            <router-link :to="{ name: APP_ROUTE_NAMES.ADMIN_PANEL }" class="footer-link">
              Admin Panel
            </router-link>
            |
            <router-link :to="{ name: APP_ROUTE_NAMES.CONTACT_US }" class="footer-link">
              Contact
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
</script>

<style scoped>
.footer {
  background-color: #1a1a2e !important;
  margin-top: auto;
}

.footer-title {
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.footer-description {
  color: #b8c6db;
  margin-bottom: 0;
}

.copyright {
  color: #b8c6db;
  margin-bottom: 0;
}

.footer-divider {
  border-color: #444;
  margin: 1.5rem 0;
}

.footer-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.footer-link {
  color: #b8c6db;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer-nav {
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer-nav span {
    display: none;
  }
}
</style>
