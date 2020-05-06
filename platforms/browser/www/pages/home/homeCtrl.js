
app.controller('homeCont', function($rootScope,$scope,$http,$location) {
    $scope.home_init = function(){
        if ( localStorage.getItem("token") === null){
            return;
        }
        $rootScope.currentReport={};
       // / $scope.show_form = false;
        $rootScope.logUser = localStorage.getItem("logged_user");
        $rootScope.logged_flag=true;
        $location.path('/home');

    };

    $scope.test=function(){
        var image = document.getElementById('myImage');
        // image.src = "data:image/jpeg;base64," + imageData;
        image.src =  "img/person_1.jpg";
        image.style.height="400px";
        image.style.width="300px";

        var url=encodeURI(SERVER_URL +"/model_predict");
        var options = new FileUploadOptions();
        options.fileKey = "file"; //depends on the api
        options.fileName = image.src.substr(image.src.lastIndexOf('/')+1);
        options.mimeType = "multipart/form-data";
        options.chunkedMode = false; //this is important to send both data and files

        options.headers = {'Content-Type':'application/json'};
        var ft = new FileTransfer();
        ft.upload(image.src, url, (res)=> {
            alert("OK");

        }, (err)=>{
            alert(err.exception)}, options);



    };

    //this function take a photo from camera ( work only in phonegap)
    $scope.cameraTakePicture = function() {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation:true
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
            image.src =  imageData;
            $rootScope.currentReport.imgURI = imageData;
            // alert(imageData);
            image.style.height="400px";
            image.style.width="300px";

            //get location of the given photo
            $scope.getPosition();
            // $rootScope.currentReport.show  =  true;
            setTimeout(()=>{
                $rootScope.currentReport.lan  =  $scope.a ;
                $rootScope.currentReport.lon  =  $scope.b ;
                document.getElementById("addform").style.display='block';
                // alert(JSON.stringify($rootScope.currentReport));

            },3000);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };


    $scope.cameraTakePicture_fromGallery = function() {

        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation:true
        });

        function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = imageData;
            $rootScope.currentReport.imgURI = imageData;
            image.style.height="400px";
            image.style.width="300px";
            //get location of the given photo

            $scope.getPosition();

            setTimeout(()=>{
                // $rootScope.currentReport.show  =  true;
                $rootScope.currentReport.lan  =  $scope.a ;
                $rootScope.currentReport.lon  =  $scope.b ;
                document.getElementById("addform").style.display='block';
                // alert(JSON.stringify($rootScope.currentReport));
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
    };

    $scope.addReport = function () {
        let photo_disc = $scope.photo_description;
        let imageData = $rootScope.currentReport.imgURI;
        var url = encodeURI(SERVER_URL +"/model_predict");
        var options = new FileUploadOptions();
        options.fileKey = "file"; //depends on the api
        options.fileName = imageData.substr(imageData.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";
        options.headers = {
            'authrization': localStorage.getItem('token'),
            "latitude":1,
            "longitude":2
        };
        // options.chunkedMode = false; //this is important to send both data and files
        var ft = new FileTransfer();
        // ft.upload(imageData, url, (res)=> alert(JSON.stringify(res.response)), (err)=>{alert(JSON.stringify(err))}, options);
        var params = {};
        params.latitude = 1;
        params.longitude = 2;

        options.params = params;

        // url=encodeURI(SERVER_URL +"/addReport");
        ft.upload( imageData, url, (res)=> alert(JSON.stringify(res.response)), (err)=>{alert(JSON.stringify(err))}, options);
        alert($scope.photo_description);


    };



});

