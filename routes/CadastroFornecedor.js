module.exports = function(app){

	app.get('/cadastrofornecedor',function(req, res){
		//if(req.session.valido == true){
			app.app.controllers.cadastroFornecedor.cadastroFornecedor(app, req, res);
		//}
		//else{
		//	res.redirect('/');
		//}
		
	});

	app.post('/submitFornecedor',function(req,res){
		app.app.controllers.cadastroFornecedor.submitFornecedor(app, req, res);
    });

    app.get('/buscaFornecedor', function(req, res){
			app.app.controllers.cadastroFornecedor.busca(app,req,res);
	});
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})


	app.post('/editForn',function(req, res){
		app.app.controllers.cadastroFornecedor.editForn(app,req,res);
	})

	app.post('/editFornecedor',function(req, res){
		app.app.controllers.cadastroFornecedor.editFornecedor(app,req,res);
	})
}
