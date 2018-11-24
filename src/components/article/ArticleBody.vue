<template>
    <v-card dark raised hover class="article-body">
        <v-card-title primary-title :key="article.id" class="justify-center">
            <div>
                <h3 class="headline mb-0">{{article.title}}</h3>
            </div>
        </v-card-title>
        <p class="text-xs-right article-timestamp">
            <v-icon>calendar_today</v-icon>&nbsp;{{ article.timestamp }}
        </p>
        <v-card-text class="article-overview">
            <div v-html="article.body_html"></div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        article: {}
    },
    data () {
        return {
            overflow: true
        }
    }
}
</script>
