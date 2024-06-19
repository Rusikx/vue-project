<script lang="ts">
import { useAuthModuleStore } from "./../stores/auth.module"

export default {
  name: "Nav",
  data: () => ({
  }),
  computed: {
    currentUser() {
      return useAuthModuleStore().user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      const authModuleStore = useAuthModuleStore()

      authModuleStore.logout()
      this.$router.push('/login');
    }
  },
}
</script>

<template>
  <v-navigation-drawer
    permanent
  >
  <!-- style="transform: translateX(0)" -->
    <v-list
      density="compact"
      nav
    >
      <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/home" link></v-list-item>
      <v-list-item prepend-icon="mdi-account-circle" title="Profile" value="profile" to="/profile" link></v-list-item>
  
      <v-divider></v-divider>

      <v-list-item v-if="showAdminBoard" prepend-icon="mdi-admin" title="Admin Board" value="admin-board" to="/admin" link></v-list-item>
      <v-list-item v-if="showModeratorBoard" prepend-icon="mdi-moderator" title="Moderator Board" value="moderator-board" to="/moderator" link></v-list-item>
      <v-list-item v-if="currentUser" prepend-icon="mdi-user" title="User" value="user" to="/user" link></v-list-item>
  
      <v-list-item prepend-icon="mdi-network" title="Network" value="network" to="/network" link></v-list-item>
      <v-list-item prepend-icon="mdi-gas-station" title="Charge Point" value="charge-point" to="/charge-point" link></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="teal-lighten-1" @click.prevent="logOut" block>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>

</style>