<template>
  <b-card class="container">
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Tech"
        label-for="tech"
        label-size="sm"
        label-align="left"
        class="m-2"
      >
        <b-form-input
          required
          id="tech"
          placeholder="Python, Javascript, etc."
          v-model="form.tech"
        />
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Topic"
        label-for="topic"
        label-size="sm"
        label-align="left"
        class="m-2"
      >
        <b-form-input
          required
          id="topic"
          placeholder="What do you want to know?"
          v-model="form.topic"
        />
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Must include"
        label-for="emphasis"
        label-size="sm"
        label-align="left"
        class="m-2"
      >
        <b-form-input
          id="emphasis"
          placeholder="Optional: refine your search with must have keywords. USE SPARINGLY."
          v-model="form.includes"
        />
      </b-form-group>
      <b-form-group
        id="input-group-4"
        label="Exclude"
        label-for="exclude"
        label-size="sm"
        label-align="left"
        class="m-2"
      >
        <b-form-input
          id="exclude"
          placeholder="Optional: refine your search to exclude these keywords."
          v-model="form.excludes"
        />
      </b-form-group>
      <b-form-group
        id="input-group-5"
        label="Site specific"
        label-for="site"
        label-size="sm"
        label-align="left"
        class="m-2"
      >
        <b-form-input
          id="site"
          placeholder="Optional: refine your search to search a specific site."
          v-model="form.site"
        />
      </b-form-group>
      <b-container fluid>
        <b-row align-h="between">
          <b-col cols="2" class="coll">
            <b-button
              type="reset"
              variant="secondary"
              v-on:click.prevent="onReset"
              >Reset</b-button
            >
          </b-col>
          <b-col cols="2">
            <b-button type="submit" variant="primary">Search</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </b-card>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      form: {
        tech: "",
        topic: "",
        includes: "",
        excludes: "",
        site: ""
      }
    };
  },
  methods: {
    onReset() {
      this.form.tech = "";
      this.form.topic = "";
      this.form.includes = "";
      this.form.excludes = "";
      this.form.site = "";
    }
  }
};
</script>

<style>
.col-form-label-sm {
  font-size: 0.7rem !important;
}
.form-control {
  font-size: 0.7rem !important;
}
.container {
  width: 50rem;
}
.btn.btn-primary {
  font-size: 0.7rem !important;
}
.btn.btn-secondary {
  font-size: 0.7rem !important;
}
</style>
