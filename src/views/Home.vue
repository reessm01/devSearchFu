<template>
  <div class="home">
    <h5>Your search ends here...</h5>
    <b-container fluid>
      <b-row>
        <b-col>
          <Search />
        </b-col>
        <b-col md>
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
h5 {
  margin: 1rem;
}
</style>
