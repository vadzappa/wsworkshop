/**
 * Author: Vadim
 * Date: 2/11/14
 */
define(['./commonRoute', './userRoute'], function (CommonRoute, UserRoute) {

    var UsersRoute = function () {
    };
    UsersRoute.prototype = new CommonRoute({
        name: 'UsersRoute',
        resource: 'users',
        type: 'resource',
        path: '/',
        subRoutes: [new UserRoute()],
        config: {
            model: function () {
                return this.store.find('user');
            }
        }
    });

    return UsersRoute;
});