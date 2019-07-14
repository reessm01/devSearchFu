<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/">
        <img src="@/assets/ninja.png" class="image" />
        <b-nav-text>DevSearchFu</b-nav-text>
      </b-navbar-brand>
    </b-navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.image {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
}

.navbar.navbar-dark.bg-dark.navbar-expand {
  padding-top: 0rem !important;
  padding-bottom: 0rem !important;
}
</style>
