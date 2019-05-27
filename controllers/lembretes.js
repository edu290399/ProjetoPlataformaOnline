module.exports.lembretes = function(app,req,res){
	
	var connection  = app.config.connection();
	var lembreteModel = app.app.models.lembreteModel;
	lembreteModel.getConta(connection, function(error,result)
	{
		var conta = result;
		lembreteModel.getEvento(connection,function(error,result){
			var evento = result;
			lembreteModel.getAgendamento(connection,function(error,result){
				var agendamento = result;
				res.render('lembretes',{conta: conta, evento: evento, agendamento: agendamento, acesso: req.session.cargo});
			})
		})
	})
}
module.exports.redi = function(app, req, res){
	var pagina = req.body;
	if(pagina.CadastroEvento)res.redirect('cadastroEvento');
	else if(pagina.BuscaEvento)res.redirect('buscaEventEvento');
	else if(pagina.CadastroAgendamento)res.redirect('cadastroAgendamento');
	else if(pagina.BuscaAgendamento)res.redirect('buscaEventAgen');
	else if(pagina.CadastroConta)res.redirect('cadastroConta');
	else if(pagina.BuscaConta)res.redirect('buscaEventConta');
}


