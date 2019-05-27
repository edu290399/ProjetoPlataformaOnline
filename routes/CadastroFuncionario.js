module.exports = function(app){

	app.get('/cadastrofuncionario',function(req, res){
			app.app.controllers.cadastroFuncionario.cadastroFuncionario(app, req, res);
		
	});

	app.post('/submitFuncionario',function(req,res){
		app.app.controllers.cadastroFuncionario.submitFuncionario(app, req, res);
    });

    app.get('/buscaFuncionario', function(req, res){
			app.app.controllers.cadastroFuncionario.busca(app,req,res);
	});
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})


	app.post('/editF',function(req, res){
		app.app.controllers.cadastroFuncionario.editF(app,req,res);
	})

	app.post('/editFuncionario',function(req, res){
		app.app.controllers.cadastroFuncionario.editFuncionario(app,req,res);
	})
}
