<template>
	<b-tabs>
		<b-tab title="Basic">
			<b-form class="form">

				<b-input-group
					id="Basic"
					for="Basic"
				>
					<b-input
						required
						id="Basic"
						placeholder="What are you seeking to know?"
						v-model="form.tech"
						autofocus
					/>
					<b-input-group-append>
						<b-button type="Submit">
							<font-awesome-icon
								class="icon"
								icon="search"
							/>
						</b-button>

					</b-input-group-append>
				</b-input-group>
			</b-form>
		</b-tab>
		<b-tab title="Detailed">
			<b-form
				inline
				class="form"
			>
				<b-form-row class="w-100">
					<b-col
						cols="12"
						class="col"
						col="false"
						lg="4"
						md="6"
					>
						<b-input-group
							id="input-group-1"
							prepend="Subject"
							for="Subject"
              class="m-1"
						>
							<b-input
								required
								id="Subject"
								placeholder="Python, Javascript, etc."
								v-model="form.tech"
								autofocus
								@focus="changeTip(0)"
								class="inputs"
							/>
						</b-input-group>
					</b-col>
					<b-col
						cols="12"
						class="col"
						col="false"
						lg="4"
						md="6"
					>
						<b-input-group
							id="input-group-2"
							prepend="Topic"
							for="topic"
              class="m-1"
						>
							<b-input
								required
								id="topic"
								placeholder="What do you want to know?"
								v-model="form.topic"
								@focus="changeTip(1)"
								class="inputs"
							/>
						</b-input-group>
					</b-col>
					<b-col
						cols="12"
						class="col"
						col="false"
						lg="4"
						md="6"
					>
						<b-input-group
							id="input-group-3"
							prepend="Exact"
							for="emphasis"
              class="m-1"
						>
							<b-input
								id="emphasis"
								placeholder="Optional: must have keywords or phrases separated by commas. USE SPARINGLY."
								v-model="form.includes"
								@focus="changeTip(2)"
								class="inputs"
							/>
						</b-input-group>
					</b-col>
					<b-col
						cols="12"
						class="col"
						col="false"
						lg="4"
						md="6"
					>
						<b-input-group
							id="input-group-4"
							prepend="Exclude"
							for="exclude"
              class="m-1"
						>
							<b-input
								id="exclude"
								placeholder="Optional: exclude these keywords or phrases separated by commas."
								v-model="form.excludes"
								@focus="changeTip(3)"
								class="inputs"
							/>
						</b-input-group>
					</b-col>
					<b-col
						cols="12"
						class="col"
						col="false"
						lg="4"
						md="6"
					>
						<b-input-group
							id="input-group-5"
							prepend="Site"
							for="site"
              class="m-1"
						>
							<b-input
								id="site"
								placeholder="Optional: refine your search to search a specific site."
								v-model="form.site"
								@focus="changeTip(4)"
								class="inputs"
								@input="validateUrl"
								ref="site"
							/>
							<b-form-invalid-feedback :state="valid">Must be a valid url.</b-form-invalid-feedback>
						</b-input-group>
					</b-col>
				</b-form-row>
				<b-form-row class="w-100">
					<b-col>
						<b-button-toolbar justify class="m-1">
							<b-button
								type="reset"
								variant="secondary"
								v-on:click.prevent="onReset"
							>Reset</b-button>
							<b-button
								type="submit"
								variant="dark"
								v-on:click.prevent="runSearch"
							>Search</b-button>
						</b-button-toolbar>
					</b-col>
				</b-form-row>
			</b-form>
		</b-tab>
	</b-tabs>
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
						this.$refs["site"].setCustomValidity("");
						this.valid = true;
						return true;
					} else {
						this.valid = false;
						return false;
					}
				} else {
					this.valid = true;
					this.$refs["site"].setCustomValidity("");
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
	.container {
		margin: 0rem !important;
	}
	.form {
		border: 1px solid rgba(0, 0, 0, 0.13);
		margin-bottom: 2rem;
		padding: 1rem;
	}
  #site {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
</style>
