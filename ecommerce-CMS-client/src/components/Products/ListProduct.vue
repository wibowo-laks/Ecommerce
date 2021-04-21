<template>
  <div class="p-3 bg-white rounded shadow-sm">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr class="product-list"
          v-for="( product, idx ) in products"
          :key="product.id">
          <th scope="row">{{ idx + 1 }}</th>
          <td class="text-primary product-name"
            @click="productDetail(product)">
            {{ product.name }}
          </td>
          <td>{{ product.Category.name }}</td>
          <td>{{ priceFormat(product.price) }}</td>
          <td>{{ product.stock }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'ListProduct',
  methods: {
    productDetail (product) {
      this.$store.dispatch('productDetail', product)
    },
    priceFormat (price) {
      const val = (price / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' IDR'
    }
  },
  computed: {
    ...mapState([
      'products'
    ])
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getCategories')
  },
  updated () {
    const length = this.products.length
    this.productDetail(this.products[length - 1])

    $('#search-task').on('keyup', function () {
      const value = $(this).val().toLowerCase()
      $('.product-list').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      })
    })
  }
}
</script>

<style>
.product-name:hover {
  cursor: pointer;
}
</style>
