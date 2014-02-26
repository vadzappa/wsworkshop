/**
 * Author: Vadim
 * Date: 2/11/14
 */
define(['ember', 'ember.data'], function (Ember, DS) {
    var Application = Ember.Application.extend({
    });
    DS.RESTAdapter.reopen({
        namespace: 'json'
    });

    return Application;
});