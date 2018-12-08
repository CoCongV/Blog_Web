<template>
    <div class="text-xs-center">
        <v-pagination v-model="page" :length="length"></v-pagination>
    </div>
</template>

<script>
export default {
    props: {
        length: {
            type: Number,
            default: 1
        },
        initPage: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            page: this.initPage
        }
    },
    watch: {
        page: function(newVal, oldVal) {
            this.$emit('pageChange', newVal)
        }
    }
}
</script>

<style>

</style>
