<template>
    <div class="action-bar">
        <template v-if="user">
            <div>
                <transition name="slide">
                    <span v-if="user" class="user">Hi <strong>{{ user }}</strong>!</span>
                </transition>

                <router-link to="/settings" title="Settings" class="btn-settings right">
                    <i class="fa fa-cog fa-2x"></i>
                </router-link>

            </div>

            <div class="menu" ref="menu">
                <button 
                    class="menu-item"
                    v-for="(item, index) in menu" 
                    :key="item.url"
                    :class="{'selected': index == selected}"
                    @click="updateUrl(item.url)" 
                >
                    <span>{{ item.label | capitalize }}</span>
                </button>
            </div>
        </template>
        <img src="images/calogo.png" alt="Coding Avenue Logo" class="ca-logo" v-else>
    </div>
</template>


<style lang="scss" scoped>
    @import "~@variables.scss";

    .action-bar {
        height: $actionBarHeight;
        padding: 5px;
        position: relative;
        z-index: 10000000;
        color: $primaryColor;
    }

    .fa {
        color: $linkColor;
    }


    .user {
        font-size: 14px;

        &.slide-enter-active, &.slide-leave-active {
            position: relative;
            transition: bottom .5s cubic-bezier(.42,1.18,.49,1.56);
            bottom: 0;
        }

        &.slide-enter, &.slide-leave-to {
            bottom: 100%;
        }
    }

    .menu {
        margin-top: 7px;
        white-space: nowrap;
        overflow: hidden;
        user-select: none;
        max-width: $width - 35px;

        .menu-item {
            background: $linkColor;
            text-decoration: none;
            color: darken($linkColor, 20);
            border: 1px solid darken($linkColor, 10);
            margin-right: 3px;
            transition: transform 0.25s;
            cursor: pointer;

            &:hover {
                color: lighten($linkColor, 50);
            }

            &:hover, &.selected, &:active {
                outline: none;
            }

            &.selected {
                background: $secondaryColor;
                border: 1px solid darken($secondaryColor, 10);
                color: #fff;
            }

            // &:not(:last-child):after {
            //     content: 'l';
            //     margin: 0 5px;
            // }

        }
    }

    .btn-settings  {
        margin: 8px 8px 0 0;
    }

    .ca-logo {
        height: 40px;
        padding: 2px 0 0 5px;
    }

</style>

<script>
    import { Chrome } from '@classes';
    import _ from 'lodash'
    import { mapState } from 'vuex'

    export default {

        data() {
            return {
                menu: [],
                user: null,
                selected: 0
            };
        },

        watch: {
            currentUrl() {
                this.updatedSelected();
            },
            menu() {
                this.updatedSelected();
            },
            user() {
                
               this.$nextTick(() => {
                    let $menu = $(this.$refs.menu);
                    let scrollStep = 45;

                    let draggableStartPosition;

                    try {
                         $menu
                        .draggable('destroy'); 
                    } catch (e) {

                    }

                    $menu
                        .off('mousewheel')
                        .on('mousewheel', function(event) {
                            let scrollLeft = $menu.scrollLeft();

                            $menu.scrollLeft(event.deltaY > -1 ? scrollLeft - scrollStep : scrollLeft + scrollStep);

                        })
                        .draggable({
                            cancel: 'false',
                            helper: null,
                            start(e, ui) {
                                draggableStartPosition = $menu.scrollLeft()
                            },
                            drag(e, ui) {
                                let step = Math.abs(ui.position.left - ui.originalPosition.left);
                                $menu.scrollLeft(ui.position.left > ui.originalPosition.left ? draggableStartPosition - step : draggableStartPosition + step);
                            }
                        });
               });
            }
        },

        computed: {
            ...mapState(['currentUrl'])
        },

        mounted() {
            this.updatedSelected();
            
            Chrome.App.on('menuDataReceived').subscribe((res) => {
                this.menu = res.data.menu || [];
                this.user = res.data.user || null;
            });

        },

        methods: {
            updatedSelected() {
                this.selected = _.findIndex(this.menu, (o) => o.url == this.currentUrl);
            },
            updateUrl(url) {
                this.$store.commit('setUrl', url);
            }
        }
    }
</script>