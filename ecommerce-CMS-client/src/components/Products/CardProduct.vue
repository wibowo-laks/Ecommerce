<template>
  <div>
    <div v-if="!isEdit && product">
      <img class="image-object" :src="product.image_url" alt="Product image">
      <div>
        <h5 class="card-title fw-bold mt-2">{{ product.name }}</h5>
        <p class="fw-bold text-warning my-0">{{ priceFormat }}</p>
        <p class="fw-bold my-0">Stock: {{ product.stock }} <small>pcs</small></p>
        <button @click="getProductId(product.id)" class="btn btn-outline-primary">Edit</button>
        <button @click="deleteProduct(product.id)" class="btn btn-outline-danger mx-2">Delete</button>
      </div>
    </div>
    <FormEdit
      v-if="isEdit"
      @closeEdit="closeEdit"
    ></FormEdit>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormEdit from './FormEdit'

export default {
  name: 'CardProduct',
  components: {
    FormEdit
  },
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    closeEdit () {
      this.isEdit = false
    },
    getProductId (id) {
      this.isEdit = true
      this.$store.dispatch('getProductId', id)
    },
    deleteProduct (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert this product!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteProduct', id)
        }
      })
    }
  },
  computed: {
    ...mapState([
      'product'
    ]),
    priceFormat () {
      const val = (this.product.price / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' IDR'
    }
  }
}
</script>

<style scoped>
img {
  width: 18.5rem;
  height: 17rem;
}
.card-text {
  max-height: 5rem;
  overflow-y: auto;
}
.image-object {
  object-fit: cover;
}
</style>
