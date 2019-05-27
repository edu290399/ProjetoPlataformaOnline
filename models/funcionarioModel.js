module.exports = function(){
	this.getFuncionario = function(connection, callback){
		connection.query('select * from funcionarios',callback);
	}

	this.cadastrarFuncionario = function(funcionario, connection, callback){
		connection.query('insert into funcionarios set ?', funcionario, callback);
	}


	this.getFuncionarioID = function(ID, connection, callback){
		connection.query("select * from funcionarios where id_funcinario = '"+ID+"'",callback);
	}


	this.edit = function(funcionario, connection,callback)
	{
		connection.query("update funcionarios set horttrab = '"+funcionario.horttrab+"' where id_funcinario = '"+funcionario.id+"'");
		connection.query("update funcionarios set telefone = '"+funcionario.telefone+"' where id_funcinario = '"+funcionario.id+"'");
		connection.query("update funcionarios set  cargo = '"+funcionario.cargo+"' where id_funcinario = '"+funcionario.id+"'");
		connection.query("update funcionarios set telefone2 ='"+funcionario.telefone2+"' where id_funcinario = '"+funcionario.id+"'");
		connection.query("update funcionarios set salario ='"+funcionario.salario+"' where id_funcinario = '"+funcionario.id+"'");
		connection.query("update funcionarios set dadosBancarios ='"+funcionario.dadosBancarios+"' where id_funcinario = '"+funcionario.id+"'");
		connection.query("update funcionarios set  endereco = '"+funcionario.endereco+"' where id_funcinario = '"+funcionario.id+"'",callback);
	}

	this.login = function(funcionario, connection, callback){
		connection.query('select cargo, id_funcinario from funcionarios where id_funcinario like '+funcionario.id+' AND rg = ('+funcionario.rg+')',callback);
	}


	return this;
}