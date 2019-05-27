module.exports = function(){

    this.getAgendamento = function(connection, callback){
        connection.query('select * from agendamentos ORDER BY dataAgen',callback);
    }

    this.cadastrarAgendamento = function(agendamento, connection, callback){
        connection.query('insert into agendamentos set ?', agendamento, callback);
    }

    this.edit = function(agendamento, connection, callback){
		connection.query("update agendamentos set dataAgen = '"+agendamento.dataAgen+"' where ID = '"+agendamento.ID+"'");
        connection.query("update agendamentos set horaAgen ='"+agendamento.horaAgen+"' where ID = '"+agendamento.ID+"'");
        connection.query("update agendamentos set descAgen ='"+agendamento.descAgen+"' where ID = '"+agendamento.ID+"'");
		connection.query("update agendamentos set  respAgen= '"+agendamento.respAgen+"' where ID = '"+agendamento.ID+"'",callback);
    }
   
     this.getAgendamentoID = function(ID, connection, callback){
        connection.query('select * from agendamentos where ID = "'+ID+'"',callback);
    }
    return this;
  
}