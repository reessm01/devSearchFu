<template>
  <b-form class="form">
    <b-form-group
      id="input-group-1"
      label="Subject"
      label-for="Subject"
      label-size="sm"
      label-align="left"
      class="m-2"
    >
      <b-form-input
        required
        id="Subject"
        placeholder="Python, Javascript, etc."
        v-model="form.tech"
        autofocus
        @focus="changeTip(0)"
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
        @focus="changeTip(1)"
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
        placeholder="Optional: must have keywords or phrases separated by commas. USE SPARINGLY."
        v-model="form.includes"
        @focus="changeTip(2)"
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
        placeholder="Optional: exclude these keywords or phrases separated by commas."
        v-model="form.excludes"
        @focus="changeTip(3)"
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
        @focus="changeTip(4)"
      />
    </b-form-group>

    <b-button-toolbar justify class="toolbar">
      <b-button type="reset" variant="secondary" v-on:click.prevent="onReset"
        >Reset</b-button
      >
      <b-button type="submit" variant="dark" v-on:click="runSearch"
        >Search</b-button
      >
    </b-button-toolbar>
  </b-form>
</template>

<script>
import { mapActions } from "vuex";
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
    ...mapActions(["changeTip"]),
    onReset() {
      this.form.tech = "";
      this.form.topic = "";
      this.form.includes = "";
      this.form.excludes = "";
      this.form.site = "";
    },
    runSearch() {
      if (this.form.tech && this.form.topic) {
        const baseURL = "https://www.google.com/search?q=";
        let basicParameters = [this.form.tech, this.form.topic]
          .map(string => string.split(" ").join("+"))
          .join("+");
        let mustInclude = this.form.includes
          .split(",")
          .filter(entry => entry !== "")
          .map(string =>
            string
              .trim()
              .split(" ")
              .join("+")
          )
          .map(string => '"' + string + '"')
          .join("+");
        let mustExclude = this.form.excludes
          .split(",")
          .filter(entry => entry !== "")
          .map(string =>
            string
              .trim()
              .split(" ")
              .join("+")
          )
          .map(string => "-" + string)
          .join("+");
        let siteSearch = this.form.site
          .split(",")
          .filter(entry => entry !== "")
          .map(string => "site:" + string)[0];

        let searchParameters = [
          siteSearch,
          basicParameters,
          mustInclude,
          mustExclude
        ]
          .filter(entry => entry !== "")
          .join("+");
        window.open(baseURL + searchParameters);
      }
    }
  },
  computed: {
    index() {
      return this.$store.state.index;
    }
  }
};
</script>

<style>
.col-form-label-sm {
  font-size: 1rem !important;
}
.form-control {
  font-size: 1rem !important;
}
.btn.btn-primary {
  font-size: 1rem !important;
}
.btn.btn-secondary {
  font-size: 1rem !important;
}
.toolbar {
  padding: 10px;
}
.container {
  margin: 0rem !important;
}
.form {
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  padding: 2rem;
}
button {
  margin-top: 1rem !important;
}
</style>
