module.exports.cadastroProduto = function(app, req, res){
    if(req.session.cargo){
        if(req.session.cargo.fornecedor_produto == 1){
            res.render('cadastroProduto',{validacao: [], cadastroProduto: []});
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }

}

module.exports.submitProduto = function(app, req, res){
    var produto = req.body;

    //Enviando para o BD
    var connection  = app.config.connection();
    var produtoModel = app.app.models.produtoModel;
    produtoModel.getProdutoCB(produto.cdbarra, produtoModel, connection, function(error, result){
        if(result.length==0)//Procura pelo cod de barra no BD
        {//Caso não obtenha resultados deve-se cadastrar um novo produto
                //Só pede por dados se não achar o cod de barras no BD
                req.assert('nome','Inserir Nome').notEmpty();
                req.assert('marca','Inserir Marca').notEmpty();
                req.assert('fornecedor','Inserir Fornecedor').notEmpty();
                req.assert('garantia','Inserir Garantia').notEmpty();
                req.assert('cdbarra','Inserir Codigo de Barras').notEmpty();
                req.assert('valor','Inserir Valor').notEmpty();
                req.assert('quantidade','Inserir Quantidade de Volumes').notEmpty();
                 
                var erros = req.validationErrors();
                    if(erros){
                        res.render('cadastroProduto',{validacao: erros, cadastroProduto: produto});
                        return;
                    }
            produtoModel.cadastrarProduto(produto, connection);
            res.redirect('buscaProduto');
        }

        else{//Caso obtenha resultados apenas adiciona a quantidade no BD
            if(produto.quantidade == ''){
                req.assert('quantidade','Inserir Quantidade de Volumes').notEmpty();
                var erros = req.validationErrors();
                res.render('cadastroProduto',{validacao: erros, cadastroProduto: produto});
                return;
            }
            produtoModel.setQuant('soma', produto.quantidade, result[0].cod, result[0].quantidade, connection);
            res.redirect('buscaProduto');
        }
    })
}
module.exports.buscaP = function(app, req, res){
    if(req.session.cargo){
        if(req.session.cargo.fornecedor_produto == 1){
            var connection  = app.config.connection();
            var produtoModel = app.app.models.produtoModel;
            produtoModel.getProduto(connection,function(error, result){
                res.render('buscaProduto',{produto: result});
            });
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

module.exports.editP = function(app, req, res){
    var produto = req.body.cod;
    var connection = app.config.connection();
    var produtoModel = app.app.models.produtoModel;
    produtoModel.getProdutoCod(produto ,connection, function(error, result){
        res.render('editProduto',{ validacao:[], cadastroProduto:result[0]});
    })
}

module.exports.editProduto = function(app, req, res){
    var produto = req.body;
    var connection = app.config.connection();
    var produtoModel = app.app.models.produtoModel;
    produtoModel.edit(produto, connection,function(error, result){
        res.redirect('buscaProduto');
    });
}

