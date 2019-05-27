module.exports.cadastroVeiculo = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
			res.render('cadastroveiculo',{validacao: [], cadastroVeiculo: [] });
		}
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
   
}

module.exports.submitVeiculo = function(app, req, res, data){
	var veiculo = req.body;
	var file = req.file;
	var alt = false;

	req.assert('placa','Inserir Placa').notEmpty();
	req.assert('marca','Inserir Marca').notEmpty();
	req.assert('modelo','Inserir Modelo').notEmpty();
	req.assert('anoFab','Inserir Ano de Fabricação').notEmpty();
	req.assert('cor','Inserir Cor').notEmpty();

	var erros = req.validationErrors();
	if(erros){
		res.render('cadastroVeiculo',{validacao: erros, cadastroVeiculo: veiculo});
		return;
	}

	var connection  = app.config.connection();
	var alteracaoModel = app.app.models.alteracaoModel;
	var veiculoModel = app.app.models.veiculoModel;

	if(file && veiculo.obs!=''){
		var alteracao = {imagem: data+'-'+file.originalname, placa: veiculo.placa, descricao: veiculo.obs};
		alt=true;
	}
	else{
		if(file){
			var alteracao = {imagem: data+'-'+file.originalname, placa: veiculo.placa};
			alt = true;
		}
		else{
			if(veiculo.obs!=''){
				var alteracao = {placa: veiculo.placa,  descricao: veiculo.obs};
				alt = true;
			}
		} 
	}

	if(alt){
		veiculoModel.cadastrarVeiculo(veiculo, connection, function(error, result){
			alteracaoModel.alteracao(alteracao, connection, function(error, result){	
				res.redirect('buscaVeiculo');
			})
		});
	}
	else{
		veiculoModel.cadastrarVeiculo(veiculo, connection, function(error, result){
			res.redirect('buscaVeiculo');
		})
	}
	
}

module.exports.buscaVeiculo = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
			var connection = app.config.connection();
			var veiculoModel = app.app.models.veiculoModel;
			veiculoModel.getVeiculo(connection,function(error, result){res.render('buscaVeiculo',{veiculo: result});});
		}
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
	}
  
}

module.exports.editV = function(app, req, res){
	var veiculo = req.body.placa;
	var connection = app.config.connection();
	var veiculoModel = app.app.models.veiculoModel;
	veiculoModel.getVeiculoPlaca(veiculo ,connection, function(error, result){
		res.render('editVeiculo',{ validacao:[], cadastroVeiculo:result[0]});
	})
}

module.exports.editVeiculo= function(app, req, res){
	var veiculo = req.body;
	var connection = app.config.connection();
	var veiculoModel = app.app.models.veiculoModel;
	veiculoModel.edit(veiculo, connection,function(error, result){
		res.redirect('buscaVeiculo');
	});
}