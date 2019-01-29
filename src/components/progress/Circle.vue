<template>
    <v-container class="progressContainer" v-show="show">
        {{ bindVuex }}
        <v-layout align-center justify-center row fill-height>
            <v-progress-circular
                indeterminate
                color="primary"
                size="50"
                v-if="show"
            ></v-progress-circular>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    computed: {
        bindVuex: function () {
            if (this.$store.state.circleProgress) {
                this.show = true
                this.$store.commit('showOverlay')
            } else {
                this.show = false
                this.$store.commit('hideOverlay')
            }
        }
    }
}
</script>


<style>
.progress {
    position: static;
    z-index: 100;
    left: 50%;
    top: 50%;
}
.progressContainer {
    z-index: 100;
    position: fixed;
    height: 100%;
    width: 100%;
}
</style>
