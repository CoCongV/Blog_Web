<template>
    <div :class="loginView">
        <left-col></left-col>
        <v-container :class="loginContainer" v-resize="onResize">
            <v-layout align-center fill-height>
                <v-flex xs12 md9 offset-md3>
                    <login-card></login-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import LeftCol from "@/components/LeftCol";
import LoginCard from "@/components/LoginCard"
import userAgent from "@/libs/userAgent"
export default {
    data () {
        return {
            loginView: "loginViewDesktop",
            loginContainer: "loginDesktop"
        }
    },
    components: {
        leftCol: LeftCol,
        loginCard: LoginCard
    },
    mounted () {
        if (userAgent.isMobile()) {
            this.loginView = ""
            this.loginContainer = ""
        } else {

        }
    },
    methods: {
        onResize () {
            if (userAgent.isMobile()) {
                this.loginView = ""
                this.loginContainer = ""
            } else {
                this.loginView = "loginViewDesktop"
                this.loginContainer = "loginDesktop"
            }
        }
    }
}
</script>

<style>
    .loginViewDesktop {
        height: 100%;
    }
    .loginDesktop {
        height: 100%;
    }
</style>
