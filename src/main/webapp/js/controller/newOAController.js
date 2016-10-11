app.controller('newOAController',function($scope, $http, $filter, $rootScope) {
				$scope.showSubnav = true;
				$scope.name = "Sample OA User";
				$scope.toggle = function() {
	                $scope.showSubnav = !$scope.showSubnav;
	            }
				$scope.importExcel = function() {
					checkFileFormat();
				}
				var info ={};
				$http.post('configuration/getConfiguration', info)
				 .success(function(redata) {
					 $scope.configInfos = redata;
				 }).error(function(redata) {  
					 
				 })
				 
				 $scope.choseInfo = function(label) {
					 $http.post('configuration/getConfigurationByLabel', label)
					 .success(function(redata) {
						 $scope.returnData = redata;
					 }).error(function(redata) {  
						 
					 })
				 }
}).directive("config",function(){
	return{
	restrict:'AE',
	template:'<a ui-sref="application" ng-click="choseInfo(configInfo.table.label)"><i class="glyphicon glyphicon-edit"></i> <span class="font-bold">{{configInfo.table.label}}</span></a>',
	repalce:false
	}
});


