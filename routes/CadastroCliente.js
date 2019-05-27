
module.exports = function(app){

	app.get('/cadastroclienteFisico',function(req, res){
		app.app.controllers.cadastroCliente.cadastroClienteCpf(app,req,res);
	});

	app.get('/cadastroclienteJuridico',function(req, res){
		app.app.controllers.cadastroCliente.cadastroClienteCnpj(app,req,res);
	});

	app.post('/submitClienteFisico',function(req,res){
		app.app.controllers.cadastroCliente.submitClienteFisico(app,req,res);
	});

	app.post('/submitClienteJuridico',function(req,res){
		app.app.controllers.cadastroCliente.submitClienteJuridico(app,req,res);
	});

	app.get('/buscaClienteFisico', function(req, res){
		app.app.controllers.cadastroCliente.buscaClienteFisico(app,req,res);
	});

	app.get('/buscaClienteJuridico', function(req, res){
			app.app.controllers.cadastroCliente.buscaClienteJuridico(app,req,res);
	});

	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})

	app.post('/edit',function(req, res){
		app.app.controllers.cadastroCliente.edit(app,req,res);
	})

	app.post('/editCliente',function(req, res){
		app.app.controllers.cadastroCliente.editCliente(app,req,res);
	})

	app.post('/editJuridico',function(req, res){
		app.app.controllers.cadastroCliente.editJuridico(app,req,res);
	})

	app.post('/editClienteJuridico',function(req, res){
		app.app.controllers.cadastroCliente.editClienteJuridico(app,req,res);
	})
}