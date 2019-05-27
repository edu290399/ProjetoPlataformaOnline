module.exports.cadastroFornecedor = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.fornecedor_produto == 1){
			res.render('cadastroFornecedor',{validacao: [], cadastroFornecedor: []});
		}
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.submitFornecedor = function(app, req, res){
	var fornecedor = req.body;
		
		req.assert('nome','Inserir nome').notEmpty();
		req.assert('cnpj','Inserir CPF').notEmpty();
        req.assert('dadosBancarios','Inserir Dados Bancários').notEmpty();
        req.assert('telefone','Inserir Telefone').notEmpty();
        req.assert('email','Inserir E-mail').notEmpty();
        req.assert('endereco','Inserir Endereço').notEmpty();
       

		var erros = req.validationErrors();
		if(erros){
			res.render('cadastroFornecedor',{validacao: erros, cadastroFornecedor: fornecedor});
			return;
		}
		var connection  = app.config.connection();
		var fornecedorModel = app.app.models.fornecedorModel;

		fornecedorModel.cadastrarFornecedor(fornecedor, connection, function(error, result){
			res.redirect('buscaFornecedor');
		});
}

module.exports.red = function(app, req, res){
	res.redirect('home');
}

module.exports.busca = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.fornecedor_produto == 1){
			var connection = app.config.connection();
			var fornecedorModel = app.app.models.fornecedorModel;
			fornecedorModel.getFornecedor(connection,function(error, result){res.render('buscaFornecedor',{fornecedor: result});});
		}
		else{
			res.redirect('/');
		}
	}
	else{
		res.redirect('/');
	}
			
}

module.exports.editForn = function(app, req, res){
	var fornecedor = req.body.Id;
	var connection = app.config.connection();
	var fornecedorModel = app.app.models.fornecedorModel;
	fornecedorModel.getFornecedorID(fornecedor ,connection, function(error, result){
		res.render('editFornecedor',{ validacao:[], cadastroFornecedor:result[0]});
	})
}

	module.exports.editFornecedor = function(app, req, res){
		var fornecedor = req.body;
		var connection = app.config.connection();
		var fornecedorModel = app.app.models.fornecedorModel;
		fornecedorModel.editForn(fornecedor, connection,function(error, result){
			res.redirect('buscaFornecedor');
		});
		
	}