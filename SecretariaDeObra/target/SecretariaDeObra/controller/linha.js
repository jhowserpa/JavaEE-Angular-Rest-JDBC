angular
		.module("linhaModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"linhaController",
				function($http, urlBase) {
					var self = this;

					self.linhas = [];
					self.linha = undefined;

					self.novo = function() {
						self.linha = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.linha.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'linha/',
							data : self.linha
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
												msg : ' linha '
														+ self.linha.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.linha.codigo
															+ ' - '
															+ self.linha.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.linha.descricao
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
							url : urlBase + 'linha/'
						}).then(function successCallback(response) {
							self.linhas = response.data;
							self.linha = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(linha) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.linha.descricao + " ?",
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
												url : urlBase + 'linha/'
														+ self.linha.id + '/'
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
																	" Ocorreu um erro ao tentar deletar linha!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(linhaTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ linhaTabela.descricao + " ?",
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
												url : urlBase + 'linha/'
														+ linhaTabela.id + '/'
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
																	" Ocorreu um erro ao tentar deletar linha!",
																	"error");
														}
													});
								});
					}

					self.selecionarLinha = function(linhaSelecionado) {
						self.linha = linhaSelecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});