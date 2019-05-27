module.exports = function(){
	this.getConta = function(connection, callback){
		var d1 = this.dataPrevista(0);
		var d2 = this.dataPrevista(7);
		connection.query('select * from contas where dataConta>="'+d1+ '"and dataConta<="'+d2+'"',callback);
	}

	this.getEvento = function(connection, callback){
		var d1 = this.dataPrevista(0);
		var d2 = this.dataPrevista(7);
		connection.query('select * from eventos where dataEvento>="'+d1+ '"and dataEvento<="'+d2+'"',callback);
	}

	this.getAgendamento = function(connection, callback){
		var d1 = this.dataPrevista(0);
		var d2 = this.dataPrevista(7);
		//connection.query('select dataAgen from agendamentos',callback);
		connection.query('select * from agendamentos where dataAgen>="'+d1+'"and dataAgen<= "'+d2+'"',callback);
		 
	}
   
	this.dataPrevista = function(dias){
		var dataAtual = new Date();
		var outraData = dataAtual;
		outraData.setDate(dataAtual.getDate() + dias);
		// formata a data no formato sql
		var diaModificado = outraData.getDate();
		var mesModificado = outraData.getMonth()+1;
		var anoModificado = outraData.getFullYear();
		var dataModificada = anoModificado+"-"+mesModificado+"-"+diaModificado;
        return dataModificada; 
    }
return this;
}	
