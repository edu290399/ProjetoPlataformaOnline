var multer = require('multer');
var data = Date.now();
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

	app.get('/cadastroAlteracao',function(req, res){
			app.app.controllers.cadastroAlteracao.cadastroAlteracao(app, req, res);
	});

	app.post('/submitAlteracao', upload.single('avatar2'), function(req,res){
		app.app.controllers.cadastroAlteracao.submitAlteracao(app, req, res, data);
    });

    app.get('/buscaAlteracao', function(req, res){
			app.app.controllers.cadastroAlteracao.busca(app,req,res);
	});
	app.get('/red', function(req, res){
		app.app.controllers.cadastroFuncionario.red(app,req,res);
	})
	
}
