/**
 * Author: Vadim
 * Date: 2/13/14
 */
define(['lodash' , 'ember', 'routes/usersRoute'], function (_, Ember, UsersRoute) {
    var routes = [
        new UsersRoute()
    ];

    var router = {
        buildRoutes: function (app) {
            _.each(routes, function (route) {
                route.registerRoute(app);
                app.Router.map(function () {
                    route.buildMapFunction(this);
                });
            });
        }
    };

    return router;
});