<script lang="ts">
    import UserService from "./../../api/services/auth/user.service";

    export default {
        name: "User",
        data() {
            return {
                content: "",
            };
        },
        mounted() {
            UserService.getUserBoard().then(
                (response) => {
                    this.content = response.data;
                },
                (error) => {
                    this.content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    };
</script>

<template>
    <div class="container">
        <header class="jumbotron">
            <h3>{{ content }}</h3>
        </header>
    </div>
</template>