<script lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { storeToRefs } from 'pinia'
import { useAuthModuleStore } from "./../stores/auth.module"

export default {
	setup() {
		const router = useRouter();
		const loading = ref(false);
		const message = ref("");

		const validationSchema = yup.object().shape({
			username: yup
				.string()
				.required("Username is required!")
				.min(3, "Must be at least 3 characters!")
				.max(20, "Must be maximum 20 characters!"),
			email: yup
				.string()
				.required("Email is required!")
				.email("Email is invalid!")
				.max(50, "Must be maximum 50 characters!"),
			password: yup
				.string()
				.required("Password is required!")
				.min(6, "Must be at least 6 characters!")
				.max(40, "Must be maximum 40 characters!"),
		});

		const { handleSubmit, handleReset } = useForm({
			validationSchema,
		});

		const username = useField('username', validationSchema);
		const email = useField('email', validationSchema);
		const password = useField('password', validationSchema);

		const loggedIn = () => {
			const authModuleStore = useAuthModuleStore()
			const { status } = storeToRefs(authModuleStore)

			return status.value.loggedIn;
		}

		const onSubmit = handleSubmit(async (values) => {
				loading.value = true;

				const authModuleStore = useAuthModuleStore();

				authModuleStore.register(values).then((data) => {
						message.value = data.message;
						// successful.value = true;
						loading.value = false;

						// authModuleStore.login(user).then(() => {
						//     router.push("/profile");
						// }, (error) => {
						//     loading.value = false;
						//     message.value = (
						//         error.response &&
						//         error.response.data &&
						//         error.response.data.message
						//     ) || error.message || error.toString();
						// });
				},(error) => {
						message.value = (
								error.response &&
								error.response.data &&
								error.response.data.message
						) || error.message || error.toString();
						// successful.value = false;
						loading.value = false;
				});
		});

		if (loggedIn()) {
			router.push("/profile");
		}

		return {
			loading,
			message,
			username,
			email,
			password,
			onSubmit,
			handleReset
		};
	}
};
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
            name="username"
            label="Username"
            type="text"
            required
            v-model="username.value.value"
            :error-messages="username.errorMessage.value"
          ></v-text-field>
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
          >Register</v-btn>
        </v-form>
      </v-card-text>
      </v-card>
    </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
</style>