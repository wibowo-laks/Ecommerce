<template>
  <div>
    <form @submit.prevent="addProduct" class="row g-3">
      <div class="col-md-6">
        <input v-model="product.name" type="text" class="form-control" placeholder="Name">
      </div>
      <div class="col-md-4">
        <input v-model="product.price" type="number" class="form-control" placeholder="Price">
      </div>
      <div class="col-md-2">
        <input v-model="product.stock" type="number" class="form-control" placeholder="Stock">
      </div>
      <div class="col-8">
        <input v-model="product.image_url" type="text" class="form-control" placeholder="Image Url">
      </div>
      <div class="col-4">
        <select v-model="product.CategoryId" class="form-select" aria-label="Default select example">
          <option selected disabled>Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{ category.name }}</option>
        </select>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-outline-primary">Add</button>
        <button @click="closeAdd" class="btn btn-outline-secondary mx-2">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FormAdd',
  data () {
    return {
      product: {
        name: '',
        price: '',
        stock: '',
        image_url: '',
        CategoryId: ''
      }
    }
  },
  methods: {
    closeAdd () {
      this.$emit('closeAdd')
    },
    addProduct () {
      this.closeAdd()
      this.$store.dispatch('addProduct', this.product)
    }
  },
  computed: {
    ...mapState([
      'categories'
    ])
  }
}
</script>

<style>

</style>
