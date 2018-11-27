<template>
    <v-app>
        <toolbar></toolbar>
        <v-layout :align-center="alignCenter" justify-center column v-resize="onResize">
            <v-flex xs12 md6 :class="flexClass">
                <profile-card :avatar="avatar" :editPermission="editPermission"
                    :username="username" :about="about" :memberSince="memberSince"
                    :email="email" style="margin-top: 60px"></profile-card>
            </v-flex>
            <v-flex xs12 md6 :class="flexClass">
                <comment-card :comments="comments" v-if="editPermission"></comment-card>
            </v-flex>
        </v-layout>
        <v-btn color="pink" fixed bottom right fab>
            <v-icon>edit</v-icon>
        </v-btn>
    </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import ProfileCard from '@/components/profile/ProfileCard'
import CommentCard from '@/components/profile/CommentCard'
import { api } from "@/libs/api";
import userAgent from "@/libs/userAgent"
export default {
    data () {
        return {
            avatar: '',
            editPermission: false,
            username: '',
            about: '',
            memberSince: '',
            email: '',
            comments: [],
            alignCenter: true,
            flexClass: "flexDesktop",
        }
    },
    components: {
        toolbar: Toolbar,
        profileCard: ProfileCard,
        commentCard: CommentCard
    },
    methods: {
        onResize () {
            if (userAgent.isMobile()) {
                this.alignCenter = false
                this.flexClass = "flexMobile"
            } else {
                this.alignCenter = true
                this.flexClass = "flexDesktop"
            }
        }
    },
    mounted () {
        this.onResize()
        this.axios.get(api.userProfile).then((response) => {
            this.avatar = response.data.user.avatar
            this.editPermission = response.data.edit_permission
            this.username = response.data.user.username
            this.memberSince = response.data.user.member_since
            this.email = response.data.user.email
            if (this.editPermission) {
                this.axios.get(api.userComments).then((response) => {
                this.comments = response.data.comments
            })
        }
        }).catch((error) => {
            this.$store.commit('showSnackbar',
                {
                    text: error.response.data.message,
                    color: "error"
                }
            )
        })
    }
}
</script>

<style>
    .flexDesktop {
        width: 50%
    }
</style>
