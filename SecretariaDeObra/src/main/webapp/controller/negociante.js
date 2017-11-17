angular
		.module("negocianteModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/SecretariaDeObra/rest/')
		.controller(
				"NegocianteController",
				function($http, urlBase, $httpParamSerializer) {
					var self = this;

					self.negociantes = [];
					self.enderecos = [];
					self.estados = [];
					self.status = [];
					self.municipios = [];
					self.pais = [];
					self.negociante = undefined;

					self.novo = function() {
						self.negociante = {};
						self.enderecos = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");

					};

					self.search = function(nome, cpfcnpj) {
						if (nome === undefined) {
							nome = "";
						}
						if (cpfcnpj === undefined) {
							cpfcnpj = "";
						}
						if (nome === "" && cpfcnpj === "") {
							self.atualizarTabela();
						} else {
							if (nome === "") {
								nome = undefined;
							} else if (cpfcnpj === "") {
								cpfcnpj = undefined;
							}
							$http(
									{
										method : 'GET',
										url : urlBase + 'negociante/filter/'
												+ nome + '/' + cpfcnpj + '/'
									}).then(function successCallback(response) {
								self.negociantes = response.data;

							}, function errorCallback(response) {
								self.ocorreuErro();
							});
						}
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.negociante.id) {
							metodo = 'PUT';
						}
						self.negociante.dataCadastro = new Date();
						// self.negociante.enderecos = self.enderecos;

						// contentType : 'application/json',
						// data : angular.toJson(self.negociante),
						// headers : {
						// 'Content-Type' : 'application/json'
						// }
						$http({
							method : metodo,
							url : urlBase + 'negociante/',
							data : self.negociante
						})
								.then(
										function successCallback(response) {
											self.atualizarTabela();
											if (response.config.method === "PUT") {
												msgTipo = "alterado";
											} else {
												msgTipo = "salvo";
											}
											self.alerts = [ {
												type : 'success',
												msg : ' Negociante '
														+ self.negociante.nome
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];

										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.negociante.nome
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.negociante.nome
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
							url : urlBase + 'negociante/endereco'
						}).then(function successCallback(response) {
							self.municipios = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'negociante/pais'
						}).then(function successCallback(response) {
							self.pais = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'uf'
						}).then(function successCallback(response) {
							self.estados = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'negociante/'
						}).then(function successCallback(response) {
							self.negociantes = response.data;
							self.negociante = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(negociante) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ self.negociante.nome + " ?",
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
												url : urlBase + 'negociante/'
														+ self.negociante.id
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
																	" Ocorreu um erro ao tentar deletar Negociante!",
																	"error");
														}
													});
								});
					};

					self.selecionarNegociante = function(negocianteSelecionado) {
						self.negociante = negocianteSelecionado;
						// window.location.href =
						// '/Holder/negociante.html#/dados';

						$('li.active').next('li').find('a').attr("data-toggle",
								"tab").trigger("click");

						$http(
								{
									method : 'GET',
									url : urlBase + 'negociante/'
											+ self.negociante.id + '/'
								}).then(function successCallback(response) {
							self.enderecos = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						// window.location.reload();
					};

					// remove a linha negociante
					self.removeRow = function(negocianteTabela) {
						swal(
								{
									title : "Deseja realmente deletar "
											+ negocianteTabela.nome + " ?",
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
												url : urlBase + 'negociante/'
														+ negocianteTabela.id
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
																	" Ocorreu um erro ao tentar deletar Negociante!",
																	"error");
														}
													});
								});
					};

					// muda a cidade de acordo com estado
					self.functionCity = function() {
						estado: string = '';
						estado = self.negociante.uf.sigla;

						$http({
							method : 'GET',
							url : urlBase + 'negociante/uf/' + estado
						}).then(function successCallback(response) {
							self.municipios = response.data;
							// self.enderecos[0].municipio.uf.sigla = estado;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.functionCity2 = function() {
						estado: string = '';
						estado = self.negociante.uf.sigla;

						$http({
							method : 'GET',
							url : urlBase + 'negociante/uf/' + estado
						}).then(function successCallback(response) {
							// self.enderecos[1].municipio.uf.sigla = estado;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.activate = function() {
						self.atualizarTabela();

					};
					self.activate();
				});
