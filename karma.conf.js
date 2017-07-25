module.exports = function(config) {
    config.set({
        basePath: '',
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'js/**/*.js',
            'test/**/*.js'
        ],
        exclude: [],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    })
}