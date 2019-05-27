module.exports.home = function(app,req,res){
	if(req.session.cargo)res.render('home', {cargo: req.session.funcionario, acesso: req.session.cargo});
	else res.redirect('/');
}
module.exports.redirect = function(app, req, res){
	var pagina = req.body;
	if((pagina.OS)||(pagina.AOS))res.redirect('ordemServico');
	else if(pagina.AClF)res.redirect('cadastroClienteFisico');
	else if(pagina.ACJ)res.redirect('cadastroClienteJuridico');
	else if((pagina.CF)||(pagina.ACF))res.redirect('cadastroFuncionario');
	else if((pagina.CP)||(pagina.ACP))res.redirect('cadastroProduto');
	else if((pagina.ACForn)||(pagina.CForn))res.redirect('cadastroFornecedor');
	else if((pagina.CV)||(pagina.ACV))res.redirect('cadastroVeiculo');
	else if(pagina.ALT)res.redirect('cadastroAlteracao');
	else if(pagina.CAR)res.redirect('cadastroCargo');
	else if(pagina.LC)res.redirect('lucro');
	else if(pagina.COM)res.redirect('producao_funcionario');
	else if((pagina.VD)||(pagina.AVD))res.redirect('venda');
	else if(pagina.ORC)res.redirect('Orcamento');
	else if(pagina.BOS)res.redirect('buscaOS');
	else if(pagina.BIP)res.redirect('buscaOSPlaca');
	else if(pagina.BCF)res.redirect('buscaFuncionario');
	else if(pagina.BIF)res.redirect('buscaFuncionarioCpf');
	else if(pagina.BALT)res.redirect('buscaAlteracao');
	else if(pagina.BClF)res.redirect('buscaClienteFisico');
	else if(pagina.BCJ)res.redirect('buscaClienteJuridico');
	else if(pagina.BICF)res.redirect('buscaClienteCpf');
	else if(pagina.BIJ)res.redirect('buscaClienteCnpj');
	else if(pagina.BCP)res.redirect('buscaProduto');
	else if(pagina.BCAR)res.redirect('buscaCargo');
	else if(pagina.BCForn)res.redirect('buscaFornecedor');
	else if(pagina.BIForn)res.redirect('buscaFornecedorCnpj');
	else if(pagina.BCV)res.redirect('buscaVeiculo');
	else if(pagina.BIV)res.redirect('buscaVeiculoPlaca');
	else if(pagina.Lembretes)res.redirect('lembretes')
	else if(pagina.sair)req.session.destroy(function(){res.redirect('/')})
}