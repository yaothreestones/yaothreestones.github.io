angular.module('app')
    .controller('periodCtrl',['$scope','$rootScope','$timeout','$state','$stateParams','Course_service',
        function ($scope,$rootScope,$timeout,$state,$stateParams,Course_service) {
            var vm = this;
            vm.img = 'image/app/collection.png';
            vm.collecting = '收藏';
            vm.show = false;
            vm.index = Number($stateParams.index);
            vm.unlocked = true;
            vm.isCourse = false;
            console.log($rootScope);
            if($stateParams.lessonPeriodId){
                vm.isCourse = true;
            }
            vm.courseName = $stateParams.courseName||sessionStorage.getItem('courseName');
            vm.bookName = sessionStorage.getItem('bookName');
            vm.Period = parseInt($stateParams.lessonPeriodId)||parseInt($stateParams.periodId)||parseInt(sessionStorage.getItem('dataFromPeriod'));
            //收藏
            vm.collection = function() {
                if (vm.img === 'image/app/collection.png') {
                    Course_service.get_courseCollect({},{
                        params: {
                            lessonPeriodId:vm.Period
                        }
                    }).then(function (res) {
                        if(res.data.code === 0){
                            vm.img = 'image/app/isCollection.png';
                            vm.show = true;
                            vm.collect = '收藏成功';
                            vm.collecting = '已收藏';
                            $timeout(function(){
                                vm.show = false;
                            },2500)
                        }
                    })
                } else {
                    Course_service.get_courseCollect({},{
                        params: {
                            lessonPeriodId:vm.Period
                        }
                    }).then(function (res) {
                        if(res.data.code === 0){
                            vm.img = 'image/app/collection.png';
                            vm.show = true;
                            vm.collect = '取消收藏成功';
                            vm.collecting = '收藏';
                            $timeout(function(){
                                vm.show = false;
                            },2500)
                        }
                    })

                }
            };
            vm.data = function(){
                if(vm.dataBuy === 0){
                    sessionStorage.setItem('bookId',$stateParams.textbookId||'');
                    $state.go('app.data',{choose:0,dataFromPeriod:$stateParams.lessonPeriodId||$stateParams.periodId})
                }
            };

            //console.log($stateParams.lessonPeriodId);
            Course_service.get_period_detail(
                vm.Period
            ).then(function (res) {
                if(res.data.code === 0){
                    vm.control = true;
                    vm.period = res.data.data;
                    console.log('课时详情',vm.period);
                    localStorage.setItem("courseId",vm.period.courseId);
                    sessionStorage.setItem("buyDataCount",vm.period.buyDataCount);
                    sessionStorage.setItem("dataCount",vm.period.dataCount);
                    //收藏
                    if(vm.period.keepStatus === 0){
                        vm.collecting = '收藏';
                        vm.img = 'image/app/collection.png';
                    }else {
                        vm.img = 'image/app/isCollection.png';
                        vm.collecting = '已收藏';
                    }
                    if(vm.period.lock === 1){
                        vm.unlocked = true;
                        angular.element('body').addClass('overflow');
                    }else {
                        vm.unlocked = false
                    }
                    if(vm.period.dataBuyStatus === vm.period.dataCount){
                        vm.dataBuy = 1
                    }else {
                        vm.dataBuy = 0
                    }
                    Course_service.get_mission_list(
                        vm.Period
                    ).then(function (res) {
                        if(res.data.code === 0){
                            console.log(res.data.data);
                            vm.taskLists = res.data.data;
                            vm.return = true;
                            vm.taskIdBox = [];
                            angular.forEach(vm.taskLists,function (data) {
                                if(vm.return){
                                    if(data.studyStatus === 1){
                                        vm.studyStatus = '继续学习';
                                        vm.taskIdForStudy = data.id;
                                        vm.return = false
                                    }else if(data.studyStatus === 0){
                                        vm.studyStatus = '开始学习';
                                        vm.taskIdBox.push(data.id);
                                        vm.return = false
                                    }else {
                                        vm.studyStatus = '学习完成'
                                    }
                                }
                            })

                        }
                    })
                }else if(res.data.code === -1) {
                    $state.go("app.period", {}, {reload: true})
                }
            });
            //开始2学习
            vm.begin_study = function () {
                vm.taskId = vm.taskIdForStudy||vm.taskIdBox[0]||vm.taskLists[0].id;
                console.log(vm.taskId);
                if(vm.taskLists[0].studyStatus === 0 && vm.index === 0){
                    Course_service.get_course_start_study(
                        sessionStorage.getItem("courseId")
                    ).then(function (res) {
                        if(res.data.code === 0){
                            Course_service.get_period_start_study(
                                vm.Period
                            ).then(function (res) {
                                if(res.data.code===0){
                                    $state.go('app.mission',{taskId:vm.taskId,lessonPeriodId:$stateParams.lessonPeriodId,periodId:$stateParams.periodId})
                                }else {
                                    $state.go('app.mission',{taskId:vm.taskId,lessonPeriodId:$stateParams.lessonPeriodId,periodId:$stateParams.periodId})

                                }
                            })
                        }
                    })
                }else if(vm.taskLists[0].studyStatus === 0 && vm.index !== 0){
                    Course_service.get_period_start_study(
                        vm.Period
                    ).then(function (res) {
                        if(res.data.code===0){
                            $state.go('app.mission',{taskId:vm.taskId,lessonPeriodId:$stateParams.lessonPeriodId,periodId:$stateParams.periodId})
                        }else {
                            $state.go('app.mission',{taskId:vm.taskId,lessonPeriodId:$stateParams.lessonPeriodId,periodId:$stateParams.periodId})

                        }
                    })
                }else if(vm.taskIdForStudy){
                    $state.go('app.mission',{taskId:vm.taskId,lessonPeriodId:$stateParams.lessonPeriodId,periodId:$stateParams.periodId})
                }else {
                    $state.go('app.mission',{taskId:vm.taskId,lessonPeriodId:$stateParams.lessonPeriodId,periodId:$stateParams.periodId})
                }

            };

            vm.goPay = function () {
                angular.element('body').removeClass('overflow');
                if($stateParams.periodId){
                    $state.go("app.dataPay",{periodOfBook:$stateParams.periodId})
                }else {
                    $state.go("app.dataPay",{periodOfCourse:$stateParams.lessonPeriodId},{reload:true})
                }
            };
            //分享
            vm.isShare = false;
            vm.share = function () {
                vm.isShare = true
            };
            vm.cancelShare = function () {
                vm.isShare = false
            }
        }]);
