<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">Page Not Found</h2>
      <p class="error-message">
        The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <div class="error-actions">
        <router-link :to="{ name: APP_ROUTE_NAMES.HOME }" class="btn btn-purple me-3">
          <i class="bi bi-house-door me-2"></i>
          Go Home
        </router-link>
        <button @click="goBack" class="btn btn-purple">
          <i class="bi bi-arrow-left me-2"></i>
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
/* Purple button (same as above) */
.btn-purple {
  background-color: #6f42c1;
  border-color: #6f42c1;
  color: #fff;
  font-weight: 600;
  transition:
    background 0.15s,
    border 0.15s;
}
.btn-purple:hover,
.btn-purple:focus,
.btn-purple:active {
  background-color: #5a32a3 !important;
  border-color: #5a32a3 !important;
  color: #fff !important;
}
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c1b33, #1a1a2e);
  padding: 40px 20px;
}
.error-content {
  text-align: center;
  color: #fff;
  max-width: 500px;
}
.error-icon {
  font-size: 5rem;
  color: #ffc107;
  margin-bottom: 30px;
}
.error-code {
  font-size: 8rem;
  font-weight: 900;
  margin: 0 0 20px 0;
  color: #667eea;
  line-height: 1;
}
.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #fff;
}
.error-message {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 40px;
  color: #b8c6db;
}
.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}
@media (max-width: 576px) {
  .error-code {
    font-size: 6rem;
  }
  .error-title {
    font-size: 2rem;
  }
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  .error-actions .btn {
    width: 200px;
    margin-bottom: 10px;
  }
}
</style>
