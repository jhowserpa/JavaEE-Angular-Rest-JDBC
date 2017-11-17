angular
		.module("municipioModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/SecretariaDeObra/rest/')
		.controller(
				"MunicipioController",
				function($http, urlBase, $timeout) {
					var self = this;

					self.municipios = [];
					self.paises = [];
					self.ufs = [];
					self.municipio = undefined;

					self.novo = function() {
						self.municipio = {};
						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.search = function(search) {

						if (search === "") {
							self.atualizarTabela();
						} else {
							$http({
								method : 'GET',
								url : urlBase + 'municipio/' + search + '/'
							}).then(function successCallback(response) {
								self.municipios = response.data;
								self.municipio = undefined;

							}, function errorCallback(response) {
								self.ocorreuErro();
							});
						}
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.municipio.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'municipio/',
							data : self.municipio
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
												msg : ' Município '
														+ self.municipio.nome
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.municipio.nome
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.municipio.nome
															+ '!'
												} ];

											}
										});
					};

					self.alterar = function(municipio) {
						self.municipio = municipio;
					};

					self.ocorreuErro = function() {
						alert("Ocorreu um erro inesperado!");
					};

					self.atualizarTabela = function() {
						$http({
							method : 'GET',
							url : urlBase + 'municipio/'
						}).then(function successCallback(response) {
							self.municipios = response.data;
							self.municipio = undefined;

						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'negociante/pais'
						}).then(function successCallback(response) {
							self.paises = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'uf'
						}).then(function successCallback(response) {
							self.ufs = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

					};

					self.deletar = function(municipio) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.municipio.nome + " ?",
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
												url : urlBase + 'municipio/'
														+ self.municipio.id
														+ '/'
											})
											.then(
													function successCallback(
															response) {
														self.atualizarTabela();
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
																	" Ocorreu um erro ao tentar deletar Municipio!",
																	"error");
														}
													});
								});
					};

					self.selecionarMunicipio = function(municipioSelecionado) {
						self.municipio = municipioSelecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					// remove a linha municipio
					self.removeRow = function(municipioTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ municipioTabela.nome + " ?",
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
												url : urlBase + 'municipio/'
														+ municipioTabela.id
														+ '/'
											})
											.then(
													function successCallback(
															response) {
														self.atualizarTabela();
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
																	" Ocorreu um erro ao tentar deletar Municipio!",
																	"error");
														}
													});
								});
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();

				});