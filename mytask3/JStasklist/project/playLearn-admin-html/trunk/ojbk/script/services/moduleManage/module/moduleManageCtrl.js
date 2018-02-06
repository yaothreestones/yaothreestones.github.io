angular.module('app')
    .controller('moduleManageCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$http', 'Course_service',
        function ($scope, $stateParams, $rootScope, $state, $http, Course_service) {
            var vm = this;
            vm.$stateParams = $state.params;

            vm.params = {
                id: vm.$stateParams.id,
            };
            Course_service.IDmoduleUser(vm.$stateParams.id)
                .then(function (res) {
                    if (res.data.code == 0) {
                        vm.params=res.data.data.module;
                    }
                }, function (res) {
                    alert('请求失败');
                });
            vm.send=function () {
                Course_service.editModule({
                    id: vm.params.id,
                    url: vm.params.url,
                    type: vm.params.type,
                    updateAt:vm.params.updateAt,
                    createAt:vm.params.createAt,
                    updateBy:vm.params.updateBy,
                    createBy:vm.params.createBy
                })
                    .then(function (res) {
                        if (res.data.code == 0) {
                            $state.go('backStage.account', {page: 1, size: 10});
                        }
                        console.log(res)
                    }, function (res) {
                        alert('请求失败')
                    });
            }
        }
    ])