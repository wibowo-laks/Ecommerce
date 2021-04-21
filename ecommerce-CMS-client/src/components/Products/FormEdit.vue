<template>
  <div class="">
    <h4>Edit Product</h4>
    <form @submit.prevent="editProduct" class="row g-3">
      <div class="col-12">
        <label class="form-label">Name</label>
        <input v-model="productToEdit.name" type="text" class="form-control" placeholder="Name">
      </div>
      <div class="col-md-6">
        <label class="form-label">Price</label>
        <input v-model="productToEdit.price" type="number" class="form-control" placeholder="Price">
      </div>
      <div class="col-md-6">
        <label class="form-label">Stock</label>
        <input v-model="productToEdit.stock" type="number" class="form-control" placeholder="Stock">
      </div>
      <div class="col-12">
        <select v-model="productToEdit.CategoryId" class="form-select" aria-label="Default select example">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            :selected="category.id === productToEdit.CategoryId"
          >{{ category.name }}</option>
        </select>
      </div>
      <div class="col-12">
        <label class="form-label">Image Url</label>
        <input v-model="productToEdit.image_url" type="text" class="form-control" placeholder="Image Url">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-outline-primary">Edit</button>
        <button @click="closeEdit" class="btn btn-outline-secondary mx-2">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FormEdit',
  methods: {
    closeEdit () {
      this.$emit('closeEdit')
    },
    editProduct () {
      this.closeEdit()
      this.$store.dispatch('editProduct', this.productToEdit)
    }
  },
  computed: {
    ...mapState([
      'productToEdit',
      'categories'
    ])
  }

}
</script>

<style>

</style>
