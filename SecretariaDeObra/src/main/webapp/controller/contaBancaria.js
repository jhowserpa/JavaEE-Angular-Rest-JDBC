angular
		.module("contaBancariaModulo",
				[ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"contaBancariaController",
				function($http, urlBase) {
					var self = this;

					self.contaBancarias = [];
					self.agencias = [];
					self.contaBancaria = undefined;

					self.novo = function() {
						self.contaBancaria = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.contaBancaria.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'contabancaria/',
							data : self.contaBancaria
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
												msg : ' Conta Bancária '
														+ self.contaBancaria.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.contaBancaria.codigo
															+ ' - '
															+ self.contaBancaria.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.contaBancaria.descricao
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
															+ self.contaBancaria.descricao
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
							url : urlBase + 'contabancaria/'
						}).then(function successCallback(response) {
							self.contaBancarias = response.data;
							self.contaBancaria = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

						$http({
							method : 'GET',
							url : urlBase + 'agencia/'
						}).then(function successCallback(response) {
							self.agencias = response.data;
							self.contaBancaria = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(contaBancaria) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.contaBancaria.descricao
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
														+ 'contabancaria/'
														+ self.contaBancaria.id
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
																	" Ocorreu um erro ao tentar deletar contaBancaria!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(contaBancariaTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ contaBancariaTabela.descricao
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
														+ 'contabancaria/'
														+ contaBancariaTabela.id
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
																	" Ocorreu um erro ao tentar deletar contaBancaria!",
																	"error");
														}
													});
								});
					}

					self.selecionarContaBancaria = function(
							contaBancariaselecionado) {
						self.contaBancaria = contaBancariaselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});