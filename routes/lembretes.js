module.exports = function(app){
	app.get('/lembretes',function(req, res){
		app.app.controllers.lembretes.lembretes(app,req,res);
	});

	app.post('/redi',function(req,res){
		app.app.controllers.lembretes.redi(app,req,res);
	});

	

	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})
}