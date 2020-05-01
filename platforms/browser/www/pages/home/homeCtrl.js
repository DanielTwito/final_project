
app.controller('homeCont', function($rootScope,$scope,$http,$location) {

    $scope.home_init = function(){
        if ( localStorage.getItem("token") === null){
            return;
        }
        $rootScope.logUser = localStorage.getItem("logged_user");
        $rootScope.logged_flag=true;
        $location.path('/home');

    };
    //this function take a photo from camera ( work only in phonegap)
    $scope.cameraTakePicture = function() {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation:true
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
            image.style.height="400px";
            image.style.width="300px";
            

            // alert( image.src);
           //get location of the given photo
            $scope.getPosition();
            setTimeout(()=>{
                var a = document.getElementById("a");
                var b = document.getElementById("b");
                a.innerText = "Lan = " +$scope.a;
                b.innerText = "Lon = " +$scope.b;
                // alert($scope.a+" "+$scope.b);
            },3000);

        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };

    $scope.cameraTakePicture_fromGallery = function() {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation:true
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            // image.src = "data:image/jpeg;base64," + imageData;
            image.src =  imageData;
            image.style.height="400px";
            image.style.width="300px";
            //get location of the given photo
            $scope.getPosition();
            setTimeout(()=>{
                var a = document.getElementById("a");
                var b = document.getElementById("b");
                a.innerText = "Lan = " +$scope.a;
                b.innerText = "Lon = " +$scope.b;
                // alert($scope.a+" "+$scope.b);
            },3000  );

        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };

    $scope.getPosition = function(){
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
            enableHighAccuracy: true,
            timeout: 3000,
            maximumAge: 3000
        });

        function onSuccess(position) {
            $scope.a = position.coords.latitude+"";
            $scope.b = position.coords.longitude+"";
            // alert('Latitude: '         + position.coords.latitude          + '\n' +
            //     'Longitude: '         + position.coords.longitude         + '\n' +
            //     'Altitude: '          + position.coords.altitude          + '\n' +
            //     'Accuracy: '          + position.coords.accuracy          + '\n' +
            //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            //     'Heading: '           + position.coords.heading           + '\n' +
            //     'Speed: '             + position.coords.speed             + '\n' +
            //     'Timestamp: '         + position.timestamp                + '\n');
        }

        function onError(error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
        }
    };
    $scope.one =function(index) {
        if(index === 1 )
            $scope.cameraTakePicture();
        else if (index===2)
            $scope.cameraTakePicture_fromGallery();
    };

    $scope.choose_source=function(){
        navigator.notification.confirm(
            'choose from gallery or camera',  // message
            $scope.one,        // callback
            'Source Select',            // title
            ['Camera','Gallery']    ,
            undefined// buttonName
        );
    }


});

