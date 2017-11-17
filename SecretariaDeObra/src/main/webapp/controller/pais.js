(function(angular) {
	'use strict';
	angular
			.module('paisModulo', [ 'angularUtils.directives.dirPagination' ])
			.value('urlBase', 'http://localhost:8080/SecretariaDeObra/rest/')
			.controller(
					'PaisController',
					function($scope, $http, urlBase) {
						var self = this;

						self.paises = [];
						self.pais = undefined;

						self.novo = function() {
							self.pais = {};
							$('.nav li.active').next('li').find('a').attr(
									"data-toggle", "tab").trigger("click");
						};

						self.salvar = function() {
							var metodo = 'POST';
							if (self.pais.id) {
								metodo = 'PUT';
							}

							$http({
								method : metodo,
								url : urlBase + 'pais/',
								data : self.pais
							})
									.then(
											function successCallback(response) {
												self.atualizarTabela();
												var msgTipo = null;
												if (response.config.method === "PUT") {
													msgTipo = "alterado";
												} else {
													msgTipo = "salvo";
												}
												self.alerts = [ {
													type : 'success',
													msg : ' País '
															+ self.pais.descricao
															+ ' ' + msgTipo
															+ ' com sucesso!'
												} ];
											},
											function errorCallback(response) {
												if (response.status === 401) {
													self.alerts = [ {
														type : 'error',
														msg : 'ATENÇÃO! já existe. '
																+ self.pais.descricao
																+ '!'
													} ];
												} else if (response.status === 500) {
													self.alerts = [ {
														type : 'error',
														msg : ' Ocorreu um erro ao tentar salvar '
																+ self.pais.descricao
																+ '!'
													} ];

												}
											});
						};

						self.ocorreuErro = function() {
							alert("Ocorreu um erro inesperado!");
						};

						self.atualizarTabela = function() {
							$http({
								method : 'GET',
								url : urlBase + 'pais/'
							}).then(function successCallback(response) {
								self.paises = response.data;
								self.pais = undefined;
							}, function errorCallback(response) {
								self.ocorreuErro();
							});
						};

						self.deletar = function(municipio) {
							swal(
									{
										title : " Deseja realmente deletar "
												+ self.pais.descricao + " ?",
										text : " Dados serão atualizados! ",
										type : "warning",
										showCancelButton : true,
										confirmButtonColor : '#DD6B55',
										confirmButtonText : 'Sim!',
										closeOnConfirm : false
									},
									function() {
										$http(
												{
													method : 'DELETE',
													url : urlBase + 'pais/'
															+ self.pais.id
															+ '/'
												})
												.then(
														function successCallback(
																response) {
															self
																	.atualizarTabela();
															swal(
																	"Deletado com sucesso!",
																	"success");
														},
														function errorCallback(
																response) {
															if (response.status === 401) {
																swal(
																		"ATENÇÃO! Não é Possivel deletar dado pois está sendo usado(a) em outro Registro!",
																		"error");
															} else if (response.status === 500) {
																swal(
																		" Ocorreu um erro ao tentar deletar País!",
																		"error");
															}
														});
									});
						};

						self.selecionarPais = function(paisSelecionado) {
							self.pais = paisSelecionado;

							$('.nav li.active').next('li').find('a').attr(
									"data-toggle", "tab").trigger("click");
						};

						// remove a linha municipio
						self.removeRow = function(paisTabela) {

							swal(
									{
										title : "Deseja realmente deletar "
												+ paisTabela.descricao + " ?",
										text : " Os Dados serão atualizados! ",
										type : "warning",
										showCancelButton : true,
										confirmButtonColor : '#DD6B55',
										confirmButtonText : 'Sim!',
										closeOnConfirm : false
									},
									function() {
										$http(
												{
													method : 'DELETE',
													url : urlBase + 'pais/'
															+ paisTabela.id
															+ '/'
												})
												.then(
														function successCallback(
																response) {
															self
																	.atualizarTabela();
															swal(
																	"Deletado com sucesso!",
																	"success");
														},
														function errorCallback(
																response) {
															if (response.status === 401) {
																swal(
																		"ATENÇÃO! Não é Possivel deletar dado pois está sendo usado(a) em outro Registro!",
																		"error");
															} else if (response.status === 500) {
																swal(
																		" Ocorreu um erro ao tentar deletar País!",
																		"error");
															}
														});
									});
						};

						self.activate = function() {
							self.atualizarTabela();
						};
						self.activate();

					});
})(angular);