/**
 * Author: Vadim
 * Date: 2/11/14
 */
require.config({
    baseUrl: "scripts",
    shim: {
        'ember': {
            deps: ['handlebars', 'jquery'],
            exports: 'Ember'
        },
        'ember.data': {
            deps: ['ember'],
            exports: 'DS'
        }
    },
    paths: {
        "jquery": "http://code.jquery.com/jquery-1.10.1.min",
        "lodash": "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min",
        "handlebars": "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.3.0/handlebars.min",
        "ember": "../libs/ember",
        "ember.data": "//cdnjs.cloudflare.com/ajax/libs/ember-data.js/1.0.0-beta.6/ember-data.min"
    },
    hbs: {
        disableI18n: true,
        templateExtension: "hbs"
    }
});

require(['jquery', 'lodash', 'application', 'router', 'templates/templates', 'modeler', 'ember', 'ember.data'],
    function ($, _, Application, router, templates, modeler, Ember, DS) {
        var app = Application.create();

        modeler.includeModels(app);
        router.buildRoutes(app);


    }
);