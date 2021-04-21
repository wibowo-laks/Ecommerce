<template>
  <div>
    <Navbar />
    <ListCarts class="mb-5"/>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import ListCarts from '../components/ListCarts.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    ListCarts,
    Navbar,
    Footer
  },
  name: 'Carts'
}
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
