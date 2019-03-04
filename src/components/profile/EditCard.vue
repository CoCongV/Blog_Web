<template>
    <v-card>
        <v-toolbar color="Primary">
            <v-toolbar-title>个人资料</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" lazy-validation ref="form">
                <my-avatar :initAvatar="avatar"></my-avatar>
                <v-text-field v-model="username" :rules="nameRules" :counter="18" label="Username" required></v-text-field>
                <v-text-field v-model="oldPassword" :rules="oldPasswordRules" label="Old Password" type="password"></v-text-field>
                <v-text-field v-model="password" :rules="passwordRules" label="New Password" type="password" hint="0 ~ 20 charactors"></v-text-field>
                <v-text-field v-model="repeatPassword" :rules="repeatPasswordRules" label="Confirm Password" type="password"></v-text-field>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="kindle_email" :rules="emailRules" label="Kindle E-mail"></v-text-field>
                <v-text-field v-model="location" label="Location"></v-text-field>
                <v-textarea label="About Me" v-model="about"></v-textarea>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import myAvatar from '@/components/profile/avatar'
export default {
    props: {
        initUsername: {
            type: String
        },
        initEmail: {
            type: String
        },
        initLocation: {
            type: String
        },
        initAbout: {
            type: String
        },
        initAvatar: {
            type: String
        },
        initKindleEmail: {
            type: String
        }
    },
    components: {
        myAvatar: myAvatar
    },
    data () {
        return {
            password: '',
            repeatPassword: '',
            oldPassword: '',
            oldPasswordRules: [
                v => !(!v && this.password) || 'Old Password is required'
            ],
            passwordRules: [
                v => (!v || v.length <= 20) || 'Password must be less than 20 characters', 
                v => (!v || v.length >= 8) || 'Password must be more than 8 characters',
            ],
            repeatPasswordRules: [
                v => (!v || v.length <= 20) || 'Password must be less than 20 characters',
                v => (!v || v.length >= 8) || 'Password must be more than 8 characters',
                v => (!v || v === this.password) || 'Inconsistent Password',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            emailRules: [
                v => !v || /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 18) || 'Name must be less than 10 characters',
            ],
            valid: true,
            username: this.initUsername,
            email: this.initEmail,
            location: this.initLocation,
            about: this.initAbout,
            avatar: this.initAvatar,
            kindle_email: this.initKindleEmail,
        }
    }
}
</script>

