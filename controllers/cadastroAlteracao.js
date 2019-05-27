module.exports.cadastroAlteracao = function(app,req,res){
	if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
			res.render('cadastroAlteracao',{validacao: [], cadastroAlteracao: []});
		}
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
}

module.exports.submitAlteracao = function(app, req, res, data){
	var alteracao = req.body;
	var file = req.file;
	req.assert('placa','Inserir Placa').notEmpty();
	req.assert('descricao','Inserir Descrição').notEmpty();
	
	var erros = req.validationErrors();
	if(erros){
		res.render('cadastroAlteracao',{validacao: erros, cadastroAlteracao: alteracao});
		return;
	}
	
	if(file && alteracao.descricao)var alteracao = {imagem: data+'-'+file.originalname, placa: alteracao.placa, descricao: alteracao.descricao}
	else{
		if(file)var alteracao = {imagem: data+'-'+file.originalname, placa: alteracao.placa}
		else var alteracao = {placa: alteracao.placa,  descricao: alteracao.descricao}
	}

	var connection  = app.config.connection();
	var alteracaoModel = app.app.models.alteracaoModel;

	alteracaoModel.alteracao(alteracao, connection, function(error, result){
		res.redirect('buscaAlteracao');
	});
}

module.exports.red = function(app, req, res){
	res.redirect('home');
}

module.exports.busca = function(app, req, res){
	if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
			var connection = app.config.connection();
			var alteracaoModel = app.app.models.alteracaoModel;
			alteracaoModel.getAlteracao(connection,function(error, result){
				var alteracao = result;
				for(var I in result){
				var data = result[I].data;
			
				var dia = data.getDate();
				var mes = data.getMonth()+1;
				var ano = data.getFullYear();

				var data = ano + '-' + mes + '-' + dia;
				alteracao[I].data = data;
			} 

			res.render('buscaAlteracao',{alteracao: alteracao});
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

