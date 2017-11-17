angular
		.module("produtoLanchoneteModulo",
				[ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/SecretariaDeObra/rest/')
		.controller(
				"produtoLanchoneteController",
				function($http, urlBase) {
					var self = this;

					self.produtoLanchonetes = [];
					self.produtoLanchonete = undefined;

					self.novo = function() {
						self.produtoLanchonete = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.produtoLanchonete.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'produtoLanchonete/',
							data : self.produtoLanchonete
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
												msg : ' Produto '
														+ self.produtoLanchonete.nome
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.produtoLanchonete.codigo
															+ ' - '
															+ self.produtoLanchonete.nome
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.produtoLanchonete.nome
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
															+ self.produtoLanchonete.nome
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
							url : urlBase + 'produtoLanchonete/'
						}).then(function successCallback(response) {
							self.produtoLanchonetes = response.data;
							self.produtoLanchonete = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(produtoLanchonete) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.produtoLanchonete.nome
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
												url : urlBase
														+ 'produtoLanchonete/'
														+ self.produtoLanchonete.id
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
																	" Ocorreu um erro ao tentar deletar produtoLanchonete!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(produtoLanchoneteTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ produtoLanchoneteTabela.nome
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
												url : urlBase
														+ 'produtoLanchonete/'
														+ produtoLanchoneteTabela.id
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
																	" Ocorreu um erro ao tentar deletar produtoLanchonete!",
																	"error");
														}
													});
								});
					}

					self.selecionarProdutoLanchonete = function(
							produtoLanchoneteselecionado) {
						self.produtoLanchonete = produtoLanchoneteselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});