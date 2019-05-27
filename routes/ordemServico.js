
module.exports = function(app){

	app.get('/ordemServico',function(req, res){
		app.app.controllers.ordemServico.ordemServico(app,req,res);
	});

	app.post('/submitOS',function(req,res){
		app.app.controllers.ordemServico.submitOS(app,req,res);
	});

	app.get('/buscaOS',function(req, res){
		app.app.controllers.ordemServico.buscaOS(app,req,res);
	})

	app.post('/buscaID',function(req, res){
		app.app.controllers.ordemServico.buscaID(app,req,res);
	})
	app.get('/red', function(req, res){
	app.app.controllers.cadastroFuncionario.red(app,req,res);
	})
}