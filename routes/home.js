module.exports = function(app){
	app.get('/home',function(req, res){
		app.app.controllers.home.home(app,req,res);
		
	});

	app.post('/redirect',function(req,res){
		app.app.controllers.home.redirect(app,req,res);
	});

	
}