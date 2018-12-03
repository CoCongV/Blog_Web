<template>
    <v-app>
        <toolbar ></toolbar>
        <v-layout align-center justify-center v-resize="onResize">
            <v-flex xs12 md6 :class="flexClass">
                <profile-card :avatar="avatar" :username="username" :about="about" :memberSince="memberSince" :location="location"
                    :email="email" style="margin-top: 15%" v-if="!editState"></profile-card>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import ProfileCard from '@/components/profile/ProfileCard'
import { api } from "@/libs/api";
export default {
    components: {
        toolbar: Toolbar,
        profileCard: ProfileCard,
    },
    data () {
        return {
            avatar: '',
            username: '',
            about: '',
            email: '',
            memberSince: '',
        }
    },
    mounted () {
        this.axios.get(
            api.userProfile.replace(':id', this.$route.params.id)
        ).then((response) => {
            this.avatar = response.data.avatar
            this.username = response.data.username
            this.about = response.data.about_me
            this.email = response.data.email
            this.memberSince = response.data.member_since
        })
    }
}
</script>
