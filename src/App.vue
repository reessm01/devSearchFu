<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand href="/" class="mx-auto">
        <img src="@/assets/ninja.png" class="image" />
      </b-navbar-brand>
      <!-- <b-navbar-nav>
        <b-nav-item href="/about">About</b-nav-item>
        </b-navbar-nav> -->
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
  width: 3rem;
  height: 3rem;
  margin: 0.5rem 1rem 0.5rem 0.5rem;
}
</style>
