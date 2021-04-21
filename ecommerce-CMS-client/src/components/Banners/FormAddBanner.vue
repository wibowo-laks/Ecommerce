<template>
  <div>
    <form @submit.prevent="addBanner" class="row g-3">
      <div class="col-md-6">
        <input v-model="banner.title" type="text" class="form-control" placeholder="Title">
      </div>
      <div class="col-md-6">
        <select v-model="banner.status" class="form-select" aria-label="Default select example">
          <option disabled selected hidden>Status</option>
          <option value="true">Active</option>
          <option value="false">Non Active</option>
        </select>
      </div>
      <div class="col-12">
        <input v-model="banner.image_url" type="text" class="form-control" placeholder="Image Url">
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-outline-primary">Add</button>
        <button @click="closeAdd" class="btn btn-outline-secondary mx-2">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormAddBanner',
  data () {
    return {
      banner: {
        title: '',
        status: '',
        image_url: ''
      }
    }
  },
  methods: {
    closeAdd () {
      this.$emit('closeAdd')
    },
    addBanner () {
      this.closeAdd()
      this.$store.dispatch('addBanner', this.banner)
    }
  }
}
</script>

<style>

</style>
