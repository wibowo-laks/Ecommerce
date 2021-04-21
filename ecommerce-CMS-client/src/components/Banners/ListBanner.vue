<template>
<div>
  <div v-for="banner in banners" :key="banner.id" class="mb-3 bg-white p-3 rounded shadow-sm position-relative">
    <div class="d-flex justify-content-between mb-2">
      <span class="fs-5">{{ banner.title }}</span>
      <div class="form-check form-switch">
        <input v-if="banner.status" @click="editStatusBanner(banner)" class="form-check-input" type="checkbox" checked>
        <input v-if="!banner.status" @click="editStatusBanner(banner)" class="form-check-input" type="checkbox">
        <label v-text="checkActive(banner.status)" class="form-check-label"></label>
      </div>
    </div>
    <img :src="banner.image_url" class="img-fluid rounded shadow-sm" alt="Image Banner">
    <div class="edit position-absolute">
      <button @click="deleteBanner(banner.id)" class="btn btn-outline-light btn-lg mx-2">Delete</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListBanner',
  methods: {
    checkActive (status) {
      if (status) {
        return 'Active'
      } else {
        return 'Non Active'
      }
    },
    deleteBanner (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert this banner!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteBanner', id)
        }
      })
    },
    editStatusBanner (banner) {
      const payload = {
        id: banner.id,
        status: !banner.status
      }
      this.$store.dispatch('editStatusBanner', payload)
    }
  },
  computed: {
    ...mapState([
      'banners'
    ])
  },
  created () {
    this.$store.dispatch('getBanners')
  }
}
</script>

<style scoped>
.edit {
  top: 5rem;
  right: 2rem;
}
img {
  object-fit: cover;
}
</style>
