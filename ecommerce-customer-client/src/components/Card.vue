<template>
  <div class="product-list mb-3 mx-2 rounded-0" style="width: 14.2rem;">
    <img :src="product.image_url" class="card-img-top rounded-0" style="height: 14rem;object-fit: cover;" alt="...">
    <div class="card-body fs-6 p-2 text-start">
      <small class="lh-1 text-uppercase">{{ product.name }}</small><br>
      <small class="fw-bold text-warning">{{ priceFormat(product.price) }}</small><br>
      <small class="text-muted">In Stock: {{ product.stock }}</small><br>
      <button @click="addCart(product.id)" class="btn btn-outline-dark w-100 mt-3 rounded-0">Add To Cart</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Card',
  props: ['product'],
  methods: {
    priceFormat (price) {
      return 'Rp. ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    addCart (id) {
      if (this.isLogin) {
        this.$store.dispatch('addCart', {
          productId: id,
          quantity: 1
        })
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  }
}
</script>

<style>
.product-list:hover {
  cursor: pointer;
  transform: scale(1.05);
}
</style>
