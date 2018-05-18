import $ from 'jquery'

/**
 * A workaround for getting the url of the document inside the iframe
 */


if (window.self !== window.top) {

    window.onbeforeunload = function(){
        chrome.extension.sendMessage({ type: 'unload' });
    };

    window.onload = function(){
        chrome.extension.sendMessage({ type: 'load', data: window.location.href });
        chrome.extension.sendMessage({ type: 'menu', data: $('<div></div>').html($('.nav.navbar-nav').children().clone()).get(0).outerHTML });
        
        $('.navbar-toggle,.main-panel > .navbar-fixed').remove();
    };
    
}