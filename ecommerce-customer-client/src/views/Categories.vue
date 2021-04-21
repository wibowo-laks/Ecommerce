<template>
  <div class="mh-100">
    <Navbar />
    <ListProducts
      :products="products"
    ></ListProducts>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListProducts from '@/components/ListProducts.vue'
import Footer from '@/components/Footer.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Categories',
  components: {
    Navbar,
    ListProducts,
    Footer
  },
  created () {
    this.$store.dispatch('getCategoriesId', {
      id: this.$route.params.id
    })
    this.$store.dispatch('getBanners')
  },
  computed: {
    ...mapState([
      'products'
    ])
  },
  updated () {
    console.log('updated')
  }
}
</script>

<style scoped>
footer {
  margin-top: 7rem;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
