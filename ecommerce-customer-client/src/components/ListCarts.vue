<template>
  <div class="p-5 d-flex justify-content-center">
    <div class="px-3">
      <!-- Carts -->
      <div v-for="cart in filterCarts" :key="cart.id" class="card mb-3 rounded-0" style="width: 640px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img  class="" :src="cart.Product.image_url" alt="">
          </div>
          <div class="col-md-8 text-start py-3 px-5">
            <div class="">
              <h5 class="fw-bold">{{ cart.Product.name }}</h5>
              <hr>
              <span class="text-muted">Stock: {{ cart.Product.stock }} pcs</span><br>
              <span class="fs-6 text-warning fw-bold">Price: {{ priceFormat(cart.Product.price) }}</span><br>
              <div class="mt-2">
                <span @click="decreaseCart(cart.id)" class="bg-light py-2 px-3 fw-bold" type="button">-</span>
                <span class="mx-3">{{ cart.quantity }}</span>
                <span @click="increaseCart(cart.id)" class="bg-light py-2 px-3 fw-bold" type="button">+</span>
                <span class="remove">
                  <svg @click="removeCart(cart.id)" class="svg-icon mx-1 text-muted" type="button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="col-sm-12 px-3 text-start" style="width: 500px;">
        <h5 v-if="filterCarts.length === 0" class="text-center">You don't have a shopping cart</h5>
        <div v-if="filterCarts.length" class="card border-0">
          <div class="card-body">
            <h5 class="card-title fw-bold">Total Payment</h5>
            <hr>
            <div v-for="cart in filterCarts" :key="cart.id" class="d-flex justify-content-between text-muted">
              <div>
                <span>
                  {{ cart.Product.name }}
                  <small>({{ cart.quantity }} pcs)</small>
                </span>
              </div>
              <div>
                <span>{{ totalPrice(cart.Product.price, cart.quantity )}}</span>
              </div>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
              <div>
                <span>Total</span>
              </div>
              <div>
                <span>{{ totalPayment }}</span>
              </div>
            </div>
            <button @click.prevent="checkoutCarts" class="btn btn-success w-100 mt-3 rounded-0">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListCarts',
  methods: {
    priceFormat (price) {
      return 'Rp. ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    totalPrice (price, qty) {
      const total = price * qty
      return this.priceFormat(total)
    },
    removeCart (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert this',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch('removeCart', id)
        }
      })
    },
    increaseCart (id) {
      this.$store.dispatch('updateCart', {
        id,
        quantity: 1
      })
    },
    decreaseCart (id) {
      this.$store.dispatch('updateCart', {
        id,
        quantity: -1
      })
    },
    checkoutCarts () {
      this.$store.dispatch('checkoutCarts')
    }
  },
  computed: {
    ...mapState([
      'carts'
    ]),
    filterCarts () {
      return this.carts.filter(el => el.checkout === false)
    },
    totalPayment () {
      let total = 0
      this.filterCarts.forEach(el => {
        total += el.quantity * el.Product.price
      })
      return this.priceFormat(total)
    }
  }
}
</script>

<style scoped>
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
