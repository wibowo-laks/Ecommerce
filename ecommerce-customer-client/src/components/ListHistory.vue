<template>
  <div class="p-5 d-flex justify-content-center">
    <h5 v-if="filterCarts.length === 0" class="text-center">You don't have a shopping history</h5>
    <div class="px-3">
      <div v-for="cart in filterCarts" :key="cart.id" class="card mb-3" style="width: 640px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img  class="" :src="cart.Product.image_url" alt="...">
          </div>
          <div class="col-md-8 text-start p-3 align-self-center">
            <div class="px-3">
              <h5 class="fw-bold">{{ cart.Product.name }}</h5>
              <span class="text-muted">Total Item: {{ cart.quantity }} pcs</span><br>
              <span class="fs-6 text-muted">Total : {{ totalPrice(cart.Product.price, cart.quantity) }}</span><br>
              <span class="fs-6 text-muted">Date: {{ dateFormat(cart.updatedAt) }}</span><br>
              <span @click="removeHistory(cart.id)" type="button" class="text-danger">Remove history</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListHistory',
  methods: {
    priceFormat (price) {
      return 'Rp. ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    dateFormat (date) {
      return new Date(date).toLocaleString()
    },
    totalPrice (price, qty) {
      const total = price * qty
      return this.priceFormat(total)
    },
    removeHistory (id) {
      this.$store.dispatch('removeCart', id)
    }
  },
  computed: {
    ...mapState([
      'carts'
    ]),
    filterCarts () {
      return this.carts.filter(el => el.checkout === true)
    }
  }
}
</script>

<style scoped>
.card:hover {
  cursor: auto;
}
img {
  width: 220px;
  height: 190px;
  object-fit: cover;
}
.svg-icon {
  width: 1.5rem;
  height: 1.5rem;
}
.remove {
  margin-left: 1rem;
}
</style>
