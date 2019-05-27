module.exports = function(app){
    app.get('/producao_funcionario', function(req, res){
        app.app.controllers.producao_func.producao_funcionario(app, req, res);
    })

    app.post('/busca_producao', function(req, res){
        app.app.controllers.producao_func.busca_producao(app, req, res);
    })

    app.get('/producaoLogin', function(req, res){
        app.app.controllers.producao_func.producao_funcionario_login(app, req, res);
    })

    app.post('/busca_producao_login', function(req, res){
        app.app.controllers.producao_func.busca_producao_login(app, req, res);
    })
    
}