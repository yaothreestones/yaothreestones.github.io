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
                controller: 'appCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/app/app.css",
                        "style/app/coping.css",//顶部
                        "style/app/base.css",//底部
                        "script/controllers/app/app.js"
                    ]),
                }
            })
            //前台开始页面
            .state("app.begin", {
                url: "/begin",
                templateUrl: 'view/app/begin.html',
                // controller: 'beginCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([ "style/app/app.css",
                        // "script/controllers/app/begin.js"
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.isShow=false;
                        $rootScope.config.footNav.isShow = false;

                    }
                }

            })
            //登录
            .state("app.login", {
                        url: "/login",
                        templateUrl: 'view/app/login.html',
                        controller: 'loginCtrl',
                        resolve: {
                            loadMyFile: _lazyLoad([
                                "script/controllers/app/login.js"
                            ]),
                            configByRouter: function ($rootScope) {
                                $rootScope.config.headNav.title = '登录';
                                $rootScope.config.headNav.backBtn.isShow=true;
                                $rootScope.config.footNav.isShow = false;
                            }
                        },

                    })
             //微信授权
            .state("app.wechat", {
                url: "/wechat",
                templateUrl: 'view/app/wechat.html',
                // controller: 'wechatCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/app/wechat.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '微信授权';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow = false;
                    }
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
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '关联回家学习账号';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow = false;
                    }
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
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '注册并绑定回家学习账号';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow = false;
                    }
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
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '注册';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow = false;
                    }
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
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '找回密码';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow = false;
                    }
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
                        "style/communal/public.css",
                        "style/communal/mobileSelect.css",
                        "script/communal/mobileSelect.js",
                        "script/communal/year.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '个人资料';
                        $rootScope.config.headNav.Skip.isShow=true;
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow = false;
                    }
                }
            })
            //首页
            .state("app.page", {
                url: "/page",
                templateUrl: 'view/homePage/page.html',
                // controller: 'pageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/homePage/page.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '玩转学习';
                        $rootScope.config.headNav.search.isShow=true;
                        $rootScope.config.footNav.isShow =true;
                    }
                }
            })

        //排行榜
            .state("app.ranking", {
                url: "/ranking",
                templateUrl: 'view/homePage/ranking.html',
                // controller: 'rankingCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/homePage/ranking.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '排行榜';
                        $rootScope.config.headNav.prompt.isShow=true;
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.headNav.isSteep=true;
                        $rootScope.config.footNav.isShow =false;
                        $rootScope.config.headNav.promptList.isShow = false;
                    }
                }
            })
        //搜索
            .state("app.rakeThrough", {
                url: "/rakeThrough",
                templateUrl: 'view/homePage/rakeThrough.html',
                // controller: 'rakeThroughCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/homePage/rakeThrough.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '搜索';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow =false;
                    }
                }
            })
            //同步预习
            .state("app.search", {
                url: "/search",
                templateUrl: 'view/homePage/search.html',
                controller: 'searchCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/homePage/search.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '教材';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow =false;
                        $rootScope.config.headNav.screen.isShow = true;
                    }
                }
            })
            //同步预习  课时列表
            .state("app.teaching", {
                url: "/teaching",
                templateUrl: 'view/homePage/teaching.html',
                // controller: 'teachingCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/homePage/teaching.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '教材';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow =false;
                    }
                }
            })
            //同步预习  第n课
            .state("app.lesson", {
                url: "/lesson",
                templateUrl: 'view/homePage/lesson.html',
                // controller: 'lessonCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        // "script/controllers/homePage/lesson.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '第一课';
                        $rootScope.config.headNav.subject = '龟兔赛跑';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.footNav.isShow =false;
                    }
                }
            })
            //资讯
            .state("app.seek", {
                url: "/seek",
                templateUrl: 'view/service/seekAdvice/seek.html',
                controller: 'seekCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/service/seek.css",
                        "script/controllers/service/seek/seekCtrl.js",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '资讯';
                        $rootScope.config.headNav.search.isShow=true;
                    }
                }
            })
            //详情
            .state("app.seekDetails", {
                url: "/seekDetails",
                templateUrl: 'view/service/seekAdvice/seekDetails.html',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/service/seek.css",
                    ]),
                    configByRouter: function ($rootScope) {
                        $rootScope.config.headNav.title = '资讯';
                        $rootScope.config.headNav.backBtn.isShow=true;
                        $rootScope.config.headNav.share.isShow = true;
                        $rootScope.config.footNav.isShow = false;
                    }
                }
            })
    }

]);