<script lang="ts">
import Nav from "@/components/Nav.vue";

export default {
  name: "App",
  components: {
      Nav
  },
}
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar color="teal-lighten-1" prominent>
          <v-toolbar-title></v-toolbar-title>
      </v-app-bar>
      <Nav />

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
/* main {
  height: 100px;
} */
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
