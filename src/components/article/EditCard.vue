<template>
    <v-card>
        <vue-editor v-model="content"></vue-editor>
    </v-card>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    components: {
        vueEditor: VueEditor,
    },
    props: {
        content: '',
    },
}
</script>

<style>

</style>
