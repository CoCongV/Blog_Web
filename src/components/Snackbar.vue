<template>
    <v-snackbar v-model="snackbar" top :color="color" :timeout="timeout">
        {{ text }}{{ bindVuex }}
        <v-btn flat icon @click="hideSnackbar">
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data () {
        return {
            snackbar: false,
            text: "",
            color: "cyan darken-2",
            timeout: 5000
        }
    },
    methods: {
        hideSnackbar () {
            this.snackbar = false
            this.text = ""
            this.color = "cyan darken-2"
            this.$store.commit('hideSnackbar')
        },
        showSnackbar (text, color) {
            this.text = text
            this.color = color
            this.snackbar = true
            setTimeout(() => {this.hideSnackbar()}, this.timeout)
        }
    },
    computed: {
        bindVuex: function () {
            if (this.$store.state.snackbar) {
                this.showSnackbar(this.$store.state.snackbarText, this.$store.state.snackbarColor)
            }
        }
    }
}
</script>
