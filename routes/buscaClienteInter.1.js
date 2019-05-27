module.exports = function(app){
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
    });

    app.get('/buscaClienteCnpj', function(req, res){
		app.app.controllers.buscaInter.buscaClienteCnpj(app,req,res);
    });
    
    app.post('/buscaCJInter', function(req, res){
			app.app.controllers.buscaInter.buscaCJInter(app,req,res);
    });
    
}