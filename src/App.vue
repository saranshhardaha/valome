<template>
  <Nav />
  <div class="flex bg-slate-900/70">
    <router-view  />
  </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  /* background: #121212; */
  background: url("https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt084d55ffe1da593b/5fac3843c1502b76a169ba09/Valorant_Dev_Diary_24_Banner.jpg?auto=webp&disable=upscale&height=381");
  background-size: cover;
  background-position: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
