angular
		.module("tipoCobrancaModulo",
				[ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"tipoCobrancaController",
				function($http, urlBase) {
					var self = this;

					self.tipoCobrancas = [];
					self.tipoCobranca = undefined;

					self.novo = function() {
						self.tipoCobranca = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.tipoCobranca.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'tipocobranca/',
							data : self.tipoCobranca
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
												msg : ' tipo de Cobrança '
														+ self.tipoCobranca.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.tipoCobranca.codigo
															+ ' - '
															+ self.tipoCobranca.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.tipoCobranca.descricao
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
															+ self.tipoCobranca.descricao
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
							url : urlBase + 'tipocobranca/'
						}).then(function successCallback(response) {
							self.tipoCobrancas = response.data;
							self.tipoCobranca = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(tipoCobranca) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.tipoCobranca.descricao
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
												url : urlBase + 'tipocobranca/'
														+ self.tipoCobranca.id
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
																	" Ocorreu um erro ao tentar deletar tipoCobranca!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(tipoCobrancaTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ tipoCobrancaTabela.descricao
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
												url : urlBase + 'tipocobranca/'
														+ tipoCobrancaTabela.id
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
																	" Ocorreu um erro ao tentar deletar tipoCobranca!",
																	"error");
														}
													});
								});
					}

					self.selecionarTipoCobranca = function(
							tipoCobrancaselecionado) {
						self.tipoCobranca = tipoCobrancaselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});