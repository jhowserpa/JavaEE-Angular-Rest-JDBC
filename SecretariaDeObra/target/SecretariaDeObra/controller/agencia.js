angular
		.module("agenciaModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/SecretariaDeObra/rest/')
		.controller(
				"agenciaController",
				function($http, urlBase) {
					var self = this;

					self.agencias = [];
					self.bancos = [];
					self.agencia = undefined;

					self.novo = function() {
						self.agencia = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.agencia.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'agencia/',
							data : self.agencia
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
												msg : ' agencia '
														+ self.agencia.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.agencia.codigo
															+ ' - '
															+ self.agencia.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.agencia.descricao
															+ '!'
												} ];
											} else {
												var msgTipo = null;
												if (response.config.method === "PUT") {
													msgTipo = "alterar";
												} else {
													msgTipo = "salvar";
												}
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar '
															+ msgTipo
															+ self.agencia.descricao
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
							url : urlBase + 'agencia/'
						}).then(function successCallback(response) {
							self.agencias = response.data;
							self.agencia = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'banco/'
						}).then(function successCallback(response) {
							self.bancos = response.data;
							self.agencia = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(agencia) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.agencia.descricao + " ?",
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
												url : urlBase + 'agencia/'
														+ self.agencia.id + '/'
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
																	" Ocorreu um erro ao tentar deletar agencia!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(agenciaTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ agenciaTabela.descricao + " ?",
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
												url : urlBase + 'agencia/'
														+ agenciaTabela.id
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
																	" Ocorreu um erro ao tentar deletar agencia!",
																	"error");
														}
													});
								});
					}

					self.selecionarAgencia = function(agenciaselecionado) {
						self.agencia = agenciaselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});