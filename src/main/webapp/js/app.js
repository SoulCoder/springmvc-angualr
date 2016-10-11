/**
 * back-user anglanjs 相关注册
 * */

'use strict';

var app = angular.module("newOAModule", ['ui.bootstrap', 'tm.pagination', 'ui.router'], function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
})
    .run(//
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('application');

        $stateProvider
            .state('employeeInfo', {
                url: '/',
                templateUrl: 'partials/employeeInfo.html'
            })
            .state('sheets', {
                url: '/sheets',
                templateUrl: 'html/sheets.html'
            })
            .state('help', {
                url: '/help',
                templateUrl: 'html/help.html'
            })
            .state('certificate', {
                url: '/certificate',
                templateUrl: 'html/certificate.html'
            })
            .state('certificateInfo', {
                url: '/certificateInfo',
                templateUrl: 'html/certificateInfo.html'
            })
            .state('configuration', {
                url: '/configuration',
                templateUrl: 'partials/configuration.html',
                controller: 'ConfigurationController'
            })
            .state('processConfig', {
                url: '/processConfig',
                templateUrl: 'html/processConfig.html'
            })
            .state('application', {
                url: '/application',
                templateUrl: 'partials/application.html',
                controller: 'newOAController'
            })
    });