<template>
  <div class="w-100">
    <div class="d-flex text-center w-100 px-3 py-2 text-white">
        <div>
          <button @click="isAdd = !isAdd" class="btn btn-success">New Banner</button>
        </div>
        <span class="ml-20 fs-4 fw-bold">Banners</span>
    </div>
    <div class="banner d-flex justify-content-between p-3 bg-light rounded-start">
      <div class="rounded">
        <div v-if="isAdd" class="p-3 mb-2 w-100 bg-white rounded shadow-sm">
          <FormAddBanner
            @closeAdd="closeAdd"
          ></FormAddBanner>
        </div>
        <div :class="checkAdd">
          <ListBanner></ListBanner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormAddBanner from './FormAddBanner'
import ListBanner from './ListBanner'

export default {
  name: 'Banners',
  components: {
    FormAddBanner,
    ListBanner
  },
  data () {
    return {
      isAdd: false
    }
  },
  methods: {
    closeAdd () {
      this.isAdd = false
    }
  },
  computed: {
    checkAdd () {
      if (this.isAdd) {
        return { 'table-wraper': true }
      } else {
        return { 'table-wraper2': true }
      }
    }
  }
}
</script>

<style scoped>
.table-wraper {
  overflow-y: auto;
  max-height: 23rem;
}
.banner {
  height: 90vh;
}
.ml-20 {
  margin-left: 20rem;
}
</style>
