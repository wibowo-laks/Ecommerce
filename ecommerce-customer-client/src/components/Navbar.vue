<template>
  <nav class="navbar fixed-top px-5 bg-dark shadow-sm py-3">
    <div class="nav-bg container-fluid">
      <div class="d-flex justify-content-start">
        <router-link to="/" class="text-decoration-none">
          <a class="navbar-brand" href="#">
            <span class="fs-4 text-white">MyShopii</span>
          </a>
        </router-link>
      </div>
      <!-- Cart, If Login -->
      <div v-if="isLogin" class="d-flex justify-content-end">
        <router-link to="/carts">
          <button class="align-self-center btn position-relative">
            <svg class="cart-icon text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <small v-if="totalCarts !== 0" class="cart-num bg-danger text-white fw-bold rounded-circle position-absolute">{{ totalCarts }}</small>
          </button>
        </router-link>
        <div class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ account }}
          </a>
          <ul class="dropdown-menu bg-dark rounded-0" aria-labelledby="navbarDropdown">
            <router-link to="/history" class="text-decoration-none">
              <li><a class="dropdown-item text-white" href="#">history</a></li>
            </router-link>
            <li><a @click="logout" class="dropdown-item text-white" href="#">logout</a></li>
          </ul>
        </div>
      </div>
      <!-- If Not Login -->
      <div v-if="!isLogin">
        <router-link to="/login">
          <button class="btn btn-light btn-login mx-2 rounded-0">Login</button>
        </router-link>
        <router-link to="/register">
          <button class="btn btn-outline-light btn-register rounded-0">Register</button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('setLogin', false)
      if (this.$router.history.current.name !== 'Home') {
        this.$router.push('/')
      }
    }
  },
  computed: {
    ...mapState([
      'isLogin',
      'account',
      'carts'
    ]),
    totalCarts () {
      const activeCarts = this.carts.filter(el => el.checkout === false)
      return activeCarts.length
    }
  }
}
</script>

<style scoped>
.cart-icon {
  width: 1.5rem;
  height: 1.5rem;
}
.cart-num {
  font-size: .8rem;
  padding: 1px 6px;
  top: 0;
  right: .1px;
}
.notif {
  font-size: .8rem;
  padding: 1px 6px;
  top: 0;
  right: .1px;
}
.dropdown-item:hover {
  background-color: rgb(75, 52, 52);
}
</style>
