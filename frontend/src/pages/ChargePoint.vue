<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue"
import { storeToRefs } from "pinia"
import axios from "axios"
// import WebSocket from "ws"
import * as yup from "yup"
import { useField, useForm } from "vee-validate"
import ChargePointService from "./../../api/services/charge_point.service.ts"
import ChargePointClass from "./../../api/classes/ChargePointClass.ts"

const API_URL = import.meta.env.VITE_SERVER_HOST + "/api/charge-point/"
const chargePoints = ref([])
const logs = ref('')

const validationSchema = yup.object().shape({
  command: yup.string().required()
})

const { handleSubmit } = useForm({
  validationSchema,
})

const command = useField('command', validationSchema)

const runCustomCommand = handleSubmit(async (values, point) => {
  // axios.post(API_URL + "custom-command", { data: values, point });
  try {
    const wsClient = new WebSocket(
      import.meta.env.VITE_SERVER_WS_HOST + "?point=" + point + "&command=custom-command"
    )
    
    wsClient.addEventListener("open", () => {
      // const query = JSON.stringify(values.replace(" ", "")
      //   .split(',')
      //   .splice(1, 0, "data-start", "CustomCommand"))

      
      logs.value = logs.value + '\n' + values

      wsClient.send(values)
    })

    await wsClient.addEventListener("message", (message) => {
      logs.value = logs.value + '\n' + message.data
    })
  } catch (err) {
    console.log(err)
  }
})

const dataChargePointService = async () => {
  try {
    const wsClient = new WebSocket(import.meta.env.VITE_SERVER_WS_HOST + "?point=start&command=data")
    
    wsClient.addEventListener("open", () => {
        const query = [2, "data-start", "Start"]
        let i = 0

        wsClient.send(JSON.stringify(query))
        // const eachSend = setInterval(() => {
        //   wsClient.send(JSON.stringify(query))
        //   i++
        //   console.log(i)
        //   if (i === 1000) {
        //     clearInterval(eachSend)
        //     wsClient.close()
        //   }
        // }, parseInt(import.meta.env.VITE_WS_INTERVAL || 30))
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
  // axios.post(API_URL + "restart-out", { point: point });
  axios.post(API_URL + "reset-out", { point: point })
}

// const runCustomCommand = (data: string, point: string) => {
//   axios.post(API_URL + "custom-command", { data, point });
// }

onMounted(() => {
  // axios.post(import.meta.env.VITE_SERVER_HOST + "/api/charge-point/heartbeat-out", {}).then(() => {
    dataChargePointService()
  // })
})

// onUnmounted(() => {
//   try {
//     const wsClientEnd = new WebSocket(import.meta.env.VITE_SERVER_WS_HOST + "?point=end&command=close")
    
//     wsClientEnd.addEventListener("open", async () => {
//         const query = [2, "data-end", "End"]

//         await wsClientEnd.send(JSON.stringify(query))
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })
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

          <v-divider></v-divider>
          <v-textarea
            v-model="command.value.value"
            label="Format: index, code, command, params(Object)"
            model-value2="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            name="input-7-1"
            variant="filled"
            auto-grow
          ></v-textarea>
          <v-btn
            variant ="outlined"
            @click.prevent="runCustomCommand(chargePoint.charge_point_serial_number)"
          >Run</v-btn>
          <v-divider></v-divider>
          {{ logs }}
        </v-col>
      </template>
    </v-row>
  </div>
</template>