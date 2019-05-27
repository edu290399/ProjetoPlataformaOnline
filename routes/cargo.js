module.exports = function(app){

    app.get('/cadastroCargo', function(req, res){
        app.app.controllers.cargo.cadastroCargo(app, req, res);
    })

    app.post('/submitCargo', function(req, res){
        app.app.controllers.cargo.submitCargo(app, req, res);
    })

    app.get('/buscaCargo', function(req, res){
        app.app.controllers.cargo.buscaCargo(app, req, res);
    })

    app.post('/editCargo', function(req, res){
        app.app.controllers.cargo.editCargo(app, req, res);
    })

    app.post('/updateCargo', function(req, res){
        app.app.controllers.cargo.updateCargo(app, req, res);
    })
}