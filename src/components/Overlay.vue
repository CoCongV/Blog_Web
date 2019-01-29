<template>
    <div>
        {{ bindVuex }}
        <div v-if="show" class="v-overlay v-overlay--active" style="z-index:99;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        };
    },
    computed: {
        bindVuex: function() {
            if (this.$store.state.overlay) {
                this.show = true;
            } else {
                this.show = false;
            }
        }
    }
};
</script>

