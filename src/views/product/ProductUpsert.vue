<template>
     <div class="container">
    <div class="row border p-4 my-5 rounded">
      <div class="col-9">
        <form @submit.prevent="handleSubmit">
          <div class="h2 text-center text-gold">{{ productIdForUpdate?'Update' : 'Create' }} Product</div>
          <hr />
          <div v-if="errorList.length>0" class="alert alert-danger pb-0">
            Please fix the following errors:
            <ul>
              <li v-for="error in errorList" :key="error">{{ error }}</li>
            </ul>
          </div>

          <div class="mt-3">
            <span class="text-muted">Name</span>
            <input v-model.trim="productObj.name" type="text" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Description</span>
            <textarea v-model="productObj.description" type="text" class="form-control"></textarea>
          </div>
          <div class="mt-3">
            <span class="text-muted">Price</span>
            <input v-model.number="productObj.price" type="number" class="form-control" />
          </div>

          <div class="mt-3">
            <span class="text-muted">Sale Price</span>
            <input v-model.number="productObj.salePrice" type="number" class="form-control" />
          </div>
          <div class="mt-3">
            <span class="text-muted">Tags (comma-seperated)</span>
            <input
              v-model="productObj.tags"
              type="text"
              class="form-control"
              placeholder="e.g., modern, classic, luxury"
            />
          </div>
          <div class="form-check form-switch pt-3">
            <input v-model="productObj.isBestSeller" class="form-check-input" type="checkbox" role="switch" />

            <label class="form-check-label" for="bestseller">
              Bestseller
            </label>
          </div>
          <div class="mt-3">
            <label class="text-muted">Category</label>
            <select class="form-select" v-model="productObj.category">
              <option  v-for="option in PRODUCT_CATEGORIES" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Image</label>
            <div class="input-group">
              <input type="file" class="form-control" 
              @change="handleImageUpload"
              :disable="isImageLoading"/> 
            </div>
          </div>
          <div class="pt-3">
            <button :disabled="loading || isImageLoading"  class="btn btn-purple m-2 w-25">
              <span v-if="loading || isImageLoading" class="spinner-border spinner-border-sm me-2"></span>Submit
            </button>
            <router-link :to="{name:APP_ROUTE_NAMES.PRODUCT_LIST}" class="btn btn-secondary m-2 w-25"> Cancel </router-link>
          </div>
        </form>
      </div>
      <div class="col-3">
        <img
          :src="productObj.image? productObj.image:`https://placehold.co/600x400`"
          class="img-fluid w-100 m-3 p-3 rounded"
          alt="Product
        preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive,ref,onMounted } from 'vue';
  import { useRouter,useRoute } from 'vue-router';
  import { PRODUCT_CATEGORIES } from '@/constants/appConstants';
  import { useSwal } from '@/composibles/useSwal';
  import productService from '@/services/productService';
  import { APP_ROUTE_NAMES } from '@/constants/routeNames';
  import { uploadToCloudinary } from '@/utility/cloudinary';
  const {showSuccess,showError,showConfirm} = useSwal()
  const router=useRouter();
  const route=useRoute();
  const errorList=reactive([]);
  const loading=ref(false);
  const isImageLoading=ref(false);
  const productObj= reactive({
    name:'',
    description:'',
    price:0,
    salePrice:0,
    tags:[], //comma seperated values
    isBestSeller:false,
    category:'',
    image:'https://placehold.co/600x400'
  })

    // showError('Product creation failed');
    // showConfirm('Are you sure?');
    const productIdForUpdate=route.params.id;
    onMounted(async() => {
      if (!productIdForUpdate) return;
      loading.value=true;
      try{
        const product=await productService.getProductById(productIdForUpdate)
        //Object.assign anedhi nee okka taret object ki very sources of objects dwara vaati okka properties ni copy chesthadi
        // so productObj ane target object lo nuvvu parameter lo unna id tho unna product ni retrive chesukoni dhaani proprties productObj ki assign chesav
        Object.assign(productObj,{...product,tags:product.tags.join(", ")})//correct comman ledha check chesuko
      }
      catch(e){
        console.log(e);
      }
      finally{
        loading.value=false;
      }
    })
  
  async function handleSubmit(){
    try{
      loading.value=true
      //clearing all errors
      errorList.length=0;
      //validations
      if (productObj.name.length<2){
        errorList.push('Name should be atleast 3 char long.')
      }
      if (productObj.price <= 0){
        errorList.push('Price should be greater than 0.')
      }
      if (productObj.category===''){
        errorList.push('Please select a category.')
      }
      if (!errorList.length){
        const productData={
          ...productObj,
          price:Number(productObj.price),
          salePrice:productObj.salePrice? Number(productObj.salePrice) :null,
          tags:productObj.tags.length>0? productObj.tags.split(',').map((tag) => tag.trim()) : [],
          bestseller:Boolean(productObj.isBestSeller)
        };
      if (productIdForUpdate){
        //update
        await productService.updateProduct(productIdForUpdate,productData)
        showSuccess('Product updated successfully')
      }
      else{
        //create
        await productService.createProduct(productData);
        showSuccess('Product created successfully');
      }
        router.push({name:APP_ROUTE_NAMES.PRODUCT_LIST})
        console.log(productData);
      }
    }
    catch(e){
      console.log(e)
    }
    finally{
      loading.value=false;
    }
  }
  async function handleImageUpload(event){
    const file=event.target.files[0]
    if(!file) return;

    try{
      isImageLoading.value=true
      const imageUrl=await uploadToCloudinary(file);
      productObj.image=imageUrl;
    }
    catch(e){
      console.log(e)
      throw e
    }
    finally{
      isImageLoading.value=false;
    }
  }
</script>

<style scoped>
.btn-purple {
  background-color: #6f42c1; /* Purple */
  border-color: #6f42c1;
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
}
.text-gold {
  color: #daa520; /* GoldenRod shade */
  font-weight: 600;
}


.btn-purple:hover {
  background-color: #5a32a3; /* Darker purple */
  border-color: #5a32a3;
  color: #fff;
}

</style>