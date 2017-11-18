module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      server: {
        options: {
          port: 3000,
          bases: ['www-roots']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-express');

  // Default task(s).
  grunt.registerTask('default', ['express', 'express-keepalive']);

};