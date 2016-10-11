app.controller('employeeInfoController',function($scope, $http, $filter, $rootScope) {
				$scope.importExcel = function() {
					checkFileFormat();
				}
				
				 // checkFileFormat
	            function checkFileFormat() {
	                var file = document.getElementById("importExcel");
	                var filename = file.value;
	                var filetype = filename.substring(filename.indexOf("."));;
	                if (filetype == "") {
	                    change_dialog_error('can\'t find upload file');
	                    show_dialog_error();
	                } else if (filetype != ".xlsx") {
	                    change_dialog_error('upload file must be \'xlsx\'');
	                    show_dialog_error();
	                } else {
	                    doUpload();
	                }
	            }
	            
	         // doUpload
	            function doUpload() {
	                var formData = new FormData($("#uploadForm")[0]);
	                $
	                    .ajax({
	                        url: '/newoa/uploadExcel',
	                        type: 'POST',
	                        data: formData,
	                        async: false,
	                        cache: false,
	                        contentType: false,
	                        processData: false,
	                        success: function(failNum) {
	                            getTalent();
	                            $('#importExcelModal').modal('hide');
	                            if (failNum == 0) {
	                                change_dialog_error('Success');
	                                show_dialog_error();
	                            } else {
	                                change_dialog_error('Success&nbsp&nbsp' + failNum + '&nbsp record ignored');
	                                show_dialog_error();
	                            }
	                        },
	                        error: function(returndata) {
	                            console.log(returndata);
	                            change_dialog_error('Fail to import Excel');
	                            show_dialog_error();
	                        }
	                    });
	            }
});


