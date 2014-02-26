function config(name) {
    return require('./tasks/' + name + '.js');
}

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        emberTemplates: config('emberTemplates'),
        watch: {
            files: ['web/scripts/templates/**/*.hbs', 'web/scss/**/*.scss'],
            tasks: ['emberTemplates', 'compass:dev']
        },
        compass: config('compass')
    });

    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('dist', ['emberTemplates']);
    grunt.registerTask('default', ['watch']);
};
