<script lang="ts" setup>
  import { onMounted, ref } from "vue"
  import { storeToRefs } from "pinia"
  import axios from "axios"
  // import WebSocket from "ws"
  import { useAuthModuleStore } from "./../stores/auth.module"
  import ChargePointService from "./../../api/services/charge_point.service.ts"
  import ChargePointClass from "./../../api/classes/ChargePointClass.ts"

  const chargePoints = ref([])
  
  const dataChargePointService = async () => {
    try {
      const wsClient = new WebSocket(import.meta.env.VITE_SERVER_WS_HOST + "?point=1&command=data")
      
      wsClient.addEventListener("open", () => {
          const query = [2, "data-0", "Data"]
          wsClient.send(JSON.stringify(query))
      })

      await wsClient.addEventListener("message", (message) => {
        chargePoints.value = JSON.parse(message.data)
      })

      // const chargePointClass = new ChargePointClass()
      // const { data } = chargePointClass.dataAllCascade()
      // const { data } = await ChargePointService.allCascade()
      // chargePoints.value = data
    } catch (err) {
      console.log(err)
    }
  }

  const getActiveIcon = (value: string) => {
    let res = "mdi-gas-station-off-outline"

    if (value === "Available") {
      res = "mdi-gas-station-outline"
    }

    return res
  }

  const getActiveColor = (value: string | boolean) => {
    let res = "red-lighten-1"

    if (value === "Available" || value === true) {
      res = "green-lighten-1"
    }

    return res
  }

  const restartChargePoint = (point: string) => {
    const API_URL = import.meta.env.VITE_SERVER_HOST + "/api/charge-point/";

    axios.post(API_URL + "restart-out", { point: point });
    // axios.post(API_URL + "reset-out", { point: point });
  }

  onMounted(() => {
    dataChargePointService()
  })
</script>

<template>
  <div class="container spacing-playground pa-6" fluid>
    <v-row v-if="chargePoints.length">
      <template v-for="chargePoint in chargePoints">
        <v-col
          cols="12"
          md="4"
        >
          <v-card>
            <template v-slot:title>{{ chargePoint.charge_point_serial_number }}</template>
            <template v-slot:subtitle>{{ chargePoint.firmware_version }}</template>
            <template v-slot:text>
              <v-btn
                :color="getActiveColor(chargePoint.is_active)"
                icon="mdi-lan"
                size="x-small"
                variant ="outlined"
              />
              <v-btn
                icon="mdi-restart"
                size="x-small"
                variant ="outlined"
                @click.prevent="restartChargePoint(chargePoint.charge_point_serial_number)"
              />
            </template>
            <v-divider></v-divider>
            <template
              v-if="chargePoint?.connectors.length"
              v-slot:actions
            >
              <v-btn
                v-for="connector in chargePoint.connectors"
                :icon="getActiveIcon(connector.status)"
                :color="getActiveColor(connector.status)"
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