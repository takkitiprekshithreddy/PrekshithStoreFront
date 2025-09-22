<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card h-100 border">
      <!-- Image + Bestseller Badge -->
      <div class="position-relative">
        <img
          :src="product.image || 'https://placehold.co/600x400'"
          class="card-img-top object-fit-cover"
          style="height: 200px"
        />
        <div
          v-if="product.bestSeller"
          class="position-absolute top-0 start-0 m-2 px-2 py-1 bg-success text-white rounded-pill small"
          style="font-size: 0.75rem;"
        >
          <i class="bi bi-star-fill me-1"></i>
          Bestseller
        </div>
      </div>

      <!-- Card Body -->
      <div class="card-body d-flex flex-column">
        <h5 class="card-title mb-2 fw-bold">{{ product.name }}</h5>
        <p class="card-text text-truncate-lines-2 mb-3 text-muted">
          {{ product.description }}
        </p>

        <!-- Price + Button -->
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="fw-bold me-2 fs-6 text-muted">
            <span class="price-text" :style="{textDecoration:product.salePrice?'line-through' : 'none'}">
              ₹{{ product.price.toFixed(0) }} 
            </span>
            <span v-if="product.salePrice" class="sale-text">  SALE!</span>
          </div>
          <button
            class="btn btn-view fs-6 py-2 px-3 btn-sm"
            data-bs-toggle="modal"
            :data-bs-target="`#productDetailModal-${product.id}`"
          >
            <i class="bi bi-card-list"></i> View Details
          </button>
        </div>

        <!-- Badges -->
        <!-- <div class="d-flex flex-wrap gap-2 mt-auto">
          <span class="badge rounded-pill bg-secondary px-3 py-1">{{ product.category }}</span>
          <span class="badge rounded-pill bg-secondary px-3 py-1" v-for="(tag, index) in product.tags" :key="index">{{ tag }}</span>
        </div> -->
      </div>
    </div>
    <ProductDetail :product="product"/>
  </div>
</template>

<script setup>
import ProductDetail from './ProductDetail.vue';
 const props=defineProps({
  product:Object,
 });
</script>

<style scoped>
.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: var(--bs-body-bg); /* adapts to theme */
  color: var(--bs-body-color);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.card img {
  height: 250px;
  object-fit: contain;
  padding: 10px;
  transition: transform 0.3s ease;
}

.card img:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: inherit;
}

.card-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #d4af37; /* classy gold */
  margin-bottom: 10px;
}

/* Add to Cart */
.btn-primary {
  background-color: #d4af37; /* gold */
  border: none;
  font-weight: 500;
  color: black; /* readable */
}

.btn-primary:hover {
  background-color: #c19d2b;
  color: black;
}
.sale-text{
  color: #ffd700;
}
.price-text{
  color:#007bff;
}

/* View Details */
.btn-view {
  background-color: #007bff; /* blue */
  border: none;
  font-weight: 500;
  color: white; /* default */
}

.btn-view:hover {
  background-color: #0056b3;
  color: #ffd700; /* hover gold text */
}
</style>

