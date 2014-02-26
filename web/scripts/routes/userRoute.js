/**
 * Author: Vadim
 * Date: 2/13/14
 */
/**
 * Author: Vadim
 * Date: 2/11/14
 */
define(['./commonRoute'], function (CommonRoute) {

    var UserRoute = function () {
    };
    UserRoute.prototype = new CommonRoute({
        name: 'UserRoute',
        resource: 'user',
        type: 'resource',
        path: '/users/:user_id',
        config: {
            model: function(user){
                return this.store.find("user", user.user_id);
            }
        }
    });

    return UserRoute;
});