
module.exports.cadastroCargo = function(app, req, res){
    if(req.session.cargo){
        if(req.session.funcionario == 'PROPRIETARIO'){
            res.render('cargo', {validacao: []});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }  
}

module.exports.submitCargo = function(app, req, res){
    var cargo = req.body;

    req.assert('nome','Informe o nome').notEmpty();

    var erros = req.validationErrors();

    if(erros){res.render('cargo', {validacao: erros}); return}

    cargo.nome = cargo.nome.toUpperCase();

    var connection = app.config.connection();
    var cargoModel = app.app.models.cargoModel;

    if(cargo.OS)cargo.OS = true;
    else cargo.OS = false;

    if(cargo.venda)cargo.venda = true;
    else cargo.venda = false;

    if(cargo.veiculo_cliente)cargo.veiculo_cliente = true;
    else cargo.veiculo_cliente = false;

    if(cargo.fornecedor_produto)cargo.fornecedor_produto = true;
    else cargo.fornecedor_produto = false;

    if(cargo.funcionario)cargo.funcionario = true;
    else cargo.funcionario = false;

    if(cargo.conta)cargo.conta = true;
    else cargo.conta = false;

    if(cargo.agendamento)cargo.agendamento = true;
    else cargo.agendamento = false;

    if(cargo.evento)cargo.evento = true;
    else cargo.evento = false;

    if(cargo.lucro)cargo.lucro = true;
    else cargo.lucro = false;

    if(cargo.producao_funcionario) cargo.producao_funcionario = true;
    else cargo.producao_funcionario = false;

    cargoModel.cadastroCargo(cargo, connection, function(error, result){
        res.redirect('buscaCargo');
    });
}

module.exports.buscaCargo = function(app, req, res){
    if(req.session.cargo){
        if(req.session.funcionario == 'PROPRIETARIO'){
            var connection = app.config.connection();
            var cargoModel = app.app.models.cargoModel;

            cargoModel.getCargo(connection, function(error, result){
                res.render('buscaCargo', {cargo: result});
            })
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }  
}

module.exports.editCargo = function(app, req, res){
    var cargo = req.body;
    var cargoModel = app.app.models.cargoModel;
    var connection = app.config.connection();

    cargoModel.getCargoId(cargo.id, connection, function(error, result){
        res.render('editCargo', {cargo:result[0], validacao:[]})
    })
}
module.exports.updateCargo = function(app, req, res){
    var cargo = req.body;
    var cargoModel = app.app.models.cargoModel;
    var connection = app.config.connection();

    req.assert('nome','Informe o nome').notEmpty();

    var erros = req.validationErrors();

    if(erros){res.render('cargo', {validacao: erros}); return}

    cargo.nome = cargo.nome.toUpperCase();

    if(cargo.OS)cargo.OS = true;
    else cargo.OS = false;

    if(cargo.venda)cargo.venda = true;
    else cargo.venda = false;

    if(cargo.veiculo_cliente)cargo.veiculo_cliente = true;
    else cargo.veiculo_cliente = false;

    if(cargo.fornecedor_produto)cargo.fornecedor_produto = true;
    else cargo.fornecedor_produto = false;

    if(cargo.funcionario)cargo.funcionario = true;
    else cargo.funcionario = false;

    if(cargo.conta)cargo.conta = true;
    else cargo.conta = false;

    if(cargo.agendamento)cargo.agendamento = true;
    else cargo.agendamento = false;

    if(cargo.evento)cargo.evento = true;
    else cargo.evento = false;

    if(cargo.lucro)cargo.lucro = true;
    else cargo.lucro = false;

    if(cargo.producao_funcionario)cargo.producao_funcionario = true;
    else cargo.producao_funcionario = false

    var id = cargo.id;
    delete cargo.id;
    cargoModel.updateCargo(cargo, id, connection, function(error, result){
        res.redirect('buscaCargo');
    })

}