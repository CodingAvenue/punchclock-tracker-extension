/**
 * Import CSS dependencies
 */
import "normalize.css/normalize.css";
import "basscss/css/basscss.css";
import 'animate.css';

/**
 * Install progressbar component
 */
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, config['vue-progressbar']);


/**
 * Install Vue Filters
 */
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);



/**
* Install Moment JS
*/
import moment from "moment-timezone";
import VueMomentJS from "vue-momentjs";

Vue.use(VueMomentJS, moment);


Vue.filter('ucword', function (value) {
    return _.startCase(_.toLower(value));
});

Vue.filter('ucfirst', function (value) {
    return value.substring(0,1).toUpperCase() + value.substring(1);
});


import VueSmoothScroll from 'vue-smoothscroll-websites';
Vue.use(VueSmoothScroll);

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}


import "font-awesome-webpack";
import 'jquery-mousewheel';
import 'jquery-ui-dist/jquery-ui.js'
