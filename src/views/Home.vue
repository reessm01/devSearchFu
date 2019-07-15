<template>
  <div class="home">
    <h3>Your search ends here...</h3>
    <b-container fluid>
      <b-row>
        <b-col md="7">
          <Search />
        </b-col>
        <b-col md="5">
          <Tips />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/Search.vue";
import Tips from "@/components/Tips.vue";

export default {
  name: "home",
  components: {
    Search,
    Tips
  }
};
</script>

<style scoped>
.home {
  padding: 0.25rem;
}
h3 {
  margin:1.5rem;
}
</style>
