module.exports = function(app){
	app.get('/lucro',function(req,res){
		app.app.controllers.lucro.lucro(app,req,res);
	});

	app.post('/submitLucro',function(req,res){
		app.app.controllers.lucro.submitLucro(app,req,res);
	});

	app.get('/pagamento', function(req, res){
		app.app.controllers.lucro.pagamento(app,req,res);
	});

	app.post('/buscaPagamento', function(req, res){
		app.app.controllers.lucro.buscaPagamento(app,req,res);
	})
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})
}