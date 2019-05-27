var app = require('./config/server');

//ar index = require('./app/routes/index');
//var cadastroCliente = require('./app/routes/cadastroCliente');

//index(app);
//cadastroCliente(app);
app.listen(3000, function(){
	console.log("Funciona :)");
	
})