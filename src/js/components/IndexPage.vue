<template>
    <div>
        <action-bar/>
        <iframe 
        :src="currentUrl" 
        frameborder="0" 
        class="main-iframe" 
        :class="{'loading' : !iframe_loaded}"
        ref="main_iframe" 
        ></iframe>
        <transition name="fade">
            <div v-if="!iframe_loaded" class="loading_screen">
                <div class="splash_content">
                    <div>
                        <img src="images/ca32.png" alt="">
                    </div>
                    <div class="loading">
                        <span>Loading</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<style lang="scss" scoped>
    @import "~@variables.scss";

    @keyframes beating-logo {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }

    .hide {
        display: none;
    }


    .main-iframe {
        width: 100%;
        height: $height - $actionBarHeight - 13px;
        transition: opacity 0.5s;

        &.loading {
            opacity: 0;
            pointer-events: none;
        }

    }

    .loading_screen {
        position: absolute;
        top: $actionBarHeight;
        width: 100%;
        height: $height - $actionBarHeight;
        color: $primaryColor;

        &.fade-enter-active, &.fade-leave-active {
            transition: opacity .75s, transform 1s;

        }

        &.fade-enter, &.fade-leave-to {
            opacity: 0;
            transform: scale(3);
        }

        .splash_content {

            $splashContentHeight: 100px;

            height: $splashContentHeight;
            width: 300px;
            text-align: center;
            margin: (($height / 2) - ($splashContentHeight * 0.75)) auto 0 auto;

            img {
                padding: 5px;
                animation: beating-logo 1s linear infinite;
            }

            .loading {
                margin-top: 10px;
                font-size: 18px;
            }

        }

    }

</style>

<script>
    import config from '@root/config'
    import { mapState } from 'vuex'
    import { Chrome } from '@classes';

    export default {
        data() {
            return {
                iframe_url: null,
                iframe_loaded: false
            };
        },

        mounted() {

            this.$refs.main_iframe.onload = () => {
                this.iframe_loaded = true;
            }


            Chrome.Iframe.on('unload').subscribe((res) => {
                this.iframe_loaded = false;
            })

            Chrome.Iframe.on('load').subscribe((res) => {
                this.iframe_loaded = true;
            })

            
            Chrome.App.get('lastUrl').then((url) => {
                _.defer(() => {
                    this.iframe_url = url || config.punchClock.endpoint;
                });
            });
        
        },

        watch: {
            iframe_url(url) {
                this.$store.commit('setUrl', url);
            }
        },

        deactivated() {
            this.iframe_loaded = false;
        },

        computed: {
            ...mapState(['currentUrl'])
        },

        methods: {
            menuClicked(url) {
                this.iframe_url = url;
            }
        }
    }
</script>