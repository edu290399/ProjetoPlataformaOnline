module.exports = function(){

	/*Busca*/
	this.getClienteFisico = function(connection, callback){
		connection.query('select * from clientes',callback);
	}

	this.getClienteJuridico = function(connection, callback){
		connection.query('select * from clientejuridico',callback);
	}

	this.getCpfCliente =function(cpf, connection, callback){
		connection.query("select * from clientes where cpf like '"+cpf+"'", callback);
	}

	this.getCnpjCliente =function(cnpj, connection, callback){
		connection.query("select * from clienteJuridico where cnpj like '"+cnpj+"'", callback);
	}

	this.getClienteID = function(ID, connection,callback){
		connection.query("select * from clientes where id = '"+ID+"'",callback);
	}

	this.getClienteJ_ID = function(ID, connection,callback){
		connection.query("select * from clientejuridico where id = '"+ID+"'",callback);
	}

	/*Cadastro*/
	this.cadastrarClienteFisico = function(cliente, connection, callback){
		connection.query('insert into clientes set ?', cliente, callback);
	}

	this.cadastrarClienteJuridico = function(cliente, connection, callback){
		connection.query('insert into clientejuridico set ?', cliente, callback);
	}

	/*Edição*/
	this.edit = function(cliente, connection, callback){
		connection.query("update clientes set telefone = '"+cliente.telefone+"' where id = '"+cliente.id+"'");
		connection.query("update clientes set telefone2 ='"+cliente.telefone2+"' where id = '"+cliente.id+"'");
		connection.query("update clientes set telefone3 ='"+cliente.telefone3+"' where id = '"+cliente.id+"'");
		connection.query("update clientes set  endereco = '"+cliente.endereco+"' where id = '"+cliente.id+"'",callback);
	}

	this.editJ = function(cliente, connection, callback){
		connection.query("update clientejuridico set telefone = '"+cliente.telefone+"' where id = '"+cliente.id+"'");
		connection.query("update clientejuridico set telefone2 ='"+cliente.telefone2+"' where id = '"+cliente.id+"'");
		connection.query("update clientejuridico set telefone3 ='"+cliente.telefone3+"' where id = '"+cliente.id+"'");
		connection.query("update clientejuridico set  endereco = '"+cliente.endereco+"' where id = '"+cliente.id+"'",callback);
	}

	
	return this;
}