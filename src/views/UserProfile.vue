<template>
    <v-app>
        <toolbar :title="toolbarTitle"></toolbar>
        <v-layout
            :align-center="alignCenter"
            justify-center
            column
            v-resize="onResize"
            v-show="!loading"
        >
            <v-flex xs12 md6 :class="flexClass">
                <transition name="fade" mode="out-in">
                    <profile-card
                        :avatar="avatar"
                        :username="username"
                        :about="about"
                        :memberSince="memberSince"
                        :location="location"
                        :email="email"
                        style="margin-top: 15%"
                        v-if="!editState"
                    >
                        <v-btn
                            slot="confirm"
                            color="teal darken-1"
                            v-if="!confirmed"
                            @click="comfirmEmail"
                            small
                        >验证邮箱</v-btn>
                    </profile-card>
                    <edit-card
                        :initAvatar="avatar"
                        :initUsername="username"
                        :initAbout="about"
                        ref="edit"
                        :initLocation="location"
                        :initEmail="email"
                        :initKindleEmail="kindle_email"
                        v-if="editState"
                        style="margin-top: 15%"
                    ></edit-card>
                </transition>
            </v-flex>
            <v-flex xs12 md6 :class="flexClass" style="margin-top: 10px">
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline">Private</h3>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-list dense>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon>email</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title class="subheading">Kindle E-mail</v-list-tile-title>
                                    <v-list-tile-sub-title v-html="kindle_email"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile>
                                <v-list-tile-action>
                                    <v-icon>lock_open</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title class="subheading">Permission</v-list-tile-title>
                                    <v-list-tile-sub-title v-html="permission"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-btn
                                    color="teal darken-1"
                                    v-if="updatePermissionBtn"
                                    @click="question = !question"
                                    small
                                >提升权限</v-btn>
                            </v-list-tile>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 md6 :class="flexClass" style="margin-top: 10px">
                <transition name="fade">
                    <comment-card :comments="comments" v-if="!editState"></comment-card>
                </transition>
            </v-flex>
        </v-layout>
        <v-speed-dial
            v-model="fab"
            right
            bottom
            direction="top"
            open-on-hover
            style="position: fixed"
        >
            <v-btn slot="activator" v-model="fab" color="blue darken-2" fab>
                <v-icon>more_vert</v-icon>
                <v-icon>close</v-icon>
            </v-btn>
            <v-btn color="pink" small fab @click="editState = !editState" v-show="!editState">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn fab small color="success" @click="submit" v-show="editState">
                <v-icon>done</v-icon>
            </v-btn>
            <v-btn fab small color="error" @click="editState = !editState" v-show="editState">
                <v-icon>cancel</v-icon>
            </v-btn>
        </v-speed-dial>
        <v-dialog v-model="question" max-width="500px">
            <v-card>
                <v-card-title class="headline grey lighten-2">博主今年多少岁？</v-card-title>
                <v-card-text>
                    <v-radio-group>
                        <v-radio v-for="n in answers" :key="n" :label="n" :value="n"></v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="success" @click="updatePermission">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import ProfileCard from "@/components/profile/ProfileCard";
import CommentCard from "@/components/profile/CommentCard";
import EditCard from "@/components/profile/EditCard";
import { api } from "@/libs/api";
import userAgent from "@/libs/userAgent";
import { role } from "@/libs/role";
import md5 from "js-md5";
export default {
    data() {
        return {
            avatar: "/img/avatar.jpg",
            username: "",
            about: "",
            memberSince: "",
            email: "",
            kindle_email: "",
            comments: [],
            alignCenter: true,
            flexClass: "flexDesktop",
            editState: false,
            location: "",
            last_seen: "",
            confirmed: true,
            fab: false,
            toolbarTitle: "Personal Center",
            loading: false,
            permission: 0,
            updatePermissionBtn: false,
            question: false,
            answers: ['18', "18岁", "十八岁"]
        };
    },
    components: {
        toolbar: Toolbar,
        profileCard: ProfileCard,
        commentCard: CommentCard,
        editCard: EditCard
    },
    methods: {
        onResize() {
            if (userAgent.isMobile()) {
                this.alignCenter = false;
                this.flexClass = "flexMobile";
            } else {
                this.alignCenter = true;
                this.flexClass = "flexDesktop";
            }
        },
        editComplete() {
            this.editState = false;
        },
        patchProfile() {
            this.editState = false;
            let editCard = this.$refs.edit;
            let body = {
                email: editCard.email,
                username: editCard.username,
                location: editCard.location,
                about_me: editCard.about,
                kindle_email: editCard.kindle_email
            };
            if (editCard.password) {
                body.password = md5.hex(editCard.password);
                body.old_password = md5.hex(editCard.oldPassword);
            }
            this.axios
                .patch(api.user, body)
                .then(response => {
                    this.$store.commit("showSnackbar", {
                        text: "Update Success",
                        color: "success"
                    });
                    this.email = editCard.email;
                    this.username = editCard.username;
                    this.location = editCard.location;
                    this.about = editCard.about;
                })
                .catch(error => {
                    this.$store.commit("showSnackbar", {
                        text: error.response.data.message,
                        color: "error"
                    });
                });
        },
        submit() {
            if (this.$refs.edit.$refs.form.validate()) {
                this.patchProfile();
            }
        },
        comfirmEmail() {
            this.axios
                .get(api.sendEmailAuth)
                .then(resposne => {
                    this.$store.commit("showSnackbar", {
                        text: "发送成功",
                        color: "success"
                    });
                })
                .catch(error => {
                    tis.$store.comments("showSnackbar", {
                        text: "发送失败",
                        color: "error"
                    });
                });
        },
        updatePermission() {
            this.question = !this.question;
            this.axios.post(api.updatePermission)
                .then(response => {
                    this.$store.commit("showSnackbar", {
                        text: "Update Success",
                        color: "success"
                    });
                    this.$store.state.permission = response.data.permission;
                    this.permission = response.data.permission
                    this.updatePermissionBtn = false
                })
                .catch(error => {
                    this.$store.commit("showSnackbar", {
                        text: "服务器爆炸！",
                        color: "error"
                    });
                });
        }
    },
    mounted() {
        this.onResize();
        this.$store.commit("showCircleProgress");
        this.loading = true;
        this.axios
            .get(api.user)
            .then(response => {
                this.avatar = response.data.avatar;
                this.username = response.data.username;
                this.memberSince = response.data.member_since;
                this.email = response.data.email;
                this.kindle_email = response.data.kindle_email;
                this.location = response.data.location;
                this.lastSeen = response.data.last_seen;
                this.confirmed = response.data.confirmed;
                this.about = response.data.about_me;
                this.permission = response.data.permission;
                if (this.permission < role.advancedUser) {
                    this.updatePermissionBtn = true;
                }
                this.axios.get(api.userComments).then(response => {
                    this.comments = response.data.comments;
                });
            })
            .finally(() => {
                this.loading = false;
                this.$store.commit("hideCircleProgress");
            });
    }
};
</script>

<style>
.flexDesktop {
    width: 50%;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
