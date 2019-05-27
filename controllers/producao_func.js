/*module.exports.producao_funcionario_login = function(app, req, res){
    if(req.session){
        if(req.session.id_funcionario){
            res.render('busca_producao_login');
        }
        else{
            res.redirect('/');
        }
    }
   else{
        res.redirect('/');
   }
}

module.exports.busca_producao_login = function(app, req, res){
    var funcionario = req.body;
    var producaoModel = app.app.models.producaoModel;
    var connection = app.config.connection();

    if(req.session.id_funcionario){
        producaoModel.buscaFuncionario(req.session.id_funcionario, connection, function(error, result){
            var funcionarioBD =result[0];
            producaoModel.comissao(result[0].cargo, connection, function(error, result){
                var comissao = result[0].comissao;
                producaoModel.salario_login(req.session.id_funcionario, funcionario, connection, function(error, result){
                    var total = 0;

                    for(var I in result){
                        total += parseFloat(result[I].preco);
                    }
                    total = (total*(comissao/100)).toFixed(2);
                    res.render('producao_funcionario', {funcionario: funcionarioBD, comissao: comissao, total: total, OS: result})
                })
            })
        })
    }
    else{
        res.redirect('/');
    }
    
}*/

module.exports.producao_funcionario = function(app, req, res){
    if(req.session.cargo){
         if(req.session.cargo.producao_funcionario == 1){
            res.render('busca_producao');
         }
         else{
            res.redirect('/');
         }
    }
    else{
        res.redirect('/');
    }
}

module.exports.busca_producao = function(app, req, res){
    var funcionario = req.body;
    var producaoModel = app.app.models.producaoModel;
    var connection = app.config.connection();

    if(req.session.cargo.producao_funcionario == 1){
        producaoModel.buscaFuncionario(funcionario.funcionario, connection, function(error, result){
            var funcionarioBD =result[0];
            producaoModel.comissao(result[0].cargo, connection, function(error, result){
                var comissao = result[0].comissao;
                producaoModel.salario(funcionario, connection, function(error, result){
                    var total = 0;

                    for(var I in result){
                        total += parseFloat(result[I].preco);
                    }
                    total = (total*(comissao/100)).toFixed(2);
                    res.render('producao_funcionario', {funcionario: funcionarioBD, comissao: comissao, total: total, OS: result})
                })
            })
        })
    }
    else{
        res.redirect('/');
    }

}