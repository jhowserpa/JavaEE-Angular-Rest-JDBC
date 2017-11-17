angular
		.module("pedidoVendaModulo",
				[ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"pedidoVendaController",
				function($http, urlBase) {
					var self = this;

					self.pedidoVendas = [];
					self.negociantes = [];
					self.funcionarios = [];
					self.transportadoras = [];
					self.tipocobrancas = [];
					self.contabancarias = [];
					self.produtos = [];
					self.produtosPedidoVenda = [];
					self.pedidoVenda = undefined;
					self.produto = undefined;

					self.novo = function() {
						self.pedidoVenda = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.pedidoVenda.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'pedidovenda/',
							data : self.pedidoVenda
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
												msg : ' pedidoVenda '
														+ self.pedidoVenda.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.pedidoVenda.codigo
															+ ' - '
															+ self.pedidoVenda.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.pedidoVenda.descricao
															+ ' no servidor!'
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
							url : urlBase + 'pedidovenda/'
						}).then(function successCallback(response) {
							self.pedidoVendas = response.data;
							self.pedidoVenda = undefined;
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
							url : urlBase + 'negociante/'
						}).then(function successCallback(response) {
							self.negociantes = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'negociante/transportadora'
						}).then(function successCallback(response) {
							self.transportadoras = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'tipocobranca/'
						}).then(function successCallback(response) {
							self.tipocobrancas = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'contabancaria/'
						}).then(function successCallback(response) {
							self.contabancarias = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'produto/'
						}).then(function successCallback(response) {
							self.produtos = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						// $http({
						// method : 'GET',
						// url : urlBase + 'pedidovenda/produto/'
						// }).then(function successCallback(response) {
						// self.produtosPedidoVenda = response.data;
						// self.produto = undefined;
						// }, function errorCallback(response) {
						// self.ocorreuErro();
						// });
					};

					self.deletar = function(pedidoVenda) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.pedidoVenda.descricao + " ?",
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
												url : urlBase + 'pedidovenda/'
														+ self.pedidoVenda.id
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
																	" Ocorreu um erro ao tentar deletar pedidoVenda!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(pedidoVendaTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ pedidoVendaTabela.descricao
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
												url : urlBase + 'pedidovenda/'
														+ pedidoVendaTabela.id
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
																	" Ocorreu um erro ao tentar deletar pedidoVenda!",
																	"error");
														}
													});
								});
					}

					self.selecionarPedidoVenda = function(
							pedidoVendaselecionado) {
						self.pedidoVenda = pedidoVendaselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.selecionarProduto = function(produtoSelecionado) {
						self.produto = produtoSelecionado;

						self.produtosPedidoVenda.push(produtoSelecionado);
					}

					self.removeRowProdutosPedidoVenda = function(
							produtoPedidoVendaTabela) {

						var index = -1;
						var comArr = eval(self.produtosPedidoVenda);
						for (var i = 0; i < comArr.length; i++) {
							if (comArr[i].descricao === produtoPedidoVendaTabela.descricao) {
								index = i;
								break;
							}
						}
						if (index === -1) {
							alert("Algum erro");
						}
						self.produtosPedidoVenda.splice(index, 1);
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});