module.exports.ordemServico = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.OS == 1){
			var connection  = app.config.connection();
			var produtoModel = app.app.models.produtoModel;
			var vendaModel = app.app.models.vendaModel;

			produtoModel.getProduto(connection, function(error, result){
				var produtos = result;
				vendaModel.getDesconto(connection, function(error, result){
					res.render('ordemServico', {dados:[], validacao: [], produtosBD: produtos, desconto: result[0]});
				})
				
			})
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

//Tentativa de gerar OS
module.exports.submitOS = function(app, req, res){
	var dados = req.body;
	var erros = [];

	var connection  = app.config.connection();
	var clienteModel = app.app.models.clienteModel;
	
	//Procurar pelo cliente
	clienteModel.getCpfCliente(dados.cliente, connection,function (error, result){


		//Se cliente for encontrado, procurar por erros nos outros campos
		req.assert('placa','Placa não encontrada').notEmpty();
		req.assert('responsavel','Informe o responsável pelo serviço').notEmpty();
		req.assert('problema','Informe o problema').isLength({min: 3});
		req.assert('servico','Informe o serviço prestado').isLength({min: 3});
		req.assert('preco','Informe o preço do Serviço').notEmpty();
		


		//Se houver erro em algum campo, recarregar a página
		erros = req.validationErrors();
		if(result.length==0){//Se não houver cliente recarrega a página
			erros[0] =  { location: 'body',
			param: 'cliente',
			msg: 'Cliente não encotrado',
			value: '' }

			
			
		}
		var produtoModel = app.app.models.produtoModel;
		var vendaModel = app.app.models.vendaModel;

		if(erros){
			produtoModel.getProduto(connection, function(error, result){
				var produtos = result;
				vendaModel.getDesconto(connection, function(error, result){
					res.render('ordemServico',{dados: dados, validacao: erros, produtosBD:produtos, desconto: result[0]});
					return;
				});
			});
			
		}
		else{
			if(dados.produto){
				if(Array.isArray(dados.produto)){
					var duplicado = false;
					for(var I = 0; I<dados.produto.length-1; I++) for(var J = I+1; J<dados.produto.length; J++){
						if(dados.produto[I] == dados.produto[J])
						{
							duplicado = true; 
							break;
						}
					}
					if(duplicado) res.redirect('/ordemservico');
					else{
						var produtoModel = app.app.models.produtoModel;
						produtoModel.produtoOS(dados, connection, app, req, res);
					}
				}
				else{
					var produtoModel = app.app.models.produtoModel;
					produtoModel.produtoOS(dados, connection, app, req, res);
				}
				
			}
			else{
				delete dados.produto;
				delete dados.quantidade;
				delete dados.desconto;

				OSModel = app.app.models.OSModel;
				OSModel.cadastrarOS(dados, connection);
				OSModel.getOS(connection, "", function(error, result){
					OSModel.emitirOS(result[result.length-1].id, app ,res, connection);
				});
			};
		}
		return;
	})
}

module.exports.buscaOS = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.OS == 1){
			//Lista com as OS no BD
			var connection =  app.config.connection();
			var OSModel = app.app.models.OSModel;
			OSModel.getOS(connection,"", function(error, result){
				var os = result;
				for(var I in result){
					var data = result[I].datacriacao;
				
					var dia = data.getDate();
					var mes = data.getMonth()+1;
					var ano = data.getFullYear();

					var data = ano + '-' + mes + '-' + dia;
					os[I].datacriacao = data;
				}
				
				res.render('buscaOS',{OS: os, res: res});
			});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.buscaID = function(app, req, res){
	//Emissão de uma OS específica
	var id = req.body.id;
	var connection =  app.config.connection();
	var OSModel = app.app.models.OSModel;
	OSModel.emitirOS(id, app, res, connection);
}