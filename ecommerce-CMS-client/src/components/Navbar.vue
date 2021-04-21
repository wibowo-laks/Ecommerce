<template>
<div class="d-flex flex-column text-light w-20">
  <div class="logo p-2 d-flex justify-content-center border-bottom border-2 mx-2">
    <span class="fs-4 fw-bold">Hacktiv CMS</span>
  </div>
  <div class="p-2">
    <router-link to="/categories" class="router fs-5">
      <div class="link d-flex justify-content-start align-items-end py-2 px-3 mt-2 rounded">
        <span>
          <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
          </svg>
        </span>
        <span class="align-text-bottom mx-3">Categories</span>
      </div>
    </router-link>
    <router-link to="/products" class="router fs-5">
      <div class="link d-flex justify-content-start align-items-end py-2 px-3 mt-2 rounded">
        <span>
          <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </span>
        <span class="align-text-bottom mx-3">Products</span>
      </div>
    </router-link>
    <router-link to="/banners" class="router fs-5">
      <div class="link d-flex justify-content-start align-items-end py-2 px-3 mt-2 rounded">
        <span>
          <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
        </span>
        <span class="align-text-bottom mx-3">Banners</span>
      </div>
    </router-link>
    <div @click="handleLogout" class="link d-flex justify-content-start align-items-end  py-2 px-3 mt-2 rounded" type="button" >
      <span>
        <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </span>
      <span class="align-text-bottom mx-3 fs-5">Logout</span>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
    return {
      isActive: false
    }
  },
  methods: {
    handleLogout () {
      this.$swal({
        title: 'You will logout !!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then(result => {
        if (result.isConfirmed) {
          localStorage.clear()
          this.$router.push('/login')
        }
      })
    }
  }

}
</script>

<style scoped>
.w-20 {
  width: 20%;
}
.icon-size {
  width: 5rem;
  height: 4rem;
}
.icon-svg {
  width: 2rem;
  height: 2rem;
}

.router {
  text-decoration: none;
  color: white;
}

.link:hover {
  background-color: #ffabe1;
}
/* a.router-link-exact-active {
  color: black;
} */
</style>
