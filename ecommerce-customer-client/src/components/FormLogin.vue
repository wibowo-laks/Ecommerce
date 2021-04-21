<template>
    <div class="container-fluid d-flex justify-content-between w-75 mx-auto mt-5 position-relative">
      <router-link to="/">
        <h3 class="logo text-dark position-absolute">MyShopii</h3>
      </router-link>
      <div class="w-50 text-center">
        <img class="img" src="../assets/bg2.svg" alt="">
      </div>
      <div class="w-50 align-self-center">
        <div class="">
          <div id="login" class="p-5">
            <div class="mb-3 text-center">
              <h4>Login</h4>
                <p>Dont have an account, please
                  <router-link to="/register">
                    <span class="text-primary">register first</span>
                  </router-link>
                </p>
            </div>
            <form @submit.prevent="handleLogin" class="w-100 mb-3 text-start" id="form-login">
              <div class="mb-3 border-bottom">
                <input type="email" class="form-control border border-0" placeholder="email" v-model="user.email">
              </div>
              <div class="mb-3 border-bottom">
                <input type="password" class="form-control border border-0" placeholder="password" v-model="user.password">
              </div>
              <button type="submit" class="btn btn-outline-dark w-100 rounded-0" id="submit-login">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FormLogin',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$store.dispatch('handleLogin', this.user)
    }
  }
}
</script>

<style scoped>
img {
  width: 450px;
  height: 400px;
}
.logo {
  top: -5rem;
}
</style>
