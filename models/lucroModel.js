module.exports = function(){
	this.verificaConta = function(connection, periodo, callback){
		//periodo: 1 - diário, 2 - semanal, 3 - mensal
		var data =  new Date();
		var dia = data.getDate();
		var mes = data.getMonth()+1;
		var ano = data.getFullYear();
		var semana = data.getDay();
		var diario = data.getDate();

		if(parseInt(dia)<10)dia = '0'+dia;
		if(parseInt(mes)<10)mes = '0'+mes;

		var diario = ano + '-' + mes + '-' + dia;
		var inicioSemana = ano + '-' + mes + '-' + (dia-semana);
		var inicioMes = ano + '-' + mes + '-' + 1;

		if(periodo == 1)connection.query('select * from contas where dataConta like "'+diario+'"',callback);
		else if(periodo == 2)connection.query('select * from contas where dataConta between "'+inicioSemana+'" and "'+diario+'"',callback);
		else if(periodo == 3)connection.query('select * from contas where dataConta between "'+inicioMes+'" and "'+diario+'"',callback);
	}

	this.verificaVenda = function(connection, periodo, callback){
		//periodo: 1 - diário, 2 - semanal, 3 - mensal
		var data =  new Date();
		var dia = data.getDate();
		var mes = data.getMonth()+1;
		var ano = data.getFullYear();
		var semana = data.getDay();
		var diario = data.getDate();

		var diario = ano + '-' + mes + '-' + dia;
		var inicioSemana = ano + '-' + mes + '-' + (dia-semana);
		var inicioMes = ano + '-' + mes + '-' + 1;

		if(periodo == 1)connection.query('select * from venda where dataVenda = "'+diario+'"',callback);
		else if(periodo == 2)connection.query('select * from venda where dataVenda between "'+inicioSemana+'" and "'+diario+'"',callback);
		else if(periodo == 3)connection.query('select * from venda where dataVenda between "'+inicioMes+'" and "'+diario+'"',callback);
	}

	this.verificaOS = function(connection, periodo, callback){
		//periodo: 1 - diário, 2 - semanal, 3 - mensal
		var data =  new Date();
		var dia = data.getDate();
		var mes = data.getMonth()+1;
		var ano = data.getFullYear();
		var semana = data.getDay();
		var diario = data.getDate();

		var diaInicio = ano + '-' + mes + '-' + dia+' 00:00:00';
		var diaFinal = ano + '-' + mes + '-' + dia+' 23:59:59'
		var inicioSemana = ano + '-' + mes + '-' + (dia-semana);
		var inicioMes = ano + '-' + mes + '-' + 1;

		if(periodo == 1)connection.query('select * from ordemservico where datacriacao between"'+diaInicio+'" and "'+diaFinal+'"',callback);
		else if(periodo == 2)connection.query('select * from ordemservico where datacriacao between "'+inicioSemana+'" and "'+diaFinal+'"',callback);
		else if(periodo == 3)connection.query('select * from ordemservico where datacriacao between "'+inicioMes+'" and "'+diaFinal+'"',callback);
	}

	module.exports.produtoVenda = function(cod, connection, callback){
		var produto = [];
		for(var I in cod)produto [I]=  cod[I].IdProduto;
		connection.query('select * from produtos where cod IN ('+produto+')',callback);
	}

	return this;
}