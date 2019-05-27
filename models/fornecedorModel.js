module.exports = function(){
	this.getFornecedor = function(connection, callback){
		connection.query('select * from fornecedores',callback);
	}

	this.cadastrarFornecedor = function(fornecedor, connection, callback){
		
		connection.query('insert into fornecedores set ?', fornecedor, callback);
	}


	this.getFornecedorID = function(ID, connection, callback){
			connection.query("select * from fornecedores where ID = '"+ID+"'",callback);
		}
	//this.busca = function(connection, callback){fornecedor', callback);
	//}

	this.editForn = function(fornecedor, connection,callback)
		{
			connection.query("update fornecedores set cnpj = '"+fornecedor.cnpj+"' where ID = '"+fornecedor.ID+"'");
			connection.query("update fornecedores set telefone = '"+fornecedor.telefone+"' where ID = '"+fornecedor.ID+"'");
			connection.query("update fornecedores set dadosBancarios ='"+fornecedor.dadosBancarios+"' where ID = '"+fornecedor.ID+"'");
			connection.query("update fornecedores set email ='"+fornecedor.email+"' where ID = '"+fornecedor.ID+"'");
			connection.query("update fornecedores set  endereco = '"+fornecedor.endereco+"' where ID = '"+fornecedor.ID+"'",callback);
		}

	return this;
}