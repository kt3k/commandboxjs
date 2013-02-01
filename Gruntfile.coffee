
module.exports = (grunt) ->

  grunt.initConfig

    jshint:
      src:
        src: ['commandbox.js']
        options:
          jshintrc: '.jshintrc'

  [
    'grunt-contrib-jshint'
  ]
  .forEach grunt.loadNpmTasks

  grunt.registerTask 'default', [
    'jshint'
  ]
