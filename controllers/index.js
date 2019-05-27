module.exports.index = function(app, req, res){
	res.render('index', { validacao: [], err: ''});
}

module.exports.login = function(app, req, res){
	var login = req.body;


	req.assert('id','Inserir ID').notEmpty();
	req.assert('rg','Inserir RG').notEmpty();

	var erros = req.validationErrors();
	if(erros)
	{
		res.render('index',{ validacao: erros, err: ''});
		return;
	}

	var connection  = app.config.connection();
	var funcionarioModel = app.app.models.funcionarioModel;
	var cargoModel =  app.app.models.cargoModel;

	funcionarioModel.login(login, connection, function(error, result){
		if(result){
			if(result.length>0){	
				var funcionario = result[0].cargo;
				var id_funcionario = result[0].id_funcinario;
				cargoModel.getCargoInter(result[0].cargo, connection, function(error, result){
					if(result.length>0){
						req.session.cargo = result[0];
						req.session.funcionario = funcionario;
						req.session.id_funcionario = id_funcionario;
						res.redirect('home');
					}

					else{
						var err='Cargo não encontrado, verifique se o cargo atribuído ao funcionário está cadastrado';
						res.render('index', {err: err, validacao: []});
					}
				});
			}
			else{
				var err='Funcionário não encontrado';
				res.render('index', {err: err, validacao: []});
			}	
		}
		else{
			var err='Funcionário não encontrado';
			res.render('index', {err: err, validacao: []});
		}
		
	})	
}
