//Renderizar página de venda
module.exports.venda = function(app, req, res){
	
	if(req.session.cargo){
        if(req.session.cargo.venda == 1){
			var connection = app.config.connection();
			var produtoModel = app.app.models.produtoModel;
			var vendaModel  =app.app.models.vendaModel;

			produtoModel.getProduto(connection, function(error, result){
				var produtos = result;
				vendaModel.getDesconto(connection, function(error, result){
					res.render('venda', {venda: produtos, desconto: result[0],cargo: req.session.funcionario, acesso: req.session.cargo});//Passando todos os produtos para a página
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


//Verificação e controle da venda
module.exports.submitVenda = function(app, req, res){
	var venda = req.body;
	var vetor = Array.isArray(venda.quantidade);//Verificar se venda é um array. Se mais de um produto vai ser vendido
	var connection = app.config.connection();
	var produtoModel = app.app.models.produtoModel;
	var vendaModel = app.app.models.vendaModel;
	vendaModel.getDesconto(connection, function(error, result){
		var controle = false;
		for(var I in venda.desconto){	
			if(venda.desconto[I]>result[0].descontoMax)controle=true;
		}
		if(controle){
			res.redirect('venda');
			return;
		}
			/*Se apenas um campo for preenchido ele gera uma variável.
			Se mais de um campo for preenchido ele gera um vetor.*/
			if(vetor)
			{
				produtoModel.venda(venda, connection, app, res, req);		
			}
				
	
			else
			{//Se apenas um produto for vendido
				produtoModel.getProdutoCod(venda.produto,connection, function(error, result){
					/*Essa variável deverá receber os produtos do BD*/
	
					if(result.length == 0){
						//Um dos códigos de barra não está no BD
						res.redirect('venda');
						return;
					}
					else if(result[0].quantidade<venda.quantidade){
						//A quantidade de um dos produtos é maior que a quantidade disponível
						//renderizar venda
						res.redirect('venda');
						
						//Fim
						return;
					}
					//finalizar compra
					else
					{
						produtoModel.getProdutoCod(venda.produto, connection, function(error,result){
							var produto = result;
							vendaModel.venda(venda, connection, function(error, result){
								if(error)res.send(error);
								else{
									produtoModel.setQuant('sub', venda.quantidade, produto[0].cod, produto[0].quantidade, connection, res, function(error, result){
										//Definir o que acontece na conclusão da compra
										res.redirect('buscaProduto');
									})
								}
							});
							
						})
						
					}
				})
					
			}
	})
		
}

module.exports.busca = function(app, req,res){
	var connection = app.config.connection();
	var produtoModel = app.app.models.produtoModel;
	produtoModel.getProduto(connection, function(error, result){
		res.render('venda', {venda: result});//Passando todos os produtos para a página
		return;
	})
}
/*
module.exports.finaliza = function(app, req,res, erros){
	var connection = app.config.connection();
	var produtoModel = app.app.models.produtoModel;
	for(var K in venda.produto)
	{
		produtoModel.getProdutoCod(venda.produto[K], connection, function(error,result){
			for(var J in venda.quantidade){
				produtoModel.setQuant('sub', venda.quantidade[J], result[0].cod, result[0].quantidade, connection, function(error, result){
					return;
				})
			}
		})

	}
}*/

module.exports.desconto = function(app, req, res){
	//Definir a quantidade máxima de desconto
	if(req.session.funcionario == 'PROPRIETARIO')res.render('desconto');
	else res.redirect('/');
}

module.exports.submitDesconto = function(app, req, res){
	var desconto = req.body.descontoMax;
	var connection = app.config.connection();
	
	app.app.models.vendaModel.setDesconto(desconto, connection, function(error, result){
		res.redirect('venda');
	});
}