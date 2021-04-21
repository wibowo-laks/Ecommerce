<template>
    <div class="login d-flex justify-content-arround w-75 mx-auto text-light">
      <div class="rounded mx-auto w-50">
        <div class="text-center">
          <h3 class="mb-3">This app just for administrator area</h3>
        </div>
        <div class="">
          <div id="login" class="p-3">
            <form @submit.prevent="handleLogin" class="mb-3" id="form-login">
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input v-model="user.email" type="email" class="form-control" id="email">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="user.password" type="password" class="form-control" id="password">
              </div>
              <button type="submit" class="btn btn-success w-100" id="submit-login">Login</button>
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
.img {
  height: 20rem;
  width: 30rem;
}
.login {
  margin-top: 10rem;
}
</style>
