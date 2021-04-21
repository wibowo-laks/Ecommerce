import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    productToEdit: {},
    banners: [],
    categories: []
  },
  mutations: {
    setProducts (state, payload) {
      state.products = payload
    },
    setProduct (state, payload) {
      state.product = payload
    },
    setProductToEdit (state, payload) {
      state.productToEdit = payload
    },
    setBanners (state, payload) {
      state.banners = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    }
  },
  actions: {
    handleLogin (context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then(res => {
        localStorage.setItem('access_token', res.data.access_token)
        router.push('/products')
      }).catch(err => {
        if (err.response.status !== 400) {
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            text: err.response.data.message
          })
        } else {
          const message = err.response.data.message.join('<br>')
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            html: message
          })
        }
      })
    },
    getProducts (context) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: accessToken
        }
      }).then(res => {
        context.commit('setProducts', res.data)
      }).catch(err => {
        console.log(err.response)
      })
    },
    addProduct (context, payload) {
      console.log(payload)
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'POST',
        url: '/products',
        headers: {
          access_token: accessToken
        },
        data: payload
      }).then(res => {
        context.dispatch('getProducts')
      }).catch(err => {
        if (err.response.status !== 400) {
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            text: err.response.data.message
          })
        } else {
          const message = err.response.data.message.join('<br>')
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            html: message
          })
        }
      })
    },
    getProductId (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: `/products/${payload}`,
        headers: {
          access_token: accessToken
        }
      }).then(res => {
        console.log(res.data)
        context.commit('setProductToEdit', res.data)
      }).catch(err => {
        Vue.swal({
          icon: 'error',
          title: 'Something Error',
          text: err.response.data.message
        })
      })
    },
    productDetail (context, payload) {
      context.commit('setProduct', payload)
    },
    editProduct (context, payload) {
      console.log(payload)
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'PUT',
        url: `/products/${payload.id}`,
        headers: {
          access_token: accessToken
        },
        data: {
          name: payload.name,
          iamge_url: payload.iamge_url,
          price: payload.price,
          stock: payload.stock,
          CategoryId: payload.CategoryId
        }
      }).then(res => {
        context.dispatch('getProducts')
      }).catch(err => {
        if (err.response.status !== 400) {
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            text: err.response.data.message
          })
        } else {
          const message = err.response.data.message.join('<br>')
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            html: message
          })
        }
      })
    },
    deleteProduct (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'DELETE',
        url: `/products/${payload}`,
        headers: {
          access_token: accessToken
        }
      }).then(res => {
        context.dispatch('getProducts')
      }).catch(err => {
        Vue.swal({
          icon: 'error',
          title: 'Something Error',
          text: err.response.data.message
        })
      })
    },

    getBanners (context) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: '/banners',
        headers: {
          access_token: accessToken
        }
      }).then(res => {
        console.log(res)
        context.commit('setBanners', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    addBanner (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'POST',
        url: '/banners',
        headers: {
          access_token: accessToken
        },
        data: payload
      }).then(res => {
        context.dispatch('getBanners')
      }).catch(err => {
        if (err.response.status !== 400) {
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            text: err.response.data.message
          })
        } else {
          const message = err.response.data.message.join('<br>')
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            html: message
          })
        }
      })
    },
    editStatusBanner (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'PATCH',
        url: `/banners/${payload.id}`,
        headers: {
          access_token: accessToken
        },
        data: {
          status: payload.status
        }
      }).then(res => {
        context.dispatch('getBanners')
      }).catch(err => {
        context.dispatch('getBanners')
        if (err.response.status !== 400) {
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            text: err.response.data.message
          })
        } else {
          const message = err.response.data.message.join('<br>')
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            html: message
          })
        }
      })
    },
    deleteBanner (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'DELETE',
        url: `/banners/${payload}`,
        headers: {
          access_token: accessToken
        }
      }).then(res => {
        context.dispatch('getBanners')
      }).catch(err => {
        Vue.swal({
          icon: 'error',
          title: 'Something Error',
          text: err.response.data.message
        })
      })
    },
    getCategories (context) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: accessToken
        }
      }).then(res => {
        context.commit('setCategories', res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    addCategory (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'POST',
        url: '/categories',
        headers: {
          access_token: accessToken
        },
        data: {
          name: payload
        }
      }).then(res => {
        console.log(res.data)
        context.dispatch('getCategories')
      }).catch(err => {
        if (err.response.status !== 400) {
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            text: err.response.data.message
          })
        } else {
          const message = err.response.data.message.join('<br>')
          Vue.swal({
            icon: 'error',
            title: 'Something Error',
            html: message
          })
        }
      })
    },
    deleteCategories (context, payload) {
      const accessToken = localStorage.getItem('access_token')
      axios({
        method: 'DELETE',
        url: `/categories/${payload}`,
        headers: {
          access_token: accessToken
        }
      }).then(() => {
        context.dispatch('getCategories')
      }).catch(err => {
        Vue.swal({
          icon: 'error',
          title: 'Something Error',
          text: err.response.data.message
        })
      })
    }
  },
  modules: {
  }
})
