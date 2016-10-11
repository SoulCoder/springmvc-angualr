app.controller('processConfigController',function($scope, $http, $filter, $rootScope) {
	function init(){
		$scope.process={
				module:null,
				table:null,
				stepList:[{stepNo:1,processor:null}]
		};
		$scope.allStep=1;
	}
	init();
	
	function getProcessList(){
		$http.get('findAllAuditProcess')
			.success(function(redata){
				$scope.processConfigList=redata;				
			}).error(function(redata){
				$scope.errorMessage="System error !";
			});
	}
	getProcessList();
	
	$scope.processors=[
	    {label:"Coach",value:"coach"},
	    {label:"PM",value:"pm"},
	    {label:"RL",value:"rl"},
	    {label:"OM",value:"om"},
	    {label:"GM",value:"gm"},
	    {label:"HR",value:"hr"}
	];
	$scope.addStep=function(){
		$scope.allStep++;
		$scope.process.stepList.push({stepNo:$scope.allStep});
	}
	$scope.dropStep=function(){
		if($scope.allStep>1){
			$scope.allStep--;
			$scope.process.stepList.pop();
		}	
	}
	$scope.cancel=function(){
		init();
	}
	
	$scope.formCheck=function(){
		var stepListCheck=false;
		for(var i=0;i<$scope.process.stepList.length;i++){
			if($scope.process.stepList[i].processor==null){
				stepListCheck=true;
				break;
			}
		}
		return $scope.process.module==null||$scope.process.table==null||stepListCheck;
	}
	
	$scope.submit=function(){
		if(!$scope.formCheck()){
			var processList=[];
			for(var i=0;i<$scope.process.stepList.length-1;i++){
				processList.push({
					module:$scope.process.module,
					table:$scope.process.table,
					step:$scope.process.stepList[i].stepNo-1,
					nextStep:$scope.process.stepList[i].stepNo,
					isEnd:false,
					processor:$scope.process.stepList[i].processor
				});
			}
			processList.push({
				module:$scope.process.module,
				table:$scope.process.table,
				step:$scope.process.stepList[$scope.process.stepList.length-1].stepNo-1,
				nextStep:0,
				isEnd:true,
				processor:$scope.process.stepList[$scope.process.stepList.length-1].processor
			});
			$http.post('addAuditProcess',processList)
				.success(function(redata){
					alert(redata);
					init();
				}).error(function(redata){
					$scope.errorMessage="System error !";
				});
		}
	}
});