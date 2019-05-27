module.exports = function(app){

	app.get('/cadastroConta',function(req, res){
		app.app.controllers.eventConta.cadastroConta(app,req,res);
	});

	app.post('/submitConta',function(req,res){
		app.app.controllers.eventConta.submitConta(app,req,res);
	});

		app.get('/buscaEventConta', function(req, res){
			app.app.controllers.eventConta.buscaConta(app,req,res);
	});

	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})

	app.post('/editC', function(req, res){
		app.app.controllers.eventConta.edit(app,req,res);
	})

	app.post('/editConta', function(req, res){
		app.app.controllers.eventConta.editConta(app,req,res);
	})
}