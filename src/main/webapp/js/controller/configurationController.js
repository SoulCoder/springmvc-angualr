app.controller('ConfigurationController', function ($scope, $http, $filter) {
    $scope.init = function () {
        $('#myModal').modal("hide");
        $scope.statusFilter = '';

        $scope.conf = {};

        $scope.roles = [
            {name:"HR_Admin"},
            {name:"OA_Admin"}
        ];
        $scope.typeList = [
            {label: "Number", value: "int"},
            {label: "Character", value: "String"},
            {label: "Dropdown List", value: "select"},
            {label: "Date", value: "date"},
            {label: "Upload File", value: "file"},
            {label: "Boolean", value: "boolean"},
        ];
        $scope.processors=[
                   	    {label:"Coach",value:"coach"},
                   	    {label:"PM",value:"pm"},
                   	    {label:"RL",value:"rl"},
                   	    {label:"OM",value:"om"},
                   	    {label:"GM",value:"gm"},
                   	    {label:"HR",value:"hr"}
                   	];

        $http.post('configuration/findConfiguration')
            .success(function (result) {
                if (result.code && result.code === "0") {
                    $scope.configurationsList = result.data;
                    $scope.order('module.label', false);
                }
            }).error(function () {
                $scope.errorMessage = "System error !"
        });
    }


    $scope.showViewDialog = function (configuration) {
        $scope.operation = "view";
        $scope.remindMessage="";
        $scope.roles = [
            {name: "HR_Admin"},
            {name: "OA_Admin"}
        ];
        $scope.selectRoles = configuration.roles;
        for (var i = 0; i < $scope.roles.length; i++) {
            for (var j = 0; j < $scope.selectRoles.length; j++) {
                if ($scope.roles[i].name == $scope.selectRoles[j]) {
                    $scope.roles[i].checked = true;
                    break;
                }
            }
        }
        $scope.conf = configuration;
        $('#myModal').modal("show");
    };

    $scope.showAddDialog = function () {
        $scope.operation = "save";
        $scope.remindMessage="";
        $scope.containRole = false;
        $scope.conf.roles = [];
        $scope.selectRoles=[];
        $scope.roles = [
            {name:"HR_Admin"},
            {name:"OA_Admin"}
        ];
        $scope.conf.fields = [
            {name: "", label: "", type: "int"}
        ];
        $scope.conf.steps=[
            {step:0, processor:""}
        ];
        $('#myModal').modal("show");
    };
    $scope.confirmDialog = function (id) {
        $scope.operation = "delete";
        $scope.remindMessage = "Confirm to delete?";
        $scope.deleteId = id;
        $('#myModal').modal("show");
    };
    $scope.showEditDialog = function (configuration) {
        $scope.operation = "edit";
        $scope.containRole = true;
        $scope.remindMessage="";
        $scope.roles = [
            {name: "HR_Admin"},
            {name: "OA_Admin"}
        ];
        $scope.selectRoles = configuration.roles;
        for (var i = 0; i < $scope.roles.length; i++) {
            for (var j = 0; j < $scope.selectRoles.length; j++) {
                if ($scope.roles[i].name == $scope.selectRoles[j]) {
                    $scope.roles[i].checked = true;
                    break;
                }
            }
        }
        $scope.conf = configuration;
        $('#myModal').modal("show");
    };

    $scope.add = function () {
        $scope.conf.fields.push({
            name: "",
            label: "",
            type: "int"
        });
    };
    
    $scope.addStep = function () {
    	$scope.conf.steps.push({
    		step:$scope.conf.steps[$scope.conf.steps.length-1].step+1,
    		processor:""
    	});
    }

    $scope.remove = function () {
        $scope.conf.fields.splice($scope.conf.fields.length - 1)

    };

    $scope.removeStep = function () {
        $scope.conf.steps.pop();

    };
    
    $scope.edit = function () {
        $scope.conf.roles = [];
        angular.forEach($scope.roles, function (item) {
            if (item.checked) {
                $scope.conf.roles.push(item.name);
            }
            ;
        });
        $http.post('configuration/updateConfiguration', $scope.conf)
            .success(function (result) {
                if (result.code && result.code === "0") {
                    $scope.init();
                }
            }).error(function () {
            $scope.errorMessage = "System error !"
        });

    }
    $scope.delete = function () {
        $http.post('configuration/deleteConfiguration', $scope.deleteId)
            .success(function (result) {
                if (result.code && result.code === "0") {
                    $scope.init();
                }
            }).error(function (result) {
            $scope.errorMessage = "System error !"
        });

    }


    $scope.submit = function () {
        $scope.conf.roles = [];
        angular.forEach($scope.roles, function (item) {
            if (item.checked) {
                $scope.conf.roles.push(item.name);
            }
            ;
        });
        $http.post('configuration/addConfiguration', $scope.conf)
            .success(function (result) {
                if (result.code && result.code === "0") {
                    $scope.init();
                }
            }).error(function () {
                $scope.errorMessage = "System error !"
        })

    };

    $scope.order = function (predicate, reverse) {
        var orderBy = $filter('orderBy');
        $scope.predicate = predicate;
        $scope.reverse = reverse;
        $scope.configurationsList = orderBy($scope.configurationsList, predicate, reverse);
    };

    $scope.clear = function () {
        $scope.statusFilter = '';
    };

    $scope.toggleSelection = function toggleSelection(name) {
        if (!$scope.selectRoles) {
            $scope.selectRoles = [];
            $scope.selectRoles.push(name);
        }
        else {
            var idx = $scope.selectRoles.indexOf(name);

            // is currently selected
            if (idx > -1) {
                $scope.selectRoles.splice(idx, 1);
            }
            // is newly selected
            else {
                $scope.selectRoles.push(name);
            }

        }
        if ($scope.selectRoles.length == 0) {
            $scope.containRole = false;
        } else {
            $scope.containRole = true;

        }
    };


});



