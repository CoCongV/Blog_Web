<template>
    <v-app>
        <toolbar ></toolbar>
        <v-layout :align-center="alignCenter" justify-center column v-resize="onResize">
            <v-flex xs12 md6 :class="flexClass">
                <transition name="fade" mode="out-in">
                    <profile-card :avatar="avatar" :username="username" :about="about" :memberSince="memberSince" :location="location"
                        :email="email" style="margin-top: 15%" v-if="!editState"></profile-card>
                    <edit-card :avatar="avatar" :username="username" :about="about" ref="edit"
                        :location="location" :email="email" v-if="editState" style="margin-top: 15%"
                    ></edit-card>
                </transition>
            </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
export default {
    components: {
        toolbar: Toolbar,
    },
}
</script>
