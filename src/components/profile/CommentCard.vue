<template>
    <v-card raised>
        <v-card-title primary-title>
            <div>
                <h3 class="headline">Comments</h3>
            </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-list>
                <v-list-tile v-for="comment in comments" :key="comment.id">
                    <v-list-tile-content v-html="comment.body_html">
                    </v-list-tile-content>
                    <v-divider></v-divider>
                </v-list-tile>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        comments: []
    }
}
</script>

