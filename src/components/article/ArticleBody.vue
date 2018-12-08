<template>
    <v-card raised :hover="hover" class="article-body">
        <v-card-title primary-title :key="article.id" class="justify-center">
            <div>
                <h3 class="headline mb-0">{{article.title}}</h3>
            </div>
        </v-card-title>
        <p class="text-xs-right article-timestamp">
            <v-icon>calendar_today</v-icon>&nbsp;{{ article.timestamp }}
        </p>
        <v-card-text class="article-overview">
            <div class="ql-editor" v-html="article.body_html" v-highlight></div>
        </v-card-text>
        <div>
            <v-chip label text-color="white" v-for="tag in article.tags" :key="tag" :color="getColor()" small>
                <v-icon left>label</v-icon>{{tag}}
            </v-chip>
        </div>
        <v-card-actions>
        </v-card-actions>
    </v-card>
</template>

<script>
import { randomColor } from "@/utils.js";
export default {
    props: {
        article: {},
        hover: {
            default: true,
            type: Boolean
        }
    },
    data () {
        return {
            overflow: true
        }
    },
    methods: {
        getColor: function () {
            return randomColor()
        }
    }
}
</script>
