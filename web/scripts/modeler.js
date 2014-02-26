/**
 * Author: Vadim
 * Date: 2/13/14
 */
define(['lodash', './models/user', './models/property'], function (_, UserModel, PropertyModel) {
    var models = {
        'User': UserModel,
        'House': PropertyModel
    };

    return {
        includeModels: function (application) {
            _.each(models, function (model, modelName) {
                application[modelName] = model;
            });
        }
    }
});