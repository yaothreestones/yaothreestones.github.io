angular.module('app')
    .controller('loginCtrl',function ($scope,$state,$http,$rootScope,$stateParams,$timeout,Course_service) {
        //登录
        $scope.entry=function () {
            var data = {
                phone: $scope.phone,
                password: $scope.password
            }
            Course_service.get_phone({
                data:data
            })
            .then(function(res) {
                if(res.data.code == 0) {
                    $scope.modal();
                    $state.go("app.profile");
                }
                $scope.code=res.data.code;
                console.log($scope.code)
                $scope.message=res.data.message;
                console.log(res)
            }, function(res) {
                alert('请求失败')
            })
        }
        //微信
            $scope.login =function () {
                $scope.WxURL='https://open.weixin.qq.com/connect/oauth2/authorize?' +
                    'appid=wx0b31bcd6cbe880a4' +
                    '&redirect_uri=http://home.funlearn.pangu.ptteng.com' +
                    '?type=wx' +    
                    '&response_type=code' +
                    '&scope=snsapi_userinfo' +
                    '&state=STATE' +
                    '#wechat_redirect';
                window.location.href = $scope.WxURL;
            }
    });
