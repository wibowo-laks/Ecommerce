<template>
  <div class="w-100">
    <div class="d-flex justify-content-between w-100 px-3 py-2 text-white">
        <div>
          <button @click="isAdd = !isAdd" class="btn btn-success">New Product</button>
        </div>
        <span class="fs-4 fw-bold">Products</span>
        <div class="mx-2">
          <input class="form-control" id="search-task" type="search" placeholder="Search Product">
        </div>
    </div>
    <div class="products d-flex justify-content-between p-3 bg-light rounded-start">
      <div class="w-70 rounded">
        <div v-if="isAdd" class="p-3 mb-2 bg-white rounded shadow-sm">
          <FormAdd
            @closeAdd="closeAdd"
          ></FormAdd>
        </div>
        <div :class="checkAdd">
          <ListProduct></ListProduct>
        </div>
      </div>
      <div class="body-product w-30 p-3 bg-white rounded shadow-sm">
        <CardProduct></CardProduct>
      </div>
    </div>
  </div>
</template>

<script>
import FormAdd from './FormAdd'
import ListProduct from './ListProduct'
import CardProduct from './CardProduct'

export default {
  name: 'Products',
  components: {
    FormAdd,
    ListProduct,
    CardProduct
  },
  data () {
    return {
      isAdd: false
    }
  },
  methods: {
    closeAdd () {
      this.isAdd = false
    }
  },
  computed: {
    checkAdd () {
      if (this.isAdd) {
        return { 'table-wraper': true }
      } else {
        return { 'table-wraper2': true }
      }
    }
  }
}
</script>

<style>
.table-wraper {
  overflow-y: auto;
  max-height: 20rem;
}
.table-wraper2 {
  overflow-y: auto;
  max-height: 37rem;
}
.products {
  height: 90vh;
}
.body-product {
  overflow-y: auto;
  height: 87vh;
}
.w-70 {
  width: 70%;
}
.w-30 {
  width: 30%;
  margin-left: .5rem;
}
</style>
