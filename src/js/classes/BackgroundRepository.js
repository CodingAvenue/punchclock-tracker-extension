import $ from 'jquery';

export default class {

    constructor() {
        
       

    }

    static extractMenuData(html) {
        let menu = [], user = '';

        $(html).children('li').each(function() {
            var $this = $(this);
            if ($this.find('a > i[class^=pe-7s]').length) {
                menu.push({
                    label: $this.text().trim(),
                    url: $this.find('a').attr('href')
                })
            } else if ($this.is(":contains('Welcome ')")) {
                user = $this.text().trim().substring(8);

            }
        });


        return { user, menu };
    }

}
