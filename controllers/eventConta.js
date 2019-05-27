module.exports.cadastroConta = function(app,req,res){
    if(req.session.cargo){
        if(req.session.cargo.conta == 1){
            res.render('eventConta',{validacao: [], eventConta: []});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.submitConta = function(app, req, res){
    var conta = req.body;
    

    //Enviando para o BD
    var connection  = app.config.connection();
    var contaModel = app.app.models.contaModel;
                    
    req.assert('dataConta','Data incompleta ou incorreta').notEmpty();
    req.assert('valorConta','Forma do valor incorreta ou incompleta').notEmpty();
    req.assert('descConta','Inserir Descrição').notEmpty();
    

    
    
    var erros = req.validationErrors();
    if(erros){
        res.render('eventConta',{validacao: erros, eventConta: conta});
        return;
    }
    contaModel.cadastrarConta(conta, connection,function(error,result){
    res.redirect('buscaEventConta');
    });
}

module.exports.edit = function(app, req, res){
    var formatDate = this.formatDate;
    var conta = req.body.ID;
    var connection = app.config.connection();
    var contaModel = app.app.models.contaModel;
    contaModel.getContaID(conta ,connection, function(error, result){
        var cont = result[0];
        cont.dataConta = formatDate(cont.dataConta);
        res.render('editConta',{ validacao:[],eventConta:cont});
    })
}

module.exports.editConta = function(app, req, res){
    var conta= req.body;
    var connection = app.config.connection();
    var contaModel = app.app.models.contaModel;
    contaModel.edit(conta, connection, function(error, result){
        res.redirect('buscaEventConta');
    });

}

module.exports.buscaConta = function(app, req, res){
    if(req.session.cargo){
        if(req.session.cargo.conta == 1){
            var connection  = app.config.connection();
            var contaModel = app.app.models.contaModel;
            contaModel.getConta(connection,function(error, result){res.render('buscaEventConta',{conta: result});});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.redirect = function(app, req, res){
    var pagina = req.body;
    if(pagina.HOME)res.redirect('home');
    }


    module.exports.formatDate = function(date){
    //Formata data: YYYY-MM-DD	
    var dia = date.getDate();
    var mes = date.getMonth()+1;
    var ano = date.getFullYear();
    
    if(dia<10)dia = '0'+dia;
    if(mes<10)mes = '0'+mes;

    var data = ano + '-' + mes + '-' + dia;
    return data;
}