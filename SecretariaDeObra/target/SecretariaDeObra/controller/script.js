(function(angular) {
	'use strict';
	angular.module('paisModulo', [ 'datatables' ]).value('urlBase',
			'http://localhost:8080/SecretariaDeObra/rest/').controller('PaisController',
			function($scope, $http, urlBase) {

				var self = this;
				self.municipios = [];

				self.atualizarTabela = function() {
					$http({
						method : 'GET',
						url : urlBase + 'municipio/'
					}).then(function successCallback(response) {
						self.municipios = response.data;

					}, function errorCallback(response) {
					});
				}

				self.activate = function() {
					self.atualizarTabela();
				};
				self.activate();

			});
})(angular);