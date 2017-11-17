angular
		.module("cfopModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"CfopController",
				function($http, urlBase) {
					var self = this;

					self.cfops = [];
					self.cfop = undefined;

					self.novo = function() {
						self.cfop = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.cfop.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'cfop/',
							data : self.cfop
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
												msg : ' cfop '
														+ self.cfop.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.cfop.codigo
															+ ' - '
															+ self.cfop.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.cfop.descricao
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
							url : urlBase + 'cfop/'
						}).then(function successCallback(response) {
							self.cfops = response.data;
							self.cfop = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(cfop) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.cfop.descricao + " ?",
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
												url : urlBase + 'cfop/'
														+ self.cfop.id + '/'
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
																	" Ocorreu um erro ao tentar deletar cfop!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(cfopTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ cfopTabela.descricao + " ?",
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
												url : urlBase + 'cfop/'
														+ cfopTabela.id + '/'
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
																	" Ocorreu um erro ao tentar deletar cfop!",
																	"error");
														}
													});
								});
					}

					self.selecionarCfop = function(cfopselecionado) {
						self.cfop = cfopselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});