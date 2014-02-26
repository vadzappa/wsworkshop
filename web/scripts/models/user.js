/**
 * Author: Vadim
 * Date: 2/11/14
 */
define(['ember', 'ember.data'], function (Ember, DS) {
    var UserModel = DS.Model.extend({
        name: DS.attr('string'),
        email: DS.attr('string'),
        bio: DS.attr('string'),
        avatarUrl: DS.attr('string'),
        creationDate: DS.attr('date'),
        houses: DS.hasMany('house', {async: true})
    });

    return UserModel;
});