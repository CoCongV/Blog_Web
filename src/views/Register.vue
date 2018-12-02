<template>
    <div :class="registerView">
        <left-col></left-col>
        <v-container :class="registerContainer" v-resize="onResize">
            <v-layout align-center fill-height>
                <v-flex xs12 md9 offset-md3>
                    <register-card></register-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import LeftCol from "@/components/LeftCol";
import RegisterCard from "@/components/RegisterCard"
import userAgent from "@/libs/userAgent"
export default {
    data () {
        return {
            registerView: "registerViewDesktop",
            registerContainer: "registerDesktop"
        }
    },
    components: {
        leftCol: LeftCol,
        registerCard: RegisterCard
    },
    mounted () {
        if (userAgent.isMobile()) {
            this.registerView = ""
            this.registerContainer = ""
        } else {

        }
    },
    methods: {
        onResize () {
            if (userAgent.isMobile()) {
                this.registerView = ""
                this.registerContainer = ""
            } else {
                this.registerView = "registerViewDesktop"
                this.registerContainer = "registerDesktop"
            }
        }
    }
}
</script>

<style>
    .registerViewDesktop {
        height: 100%
    }
    .registerDesktop {
        height: 100%;
    }
</style>
