<template>
      <div>
    <div
      class="bg-success w-100 position-relative overflow-hidden mb-4 py-5 d-flex align-items-center hero-section">
      <div
        class="position-absolute top-0 start-0 w-100 h-100"
      ></div>

      <div class="container-fluid position-relative z-1">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8 col-xl-7">
            <h1 class="display-14 fw-bold text-white mb-3">
              Discover, Shop, and Shine — All in One Place.
            </h1>
            <div
              class="input-group mt-3 mx-auto shadow-lg rounded-4"
              style="max-width: 700px"
            >
              <input
                type="text"
                class="form-control border-0 py-3 px-4 fs-5"
                placeholder="Search your favorite product..."
                v-model="searchValue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="product-list" class="container">
      <h2 class="mb-5 text-center display-6">Discover Our Collection</h2>

      <div class="row g-3 mb-4 align-items-center">
        <div class="col-md-auto">
          <div class="d-flex flex-wrap gap-3">
            <button v-for="(category,index) in categoryList" 
            :key="index" class="category-button"
            :class="{
              'btn-success text-white' : category===selectedCategory,
              'btn-outline-success' : category!==selectedCategory,
            }"
            @click="selectedCategory=category"
            >{{ category }}</button>
          </div>
        </div>
        <div class="col-md-auto ms-md-auto">
          <div class="dropdown sort-dropdown">
            <button
              class="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-sort-down"></i>
              <span class="text-capitalize">{{ selectedSortOption }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li v-for="(sort,index) in SORT_OPTIONS" :key="index">
                <button
                  class="dropdown-item py-2 d-flex align-items-center gap-2"
                  @click="selectedSortOption=sort"
                >
                  <i class="bi"></i>
                  <span class="text-capitalize"> {{ sort }} </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div v-if="filteredProductsList.length>0" class="row g-4 pb-4">
            <ProductCard v-for="product in filteredProductsList" :key="product.id" :product="product"></ProductCard>
        </div>
        <div v-else>
          <h3 class="text-center">No Products Found</h3>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import productService from '@/services/productService';
import ProductCard from '@/components/Product/ProductCard.vue';
import { PRODUCT_CATEGORIES,SORT_NAME_A_Z,SORT_NAME_Z_A,SORT_PRICE_HIGH_LOW,SORT_PRICE_LOW_HIGH,SORT_OPTIONS} from '@/constants/appConstants';
import { computed, onMounted, ref } from 'vue';
import { useSwal } from '@/composibles/useSwal';
import { useRouter,useRoute } from 'vue-router';
import { APP_ROUTE_NAMES } from '@/constants/routeNames';
// const  {showSuccess,showError,showConfirm}=useSwal()
const products=ref([]);
const loading=ref(false);
const selectedCategory=ref("ALL");
const categoryList=ref(["ALL",...PRODUCT_CATEGORIES])
const searchValue=ref('');
const selectedSortOption=ref(SORT_OPTIONS[0])
onMounted(() => {
    fetchProducts();
})

const fetchProducts = async() => {
    try{
        loading.value=true;
        //the below line is just to check wheather loading is working or noy
        // await new Promise((resolve) => setTimeout(resolve,2000)) 
        products.value=await productService.getProducts();
    }
    catch(e){
        console.log(e);
    }
    finally{
        loading.value=false;
    }
}

const filteredProductsList=computed(() => {
  let tempArray=
      selectedCategory.value === "ALL"? [...products.value]:
      products.value.filter((item) => item.category.toLowerCase()===selectedCategory.value.toLowerCase());

  if (searchValue.value){
    tempArray=tempArray.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.value.toLowerCase());
    })
  }

  if (selectedSortOption.value===SORT_NAME_A_Z){
    tempArray.sort((a,b)=>a.name.localeCompare(b.name))
  };
  
  if (selectedSortOption.value===SORT_NAME_Z_A){
    tempArray.sort((a,b)=>b.name.localeCompare(a.name))
  };
  
  if (selectedSortOption.value===SORT_PRICE_HIGH_LOW){
    tempArray.sort((a,b)=>b.price-a.price)
  };
   if (selectedSortOption.value===SORT_PRICE_LOW_HIGH){
    tempArray.sort((a,b)=>a.price-b.price)
  };

  return tempArray;
});

</script>

<style scoped>
.home-container {
  background-color: #f5f5f5; /* neutral background */
  min-height: 100vh;
  padding: 2rem 1rem;
}

/* Hero Section (Your One-Stop...) */
.hero-section {
  background: linear-gradient(135deg, #1a1a1a, #333);
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 12px;
  margin-bottom: 2rem;
  color: #fff;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #d4af37; /* classy gold */
}

.hero-section p {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #e0e0e0;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
.sort-dropdown .btn {
  background-color: #ffa94d;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.2s ease-in-out;
}

.sort-dropdown .btn:hover {
  background-color: #ff922b;
  color: #fff;
}

.sort-dropdown .btn:active {
  background-color: #e67e22 !important;
  color: #fff !important;
}

.sort-dropdown .dropdown-menu {
  background-color: #ffa94d;
  border: none;
  border-radius: 8px;
  padding: 6px 0;
  min-width: 160px;
}

.sort-dropdown .dropdown-item {
  color: #fff !important;
  font-weight: 500;
  transition: background 0.2s ease-in-out;
}

.sort-dropdown .dropdown-item:hover {
  background-color: #ff922b;
  color: #fff !important;
}

.sort-dropdown .dropdown-item:active {
  background-color: #e67e22 !important;
  color: #fff !important;
}
.category-button {
  background-color: #131921;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.category-button:hover {
  background-color: #febd69;
  color: #000;
}

.category-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(254, 189, 105, 0.6);
}

</style>
