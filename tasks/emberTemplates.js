/**
 * Author: Vadim
 * Date: 2/13/14
 */
module.exports = {
    compile: {
        options: {
            templateBasePath: /web\/scripts\/templates\//,
            precompile: true,
            amd: true
        },
        files: {
            "web/scripts/templates/templates.js": "web/scripts/templates/**/*.hbs"
        }
    }
};
