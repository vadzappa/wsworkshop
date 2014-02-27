/**
 * Author: Vadim
 * Date: 2/27/14
 */

var augment = require('augment'),
    _ = require('lodash');

var DataFiltererFeature = augment(Object, function () {

    /**
     *
     * @param requestedKey plural name of parameter
     * @returns String singular name
     */
    var detectSingularName = function detectSingularName(requestedKey) {
        if (requestedKey.lastIndexOf('s') === requestedKey.length - 1) {
            return requestedKey.substr(0, requestedKey.length - 1);
        }
        return requestedKey;
    };

    /**
     * Does any of items has specified property
     * @param propertyName
     * @returns {boolean}
     */
    var hasItemsWithProperty = function hasItemsWithProperty(propertyName) {
        var keyExists = _.find(this, function (item) {
            return !_.isUndefined(item[propertyName]) && !_.isNull(item[propertyName]);
        });

        return !_.isUndefined(keyExists);
    };

    var matchesFilter = function matchesFilter(dataObject, filteringPropertyName, filteringValue) {
        return dataObject[filteringPropertyName] == filteringValue;
    };

    this.constructor = function (filteringDetails, dataToFilter) {
        this.filteringDetails = filteringDetails;
        this.dataToFilter = dataToFilter;
    };

    this.filterDataBySingleProperty = function filterDataBySingleProperty(propertyToFilter, filterValues) {
        _.each(this.dataToFilter, function (itemsList, setName) {
            if (!hasItemsWithProperty.bind(itemsList)(propertyToFilter)) {
                return;
            }

            this.dataToFilter[setName] = _.filter(itemsList, function (item) {
                var include = false,
                    filterByValues = _.isArray(filterValues) ? filterValues : [filterValues];

                _.each(filterByValues, function (filteringValue) {
                    include = include || matchesFilter(item, propertyToFilter, filteringValue);
                });

                return include;
            });
        }.bind(this));
    };


    this.filterData = function filterData() {

        if (Object.keys(this.filteringDetails).length === 0) {
            return this.dataToFilter;
        }

        _.each(this.filteringDetails, function (filterValue, filterKey) {
            var propertyToFilter = _.isArray(filterValue) ? detectSingularName(filterKey) : filterKey;
            this.filterDataBySingleProperty(propertyToFilter, filterValue);
        }.bind(this));

        return this.dataToFilter;
    };
});

module.exports = DataFiltererFeature;