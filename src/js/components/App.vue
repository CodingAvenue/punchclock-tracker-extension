<template>
    <div class="app-container">
        <vue-progress-bar></vue-progress-bar>
        
        <transition name="fade">
            <keep-alive>
                <router-view class="router"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<style lang="scss">
    @import "~@variables.scss";

    .app-container {
        height: 100%;
    }

    .router {
        background-color: $primaryBackgroundColor;
        overflow: hidden;
        position: absolute;
        width: 100%;
        height: 100%;

        &.fade-enter-active, &.fade-leave-active {
            transition: background-color 1s, opacity .75s, transform 0.5s cubic-bezier(.38,.97,.36,1.02);
        }

    
        &.fade-enter,
        &.fade-leave-to {

            &.fade-enter {
                background-color: $secondaryBackgroundColor;
                transform: scale(0);
            }

            &.fade-leave-to {
                transform: scale(1);
            }

        }

        

    }

</style>

<script>
    import config_file from '@root/config';

    export default {
        mounted() {

            this.$SmoothScrollWebSites({
                stepSize: 50,
                animationTime    : 500,
                touchpadSupport: true
            });

            axios.interceptors.request.use(this.requestSuccess, this.requestFail);
            axios.interceptors.response.use(this.responseSuccess, this.responseFail);
            this.$http.interceptors.request.use(this.requestSuccess, this.requestFail);
            this.$http.interceptors.response.use(this.responseSuccess, this.responseFail);

        },
        methods: {
            requestSuccess(config) {
                this.$Progress.start();
                return config;
            },
            requestFail(error) {
                this.$Progress.fail();
                return Promise.reject(error);
            },
            responseSuccess(response) {
                this.$Progress.finish();
                return response;
            },
            responseFail(error) {
                
                this.$Progress.fail();
                return Promise.reject(error);
            }
        }
    }
</script>