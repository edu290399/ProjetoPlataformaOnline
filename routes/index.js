
module.exports = function(app){
	app.get('/', function(req, res){
		app.app.controllers.index.index(app, req, res);
	});

	app.post('/login', function(req, res){
		app.app.controllers.index.login(app, req, res);
	});
}