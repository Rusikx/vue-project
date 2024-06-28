<script lang="ts" setup>
import { onMounted, ref } from "vue"
import axios from "axios"

const API_URL = import.meta.env.VITE_SERVER_HOST + "/api/test/"

let content = ref("")

const getAll = () => {
  try {
    axios.get(API_URL + "all").then((response) => {
      content.value = response.data
    })
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getAll()
  
  // UserService.getPublicContent().then(
  //   (response) => {
  //     this.content = response.data;
  //   },
  //   (error) => {
  //     this.content =
  //       (
  //         error.response &&
  //         error.response.data &&
  //         error.response.data.message
  //       ) ||
  //       error.message ||
  //       error.toString();
  //   }
  // );
})
</script>

<template>
  <v-card-text>sd salksjdsakdsad</v-card-text>
  <!-- <v-card>
  <v-layout class="rounded rounded-md">
      <v-app-bar color="teal-lighten-1" prominent>
        <v-toolbar-title></v-toolbar-title>
      </v-app-bar>
      <Nav />

      <v-main class="d-flex align-center justify-center" style="height: 500px;">
        <v-card-text>sd salksjdsakdsad</v-card-text>
      </v-main>
    </v-layout>
  </v-card> -->
</template>
<!-- <template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template> -->
