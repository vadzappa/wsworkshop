/**
 * Author: Vadim
 * Date: 2/13/14
 */
define(['ember', 'ember.data'], function (Ember, DS) {
    var PropertyModel = DS.Model.extend({
        name: DS.attr('string'),
        location: DS.attr('string'),
        area: DS.attr('string')
    });

    return PropertyModel;
});