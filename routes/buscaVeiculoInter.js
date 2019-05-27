module.exports = function(app){
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
    });

    app.get('/buscaVeiculoPlaca', function(req, res){
		app.app.controllers.buscaInter.buscaVeiculoPlaca(app,req,res);
    });
    
    app.post('/buscaVeiculoInter', function(req, res){
			app.app.controllers.buscaInter.buscaPlacaInter(app,req,res);
    });

    app.get('/buscaInterAlteracaoPlaca', function(req, res){
      app.app.controllers.buscaInter.buscaInterAlteracaoPlaca(app, req, res);
    })

    app.post('/buscaAlteracaoPlaca', function(req, res){
      app.app.controllers.buscaInter.buscaAlteracaoPlaca(app, req, res);
    })
    
}