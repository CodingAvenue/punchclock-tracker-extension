export default class Settings {


    static get DEFAULTS() {
        return {
            "alarm": true,
            "alarmTime": "480",
            "alarmSound": true,
            "punchOut": false,
            "rememberLastPage": true
        };
    }

    static get KEY() {
        return 'settings';
    }


    static all(value) {

        if (value) {
            if (typeof value == 'object') {
                value = JSON.stringify(value);
            }
            localStorage[Settings.KEY] = value;
        }

        return localStorage[Settings.KEY] ? JSON.parse(localStorage[Settings.KEY]) : Settings.DEFAULTS;
    }


    static set(name, value) {
        let list = Settings.all();

        list[name] = value;

        localStorage[Settings.KEY] = JSON.stringify(list);

    }

    static get(name) {
        return Settings.all()[name];
    }

}
