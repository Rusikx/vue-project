<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useAuthModuleStore } from "./../stores/auth.module"
  import NetworkService from "./../../api/services/network.service.ts"

  const networks = ref([])
  
  const dataNetworkService = async () => {
    try {
      const { data } = await NetworkService.allCascade()

      networks.value = data
    } catch (err) {
      console.log(err)
    }
  }

  const getActiveIcon = (value: boolean) => {
    return value ? "mdi-gas-station-outline" : "mdi-gas-station-off-outline"
  }

  const getActiveColor = (value: boolean) => {
    return value ? "green-lighten-1" : "red-lighten-1"
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
      <template v-for="network in networks">
        <v-col
          v-if="network?.charge_point"
          cols="12"
          md="4"
        >
          <v-card>
            <template v-slot:title>{{ network.charge_point.serial_number }}</template>
            <template v-slot:subtitle>{{ network.charge_point.ocpp_version }}</template>
            <template v-slot:text>
              <v-btn
                :color="getActiveColor(network.charge_point.is_active)"
                icon="mdi-lan"
                size="x-small"
                variant ="outlined"
              />
            </template>
            <v-divider></v-divider>
            <template
              v-if="network.charge_point?.connectors.length"
              v-slot:actions
            >
              <v-btn
                v-for="connector in network.charge_point.connectors"
                :icon="getActiveIcon(connector.is_active)"
                :color="getActiveColor(connector.is_active)"
                size="x-small"
                variant ="outlined"
              />
            </template>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </div>
</template>