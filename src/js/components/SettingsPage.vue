

<template>
    <div class="settings-page">
        <div>
            <a href="#" @click.prevent="$router.go(-1)" class="btn-return" title="Close the settings page"><i class="fa fa-times fa-lg"></i></a>
            <div class="menu pt1">
                <button class="menu-item selected">Main</button>
                <button class="menu-item">Custom Code</button>
            </div>
        </div>
        <form @submit.prevent="save">
            <div class="clearfix">
                <h4>Quota </h4>
                <div class="col col-12 clearfix pb2 pl2">
                    <div class="col col-7">
                        <label for="quota">Quota (in minutes)</label>
                    </div>
                    <div class="col col-5 right-align">
                        <input type="number" id="quota" v-model="form.alarmTime" class="right-align">
                    </div>
                </div>
                <h4>Notification</h4>
                <div class="col col-12 clearfix pb2 pl2">
                    <div class="col col-7">
                        <label for="alarm">Show notification when quota is reached</label>
                    </div>
                    <div class="col col-5 right-align">
                        <input type="checkbox" id="alarm" v-model="form.alarm" :disabled="form.punchOut">
                    </div>
                </div>
                <div class="col col-12 clearfix pb2 pl2">
                    <div class="col col-7">
                        <label for="alarmSound">Enable notification sound</label>
                    </div>
                    <div class="col col-5 right-align">
                        <input type="checkbox" id="alarmSound" v-model="form.alarmSound" :disabled="!form.alarm || form.punchOut">
                    </div>
                </div>
                <h4>Misc</h4>
                <div class="col col-12 clearfix pb2 pl2">
                    <div class="col col-7">
                        <label for="punchOut">Punch out automatically when quota is reached</label>
                    </div>
                    <div class="col col-5 right-align">
                        <input type="checkbox" id="punchOut" v-model="form.punchOut">
                    </div>
                </div>
                <div class="col col-12 clearfix pb2 pl2">
                    <div class="col col-7">
                        <label for="rememberLastPage">Remember last visited page</label>
                    </div>
                    <div class="col col-5 right-align">
                        <input type="checkbox" id="rememberLastPage" v-model="form.rememberLastPage">
                    </div>
                </div>
                <div class="col col-12 clearfix pb2 pl2 pt2">
                    <div class="col col-12 center">
                        <button id="save" @click.prevent="save" :disabled="saved">{{ saved ? 'Saved' : 'Save' }}</button>
                    </div>
                </div>

            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped>
    @import "~@variables.scss";

    .settings-page {
        background: $primaryBackgroundColor;
        color: $primaryColor;
        padding: 5px 10px;
        box-sizing: border-box;
    }

    .ca-logo {
        background: #fff;
        border-radius: 90%;
        padding: 5px;
        height: 18px;
        vertical-align: sub;
    }

    a {
        color: $linkColor;
        text-decoration: none;

        &:hover {
            color: lighten($linkColor, 30)
        }

    }

    .btn-return {
        float: right;
        font-weight: bold;
        font-size: 18px;
        margin-right: 2px;
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

        }
    }

    #quota {
        width: 75px;
    }

    #save {
        height: 25px;
        width: 75px;
        font-size: 14px;
    }

</style>

<script>
    import config from '@root/config'

    import { Chrome } from '@classes';

    export default {
        data() {
            return {
                saved: true,
                form: {
                    alarm: true,
                    alarmTime: 480,
                    alarmSound: true,
                    punchOut: false,
                    rememberLastPage: true
                }
            };
        },

        computed: {
            dirty() {
                return JSON.stringify(this.form);
            }
        },

        watch: {
            'form.punchOut': function(val) {
                if (val) {
                    this.form.alarm = false;
                    this.form.alarmSound = false;
                }
            },
            dirty(dirty) {
               if (dirty) this.saved = false;
            }
        },

        mounted() {
            this.load();
        },

        activated() {
            this.load();
        },

        methods: {
            save() {
                Chrome.App.send('settings-set', JSON.stringify(this.form));
                this.$nextTick(() => {
                    this.saved = true;
                });
            },
            load() {
                Chrome.App.get('settings').then((data) => {
                    this.form = data;
                    this.$nextTick(() => {
                        this.saved = true;
                    });
                });
            }
        }

    }
</script>