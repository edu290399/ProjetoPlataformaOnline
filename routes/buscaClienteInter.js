module.exports = function(app){
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
    });

    app.get('/buscaClienteCpf', function(req, res){
		app.app.controllers.buscaInter.buscaClienteCpf(app,req,res);
    });
    
    app.post('/buscaClienteInter', function(req, res){
			app.app.controllers.buscaInter.buscaClienteInter(app,req,res);
    });
    
}