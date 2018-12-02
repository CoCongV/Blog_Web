<template>
    <v-card>
        <v-card-title>
            <v-flex xs4 sm1 md1>
                <v-avatar><img :src="avatar" alt="avatar"></v-avatar>
            </v-flex>
            <v-flex xs3 sm4 md2>
                <h3>{{author}}</h3>
            </v-flex>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text v-html="content"></v-card-text>
        <v-card-text>
            <p class="text-xs-right">{{timestamp}}</p>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        content: '',
        author: '',
        uid: '',
        avatar: '',
        timestamp: '',
    }
}
</script>

<style>

</style>
