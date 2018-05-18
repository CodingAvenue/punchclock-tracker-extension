import uniqid from 'uniqid'
import {Observable} from 'rxjs';

/** 
 * A wrapper class for Chrome Extensions APIs
 * 
*/

let blinkBadge = false;
let blinkTimeoutInstance = null;

export default class {

    constructor() {
        
       

    }


    static get App() {
        return class AppEvents {
            static on(rtype) {

                return Observable.create((observer) => {
                    chrome.runtime.onMessage.addListener(({ type, data }, sender, sendResponse) => {
                            if (rtype == type) {
                                observer.next({ data, sendResponse })
                                return true;
                            }
                    });
                });

            }

            static send(type, data) {
                return new Promise((resolve) => {
                    chrome.runtime.sendMessage({ type, data }, (res) => {
                        resolve(res)
                    });
                });
            }


            static get(type) {
                return AppEvents.send(type, null);
            }

        };
    }

    static get Iframe() {
        return class IframeEvents {
            static on(rtype) {
                return Observable.create((observer) => {
                    chrome.extension.onMessage.addListener(function({ type, data }, sender, sendResponse){
                        if (rtype == type) {
                            observer.next({ data, sendResponse })
                            return true;
                        }
                    });
                });
            }

        
            static send(type, data) {
                chrome.extension.sendMessage({ type, data });
            }

        };
    }


    static get NotificationBuilder() {
        return class {

            constructor() {
                this.__message = "";
                this.__icon = 'images/ca32.png';
                this.__custom_opts = {};
                this.__buttons = [];
            }
        
        
            setOnButtonClickListener(callback) {
                this.__button_clicked_cb = callback;

                return this;
            }
        
            getId() {
                return this.__notification_id;
            }
        
        
            setDuration(milliseconds) {
                this.__notification_duration = milliseconds;

                return this;
            }
        
            setTitle(title) {
                this.__title = title;

                return this;
            }
        
            setMessage(message) {
                this.__message = message;

                return this;
            }
        
            setIcon(icon_url) {
                this.__icon = icon_url;

                return this;
            }

            addCustomOptions(obj) {
                this.__custom_opts = obj;

                return this;
            }

            persistent() {
                this.addCustomOptions({
                    priority: 2,
                    requireInteraction: true,
                });

                return this;
            }
        
            addButton(title) {
                this.__buttons.push({ title });

                return this;
            }

            create() {
                if (! this.__notification_id) {
                    this.__notification_id = uniqid();
                }

                if (this.__button_clicked_cb) {
                    chrome.notifications.onButtonClicked.addListener((notification_id, index) => {
                        if (notification_id == this.getId()) {
                            this.__button_clicked_cb.call(this, index);
                        }
                    });
                }
        
                chrome.notifications.create(this.getId(), {
                    type: 'basic',
                    title: this.__title,
                    iconUrl: this.__icon,
                    message: this.__message,
                    buttons: this.__buttons,
                    ...this.__custom_opts,
                }, (notification_id) => {
                    ((id) => {
                        if (this.__notification_duration) {
                            setTimeout(() => {
                                chrome.notifications.clear(id);
                            }, this.__notification_duration);
                        }
                    })(notification_id);
                });
        

                return this;
            }
        
            clear(cb) {
                chrome.notifications.clear(this.__notification_id, cb);

                return this;
            }
        
        };
    }

    static get Badge() {
        return class Badge {
            static setText(text) {
                chrome.browserAction.setBadgeText({ text });
            }

            static backgroundDefault() {
                chrome.browserAction.setBadgeBackgroundColor({color:[55, 119, 188, 150]});
            }

            static backgroundAlternate() {
                chrome.browserAction.setBadgeBackgroundColor({color:[216, 226, 14, 150]});
            }

            static cancelBackgroundBlink() {
                blinkBadge = false;
            }

            static backgroundBlink() {

                if (!blinkBadge) {
                    blinkBadge = true;
                    let toggle = false;
                    (function rfunc(){
            
                        if (toggle && blinkBadge) {
                            Badge.backgroundAlternate();
                        } else {
                            Badge.backgroundDefault();
                        }
                        
                        toggle = !toggle;
                    
                        if (!blinkBadge) return;
            
                        if (blinkTimeoutInstance) clearTimeout(blinkTimeoutInstance);
            
                        blinkTimeoutInstance = setTimeout(rfunc, 500);
                    })();
                }
        
            }
        
        };
    }

}
