angular
		.module("lanchoneteModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"LanchoneteController",
				function($http, urlBase) {
					var self = this;

					self.lanchonetes = [];
					self.produtoLanchonetes = [];
					self.produtosPedido = [];
					self.lanchonete = undefined;
					self.produtoLanchonete = undefined;

					self.novo = function() {
						self.lanchonete = {};
						self.produtosPedido = [];

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function(fechado) {
						var metodo = 'POST';
						if (self.lanchonete.id) {
							metodo = 'PUT';
						}
						if(fechado == true){
							self.lanchonete.status = "Fechado";
						}else{
							self.lanchonete.status = "Aberto";
						}

						self.produtoLanchonete = {};
						self.listProdutosPedido = [];
						self.lanchonete.listProdutosPedido = self.produtosPedido;

						$http({
							method : metodo,
							url : urlBase + 'lanchonete/',
							data : self.lanchonete,
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
												msg : ' pedido '
														+ self.lanchonete.pedido
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.lanchonete.codigo
															+ ' - '
															+ self.lanchonete.pedido
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.lanchonete.pedido
															+ '!'
												} ];
											} else {
												var msgTipo = null;
												if (response.config.method === "PUT") {
													msgTipo = "alterar ";
												} else {
													msgTipo = "salvar ";
												}
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar '
															+ msgTipo
															+ self.lanchonete.pedido
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
							url : urlBase + 'lanchonete/'
						}).then(function successCallback(response) {
							self.lanchonetes = response.data;
							self.lanchonete = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'produtoLanchonete/'
						}).then(function successCallback(response) {
							self.produtoLanchonetes = response.data;
							self.produtoLanchonete = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(lanchonete) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.lanchonete.pedido + " ?",
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
												url : urlBase + 'lanchonete/'
														+ self.lanchonete.id
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
																	" Ocorreu um erro ao tentar deletar lanchonete!",
																	"error");
														} else {
															swal(
																	" Ocorreu um erro ao tentar deletar lanchonete!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(lanchoneteTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ lanchoneteTabela.pedido + " ?",
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
												url : urlBase + 'lanchonete/'
														+ lanchoneteTabela.id
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
																	" ATENÇÃO! Não é Possivel deletar dado pois está sendo usado(a) em outro Registro! ",
																	" dados não foram atualizados!");
														} else if (response.status === 500) {
															swal(
																	" Ocorreu um erro ao tentar deletar lanchonete! ",
																	" dados não foram atualizados!");
														} else {
															swal(
																	" Ocorreu um erro ao tentar remover lanchonete!",
																	"error");
														}
													});
								});
					}

					self.selecionarLanchonete = function(lanchoneteselecionado) {
						self.lanchonete = lanchoneteselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");

						$http(
								{
									method : 'GET',
									url : urlBase
											+ 'lanchonete/produtosPedido/'
											+ self.lanchonete.id
								}).then(function successCallback(response) {
							self.produtosPedido = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					}

					self.selecionarProdutoLanchonete = function(
							produtoLanchonete) {
						self.produtoLanchonete = produtoLanchonete;
						if (self.lanchonete.quantidade == undefined) {
							self.produtoLanchonete.quantidade = 1;
							self.produtoLanchonete.subTotal = self.produtoLanchonete.precoUnitario;
							self.produtosPedido.push(produtoLanchonete);
						} else {
							self.produtoLanchonete.quantidade = self.lanchonete.quantidade;
							self.produtoLanchonete.subTotal = self.lanchonete.quantidade
									* self.produtoLanchonete.precoUnitario;
							self.produtosPedido.push(produtoLanchonete);
						}

					}

					self.removeRowProdutosPedido = function(produtoTabela) {

						var index = -1;
						var comArr = eval(self.produtosPedido);
						for (var i = 0; i < comArr.length; i++) {
							if (comArr[i].descricao === produtoTabela.descricao) {
								index = i;
								break;
							}
						}
						if (index === -1) {
							alert("Algum erro");
						}
						self.produtosPedido.splice(index, 1);
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});