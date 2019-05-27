module.exports.cadastroEvento = function(app,req,res){
    if(req.session.cargo){
        if(req.session.cargo.evento == 1){
            res.render('eventEvento',{validacao: [], eventEvento: []});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.submitEvento = function(app, req, res){
    var evento = req.body;
    
    
        
    //Enviando para o BD
    var connection  = app.config.connection();
    var eventoModel = app.app.models.eventoModel;
        
    req.assert('dataEvento','Data incompleta ou incorreta').notEmpty();
    req.assert('horaEvento','Inserir Hora').notEmpty();
    req.assert('descEvento','Inserir Descrição').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.render('eventEvento',{validacao: erros, eventEvento: evento});
        return;
    }
    eventoModel.cadastrarEvento(evento, connection,function(error,result){
    res.redirect('buscaEventEvento');
    });
}
module.exports.edit = function(app, req, res){
    var formatDate = this.formatDate;
    var evento= req.body.ID;
    var connection = app.config.connection();
    var eventoModel = app.app.models.eventoModel;
    eventoModel.getEventoID(evento,connection, function(error, result){
        var data  = result[0];
        data.dataEvento = formatDate(data.dataEvento);
        res.render('editEvento',{ validacao:[],eventEvento:data});
    })
}

module.exports.editEvento = function(app, req, res){
    var evento= req.body;
    var connection = app.config.connection();
    var eventoModel = app.app.models.eventoModel;
    eventoModel.edit(evento, connection, function(error, result){
        res.redirect('buscaEventEvento');
    });

}

    
module.exports.buscaEvento = function(app, req, res){
    if(req.session.cargo){
        if(req.session.cargo.evento == 1){
            var connection  = app.config.connection();
            var eventoModel = app.app.models.eventoModel;
            eventoModel.getEvento(connection,function(error, result){res.render('buscaEventEvento',{evento: result});});
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
