import moment from 'moment';
import {PunchClockService} from '@services';
import {Chrome} from '@classes';
import Settings from "./Settings";

let currentDate = null;
let quotaAlert = null;
let alertEnabled = true;
let audio = new Audio('sound.mp3');
let audioPlaying = false;

audio.onended = function() {
    audioPlaying = false;
};

export default class PunchClockTracker {

    static init() {

        currentDate = PunchClockTracker.getDate();

        quotaAlert = new Chrome.NotificationBuilder();
        quotaAlert.setMessage('You\'ve reached your daily target log time.');
        quotaAlert.setTitle('Time is up!');
        quotaAlert.addButton('Do not notify me again');
        quotaAlert.addButton('Punch Out');
        quotaAlert.persistent();

        quotaAlert.setOnButtonClickListener((index) => {
            // disable alert
            alertEnabled = false;

            if (index) {
                PunchClockTracker.punchOut();
            }

            quotaAlert.clear(() => {
                Chrome.Badge.cancelBackgroundBlink();
                Chrome.Badge.backgroundDefault();
            });
        });


        PunchClockTracker.run();
    }

    static run() {
        // retrieve data

        PunchClockService.getMinutesWorked().then((minutes) => {
            try {

                let human_readable = `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

                Chrome.Badge.setText(human_readable);

                // check if quota is reached
                if (PunchClockService.quotaReached(minutes)) {

                    // check if already next day, then enable alert again
                    if (currentDate != PunchClockTracker.getDate()) {
                        chrome.runtime.reload(); // reload extension to return memory
                        alertEnabled = true;
                        currentDate = PunchClockTracker.getDate();
                    }

                    if (alertEnabled) {
                        // alert when quota reached
                        if (Settings.get('punchOut')) {
                            PunchClockTracker.punchOut();
                        } else if (Settings.get('alarm')) {
                            PunchClockTracker.alert();
                        }
                    }
                } else {
                    // if not, return the background color to normal
                    Chrome.Badge.cancelBackgroundBlink();
                    Chrome.Badge.backgroundDefault();
                }

                // check every 30 seconds
                setTimeout(PunchClockTracker.run.bind(PunchClockTracker), 30000);

            } catch (e) {
                PunchClockTracker.run.call(PunchClockTracker);
            }
            // if initialization failed, try again
        }).catch(PunchClockTracker.run.bind(PunchClockTracker));
    }

    static getDate() {
        return moment().format('D-M-YYYY');
    }


    static alert() {
        if (Settings.get('alarmSound') && !audioPlaying) {
            audioPlaying = true;
            audio.play();
        }

        quotaAlert.create();
        Chrome.Badge.backgroundBlink();
    }

    static punchOut() {
        alertEnabled = false;
        // call the punchout endpoint
        PunchClockService.punchOut().then(() => {
            // notify the user that punch out was successful

            new Chrome.NotificationBuilder()
                .setMessage('To punch in again, click the coding avenue icon on your menu bar.')
                .setTitle('Punch Out Successful!')
                .setDuration(5000)
                .create();

        }).catch(() => {
            // notify user that we were unable to punch out

            new Chrome.NotificationBuilder()
                .setMessage('Attempt to request a punch out has failed. We recommend to do it manually for now.')
                .setTitle('Punch Out Failed!')
                .setDuration(5000)
                .create();

        });
    }

}