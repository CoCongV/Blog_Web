<template>
    <v-layout :class="['header', leftcolClass]" ref="leftcol" row align-center justify-center fill-height>
        <v-flex xs12>
            <div class="text-xs-center">
                <v-avatar size="125px">
                <img
                    class="img-circle elevation-7 mb-1"
                    src="https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg"
                >
                </v-avatar>
                <h1 :class="headerAuthorClass">VCong</h1>
                <p class="subheading text-xs-center" style="line-height: 25px; margin-bottom: 0px;">朝闻道</p>
                <v-layout align-center justify-center ref="label" :class="['label', labelClass]">
                    <router-link :to="{ name: 'home' }" tag="button" class="item">首页</router-link>
                    <router-link :to="{name: 'home'}" tag="button" class="item">归档</router-link>
                    <router-link :to="{name: 'home'}" tag="button" class="item">随笔</router-link>
                    <router-link :to="{name: 'register'}" tag="button" class="item">注册</router-link>
                </v-layout>
                <v-layout class="social" align-center justify-center>
                    <div class="item">
                        <a class="mail" target="_blank" href="mailto:cong.lv.yx@gmail.com"></a>
                    </div>
                    <div class="item">
                        <a class="github" target="_blank" href="https://github.com/moonlitlaputa"></a>
                    </div>
                    <div class="item">
                        <a class="weibo" target="_blank" href="https://www.weibo.com/1949256675/info"></a>
                    </div>
                </v-layout>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import userAgent from '@/libs/userAgent'
    export default {
        data () {
            return {
                leftcolClass: "leftcol-desktop",
                labelClass: "column",
                headerAuthorClass: "header-author-desktop"
            }
        },
        mounted: function() {
            let that = this;
            this.leftcolClass = this.ensureLeftcolClass();
            this.labelClass = this.ensureLableClass();
            this.headerAuthorClass = this.ensureHeaderAuthorClass();
            window.onresize = function temp() {
                that.leftcolClass = that.ensureLeftcolClass();
                that.labelClass = that.ensureLableClass();
                that.headerAuthorClass = that.ensureHeaderAuthorClass()
            }
        },
        methods: {
            ensureLeftcolClass () {
                if (userAgent.isMobile()) {
                    return "leftcol-mobile"
                } else {
                    return "leftcol-desktop"
                }
            },
            ensureLableClass () {
                if (userAgent.isMobile()) {
                    return "row"
                } else {
                    return "column"
                }
            },
            ensureHeaderAuthorClass () {
                if (userAgent.isMobile()) {
                    return ""
                } else {
                    return "header-author-desktop"
                }
            }
        }
    }
</script>

<style>
    .leftcol-desktop {
        position: fixed;
        width: 20%;
        background-image: url("/img/bg-9.jpg");
        background-position: center center;
        background-size: cover;
        color: aliceblue;
        line-height: 3em;
    }
    .leftcol-mobile {
        background-image: url("/img/bg-9.jpg");
        background-position: center center;
        background-size: cover;
        padding-top: 10px;
        color: aliceblue;
        line-height: 3em;
        margin-bottom: 3px
    }
    .leftcol-mobile .item {
        margin: auto 3px
    }
    .header-author-desktop {
        margin: 0.67em 0;
    }
    .header .social a {
        border-radius: 50%;
        display: inline-block;
        width: 28px;
        height: 28px;
        opacity: 1;
    }
    .social .item {
        margin: auto 10px;
    }
    .mail {
        border: 1px solid #3b98b1;
        background: url("/img/icons/mail.png") center no-repeat #3b98ba;
    }
    .github {
        border: 1px solid #000;
        background: url("/img/icons/github.png") center no-repeat #000;
    }
    .weibo {
        border: 1px solid #f00;
        background: url("/img/icons/weibo.png") center no-repeat #f00;
    }
</style>
