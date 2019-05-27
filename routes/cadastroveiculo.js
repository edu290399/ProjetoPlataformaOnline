var multer = require('multer');
var data =   Date.now();
const storage = multer.diskStorage({
	destination:(req, file, callback) =>{
		callback(null, './app/public/uploads')
	},
	filename:(req, file, callback) =>{
		callback(null, data+'-'+file.originalname);
	}
})

var upload = multer({storage});

module.exports = function(app){

	
	app.get('/cadastroveiculo',function(req, res){
		//if(req.session.valido == true){
			app.app.controllers.cadastroVeiculo.cadastroVeiculo(app, req, res);
		//}
		//else{
		//	res.redirect('/');
		//}
		
	});

	app.post('/submitVeiculo', upload.single('avatar'),function(req,res){
		app.app.controllers.cadastroVeiculo.submitVeiculo(app, req, res, data);
    });

    app.get('/buscaVeiculo', function(req, res){
			app.app.controllers.cadastroVeiculo.buscaVeiculo(app,req,res);
	});
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	});

	app.post('/editV',function(req, res){
		app.app.controllers.cadastroVeiculo.editV(app,req,res);
	})

	app.post('/editVeiculo',function(req, res){
		app.app.controllers.cadastroVeiculo.editVeiculo(app,req,res);
	})
}
