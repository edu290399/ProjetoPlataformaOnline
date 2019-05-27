module.exports = function(){

	this.venda = function(venda, connection, callback){
		var data =  new Date();
		var dia = data.getDate();
		var mes = data.getMonth()+1;
		var ano = data.getFullYear();

		var dataAtual = ano + '-' + mes + '-' + dia;
		venda ={IdProduto: venda.produto, quantidade: venda.quantidade, dataVenda: dataAtual, desconto: venda.desconto};

		connection.query('insert into venda set ?', venda, callback);
	}

	this.setDesconto = function(descontoMax, connection,callback){
		connection.query('update desconto set descontoMax = "'+descontoMax+'"',callback);
	}

	this.getDesconto = function(connection,callback){
		connection.query('select descontoMax from desconto',callback);
	}

	return this;
}