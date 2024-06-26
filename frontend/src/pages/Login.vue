<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { useField, useForm } from "vee-validate"
import * as yup from "yup"
import { storeToRefs } from 'pinia'
import { useAuthModuleStore } from "./../stores/auth.module"

const router = useRouter()
const loading = ref(false)
const message = ref("")

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const { handleSubmit, handleReset } = useForm({
  validationSchema,
})

const email = useField('email', validationSchema)
const password = useField('password', validationSchema)

const onSubmit = handleSubmit(async (values) => {
  loading.value = true

  const authModuleStore = useAuthModuleStore()

  authModuleStore.login(values).then(() => {
    router.push("/profile")
  }, (error) => {
    loading.value = false;
    message.value = (
        error.response &&
        error.response.data &&
        error.response.data.message
    ) || error.message || error.toString()
  })
})

// return {
//   loading,
//   message,
//   email,
//   password,
//   onSubmit,
//   handleReset
// }
</script>

<template>
<v-app id="inspire">
  <v-container class="d-flex align-center h-100" fluid fill-height>
  <v-layout class="d-flex justify-center">
    <v-card class="elevation-12 w-50">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          prepend-icon="person"
          name="email"
          label="Email"
          type="text"
          required
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="lock"
          name="password"
          label="Password"
          type="password"
          required
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </v-card-actions>
        <v-btn
          variant="outlined"
          color="primary"
          type="submit"
          block
          :disabled="loading"
        >Login</v-btn>
      </v-form>
    </v-card-text>
    </v-card>
  </v-layout>
  </v-container>
</v-app>
</template>

<style scoped>
</style>