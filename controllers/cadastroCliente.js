/*Cadastro*/
module.exports.cadastroClienteCpf = function(app,req,res){
    if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
         res.render('cadastroClienteCpf',{validacao: [], cadastroCliente: []});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
   
}
module.exports.cadastroClienteCnpj = function(app,req,res){
    if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
            res.render('cadastroClienteCnpj',{validacao: [], cadastroCliente: []});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.submitClienteFisico = function(app,req,res){
    var cliente = req.body;
        req.assert('nome','Nome inválido').notEmpty();
        req.assert('cpf','CPF inválido').notEmpty().isLength({min: 14});
        req.assert('rg','RG inválido').notEmpty().isLength({min: 7});
        req.assert('datanascimento','Data de nascimento inválida').notEmpty().isLength({min: 10});
        req.assert('telefone','Telefone inválido').isLength({min: 14});
        //req.assert('telefone2','Telefone inválido').isLength({min: 14});
        req.assert('endereco','Endereço inválido').notEmpty();
        var erros = req.validationErrors();
        if(erros){
            res.render('cadastroClienteCpf',{validacao: erros, cadastroCliente: cliente});
            return;
        }

        var connection  = app.config.connection();
        var clienteModel = app.app.models.clienteModel;

        clienteModel.cadastrarClienteFisico(cliente, connection, function(error, result){
            res.redirect('buscaClienteFisico');
        });
}

module.exports.submitClienteJuridico = function(app,req,res){
    var cliente = req.body;
        req.assert('nome','Nome inválido').notEmpty();
        req.assert('cnpj','CNPJ inválido').notEmpty().isLength({min: 18});
        req.assert('telefone','Telefone inválido').isLength({min: 14});
        req.assert('telefone2','Telefone inválido').isLength({min: 14});
        req.assert('endereco','Endereço inválido').notEmpty();
        var erros = req.validationErrors();
        if(erros){
            res.render('cadastroClienteCnpj',{validacao: erros, cadastroCliente: cliente});
            return;
        }

        var connection  = app.config.connection();
        var clienteModel = app.app.models.clienteModel;

        clienteModel.cadastrarClienteJuridico(cliente, connection, function(error, result){
            res.redirect('buscaClienteJuridico');
        });
}

/*Busca*/
module.exports.buscaClienteFisico = function(app, req,res){
    if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
            var connection = app.config.connection();
            var clienteModel = app.app.models.clienteModel;
            clienteModel.getClienteFisico(connection,function(error, result){res.render('buscaCliente',{cliente: result});});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
        
}

module.exports.buscaClienteJuridico = function(app, req,res){
    if(req.session.cargo){
        if(req.session.cargo.veiculo_cliente == 1){
            var connection = app.config.connection();
            var clienteModel = app.app.models.clienteModel;
            clienteModel.getClienteJuridico(connection,function(error, result){res.render('buscaClienteJuridico',{cliente: result});});
        }
        else{
            res.redirect('/');
        }
    }
    else{
    res.redirect('/');
    }

}

/*Edição*/
module.exports.edit = function(app, req, res){
    var cliente = req.body.id;
    var connection = app.config.connection();
    var clienteModel = app.app.models.clienteModel;
    clienteModel.getClienteID(cliente ,connection, function(error, result){
        res.render('editCliente',{ validacao:[], cadastroCliente:result[0]});
    })
}

module.exports.editCliente = function(app, req, res){
    var cliente = req.body;
    var connection = app.config.connection();
    var clienteModel = app.app.models.clienteModel;
    clienteModel.edit(cliente, connection, function(error, result){
        res.redirect('buscaClienteFisico');
    });

}

module.exports.editJuridico = function(app, req, res){
    var cliente = req.body.id;
    var connection = app.config.connection();
    var clienteModel = app.app.models.clienteModel;
    clienteModel.getClienteJ_ID(cliente ,connection, function(error, result){
        res.render('editClienteJuridico',{ validacao:[], cadastroCliente:result[0]});
    })
}

module.exports.editClienteJuridico = function(app, req, res){
    var cliente = req.body;
    var connection = app.config.connection();
    var clienteModel = app.app.models.clienteModel;
    clienteModel.editJ(cliente, connection, function(error, result){
        res.redirect('buscaClienteJuridico');
    });

}
