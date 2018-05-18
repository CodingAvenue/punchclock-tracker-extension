/**
 * Install application state management component
 */
import Vuex from 'vuex';

Vue.use(Vuex);
app.store = new Vuex.Store(config.store);



/**
 * Install router component
 */
import Router from 'vue-router';

Vue.use(Router);
app.router = new Router(config.router);



/**
 *  Install vue-router and vuex sync
 */
import { sync } from 'vuex-router-sync'
sync(app.store, app.router);



/**
 * Install localization component
 */
import VueI18n from 'vue-i18n'

const messages = require('@root/includes/languages');

Vue.use(VueI18n);
app.i18n = new VueI18n({
    locale  : messages[config.localization.locale] ? config.localization.locale : config.localization.fallbackLocale,
    messages
});
