/**
 * Author: Vadim
 * Date: 2/14/14
 */

var fs = require('fs'),
    path = require("path"),
    workingFolder = path.join(__dirname, '/json');

module.exports = {
    getResourceByName: function (resourceName) {
        return JSON.parse(fs.readFileSync(path.join(workingFolder, resourceName), 'utf8'));
    }
};