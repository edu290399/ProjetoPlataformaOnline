module.exports.lucro = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.lucro == 1){
			res.render('lucro');
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.submitLucro = function(app, req, res){
	var periodo = req.body;
	var lucroModel = app.app.models.lucroModel;
	var connection = app.config.connection();
	var formatDate = this.formatDate;

	var P=0;
	if(periodo.diario) P=1;
	else if(periodo.semanal) P=2;
	else if(periodo.mensal) P=3;


	var despesas = 0;
	var ganho = 0;
	lucroModel.verificaConta(connection, P, function(error, result){
		var conta = result;
		for(var I in result)despesas+= parseInt(result[I].valorConta);
			lucroModel.verificaOS(connection, P, function(error, result){
				var OS = result;
				for(var I in result){
				ganho+= parseInt(result[I].total);
			}
			lucroModel.verificaVenda(connection, P, function(error, result){
				var venda = result;
				var quant = [];
				var desconto =[];
				for(var I in result){
					quant[I] = parseInt(result[I].quantidade);
					desconto[I] = parseFloat(result[I].desconto);
				}
				lucroModel.produtoVenda(result, connection, function(error, result){//ganho += result[0]
					for(var I in venda){
						for(var J in result){
							if(result[J].cod == venda[I].IdProduto){
								ganho += parseInt(result[J].valor)*(quant[I])*(1-(desconto[I]/100));
								break;
							}
						}
					}
					var lucro = ganho - despesas;

					var dados = 
					{
						ganho: ganho,
						despesa: despesas,
						lucro: lucro
					}
					var resultados = 
					{
						conta: conta,
						OS: OS,
						venda: venda
					}
					for(var I in (resultados.venda)){resultados.venda[I].dataVenda = formatDate(resultados.venda[I].dataVenda);}
					for(var I in (resultados.OS)){resultados.OS[I].datacriacao = formatDate(resultados.OS[I].datacriacao);}
					for(var I in (resultados.conta)){resultados.conta[I].dataConta = formatDate(resultados.conta[I].dataConta);}

					res.render('dados_lucro',{dados: dados, resultados: resultados});
				})
			})
		})
	})
}

module.exports.pagamento = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.lucro == 1){
			res.render('pagamento');
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
}

module.exports.buscaPagamento = function(app, req, res){
	var periodo = req.body;

	var funcionarioModel = app.app.models.funcionarioModel;
	var producaoModel = app.app.models.producaoModel;
	var connection = app.config.connection();

	funcionarioModel.getFuncionario(connection, function(error, result){
		var funcionario = result;
		var total = [];
		var maoObra = 0;
		var valor = 0;

		for(var I in result){
			total[I] = result[I].salario;
		}
		producaoModel.comissaoFor(funcionario, connection, function(error, result){
			var comissao = [];
			for(var I in funcionario){
				for(var J in result){
					if(funcionario[I].cargo == result[J].nome){
						comissao[I] = result[J].comissao;
						break;
					}
				}
			}
			producaoModel.salario_login(periodo, connection, function(error, result){	
				for(var I in funcionario){
					maoObra = 0;
					valor = 0;
					for(var J in result){
						if(funcionario[I].id_funcinario == result[J].responsavel){
							maoObra += parseFloat(result[J].preco);
						}
					}
					if((maoObra*(comissao[I]/100))!=0){
						valor = parseFloat(total[I]);	
						valor = (valor+(maoObra*(comissao[I]/100))).toFixed(2);
						total[I] = valor;
					}
				}
				res.render('pagamentoGeral',{funcionario: funcionario, comissao: comissao, total: total})
			})
		})
	})
}

module.exports.formatDate = function(date){
    //Formata data: YYYY-MM-DD	
	var dia = date.getDate();
	var mes = date.getMonth()+1;
	var ano = date.getFullYear();

    var data = ano + '-' + mes + '-' + dia;
    return data;
}