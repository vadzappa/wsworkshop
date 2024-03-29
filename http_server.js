/**
 * Author: Vadim
 * Date: 2/7/14
 */
var express = require('express'),
    app = express(),
    http = require("http"),
    path = require("path"),
    workingFolder = path.join(__dirname, '/web'),
    dynamicDataAdapter = require('./dynamicDataAdapter'),
    _ = require('lodash');

// simple logger
app.use(function (req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

// respond
app.use(function (req, res, next) {
    if (req.path === '/') {
        res.sendfile(path.join(workingFolder, '/index.html'));
    } else if (req.path.indexOf('/json/') === 0) {
        setTimeout(function () {
            res.send(dynamicDataAdapter.getResourceByName(_.last(req.path.split('/json/'))));
        }, 1000);
    } else {
        res.sendfile(path.join(workingFolder, req.path));
    }

});

http.createServer(app).listen(80, function () {
    console.log("Express server listening on port " + 80);
});

module.exports = {};