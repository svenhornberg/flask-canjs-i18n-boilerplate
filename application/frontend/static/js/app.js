require.config({
    "baseUrl": "/static/js",
    "paths": {
        "utils": "app/lib/utils",
        "loglevel": "vendor/loglevel.min",
        "jquery": [
            "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min",
            "vendor/jquery-1.10.1.min"
        ],
        "jquery.bootstrap": [
            '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min',
            "vendor/bootstrap.min"
        ],
        "can": "vendor/can",
        "i18n": "vendor/i18next.amd.withJQuery-1.6.3.min",
        "spin": "vendor/spin.min",
        shim: {
            "jquery.bootstrap": {
                deps: ["jquery"],
                exports: "$.fn.popover"
            },
            "utils": {
                deps: ["jquery"],
                exports: "$.fn.popover"
            },
            enforceDefine: true
        }
    }
});
/**
 * @requires jquery
 * @requires util
 * @requires i18n
 * @requires can
 * @requires app/feedbacks
 * @requires can/view/mustache
 * @requires bootstrap
 */
require(['can', 'jquery', 'utils', 'i18n', 'settings', 'spin', 'app/components/navbar', 'app/routers', 'can/view/mustache'],
    function (can, $, utils, i18n, settings, Spin, Navbar, Routers) {
        'use strict';

        $(document).ready(function () {
            var lang = $('html').attr('lang');
            var i18n_option = settings.i18n_options;
            lang != undefined
                ? i18n_option.lng = lang
                : i18n_option.lng = 'ko';
            settings.use_logger ? utils.enableLog() : utils.disableLog();
            can.when(i18n.init(i18n_option)).then(function () {
                can.route.ready(false);

                // View helper for pluralizing strings
                can.Mustache.registerHelper('feedbackPlural', function (str, attr) {
                    return str + (attr.call(this.feedbacks) !== 1 ? 's' : '');
                });

                can.Mustache.registerHelper('i18n', function (str, options) {
                    return i18n != undefined
                        ? i18n.t(str)
                        : str;
                });
                Navbar.load();
                new Routers($('#app'));
                var target = document.getElementById('ajaxProgress');
                var spinner = new Spin(settings.spin_options);
                var $document = $(document);
                $document.ajaxStart(function () {
                    spinner.spin(target);
                    $(target).removeClass('hidden');
                });
                $document.ajaxStop(function () {
                    spinner.stop();
                    $(target).addClass('hidden');
                });

                can.route.ready(true);
            });
        });
    });