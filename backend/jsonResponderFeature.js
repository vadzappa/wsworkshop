/**
 * Author: Vadim
 * Date: 2/26/14
 */

const DEFAULT_ENCODING = 'utf8';

var augment = require('augment'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    DataFilterer = require('./dataFilterer');

_.mixin(require('underscore.deferred'));


/**
 * Read file content to JSON object
 * @param fileName
 * @returns promise with JSON as resolve result or error as reject result
 */
var readJsonFileContent = function readJsonFileContent(fileName) {
    var jsonFilePath = path.join(this.jsonStaticFilesFolder, fileName),
        deferred = new _.Deferred();

    fs.readFile(jsonFilePath, DEFAULT_ENCODING, function (error, data) {
        if (error) {
            deferred.reject(error);
        } else {
            try {
                deferred.resolve(JSON.parse(data));
            } catch (e) {
                deferred.reject(e);
            }
        }
    });

    return deferred.promise();

};

var filterRequestedData = function filterRequestedData(req, responseData) {

    var filteringDetails = req.query;
    var dataFilterer = new DataFilterer(filteringDetails, responseData);

    return dataFilterer.filterData();
};


var JsonResponderFeature = augment(Object, function () {
    this.name = 'JsonResponderFeature';
    this.constructor = function (jsonStaticFilesFolder, jsonPrefix) {
        this.jsonStaticFilesFolder = jsonStaticFilesFolder;
        this.jsonPrefix = jsonPrefix;
        this.deserialize = readJsonFileContent.bind(this);
    };

    this.processRequest = function (req, res) {
        var requestedResourceName = _.last(req.path.split(this.jsonPrefix));

        _.when(this.deserialize(requestedResourceName)).done(function (responseData) {
            res.send(filterRequestedData(req, responseData));
        }).fail(function (err) {
                res.status(500, err);
            });
    }
});

module.exports = JsonResponderFeature;