var professoresModulo = angular.module('professoresModulo', []);

professoresModulo.controller("professoresController", function($scope, $http) {

	$http.get('controller/professoresJson.json').then(function(response){
		$scope.professores = response.data.professores
	})

	$scope.selecinarProfessor = function(professorSelecionado){

		$scope.professor = professorSelecionado;
	}

	$scope.novo = function(){
		$scope.professor = "";
	}

	$scope.salvar = function(){
		$scope.professores.push($scope.professor);
		$scope.novo();
	}

	$scope.excluir = function(){
		$scope.professores.splice($scope.professores.indexOf($scope.professor), 1);
		$scope.novo();
	}
});