module.exports = function(app){
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
    });

    app.get('/buscaFornecedorCnpj', function(req, res){
		app.app.controllers.buscaInter.buscaFornecedorCnpj(app,req,res);
    });
    
    app.post('/buscaFornecedorInter', function(req, res){
			app.app.controllers.buscaInter.buscaFornecedorInter(app,req,res);
    });
    
}