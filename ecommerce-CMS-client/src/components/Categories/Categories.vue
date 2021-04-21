<template>
  <div class="w-100">
    <div class="d-flex justify-content-center w-100 px-3 py-2 text-white">
        <span class="fs-4 fw-bold">Categories</span>
    </div>
    <div class="categories p-3 bg-light rounded-start">
      <div class="d-flex justify-content-start">
        <div class="col-md-3">
          <input v-model="category" type="text" class="form-control" placeholder="Type new category">
        </div>
        <button @click.prevent="addCategory" class="btn btn-success mx-3">Add Category</button>
      </div>
      <CardCategory></CardCategory>
    </div>
  </div>
</template>

<script>
import CardCategory from './CardCategory'

export default {
  name: 'Categories',
  components: {
    CardCategory
  },
  data () {
    return {
      category: ''
    }
  },
  methods: {
    addCategory () {
      this.$store.dispatch('addCategory', this.category)
      this.category = ''
    }
  },
  created () {
    this.$store.dispatch('getCategories')
  }
}
</script>

<style scoped>
.table-wraper {
  overflow-y: auto;
  max-height: 23rem;
}
.categories {
  height: 90vh;
  overflow: auto;
}
</style>
