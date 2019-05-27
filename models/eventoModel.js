module.exports = function(){

    this.getEvento = function(connection, callback){
        connection.query('select * from eventos ORDER BY dataEvento',callback);
    }

    this.cadastrarEvento = function(evento, connection, callback){
        connection.query('insert into eventos set ?', evento, callback);
    }
    this.edit = function(evento, connection, callback){
		connection.query("update eventos set dataEvento = '"+evento.dataEvento+"' where ID = '"+evento.ID+"'");
		connection.query("update eventos set horaEvento ='"+evento.horaEvento+"' where ID = '"+evento.ID+"'");
		connection.query("update eventos set descEvento = '"+evento.descEvento+"' where ID = '"+evento.ID+"'",callback);
    }  
     this.getEventoID = function(ID, connection, callback){
        connection.query('select * from eventos where ID = "'+ID+'"',callback);
    }
    
    return this;
    
}