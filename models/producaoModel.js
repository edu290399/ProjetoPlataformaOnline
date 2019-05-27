module.exports = function(){
    this.buscaFuncionario = function(id, connection, callback){
        connection.query('select cargo, salario, nome from funcionarios where id_funcinario = "'+id+'"', callback);
    }

    this.comissao = function(cargo, connection, callback){
        connection.query('select comissao from cargos where nome like "'+cargo+'"', callback);
    }
    this.comissaoFor = function(funcionario, connection, callback){
        connection.query('select nome, comissao from cargos', callback);
    }

    this.salario = function(funcionario, connection, callback){
        var data = new Date();
        var dia = data.getDate();
		var mes = data.getMonth()+1;
        var ano = data.getFullYear();

        data_inicio = funcionario.periodo_inicio+" 00:00:00";
        data_final = funcionario.periodo_final+" 23:59:59";  

        connection.query('select id, preco from ordemservico where responsavel = "'+funcionario.funcionario+'" AND (datacriacao between "'+data_inicio+'" and "'+data_final+'")', callback);
    }

    this.salario_login = function(periodo, connection, callback){

        data_inicio = periodo.periodo_inicio+" 00:00:00";
        data_final = periodo.periodo_final+" 23:59:59";
        connection.query('select preco, responsavel from ordemservico where datacriacao between "'+data_inicio+'" and "'+data_final+'"', callback);
    }
    return this;
}