module.exports = function(app){

	app.get('/cadastroEvento',function(req, res){
		app.app.controllers.eventEvento.cadastroEvento(app,req,res);
	});

	app.post('/submitEvento',function(req,res){
		app.app.controllers.eventEvento.submitEvento(app,req,res);
	});

		app.get('/buscaEventEvento', function(req, res){
			app.app.controllers.eventEvento.buscaEvento(app,req,res);
	});

	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})
	app.post('/editE', function(req, res){
		app.app.controllers.eventEvento.edit(app,req,res);
	})

	app.post('/editEvento', function(req, res){
		app.app.controllers.eventEvento.editEvento(app,req,res);
	})
}