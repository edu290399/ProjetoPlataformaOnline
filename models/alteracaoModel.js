module.exports = function(){
	
    this.getAlteracao = function(connection, callback){
        connection.query('select * from alteracoes ORDER BY id',callback);
    }

    /*this.cadastrarAlteracao = function(alteracao, connection, callback){
        connection.query('insert into alteracoes set ?', alteracao, callback);

    }*/

    this.getAlteracaoPlaca = function(placa, connection, callback){
        connection.query("select * from alteracoes where placa = '"+placa+"' ORDER BY data DESC",callback);
    }
    
    this.alteracao = function(dados, connection, callback){
        connection.query('insert into alteracoes set ?', dados, callback);
    }
    
    this.placaAlteracao = function(placa, connection, callback){
        connection.query('select * from alteracoes where placa like "'+placa+'"', callback);
    }
    return this;
}