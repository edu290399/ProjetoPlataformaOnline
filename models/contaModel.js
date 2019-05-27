module.exports = function(){

    this.getConta = function(connection, callback){
        connection.query('select * from contas ORDER BY dataConta',callback);
    }

    this.cadastrarConta = function(conta, connection, callback){
        connection.query('insert into contas set ?', conta, callback);
    }
    this.getContaID = function(ID, connection, callback){
        connection.query('select * from contas where ID = "'+ID+'"',callback);
    }
    this.edit = function(conta, connection, callback){
		connection.query("update contas set dataConta = '"+conta.dataConta+"' where id = '"+conta.ID+"'");
		connection.query("update contas set valorConta ='"+conta.valorConta+"' where id = '"+conta.ID+"'");
		connection.query("update contas set  descConta = '"+conta.descConta+"' where id = '"+conta.ID+"'",callback);
	}
    return this;
  
}