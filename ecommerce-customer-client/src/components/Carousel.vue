<template>
  <div id="carouselExampleInterval" class="carousel slide my-5 mx-5" data-bs-ride="carousel">
    <ol class="carousel-indicators">
      <li v-for="(banner, ind) in filterBanners" :key="banner.id" data-bs-target="#carouselExampleDark" :data-bs-slide-to="ind" class="active"></li>
    </ol>
    <div class="carousel-inner bg-light">
      <div v-for="banner in firstBanners" :key="banner.id" class="carousel-item active" data-bs-interval="5000">
        <img :src="banner.image_url" class="d-block w-100" alt="...">
      </div>
      <div v-for="banner in sliceBanners" :key="banner.id" class="carousel-item" data-bs-interval="2000">
        <img :src="banner.image_url" class="d-block w-100" alt="...">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Carousel',
  computed: {
    ...mapState([
      'banners'
    ]),
    filterBanners () {
      return this.banners.filter(el => el.status === true)
    },
    firstBanners () {
      return this.filterBanners.slice(0, 1)
    },
    sliceBanners () {
      return this.filterBanners.slice(1)
    }
  }
}
</script>

<style>

</style>
