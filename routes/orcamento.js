module.exports = function(app){

    app.get('/orcamento', function(req, res){
        app.app.controllers.orcamento.orcamento(app, req, res);
    });

    app.post('/emissao', function(req, res){
        app.app.controllers.orcamento.geraOS(app, req, res);
    });
}