module.exports = function(app){
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
    });

    app.get('/buscaOSPlaca', function(req, res){
		app.app.controllers.buscaInter.buscaOSPlaca(app,req,res);
    });
    
    app.post('/buscaOSInter', function(req, res){
			app.app.controllers.buscaInter.buscaOSInter(app,req,res);
    });
    
}