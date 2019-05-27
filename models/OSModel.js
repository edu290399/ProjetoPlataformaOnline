module.exports = function(){
	/*this.getOS = function(connection, callback){//Busca todas as OS's
		connection.query('select * from ordemservico',callback);
	}*/
	this.getOS = function(connection, cod, callback){//Busca todas as OS's
		connection.query('select * from ordemservico',callback);
	}

	this.getID = function(connection,id, callback){//Busca OS com base no ID informado
		connection.query("select * from ordemservico where id = '"+id+"'", callback);
	}

	this.cadastrarOS = function(OS, connection){//Cadastra OS
		connection.query('insert into ordemservico set ?', OS);
	}

	this.produtoOS = function(OS, connection, produtos, quantidade, desconto){
		if(Array.isArray(produtos)){
			for(var I in produtos){
				connection.query('insert into produtoos (IdOs, IdProduto, quantidade, desconto) VALUES ("'+OS+'", "'+produtos[I]+'", "'+quantidade[I]+'", "'+desconto[I]+'")');
			}
		}
		else{
			connection.query('insert into produtoos (IdOs, IdProduto, quantidade, desconto) VALUES ("'+OS+'", "'+produtos+'", "'+quantidade+'", "'+desconto+'")');
		}
		
	}

	this.buscaOS = function(connection, callback){
		connection.query('SELECT * from produtoos INNER JOIN produtos ON (produtoos.IdProduto = produtos.cod) INNER JOIN ordemservico ON (produtoos.IdOs = ordemservico.id)', callback)
	}




	this.emitirOS = function(id, app, res, connection){
		var OSModel = app.app.models.OSModel;
		OSModel.getID(connection, id, function(error, result){
			OSModel.buscaProdutosOS(id, result, res, connection, app);
		})
	}






	this.buscaProdutosOS = function(id, R, res, connection, app){
		connection.query('select * from produtoos where produtoos.IdOs = "'+id+'"', function(error, result){
			var cod = [];
			var quant = [];
			var desconto =[];
			for(var I in result){
				cod[I] = result[I].IdProduto;
				quant[I] = result[I].quantidade;
				desconto[I] = result[I].desconto;
			}
			app.app.models.OSModel.Bprodutos(cod, R, connection, function(error, result){
				res.render('EmissaoOS',{dados: R[0], produtos: result, quantidade: quant, desconto: desconto});
			});
		});
	}

	this.Bprodutos = function(cod, R, connection, callback){
		connection.query('select nome, valor from produtos where cod IN ('+cod+')',callback);
	}
	return this;
}