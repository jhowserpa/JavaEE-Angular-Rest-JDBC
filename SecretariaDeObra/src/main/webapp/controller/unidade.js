angular
		.module("unidadeModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"UnidadeController",
				function($http, urlBase) {
					var self = this;

					self.unidades = [];
					self.unidade = undefined;

					self.novo = function() {
						self.unidade = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.unidade.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'unidade/',
							data : self.unidade
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
												msg : ' unidade '
														+ self.unidade.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.unidade.codigo
															+ ' - '
															+ self.unidade.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.unidade.descricao
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
							url : urlBase + 'unidade/'
						}).then(function successCallback(response) {
							self.unidades = response.data;
							self.unidade = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(unidade) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.unidade.descricao + " ?",
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
												url : urlBase + 'unidade/'
														+ self.unidade.id + '/'
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
																	" Ocorreu um erro ao tentar deletar unidade!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(unidadeTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ unidadeTabela.descricao + " ?",
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
												url : urlBase + 'unidade/'
														+ unidadeTabela.id + '/'
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
																	" Ocorreu um erro ao tentar deletar unidade!",
																	"error");
														}
													});
								});
					}

					self.selecionarUnidade = function(unidadeSelecionado) {
						self.unidade = unidadeSelecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});