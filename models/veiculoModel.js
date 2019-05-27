module.exports = function(){
	
        this.getVeiculo = function(connection, callback){
            connection.query('select * from veiculos',callback);
        }
    
        this.cadastrarVeiculo = function(veiculo, connection, callback){
            connection.query('insert into veiculos set ?', veiculo, callback);
    
        }

        this.getVeiculoPlaca = function(placa, connection, callback){
			connection.query("select * from veiculos where placa = '"+placa+"'",callback);
        }
        
        this.edit = function(veiculo, connection,callback)
		{
			connection.query("update veiculos set cor= '"+veiculo.cor+"' where placa = '"+veiculo.placa+"'");
			connection.query("update veiculos set cliente = '"+veiculo.cliente+"' where placa = '"+veiculo.placa+"'");
			connection.query("update veiculos set obs ='"+veiculo.obs+"' where placa = '"+veiculo.placa+"'", callback);
			
        }
        return this;
    }