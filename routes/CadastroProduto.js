module.exports = function(app){

	app.get('/cadastroproduto',function(req, res){
		//if(req.session.valido == true){
			app.app.controllers.cadastroProduto.cadastroProduto(app, req, res);
		//}
		//else{
		//	res.redirect('/');
		//}
		
	});

	app.post('/submitProduto',function(req,res){
		app.app.controllers.cadastroProduto.submitProduto(app, req, res);
    });

    app.get('/buscaProduto', function(req, res){
			app.app.controllers.cadastroProduto.buscaP(app,req,res);
	});

	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})

	app.post('/editP', function(req, res){
		app.app.controllers.cadastroProduto.editP(app,req,res);
	})

	app.post('/editProduto', function(req, res){
		app.app.controllers.cadastroProduto.editProduto(app,req,res);
	})
}
