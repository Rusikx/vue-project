<script lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthModuleStore } from "./../stores/auth.module"

export default {
  name: 'Profile',
  // computed: {
  //     currentUser() {
  //         const authModuleStore = useAuthModuleStore()
  //         const { user } = storeToRefs(authModuleStore)

  //         return user;
  //     }
  // },
  // mounted() {
  //     if (!this.currentUser) {
  //         this.$router.push('/login');
  //     }
  // }
};
</script>

<template>
  <div class="container">
    1231233
    <!-- <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul> -->
  </div>
</template>