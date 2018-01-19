angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
        var _lazyLoad = function (loaded) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(loaded, {serie: true});
            };
        };
        $locationProvider.hashPrefix("");
        $urlRouterProvider.when("", "/login");
        $stateProvider
        //后台登陆页
            .state("login", {
                url: "/login",
                templateUrl: 'view/login/login.html',
                controller:'loginCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "view/login/login.html",
                        "style/login/login.css",
                        "script/controllers/login/login.js"
                    ])
                }
            })
            //后台首页
            .state("backStage", {
                url: "/backStage",
                templateUrl: 'view/backstage/backStage.html',
                controller: 'backStageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "view/backstage/backStage.html",
                        "style/backstage/backStage.css",
                        "style/teachManage/teachManage.css",
                        "script/controllers/backPage/backStage.js",
                        "script/directives/Side-navigation.js",
                        "script/services/Side-navigation-list.js",
                        "script/constant/selectObject/selectObject.js",
                        'script/filters/filter.js',
                        'script/config.js'
                    ])
                }
            })
            //teachManage
            //教学管理模块
            .state("backStage.teachManage", {
                url: "/teachManage",
                abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
                //整个模块公共文件
                resolve: {
                    loadMyFile: _lazyLoad([
                        'script/services/backStage/backStage.js'
                    ])
                }
            })
            //后台科目管理页
            .state("backStage.teachManage.subject", {
                url: "/subject?page&size&type&status&name",
                templateUrl: 'view/teachManage/subject/subject.html',
                controller: 'subjectCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/teachManage/subject/subject.html',
                        'script/controllers/teachManage/subject/subjectCtrl.js',
                    ])
                }
            })
            //科目管理（新增.查看.编辑）
            .state("backStage.teachManage.subjectManage", {
                url: "/subjectManage?from&page&type&status&name&id&subject",
                templateUrl: 'view/teachManage/subject/subjectManage.html',
                controller: 'subjectManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/teachManage/subject/subjectManage.html',
                        'script/controllers/teachManage/subject/subjectManageCtrl.js'
                    ])
                }
            })
            //后台课程管理页
            .state("backStage.teachManage.courses", {
                url: "/courses?add&page&size&subjectId&grade&courseName&status&subject",
                templateUrl: 'view/teachManage/courses/courses.html',
                controller: 'coursesCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/teachManage/courses/courses.html',
                        'script/controllers/teachManage/courses/coursesCtrl.js'
                    ])
                }
            })
            //课程管理（新增.查看.编辑）
            .state("backStage.teachManage.coursesManage", {
                url: "/coursesManage?from&add&course&page&size&subjectId&grade&courseName&status&subject",
                templateUrl: 'view/teachManage/courses/coursesManage.html',
                controller: 'coursesManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/teachManage/courses/coursesManage.html',
                        'script/controllers/teachManage/courses/coursesManage.js'
                    ])
                }
            })
            //后台课时管理页
            .state("backStage.teachManage.period", {
                url: "/period?add&course&page&size&obj",
                templateUrl: 'view/teachManage/period/period.html',
                controller: 'periodCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/teachManage/period/period.html',
                        'script/controllers/teachManage/period/periodCtrl.js'
                    ])
                }
            })
            //课时管理（新增.查看.编辑）
            .state("backStage.teachManage.periodManage", {
                url: "/periodsManage?from&add&course&obj&period",
                templateUrl: 'view/teachManage/period/periodManage.html',
                controller: 'periodManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/teachManage/period/periodManage.html',
                        'script/controllers/teachManage/period/periodManage.js'
                    ])
                }
            })
            //后台任务管理页
            .state("backStage.teachManage.mission", {
                url: "/mission?add&page&size&period&obj&mission",
                templateUrl: 'view/teachManage/mission/mission.html',
                controller: 'missionCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/teachManage/mission/mission.html',
                        'script/controllers/teachManage/mission/missionCtrl.js'
                    ])
                }
            })
            //任务管理（新增.查看.编辑）
            .state("backStage.teachManage.missionManage", {
                url: "/missionManage?from&add&period&obj&taskId&task",
                templateUrl: 'view/teachManage/mission/missionManage.html',
                controller: 'missionManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'script/controllers/teachManage/mission/missionManageCtrl.js',
                        'view/teachManage/mission/missionManage.html',
                        'script/directives/wangEditor/rich.js',
                        'script/services/backStage/backStage.js'

                    ])
                }
            })
            //preview
            //同步预习管理模块
            .state("backStage.previewManage", {
                url: "/previewManage",
                abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
                //整个模块公共文件
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/teachManage/teachManage.css",
                        "script/services/backStage/backStage.js"
                    ])
                }
            })
            //后台教材管理页
            .state("backStage.previewManage.datum", {
                url: "/datum?page&size&obj",
                templateUrl: 'view/previewManage/datum/datum.html',
                controller: 'datumCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/previewManage/datum/datum.html',
                        'script/controllers/previewManage/datum/datumCtrl.js'
                    ])
                }
            })
            //教材管理（新增.查看.编辑）
            .state("backStage.previewManage.datumManage", {
                url: "/datumManage?from&datumId",
                templateUrl: 'view/previewManage/datum/datumManage.html',
                controller: 'datumManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/previewManage/datum/datumManage.html',
                        'script/controllers/previewManage/datum/datumManageCtrl.js'
                    ])
                }
            })
            //后台课时管理页
            .state("backStage.previewManage.period", {
                url: "/periodInPreview?add&page&size&book",
                templateUrl: 'view/previewManage/period/period.html',
                controller: 'periodCtrlInPreview',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/previewManage/period/period.html',
                        'script/controllers/previewManage/periodInPreview/periodInPreview.js'
                    ])
                }
            })
            //课时管理（新增.查看.编辑）
            .state("backStage.previewManage.periodManage", {
                url: "/periodsManageInPreview?from&book&period",
                templateUrl: 'view/previewManage/period/periodManage.html',
                controller: 'periodManageCtrlInPreview',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/previewManage/period/periodManage.html',
                        'script/controllers/previewManage/periodInPreview/periodManageCtrlInPreview.js'
                    ])
                }
            })
            //后台任务管理页
            .state("backStage.previewManage.mission", {
                url: "/missionInPreview?add&page&size&period",
                templateUrl: 'view/previewManage/mission/mission.html',
                controller: 'missionCtrlInPreview',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/previewManage/mission/mission.html',
                        'script/controllers/previewManage/missionInPreview/missionInPreview.js'
                    ])
                }
            })
            //任务管理（新增.查看.编辑）
            .state("backStage.previewManage.missionManage", {
                url: "/missionManage?from&period",
                templateUrl: 'view/previewManage/mission/missionManage.html',
                controller: 'missionManageCtrlInPreview',
                resolve: {
                    loadMyFile: _lazyLoad([
                        'view/previewManage/mission/missionManage.html',
                        'script/controllers/previewManage/missionInPreview/missionManageCtrlInPreview.js',
                        'script/directives/wangEditor/rich.js',
                        'script/services/backStage/backStage.js'
                    ])
                }
            })
            //data
            //资料管理模块
            .state("backStage.dataManage", {
                url: "/dataManage",
                abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
                //整个模块公共文件
                resolve: {
                    loadMyFile: _lazyLoad([
                    "style/contentManage/dataContentManage.css"
                    ])
                }
            })
            //后台资料管理页
            .state("backStage.dataManage.data", {
                url: "/data?add&from&page&size",
                templateUrl: 'view/dataManage/data.html',
                controller: 'dataCtrl as vm',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/dataManage/data.js"
                    ])
                }
            })
            //资料管理（新增.查看.编辑）
            .state("backStage.dataManage.dataManage", {
                url: "/dataManage?from",
                templateUrl: 'view/dataManage/dataManage.html',
                controller: 'dataManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/dataManage/dataManage.js"
                    ])
                }
            })
            //data
            //内容管理模块
            .state("backStage.contentManage", {
                url: "/contentManage",
                abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
                //整个模块公共文件
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/contentManage/dataContentManage.css"
                    ])
                }
            })
            //后台合作机构管理页
                .state("backStage.contentManage.unite", {
                url: "/unite?page&size",
                controller: 'uniteCtrl as vm',
                templateUrl: 'view/contentManage/unite/unite.html',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/content/unite/unite.js"
                    ])
                }
            })
            //合作机构管理（新增.查看.编辑）
            .state("backStage.contentManage.uniteManage", {
                url: "/uniteManage?from?id",
                templateUrl: 'view/contentManage/unite/uniteManage.html',
                controller: 'uniteManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/content/unite/uniteManage.js"
                    ])
                }
            })
            //热门推荐管理       注意热门推荐的编辑  是跳到 推荐课程管理的页面
            .state("backStage.contentManage.hot", {
                url: "/hot",
                templateUrl: 'view/contentManage/hot/hot.html',
                controller: 'hotCtrl as vm',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/content/hot/hot.js"
                    ])
                }
            })
            //推荐课程管理
            .state("backStage.contentManage.groom", {
                url: "/groom?page&size$?id",
                templateUrl: 'view/contentManage/groom/groom.html',
                controller: 'groomCtrl as vm',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/content/groom/groom.js"
                    ])
                }
            })
            //推荐课程管理（编辑，查看）
            .state("backStage.contentManage.groomManage", {
                url: "/groomManage?from?id",
                templateUrl: 'view/contentManage/groom/groomManage.html',
                controller: 'groomManageCtrl as vm',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/controllers/content/groom/groomManage.js"
                    ])
                }
            })
            //客服管理模块
            .state("backStage.serviceManage", {
                url: "/serviceManage",
                abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
                //整个模块公共文件
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/serviceManage/serviceManage.css",
                    ])
                }
            })
            //serviceManage
            //用户管理页
            .state("backStage.serviceManage.party", {
                url: "/party",
                templateUrl: 'view/serviceManage/party/party.html',
                controller: "partyCtrl",
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/serviceManage/serviceManage.css",
                        "script/controllers/serviceManage/party/partyCtrl.js",
                    ])
                }
            })
            //用户管理管理（查看）
            .state("backStage.serviceManage.see", {
                url: "/see",
                templateUrl: 'view/serviceManage/party/see.html',
                controller: 'seeCtrl',
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/serviceManage/serviceManage.css",
                        "style/serviceManage/tab.css",
                        "script/controllers/serviceManage/party/seeCtrl.js"

                    ])
                }
            })
            //enroll
            //后台注册统计
            .state("backStage.serviceManage.enroll", {
                url: "/enroll",
                templateUrl: 'view/serviceManage/enroll/register.html',
                controller: 'chartsCtrl',
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/serviceManage/serviceManage.css",
                        "script/directives/serviceManage/enroll/registerCtrl.js",
                        "script/controllers/serviceManage/enroll/chartsCtrl.js"
                    ])
                }
            })
            //后台资讯管理
            .state("backStage.serviceManage.information", {
                url: "/information",
                templateUrl: 'view/serviceManage/information/information.html',
                controller: 'informationCtrl',
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/serviceManage/serviceManage.css",
                        "script/services/serviceManage/information/informationCtrl.js",
                    ])
                }
            })
            //资讯管理（新增，查看，编辑）
            .state("backStage.serviceManage.increased", {
            url: "/increased",
            templateUrl: 'view/serviceManage/information/increased.html',
            controller: 'increasedCtrl',
            controllerAs: "vm",
            resolve: {
                loadMyFile: _lazyLoad([
                    "script/controllers/serviceManage/information/increasedCtrl.js",
                    "script/directives/wangEditor/rich.js"
                ])
            }
        })
            .state("backStage.serviceManage.check", {
                url: "/check",
                templateUrl: 'view/serviceManage/information/check.html',
                // controller: 'informationManageCtrl',
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/services/serviceManage/information/informationCtrl.js",
                        "script/directives/wangEditor/rich.js",
                    ])
                }
            })
            .state("backStage.serviceManage.sees", {
                url: "/sees",
                templateUrl: 'view/serviceManage/information/sees.html',
                // controller: 'informationManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/directives/wangEditor/rich.js"
                    ])
                }
            })
            //后台消息管理
            .state("backStage.serviceManage.news", {
                url: "/news",
                templateUrl: 'view/serviceManage/news/news.html',
                controller: 'newsCtrl',
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/services/serviceManage/news/newsCtrl.js"
                    ])
                }
            })
            .state("backStage.serviceManage.look", {
                url: "/look",
                templateUrl: 'view/serviceManage/news/look.html',
                // controller: 'newsCtrl',
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/services/serviceManage/news/newsCtrl.js"
                    ])
                }
            })
            //消息管理（新增，查看）
            .state("backStage.serviceManage.newsManage", {
                url: "/newsManage",
                templateUrl: 'view/serviceManage/news/newsManage.html',
                controller: 'newsCtrl',
                controllerAs: "vm",
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/services/serviceManage/news/newsCtrl.js",
                        "script/directives/wangEditor/rich.js",
                    ])
                }
            })
            //后台帮助管理
            .state("backStage.serviceManage.help", {
                url: "/help",
                templateUrl: 'view/serviceManage/help/help.html',
                controller: 'helpCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/services/serviceManage/help/helpCtrl.js"
                    ])
                }
            })
            //帮助管理（新增，查看，编辑）
            .state("backStage.serviceManage.helpManage", {
                url: "/helpManage",
                templateUrl: 'view/serviceManage/help/helpManage.html',
                // controller: 'helpManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/directives/wangEditor/rich.js",
                    ])
                }
            })
            .state("backStage.serviceManage.lookHelp", {
                url: "/lookHelp",
                templateUrl: 'view/serviceManage/help/lookHelp.html',
                // controller: 'objectionManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/directives/wangEditor/rich.js",
                    ])
                }
            })
            .state("backStage.serviceManage.edit", {
                url: "/edit",
                templateUrl: 'view/serviceManage/help/edit.html',
                // controller: 'objectionManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/directives/wangEditor/rich.js",
                    ])
                }
            })
            //后台意见管理
            .state("backStage.serviceManage.objection", {
                url: "/objection",
                templateUrl: 'view/serviceManage/objection/objection.html',
                controller: 'objectionCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/services/serviceManage/objection/objectionCtrl.js"
                    ])
                }
            })
            //意见管理（查看）
            .state("backStage.serviceManage.objectionManage", {
                url: "/objectionManage",
                templateUrl: 'view/serviceManage/objection/objectionManage.html',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/directives/wangEditor/rich.js",
                    ])
                }
            })
            //后台版本管理
            .state("backStage.serviceManage.version", {
                url: "/version",
                templateUrl: 'view/serviceManage/version/version.html',
                // controller: 'versionCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            //版本管理（编辑）
            .state("backStage.serviceManage.versionManage", {
                url: "/versionManage",
                templateUrl: 'view/serviceManage/version/versionManage.html',
                // controller: 'versionManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            //后台管理
            .state("backStage.moduleManage", {
                url: "/moduleManage",
                abstract: true, // true 表明此状态不能被显性激活，只能被子状态隐性激活
                //整个模块公共文件
                resolve: {
                    loadMyFile: _lazyLoad([
                        "style/serviceManage/serviceManage.css",
                    ])
                }
            })
            //模块管理
            .state("backStage.moduleManage.user", {
                url: "/module",
                templateUrl: 'view/moduleManage/user/module.html',
                // controller: 'moduleManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            //模块（新增，编辑）
            .state("backStage.moduleManage.moduleManage", {
                url: "/moduleManage",
                templateUrl: 'view/moduleManage/user/moduleManage.html',
                // controller: 'moduleManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            .state("backStage.moduleManage.increased", {
                url: "/increased",
                templateUrl: 'view/moduleManage/user/increased.html',
                // controller: 'moduleManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            //角色管理
            .state("backStage.moduleManage.role", {
                url: "/role",
                templateUrl: 'view/moduleManage/role/role.html',
                // controller: 'roleCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            //角色管理（新增，编辑）
            .state("backStage.moduleManage.roleManage", {
                url: "/roleManage",
                templateUrl: 'view/moduleManage/role/roleManage.html',
                // controller: 'roleManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            //密码修改
            .state("backStage.moduleManage.password", {
                url: "/password",
                templateUrl: 'view/moduleManage/password/password.html',
                // controller: 'passwordCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            //账户管理
            .state("backStage.moduleManage.account", {
                url: "/account",
                templateUrl: 'view/moduleManage/account/account.html',
                controller: 'accountCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([
                        "script/services/moduleManage/account/accountCtrl.js",
                    ])
                }
            })
            //账户管理（新增，编辑）
            .state("backStage.moduleManage.accountManage", {
                url: "/accountManage",
                templateUrl: 'view/moduleManage/account/accountManage.html',
                // controller: 'accountManageCtrl',
                resolve: {
                    loadMyFile: _lazyLoad([])
                }
            })
            .state("backStage.moduleManage.compiler", {
                    url: "/compiler",
                    templateUrl: 'view/moduleManage/account/compiler.html',
                    // controller: 'accountManageCtrl',
                    resolve: {
                        loadMyFile: _lazyLoad([])
                    }
            });
    }
]);