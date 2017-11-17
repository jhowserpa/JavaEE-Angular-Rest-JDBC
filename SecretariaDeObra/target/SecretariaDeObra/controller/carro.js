angular
		.module("carroModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/SecretariaDeObra/rest/')
		.controller(
				"carroController",
				function($http, urlBase) {
					var self = this;

					self.carros = [];
					self.carro = undefined;

					self.novo = function() {
						self.carro = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.carro.id) {
							metodo = 'PUT';
						}

						$http({
							method : metodo,
							url : urlBase + 'carro/',
							data : self.carro
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
												msg : ' carro '
														+ self.carro.nome
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.carro.placa
															+ ' - '
															+ self.carro.nome
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.carro.nome
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
															+ self.carro.nome
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
							url : urlBase + 'carro/'
						}).then(function successCallback(response) {
							self.carros = response.data;
							self.carro = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});
					};

					self.deletar = function(carro) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.carro.nome + " ?",
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
												url : urlBase + 'carro/'
														+ self.carro.id + '/'
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
																	" Ocorreu um erro ao tentar deletar carro!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(carroTabela) {

						swal(
								{
									title : "Deseja realmente deletar "
											+ carroTabela.nome + " ?",
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
												url : urlBase + 'carro/'
														+ carroTabela.id + '/'
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
																	" Ocorreu um erro ao tentar deletar carro!",
																	"error");
														}
													});
								});
					}

					self.selecionarCarro = function(carroselecionado) {
						self.carro = carroselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});