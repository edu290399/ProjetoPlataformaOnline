module.exports = function(app){

	app.get('/cadastroAgendamento',function(req, res){
		app.app.controllers.eventAgen.cadastroAgendamento(app,req,res);
	});

	app.post('/submitAgendamento',function(req,res){
		app.app.controllers.eventAgen.submitAgendamento(app,req,res);
	});

		app.get('/buscaEventAgen', function(req, res){
			app.app.controllers.eventAgen.buscaAgendamento(app,req,res);
	});

	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})

	app.post('/editA', function(req, res){
		app.app.controllers.eventAgen.edit(app,req,res);
	})

	app.post('/editAgendamento', function(req, res){
		app.app.controllers.eventAgen.editAgendamento(app,req,res);
	})
}