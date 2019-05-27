module.exports = function(){

    this.cadastroCargo = function(cargo, connection, callback){
        connection.query('insert into cargos set ?', cargo, callback);
    }

    this.getCargo = function(connection, callback){
        connection.query('select * from cargos',callback);
    }

    this.getCargoInter = function(cargo, connection, callback){
        connection.query('select * from cargos where nome like "'+cargo+'"', callback);
    }   
    
    this.getCargoId = function(id, connection, callback){
        connection.query('select * from cargos where id = "'+id+'"',callback);
    }

    this.updateCargo = function(cargo, id, connection, callback){
        connection.query('update cargos set ? where id ="'+id+'"', cargo, callback);
    }
    return this;
}