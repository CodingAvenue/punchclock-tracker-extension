import { Settings } from '@classes';
import Service from '@system/classes/Service';
import config from '@root/config';
import axios from 'axios';
import $ from 'jquery';


export default class extends Service {

    constructor() {
        super();
    }

    punchOut() {
        return axios.get(`${config.punchClock.endpoint}/punchout`);
    }

    getMinutesWorked() {
        return new Promise((resolve, reject) => {
            axios
                .get(config.punchClock.endpoint)
                .then(({ data }) => {

                    let minutes = 0;

                    $(data).find('table').find('tr > td:nth-child(3)').each(function () {
            
                        let time = $(this).text().trim().split(':');
            
                        minutes += parseInt(time[0]) * 60;
                        minutes += parseInt(time[1]);
                    });


                    resolve(minutes)
                })
                .catch(() => {
                    reject();
                });
        });
    }

    quotaReached(minutes) {

        let quota = Settings.get('alarmTime') || config.punchClock.quotaInMinutes;

        return minutes >= parseInt(quota);
    }

}