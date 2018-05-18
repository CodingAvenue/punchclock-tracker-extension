import { PunchClockTracker, Chrome, BackgroundRepository, Settings } from '@classes';


export default new class  {

    constructor() {

        
        Chrome.Iframe.on('load').subscribe((res) => {
            if (/^https?\:\/\/(.*?\.)?codingavenue\.com\/clock(\/?.*)$/.test(res.data)) {
                localStorage['iframe_url'] = res.data;
            }
        })

        Chrome.Iframe.on('menu').subscribe((res) => {
            Chrome.App.send('menuDataReceived', BackgroundRepository.extractMenuData(res.data));
            PunchClockTracker.run();
        })


        Chrome.App.on('lastUrl').subscribe((res) => {
            res.sendResponse(localStorage['iframe_url']);
        })

        Chrome.App.on('lastUrl').subscribe((res) => {
            res.sendResponse(localStorage['iframe_url']);
        })

        Chrome.App.on('settings').subscribe((res) => {
            res.sendResponse(Settings.all());
        });

        Chrome.App.on('settings-set').subscribe((res) => {
            Settings.all(res.data);
        });


        PunchClockTracker.init();
    }

}


