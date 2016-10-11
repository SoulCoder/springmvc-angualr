app.controller("certificateController", function ($scope, $http) {
    $scope.chosens = [
        {name: 'Incumbency Certificate', id: 1},
        {name: 'Income Certificate', id: 2},
        {name: 'Travel Certificate', id: 3}
    ];
    
    $scope.submitCertificate = function(data) {
    	$scope.talentEmail={};
    	data.type = $scope.chosen.name;
    	$scope.talentEmail.subject = data.type;
    	switch($scope.chosen.id) {
    		case (1):
    			$scope.talentEmail.context = "Dear XXX, Your staff:" +data.name+ ", Guid:"+data.guid+" Information: Section: "+data.section+" and Date: "+data.date+"."; 
    			break;
    			
    		case(2):
    			$scope.talentEmail.context = "Dear XXX, Your staff:" +data.name+ ", Guid:"+data.guid+" Information: Section: "+data.level+" and Date: "+data.time+".";
    			break;
    			
    		case(3):
    			$scope.talentEmail.context = "Dear XXX, Your staff:" +data.name+ ", Guid:"+data.guid+" Information: Destination: "+data.destination+" and Department: "+data.department+".";
    			break;
    	}

    	$http.post('sendemail', $scope.talentEmail)
		.success(function(data) {
			alert(data)
		}).error(function(data) {
			alert(data)
		});
    }
 
    
//	 $scope.showcertificate = function() {
//	    $scope.emailStatusTemplate = {};
//	    $scope.emailStatusTemplate = $scope.chosen.id;
//	    $http.post('getEmailTemplate', $scope.emailStatusTemplate)
//		.success(function(data) {
//			$scope.email = data;
//			document.getElementById("emailTemplate").innerHTML = data.emailSubjectTemplate;
//		}).error(function(data) {
//			alert('fail')
//		});
//	  }
	 
	 $scope.saveCertificate = function(data) {
		 data.type = $scope.chosen.name;
		 $scope.certificateInfo = data;
		 $http.post('savecertificateInfo', $scope.certificateInfo)
		 .success(function() {
			 alert("success");
			 window.location.href="/newoa"
		 }).error(function() {
			 alert("fail");
			 window.location.href="/newoa"
		 })
	 }
	 
	
		 $http.post('getcertificateInfo')
		 .success(function(redata) {
			 $scope.information = redata;
		 }).error(function(redata) {
			 alert('fail');
		 })
		 
	 
	 $scope.submitCheck = function(status) {
		 angular.forEach($scope.information, function (info) {
		         if(info.selected== true) {
		        	 info.status = status;
			   		 $http.post('updatecertificateInfo', info)
			   		 .success(function(redata) {
			   			 
			   		 }).error(function(redata) {
			   			 
			   		 })
		        }
		    });
		 alert("success");
		 window.location.href="/newoa"
	 }
});



