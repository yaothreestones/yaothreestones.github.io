/**
 * Created by gmisl on 17-12-14.
 */
angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
        $locationProvider.hashPrefix("!");
        var _lazyLoad = function (loaded) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(loaded, {serie: true});
            }
        };
        $locationProvider.hashPrefix("");
        $urlRouterProvider.otherwise("app/begin");
        $stateProvider
            .state("app", {
                url: "/app",
                templateUrl: 'view/app/app.html',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/app/app.css",
                        "style/app/coping.css",//顶部
                        "style/app/base.css",//底部
                        // "script/controllers/app/app.js",
                    ])
                },
            })
            //前台开始页面
            .state("app.begin", {
                url: "/begin",
                templateUrl: 'view/app/begin.html',
                // controller: 'beginCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([ "style/app/app.css",
                        // "script/controllers/app/begin.js"
                    ])
                },
            })
            //登录
            .state("app.login", {
                        url: "/login",
                        templateUrl: 'view/app/login.html',
                        // controller: 'loginCtrl',
                        resolve: {
                            loadMyFile: _lazyLoad([
                                "script/controllers/app/login.js"
                            ])
                        },
                // configByRouter: function ($rootScope) {
                //     $rootScope.config.footNav.isShow = false;//此路由页,tab栏隐藏
                //     $rootScope.config.headNav.skipSetBaseDetailBtn['isShow'] = true;
                //     $rootScope.config.headNav.skipSetBaseDetailBtn['url'] = 'app.login';
                //     $rootScope.config.headNav.title = '填写个人资料';
                //     $rootScope.config.headNav.backBtn['isShow'] = true;//此路由页,返回按钮显示
                // }
                    })
             //微信授权
            .state("app.wechat", {
                url: "/wechat",
                templateUrl: 'view/app/wechat.html',
                // controller: 'wechatCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/app/wechat.js",
                    ])
                }
            })
            //关联回家学习账号
            .state("app.binding", {
                url: "/binding",
                templateUrl: 'view/app/binding.html',
                // controller: 'bindingCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/app/bingding.js",
                    ])
                }
            })
           // 注册并绑定回家学习账号
            .state("app.newAccount", {
                url: "/newAccount",
                templateUrl: 'view/app/newAccount.html',
                // controller: 'newAccountCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/app/newAccount.js",
                    ])
                }
            })
            //前台注册页面
            .state("app.enroll", {
                url: "/enroll",
                templateUrl: 'view/app/enroll.html',
                // controller: 'enrollCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/app/enroll.js",
                    ])
                }
            })
        //找回密码
            .state("app.retrieve", {
                url: "/retrieve",
                templateUrl: 'view/app/retrieve.html',
                // controller: 'retrieveCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/app/retrieve.js",
                    ])
                }
            })
        //个人资料
            .state("app.profile", {
                url: "/profile",
                templateUrl: 'view/app/profile.html',
                // controller: 'profileCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/app/profile.js",
                    ])
                }
            })
    }
]);