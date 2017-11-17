angular
		.module('controlModulo', [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/SecretariaDeObra/rest/')
		.controller(
				"ControlController",
				function($scope, $http, urlBase) {
					var self = this;
					
					self.controles = [];
					self.funcionarios = [];
					self.municipios = [];
					self.carros = [];
					self.controle = undefined;

					$scope.exportAction = function(option) {
						switch (option) {
						case 'pdf':
							$scope.$broadcast('export-pdf', {});
							break;
						case 'excel':
							$scope.$broadcast('export-excel', {});
							break;
						case 'doc':
							$scope.$broadcast('export-doc', {});
							break;
						case 'csv':
							$scope.$broadcast('export-csv', {});
							break;
						default:
							console.log('no event caught');
						}
					}

					self.novo = function() {
						self.controle = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.controle.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'controle/',
							data : self.controle
						})
								.then(
										function successCallback(response) {
											self.atualizarTabela();
											var msgTipo = null;
											if (response.config.method === "PUT") {
												msgTipo = " alterado ";
											} else {
												msgTipo = " salvo ";
											}
											self.alerts = [ {
												type : 'success',
												msg : ' controle '
														+ self.controle.funcionario.nome
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.controle.status
															+ ' - '
															+ self.controle.funcionario.nome
															+ '!'
												} ];
											} else if (response.status === 417) {
												self.alerts = [ {
													type : 'error',
													msg : ' Atenção! Data de Devolução é Obrigatório!'
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
														+ self.controle.funcionario.nome
														+ '!'
												} ];
											} else {
												var msgTipo = null;
												if (response.config.method === "PUT") {
													msgTipo = " alterar ";
												} else {
													msgTipo = " salvar ";
												}
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar '
															+ msgTipo
															+ self.controle.funcionario.nome
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
							url : urlBase + 'controle/'
						}).then(function successCallback(response) {
							self.controles = response.data;
							self.controle = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'funcionario/'
						}).then(function successCallback(response) {
							self.funcionarios = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'municipio/'
						}).then(function successCallback(response) {
							self.municipios = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'carro/listAll'
						}).then(function successCallback(response) {
							self.carros = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(controle) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.controle.funcionario.nome
											+ " ?",
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
												url : urlBase + 'controle/'
														+ self.controle.id
														+ '/'
											})
											.then(
													function successCallback(
															response) {
														self.atualizarTabela();
														swal(
																"Deletado com sucesso!",
																"dados foram atualizados!");
													},
													function errorCallback(
															response) {
														if (response.status === 401) {
															swal(
																	"ATENÇÃO! Não é Possivel deletar dado pois está sendo usado(a) em outro Registro!",
																	"error");
														} else if (response.status === 500) {
															swal(
																	" Ocorreu um erro ao tentar deletar controle!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(controleTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ controleTabela.funcionario.nome
											+ " ?",
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
												url : urlBase + 'controle/'
														+ controleTabela.id
														+ '/'
											})
											.then(
													function successCallback(
															response) {
														self.atualizarTabela();
														swal(
																"Deletado com sucesso!",
																"dados foram atualizados!");
													},
													function errorCallback(
															response) {
														if (response.status === 401) {
															swal(
																	"ATENÇÃO! Não é Possivel deletar dado pois está sendo usado(a) em outro Registro!",
																	"error");
														} else if (response.status === 500) {
															swal(
																	" Ocorreu um erro ao tentar deletar controle!",
																	"error");
														}
													});
								});
					}

					self.selecionarControle = function(controleselecionado) {
						self.controle = controleselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				})

		.directive('exportTable', function() {
			var link = function($scope, elm, attr) {
				$scope.$on('export-pdf', function(e, d) {
					elm.tableExport({
						type : 'pdf',
						escape : false
					});
				});
				$scope.$on('export-excel', function(e, d) {
					elm.tableExport({
						type : 'excel',
						escape : false
					});
				});
				$scope.$on('export-doc', function(e, d) {
					elm.tableExport({
						type : 'doc',
						escape : false
					});
				});
				$scope.$on('export-csv', function(e, d) {
					elm.tableExport({
						type : 'csv',
						escape : false
					});
				});
			}
			return {
				restrict : 'C',
				link : link
			}
		});