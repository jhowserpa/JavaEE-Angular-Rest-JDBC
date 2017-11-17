angular
		.module("cocModulo", [ 'angularUtils.directives.dirPagination' ])
		.value('urlBase', 'http://localhost:8080/Holder/rest/')
		.controller(
				"CocController",
				function($http, urlBase) {
					var self = this;

					self.cocs = [];
					self.cocCfops = [];
					self.cfops = [];
					self.coc = undefined;
					self.cfop = undefined;

					self.novo = function() {
						self.coc = {};
						self.cocCfops = {};

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");
					};

					self.salvar = function() {
						var metodo = 'POST';
						if (self.coc.id) {
							metodo = 'PUT';
						}
						self.cfop = {};
						self.listCfop = [];
						self.coc.listCfop = self.cocCfops;

						$http({
							method : metodo,
							url : urlBase + 'coc/',
							data : self.coc,
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
												msg : ' coc '
														+ self.coc.descricao
														+ ' ' + msgTipo
														+ ' com sucesso!'
											} ];
										},
										function errorCallback(response) {
											if (response.status === 401) {
												self.alerts = [ {
													type : 'error',
													msg : 'ATENÇÃO! já existe. '
															+ self.coc.codigo
															+ ' - '
															+ self.coc.descricao
															+ '!'
												} ];
											} else if (response.status === 500) {
												self.alerts = [ {
													type : 'error',
													msg : ' Ocorreu um erro ao tentar salvar '
															+ self.coc.descricao
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
							url : urlBase + 'coc/'
						}).then(function successCallback(response) {
							self.cocs = response.data;
							self.coc = undefined;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

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

					self.deletar = function(coc) {
						swal(
								{
									title : " Deseja realmente deletar "
											+ self.coc.descricao + " ?",
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
												url : urlBase + 'coc/'
														+ self.coc.id + '/'
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
																	" Ocorreu um erro ao tentar deletar coc!",
																	"error");
														}
													});
								});
					};

					self.removeRow = function(cocTabela) {
						swal(
								{
									title : "Deseja realmente deletar "
											+ cocTabela.descricao + " ?",
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
												url : urlBase + 'coc/'
														+ cocTabela.id + '/'
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
																	" Ocorreu um erro ao tentar deletar coc!",
																	"error");
														}
													});
								});
					}

					self.removeRowCocCfop = function(cocCfopTabela) {

						var index = -1;
						var comArr = eval(self.cocCfops);
						for (var i = 0; i < comArr.length; i++) {
							if (comArr[i].descricao === cocCfopTabela.descricao) {
								index = i;
								break;
							}
						}
						if (index === -1) {
							alert("Algum erro");
						}
						self.cocCfops.splice(index, 1);
					}

					self.selecionarCoc = function(cocselecionado) {
						self.coc = cocselecionado;

						$('.nav li.active').next('li').find('a').attr(
								"data-toggle", "tab").trigger("click");

						$http({
							method : 'GET',
							url : urlBase + 'coc/' + self.coc.id + '/'
						}).then(function successCallback(response) {
							self.cocCfops = response.data;
						}, function errorCallback(response) {
							self.ocorreuErro();
						});

					}

					self.selecionarCfop = function(cfopselecionado) {
						self.cfop = cfopselecionado;

						self.cocCfops.push(cfopselecionado);
					}

					self.activate = function() {
						self.atualizarTabela();
					};
					self.activate();
				});