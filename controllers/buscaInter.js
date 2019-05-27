module.exports.red = function(app, req, res){
	res.redirect('home');
}

module.exports.buscaClienteInter = function(app, req, res){
	var cpf = req.body.cpf;
	var connection = app.config.connection();
	var buscaInter = app.app.models.buscaInterModel;
	buscaInter.getCpfCliente(cpf,connection,function(error, result){res.render('buscaCliente',{cliente: result});});
}

module.exports.buscaClienteCpf = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
				res.render('buscaClienteInter',{validacao: [], buscaClienteCpf: []});
		}
		else{
			res.redirect('/');
		}
	}
	else{
		res.redirect('/');
	}
	   
}

module.exports.buscaCJInter = function(app, req, res){
	var cnpj = req.body.cnpj;
	var connection = app.config.connection();
	var buscaInter = app.app.models.buscaInterModel;
	buscaInter.getCnpjCliente(cnpj,connection,function(error, result){res.render('buscaClienteJuridico',{cliente: result});});
}

module.exports.buscaClienteCnpj = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
			res.render('buscaCJInter',{validacao: [], buscaClienteCnpj: []});
		}
		else{
			res.redirect('/');
		}
	}
	else{
	res.redirect('/');
	}
}

module.exports.buscaFuncionarioInter = function(app, req, res){
	var cpf = req.body.cpf;
	var connection = app.config.connection();
	var buscaInter = app.app.models.buscaInterModel;
	buscaInter.getCpfFuncionario(cpf,connection,function(error, result){res.render('buscaFuncionario',{funcionario: result});});
}

module.exports.buscaFuncionarioCpf = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.funcionario == 1){
			res.render('buscaFuncionarioInter',{validacao: [], buscaFuncionarioCpf: []});
		}
		else{
			res.redirect('/');
		}
	}
	else{
	res.redirect('/');
	}	
}

module.exports.buscaOSInter = function(app, req, res){
	var placa = req.body.placa;
	var connection = app.config.connection();
	var buscaInter = app.app.models.buscaInterModel;
	buscaInter.getPlacaOS(placa,connection,function(error, result){
		var os = result;
		for(var I in result){
			var data = result[I].datacriacao;
		
			var dia = data.getDate();
			var mes = data.getMonth()+1;
			var ano = data.getFullYear();

			var data = ano + '-' + mes + '-' + dia;
			os[I].datacriacao = data;
		}
		res.render('buscaOS',{OS: result});
	});
}

module.exports.buscaOSPlaca = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.funcionario == 1){
			res.render('buscaOSInter',{validacao: [], buscaOSPlaca: []});
		}
		else{
			res.redirect('/');
		}
	}
	else{
	res.redirect('/');
	}
}

module.exports.buscaPlacaInter = function(app, req, res){
	var placa = req.body.placa;
	var connection = app.config.connection();
	var buscaInter = app.app.models.buscaInterModel;
	buscaInter.getPlacaVeiculo(placa,connection,function(error, result){res.render('buscaVeiculo',{veiculo: result});});
}

module.exports.buscaVeiculoPlaca = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.funcionario == 1){
			res.render('buscaVeiculoInter',{validacao: [], buscaVeiculoPlaca: []});
		}
		else{
			res.redirect('/');
		}
	}
	else{
	res.redirect('/');
	}
}
module.exports.buscaFornecedorInter = function(app, req, res){
	var cnpj = req.body.cnpj;
	var connection = app.config.connection();
	var buscaInter = app.app.models.buscaInterModel;
	buscaInter.getCnpjFornecedor(cnpj,connection,function(error, result){res.render('buscaFornecedor',{fornecedor: result});});
}

module.exports.buscaFornecedorCnpj = function(app,req,res){
	if(req.session.cargo){
		if(req.session.cargo.fornecedor_produto == 1){
			res.render('buscaFornecedorInter',{validacao: [], buscaFornecedorCnpj: []});
		}
		else{
			res.redirect('/');
		}
	}
	else{
	res.redirect('/');
	}		   
}

module.exports.buscaAlteracaoInter = function(app, req, res){
	var placa = req.body.placa;
	var connection = app.config.connection();
	var buscaInter = app.app.models.buscaInterModel;
	buscaInter.getPlacaAlteracao(placa,connection,function(error, result){res.render('buscaAlteracao',{alteracao: result});});
}

module.exports.buscaInterAlteracaoPlaca = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
			res.render('buscaAlteracaoInter');
		}
		else{
			res.redirect('/');
		}
	}
	else{
	res.redirect('/');
	}
}

module.exports.buscaAlteracaoPlaca = function(app, req, res){
	var placa = req.body.placa;
	var connection = app.config.connection();
	var alteracaoModel = app.app.models.alteracaoModel;

	alteracaoModel.placaAlteracao(placa, connection, function(error, result){
		var alteracao = result;
				for(var I in result){
				var data = result[I].data;
			
				var dia = data.getDate();
				var mes = data.getMonth()+1;
				var ano = data.getFullYear();

				var data = ano + '-' + mes + '-' + dia;
				alteracao[I].data = data;
			} 

		res.render('buscaAlteracao', {alteracao: alteracao});
	}) 
	
}