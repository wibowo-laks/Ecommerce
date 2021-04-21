<template>
  <div>
    <Navbar />
    <ListHistory class="mb-5"/>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'
import ListHistory from '../components/ListHistory.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    ListHistory,
    Navbar,
    Footer
  },
  name: 'History'
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
