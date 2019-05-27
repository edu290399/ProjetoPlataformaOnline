module.exports.orcamento = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.OS == 1){

			var connection = app.config.connection();
			var produtoModel = app.app.models.produtoModel;
			var vendaModel = app.app.models.vendaModel;

			produtoModel.getProduto(connection, function(error, result){
				var produtos = result;
				vendaModel.getDesconto(connection, function(error, result){
					res.render('orcamento', {produto: produtos, desconto: result[0]});//Passando todos os produtos para a página
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

module.exports.geraOS = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.OS == 1){

			var orcamento = req.body;
			var connection = app.config.connection();
			var produtoModel = app.app.models.produtoModel;
			var vendaModel = app.app.models.vendaModel;

			if(orcamento.OS){
				produtoModel.getProduto(connection, function(error, result){
					var produtosBD = result;
					vendaModel.getDesconto(connection, function(error, result){
						res.render('ordemservico', {dados: orcamento, validacao:[], produtosBD: produtosBD, desconto: result});
					})
				})
			}
			else if(orcamento.emite){
				produtoModel.getProdutoCod(orcamento.produto, connection, function(error, result){
					if(error)res.send(error);
					else{
						res.render('emissaoOrcamento',{dados: orcamento, produtos:result});
					}
				})
				
			}
		}
		else{res.redirect('/');}
	}
	else{res.redirect('/');}
}