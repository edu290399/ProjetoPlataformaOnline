module.exports.cadastroFuncionario = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.funcionario == 1){
			res.render('cadastroFuncionario',{validacao: [], cadastroFuncionario: []});
		}
		else{
			res.redirect('/');
		}
	}
	else{
		res.redirect('/');
	}
}

module.exports.submitFuncionario = function(app, req, res){
	var funcionario = req.body;
		
		req.assert('nome','Inserir nome').notEmpty();
		req.assert('cargo', 'Inserir Cargo').notEmpty();
		req.assert('cpf','Inserir CPF').notEmpty();
        req.assert('rg','Inserir RG').notEmpty();
        req.assert('ncarttrab','Inserir Numero da Carteira de Trabalho').notEmpty();
        req.assert('dataadmissao','Inserir Data de Admissão').notEmpty();
        req.assert('horttrab','Inserir Horario de Trabalho').notEmpty();
		req.assert('salario','Inserir Salário').notEmpty();
		req.assert('dadosBancarios','Inserir Dados Bancários').notEmpty();
		req.assert('datanascimento','Inserir data de nascimento').notEmpty();
		req.assert('telefone','Inserir Telefone').notEmpty();
		req.assert('telefone2','Inserir Telefone').notEmpty();
		req.assert('endereco','Inserir endereço').notEmpty();

		var erros = req.validationErrors();
		if(erros){
			res.render('cadastroFuncionario',{validacao: erros, cadastroFuncionario: funcionario});
			return;
		}
		var connection  = app.config.connection();
		var funcionarioModel = app.app.models.funcionarioModel;

		funcionario.cargo = funcionario.cargo.toUpperCase();//Cargos adicionados em caixa alta para facilitar comparação
		
		funcionarioModel.cadastrarFuncionario(funcionario, connection, function(error, result){
			res.redirect('buscaFuncionario');
		});
}

module.exports.red = function(app, req, res){
	res.redirect('home');
}

module.exports.busca = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.funcionario == 1){
			var connection = app.config.connection();
			var funcionarioModel = app.app.models.funcionarioModel;
			funcionarioModel.getFuncionario(connection,function(error, result){res.render('buscaFuncionario',{funcionario: result});});
		}
		else{
			res.redirect('/');
		}
	}
	else{
		res.redirect('/');
	}
}

module.exports.editF = function(app, req, res){
	var funcionario = req.body.id;
	var connection = app.config.connection();
	var funcionarioModel = app.app.models.funcionarioModel;
	funcionarioModel.getFuncionarioID(funcionario ,connection, function(error, result){
		res.render('editFuncionario',{ validacao:[], cadastroFuncionario:result[0]});
	})
}

	module.exports.editFuncionario = function(app, req, res){
		var funcionario = req.body;
		var connection = app.config.connection();
		var funcionarioModel = app.app.models.funcionarioModel;
		funcionario.cargo = funcionario.cargo.toUpperCase();
		funcionarioModel.edit(funcionario, connection,function(error, result){
			res.redirect('buscaFuncionario');
		});
		
	}