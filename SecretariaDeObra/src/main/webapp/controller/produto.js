angular
		.module("produtoModulo", [ 'angularUtils.directives.dirPagination','rw.moneymask' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"ProdutoController",
				function($http, urlBase) {
					var self = this;

					self.produtos = [];
					self.produto = undefined;
					self.unidades = [];
					self.generos = [];
					self.ncms = [];
					self.cests = [];
					
					self.submitForm = function(isValid) {

					    if (isValid) {
					      alert('campos Obrigatório!');
					    }

					  };

					self.novo = function() {
						self.produto = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.produto.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'produto/',
							data : self.produto
						}).then(
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
										msg : ' produto '
												+ self.produto.descricao + ' '
												+ msgTipo + ' com sucesso!'
									} ];
								},
								function errorCallback(response) {
									if (response.status === 401) {
										self.alerts = [ {
											type : 'error',
											msg : 'ATENÇÃO! já existe. '
													+ self.produto.codigo
													+ ' - '
													+ self.produto.descricao
													+ '!'
										} ];
									} else if (response.status === 500) {
										var msgTipo = null;
										if (response.config.method === "PUT") {
											msgTipo = "alterar";
										} else {
											msgTipo = "salvar";
										}
										self.alerts = [ {
											type : 'error',
											msg : ' Ocorreu um erro ao tentar '
													+ msgTipo + ' - '
													+ self.produto.descricao
													+ '!'
										} ];
									} else {
										if (response.config.method === "PUT") {
											msgTipo = "alterar";
										} else {
											msgTipo = "salvar";
										}
										self.alerts = [ {
											type : 'error',
											msg : ' Ocorreu um erro ao tentar '
													+ msgTipo + ' - '
													+ self.produto.descricao
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
							url : urlBase + 'produto/'
						}).then(function successCallback(response) {
							self.produtos = response.data;
							self.produto = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'unidade/'
						}).then(function successCallback(response) {
							self.unidades = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'genero/'
						}).then(function successCallback(response) {
							self.generos = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'ncm/'
						}).then(function successCallback(response) {
							self.ncms = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'cest/'
						}).then(function successCallback(response) {
							self.cests = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(produto) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.produto.descricao + " ?",
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
												url : urlBase + 'produto/'
														+ self.produto.id + '/'
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
																	" Ocorreu um erro ao tentar deletar produto!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(produtoTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ produtoTabela.descricao + " ?",
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
												url : urlBase + 'produto/'
														+ produtoTabela.id
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
																	" Ocorreu um erro ao tentar deletar produto!",
																	"error");
														}
													});
								});
					}

					self.selecionarProduto = function(produtoselecionado) {
						self.produto = produtoselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});