<template>
  <div class="flex flex-col min-h-screen w-full  bg-black">
    <TopNavigation />
    <div class="flex w-full h-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import TopNavigation from "./components/TopNavigation.vue";

export default {
  components: {
    TopNavigation,
  },
};
</script>
<style>
#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
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
