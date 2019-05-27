
this.getCpfCliente =function(cpf, connection, callback){
    
   connection.query("select * from clientes where cpf='"+cpf+"'", callback);
}

this.getCnpjCliente =function(cnpj, connection, callback){
    
   connection.query("select * from clienteJuridico where cnpj='"+cnpj+"'", callback);
}

this.getPlacaOS =function(placa, connection, callback){
    
   connection.query("select * from ordemservico where placa='"+placa+"'", callback);
}

this.getPlacaVeiculo =function(placa, connection, callback){
    
   connection.query("select * from veiculos where placa='"+placa+"'", callback);
}

this.getCpfFuncionario =function(cpf, connection, callback){
    
   connection.query("select * from funcionarios where cpf='"+cpf+"'", callback);
}

this.getCnpjFornecedor =function(cnpj, connection, callback){
    
   connection.query("select * from fornecedores where cnpj='"+cnpj+"'", callback);
}

this.getPlacaAlteracao =function(placa, connection, callback){
    
   connection.query("select * from alteracoes where placa='"+placa+"'", callback);
}