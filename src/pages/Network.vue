<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useAuthModuleStore } from "./../stores/auth.module"
  import NetworkService from "./../../api/services/network.service.ts"

  const networks = ref([])
  
  const dataNetworkService = async () => {
    try {
      const { data, success } = await NetworkService.all()

      networks.value = data
    } catch (err) {
      console.log(err)
    }
  }

  onMounted(() => {
    dataNetworkService()
  })

//   export default {
//     name: 'Network',
//     // computed: {
//     //     currentUser() {
//     //         const authModuleStore = useAuthModuleStore()
//     //         const { user } = storeToRefs(authModuleStore)
//     //         return user;
//     //     }
//     // },
//     // mounted() {
//     //     if (!this.currentUser) {
//     //         this.$router.push('/login');
//     //     }
//     // }
//   };
</script>

<template>
  <div class="container spacing-playground pa-6" fluid>
    <v-row>
      <v-col
        v-for="network in networks"
        cols="12"
        md="4"
      >
        <v-card>
          <template v-slot:title>{{ network.name }}</template>
          <template v-slot:subtitle>This is a card subtitle</template>
          <template v-slot:text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!
          </template>
          <template v-slot:actions>
            <v-btn icon="mdi-lan" variant ="outlined" />
          </template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>