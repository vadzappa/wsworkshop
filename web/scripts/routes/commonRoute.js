/**
 * Author: Vadim
 * Date: 2/13/14
 */
define(['lodash', 'ember'], function (_, Ember) {

    var CommonRoute = function (options) {
        _.extend(this, options);
    };

    CommonRoute.prototype.registerRoute = function (application) {
        application[this.name] = Ember.Route.extend(this.config);
        if (this.subRoutes && this.subRoutes.length > 0) {
            _.each(this.subRoutes, function (subRoute) {
                subRoute.registerRoute(application);
            });
        }
    };

    CommonRoute.prototype.buildMapFunction = function (emberRouter) {

        if (this.type === 'resource'){
            var self = this,
                argsToResource = [this.resource];
            if (this.path) {
                argsToResource.push({
                    path: this.path
                });
            }

            argsToResource.push(function () {
                var parentRoute = this;
                _.each(self.subRoutes, function (subRoute) {
                    subRoute.buildMapFunction(parentRoute);
                });
            });

            emberRouter.resource.apply(emberRouter, argsToResource);
        } else {
            var argsToRoute = [this.resource];
            if (this.path) {
                argsToRoute.push({
                    path: this.path
                });
            }

            emberRouter.route.apply(emberRouter, argsToRoute);
        }

    };

    return CommonRoute;

});