module.exports = function(app){
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
    });

    app.get('/buscaFuncionarioCpf', function(req, res){
		app.app.controllers.buscaInter.buscaFuncionarioCpf(app,req,res);
    });
    
    app.post('/buscaFuncionarioInter', function(req, res){
			app.app.controllers.buscaInter.buscaFuncionarioInter(app,req,res);
    });
    
}