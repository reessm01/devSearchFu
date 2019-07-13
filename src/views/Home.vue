<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/ninja.png" class="image" />
    <Search />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/Search.vue";

export default {
  name: "home",
  components: {
    Search
  }
};
</script>

<style scoped>
.image {
  width: 200px;
  height: auto;
  margin: 1rem;
}
</style>
