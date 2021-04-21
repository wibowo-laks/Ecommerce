<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style>
@import url('http://localhost:3000/');
#app {
  height: 100vh;
  overflow: auto;
  background-image: url('https://res.cloudinary.com/dv2hwbawa/image/upload/v1613900313/background-02_injzok.jpg');
  font-family: 'Open Sans', sans-serif;
}

::-webkit-scrollbar {
  width: 8px;
  height: 9px;
}

::-webkit-scrollbar-track {
  background: white;
}

::-webkit-scrollbar-thumb {
  background: rgb(202, 188, 188);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(197, 186, 186);
}
</style>
