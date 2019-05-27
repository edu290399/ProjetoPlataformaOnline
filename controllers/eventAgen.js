module.exports.cadastroAgendamento = function(app,req,res){
    if(req.session.cargo){
        if(req.session.cargo.agendamento == 1){
            res.render('eventAgen',{validacao: [], eventAgen: []});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.submitAgendamento = function(app, req, res){
    var agendamento = req.body;
    
    
    //Enviando para o BD
    var connection  = app.config.connection();
    var agendamentoModel = app.app.models.agendamentoModel;
                    
    req.assert('dataAgen','Data incompleta ou incorreta').notEmpty();
    req.assert('respAgen','Inserir Responsável').notEmpty();
    req.assert('descAgen','Inserir Descrição').notEmpty();
    
    var erros = req.validationErrors();
    if(erros){
        res.render('eventAgen',{validacao: erros, eventAgen: agendamento});
        return;
    }
    agendamentoModel.cadastrarAgendamento(agendamento, connection,function(error,result){
    res.redirect('buscaEventAgen');
    });
}

module.exports.edit = function(app, req, res){
    var formatDate = this.formatDate;
    var agendamento = req.body.ID;
    var connection = app.config.connection();
    var agendamentoModel = app.app.models.agendamentoModel;
    agendamentoModel.getAgendamentoID(agendamento ,connection, function(error, result){
        var agend = result[0];
        agend.dataAgen = formatDate(agend.dataAgen);
        res.render('editAgendamento',{ validacao:[], eventAgen:agend});
    })
}

module.exports.editAgendamento = function(app, req, res){
    var agendamento= req.body;
    var connection = app.config.connection();
    var agendamentoModel = app.app.models.agendamentoModel;
    agendamentoModel.edit(agendamento, connection, function(error, result){
        res.redirect('buscaEventAgen');
    });

}
	
    
module.exports.buscaAgendamento = function(app, req, res){
    if(req.session.cargo){
        if(req.session.cargo.agendamento == 1){
            var connection  = app.config.connection();
            var agendamentoModel = app.app.models.agendamentoModel;
            agendamentoModel.getAgendamento(connection,function(error, result){res.render('buscaEventAgen',{agendamento: result});});
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
