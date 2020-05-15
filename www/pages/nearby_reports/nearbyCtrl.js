app.controller('nearByCtrl', function($rootScope,$scope,$http,$location) {
    // let t = localStorage.getItem('token');
    $scope.getPosition = function(){
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 3000
        });

        function onSuccess(position) {
            $scope.lan  =  position.coords.latitude+"";
            $scope.lon  =  position.coords.longitude+"";
        }

        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
    };

    $scope.getPosition();
    setTimeout(()=>{
        var req = {
            method: 'POST',
            url: SERVER_URL + '/getNearbyUserReports',
            headers:{'authrization': localStorage.getItem("token")},
            data: {
                "longitude":  $scope.lon ,
                "latitude":   $scope.lan
            }
        };

        // alert(JSON.stringify(req));
        $http(req).then((res) => {
            $scope.photo_list = res.data;
            $scope.show_div = $scope.photo_list[0] !== undefined;

        });
    },200);

    $scope.getsrc= function (path) {return SERVER_URL+"/getReportImage?imagePath="+path;}

});
