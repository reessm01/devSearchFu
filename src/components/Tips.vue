<template>
  <b-card :title="info.titles[index]">
    <b-card-text class="breaks text-left">
      {{ info.tips[index] }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Tips",
  data() {
    return {
      info: {
        titles: [
          "Subject",
          "Topic",
          "Must Include",
          "Exclude",
          "Site Specific"
        ],
        tips: [
          "In general, it is good practice to construct searches with a specific subject. Avoid using phrases and be succinct.",
          "Your search finesse begins here. Phrases, 'haikus', lists, etc. are recommended. Avoid complete sentences.\n\n If your initial search results are unsatisfactory take the time to observe what you are getting vs. what you are searching for and revise. Try to use a different related phrase or keyword(s). If that does not work chances are your search is not specific enough and you will need to begin to use the 'Must include' or 'Exclude' options below.",
          "Use this option sparingly. If you are certain about a phrase or keyword indicate that in here. This will force your search to match that parameter exactly.\n\n Separate multiple words or phrases with commas.",
          "Sometimes your search results will have a related topic that you do not want. Indicate words you want excluded from your results here.\n\n Being observant of your results vs. what you are searching for will be key here for effective use of this option.\n\n Separate multiple words or phrases with commas.",
          "Sometimes you are confident a certain site will have the answer to your search. Indicate that site here.\n\n Acceptable syntax: stackoverflow.com, www.stackoverflow.com, https://www.stackoverflow.com, etc."
        ]
      }
    };
  },
  computed: {
    index() {
      return this.$store.state.index;
    }
  }
};
</script>

<style scoped>
.breaks {
  white-space: pre-line;
}
</style>
