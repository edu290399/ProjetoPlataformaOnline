
module.exports = function(app){

	app.get('/venda',function(req, res){
		app.app.controllers.venda.venda(app,req,res);
	});

	app.post('/submitVenda',function(req,res){
		app.app.controllers.venda.submitVenda(app,req,res);
	});
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})

	app.get('/desconto', function(req, res){
		app.app.controllers.venda.desconto(app,req,res);
	})

	app.post('/submitDesconto', function(req, res){
		app.app.controllers.venda.submitDesconto(app,req,res);
	})
}