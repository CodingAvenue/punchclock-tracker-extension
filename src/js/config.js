import state from './store/state';
import mutations from './store/mutations';
import actions from './store/actions';
import getters from './store/getters';
import routes from './routes';


export default {


    'pageTitle': document.title,


    'punchClock' : {
        endpoint: 'http://work.codingavenue.com/clock',

        // Minutes quota before firing the alert
        quotaInMinutes: 480
    },



    /*
     | Store settings
     */

    'store' : {state, mutations, actions, getters},


    /*
     | Router settings
     */

    'router': {
        mode    : 'hash',
        routes  : routes
    },


    'api': {
        baseURL : '/r'
    },

    /*
     | Localization settings
     */
    'localization': {
        'locale'            : document.documentElement.getAttribute('lang'),
        'fallbackLocale'    : 'en',
    },


    'auth': {
        landingRoute    : '/'
    },


    /*
     | Progressbar settings
     */
    'vue-progressbar': {
        color           : '#a33',
        failedColor     : '#FF4949',
        thickness       : '5px',
        transition      : {
            speed           : '0.2s',
            opacity         : '0.6s',
            termination     : 300
        },
        autoRevert      : true,
        location        : 'bottom',
        inverse         : false
    }

}