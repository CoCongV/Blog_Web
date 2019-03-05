<template>
    <v-card>
        <v-avatar size="125px" style="margin: 10px">
            <img class="img-circle elevation-7 mb1" :src="avatar">
        </v-avatar>
        <v-divider></v-divider>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{username}}</h3>
                <div>{{about}}</div>
            </div>
        </v-card-title>
        <v-card-text>
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>calendar_today</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="subheading">Member Since:</v-list-tile-title>
                        <v-list-tile-sub-title v-html="memberSince"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="subheading">E-mail</v-list-tile-title>
                        <v-list-tile-sub-title v-html="email"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-layout align-center justify-end>
                <slot name="confirm"></slot>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        avatar: '',
        username: '',
        about: '',
        memberSince: '',
        confirmed: false,
        editPermission: false,
        email: '',
    },
}
</script>

