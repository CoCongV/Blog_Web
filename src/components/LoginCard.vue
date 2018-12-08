<template>
    <v-card>
        <v-toolbar color="Primary">
            <v-toolbar-title>Login Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-form v-model="valid" lazy-validation ref="form">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field type="password" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-layout justify-space-around>
                <v-btn :disabled="!valid" @click="submit" color="cyan darken-2">提交</v-btn>
                <v-btn @click="clear">重置</v-btn>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
import { api } from "@/libs/api";
import md5 from 'js-md5'
export default {
    data () {
        return {
            valid: true,
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length <= 20) || 'Password must be less than 20 characters', 
                v => (v && v.length >= 8) || 'Password must be more than 8 characters'
            ],
        }
    },
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                this.axios.post(api.login, {
                    email: this.email,
                    password: md5.hex(this.password)
                }).then((response) => {
                    this.$store.commit('showSnackbar', {text: 'Login Success', color: 'success'})
                    this.$cookie.set('token', response.data.token, {expires: response.data.expiration + 's'})
                    this.$store.commit('login', response.data)
                    this.$emit('login')
                }).catch((error) => {
                    this.$store.commit('showSnackbar', {text: error.response.data.message, color:'error'})
                })
            }
        },
        clear () {
            this.$refs.form.reset()
        }
    },
}
</script>

