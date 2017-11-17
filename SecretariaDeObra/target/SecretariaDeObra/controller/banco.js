angular
		.module("bancoModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"bancoController",
				function($http, urlBase) {
					var self = this;

					self.bancos = [];
					self.banco = undefined;

					self.novo = function() {
						self.banco = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.banco.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'banco/',
							data : self.banco
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
												msg : ' banco '
														+ self.banco.nome
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.banco.codigoFebraban
															+ ' - '
															+ self.banco.nome
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.banco.nome
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
															+ self.banco.nome
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
							url : urlBase + 'banco/'
						}).then(function successCallback(response) {
							self.bancos = response.data;
							self.banco = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(banco) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.banco.nome + " ?",
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
												url : urlBase + 'banco/'
														+ self.banco.id + '/'
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
																	" Ocorreu um erro ao tentar deletar banco!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(bancoTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ bancoTabela.nome + " ?",
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
												url : urlBase + 'banco/'
														+ bancoTabela.id + '/'
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
																	" Ocorreu um erro ao tentar deletar banco!",
																	"error");
														}
													});
								});
					}

					self.selecionarBanco = function(bancoselecionado) {
						self.banco = bancoselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});