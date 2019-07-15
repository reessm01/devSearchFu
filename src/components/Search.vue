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
        @input="validateUrl"
        ref="site"
      />
      <b-form-invalid-feedback :state="valid"
        >Must be a valid url.</b-form-invalid-feedback
      >
    </b-form-group>

    <b-button-toolbar justify class="toolbar">
      <b-button type="reset" variant="secondary" v-on:click.prevent="onReset"
        >Reset</b-button
      >
      <b-button type="submit" variant="dark" v-on:click.prevent="runSearch"
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
      },
      valid: true
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
      let requiredFieldsCheck = this.form.tech && this.form.topic;

      if (requiredFieldsCheck) {
        const baseURL = "https://www.google.com/search?q=";
        let subject = this.stdProcessString(this.form.tech);
        let topic = this.stdProcessString(this.form.topic);
        let mustInclude = this.includesStringify(this.form.includes);
        let mustExclude = this.excludesStringify(this.form.excludes);
        let searchParameters = [subject, topic, mustInclude, mustExclude];

        if (this.form.site == "") {
          searchParameters = searchParameters
            .filter(entry => entry !== "")
            .join("+");
          window.open(baseURL + searchParameters);
        } else if (this.validateUrl()) {
          searchParameters.unshift("site:" + this.form.site);
          searchParameters = searchParameters
            .filter(entry => entry !== "")
            .join("+");
          this.$refs["site"].setCustomValidity("");
          window.open(baseURL + searchParameters);
        } else {
          this.$refs["site"].setCustomValidity("Invalid url.");
        }
      }
    },
    stdProcessString(input) {
      return input
        .split(",")
        .filter(entry => entry !== "")
        .map(string =>
          string
            .trim()
            .split(" ")
            .join("+")
        )
        .join("+");
    },
    includesStringify(input) {
      return input
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
    },
    excludesStringify(input) {
      return input
        .split(",")
        .filter(entry => entry !== "")
        .map(string =>
          string
            .trim()
            .split(" ")
            .join("+")
        )
        .map(string => '-"' + string + '"')
        .join("+");
    },
    validateUrl() {
      var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      var regex = new RegExp(expression);
      if (this.form.site != "") {
        if (this.form.site.match(regex)) {
          this.valid = true;
          return true;
        } else {
          this.valid = false;
          return false;
        }
      } else {
        this.valid = true;
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
