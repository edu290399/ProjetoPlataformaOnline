module.exports = function(){
	this.getProduto = function(connection, callback){
		connection.query('select * from produtos ORDER BY cod',callback);
	}

	this.cadastrarProduto = function(produto, connection, callback){
		connection.query('insert into produtos set ?', produto, callback);
	}
	this.getProdutoCB = function(CB, produtoModel,  connection, callback){
		connection.query("select * from produtos where cdbarra like '"+CB+"'",callback);
	}
	this.getProdutoCod = function(cod, connection, 	callback){
		if(Array.isArray(cod)){
			connection.query("select * from produtos where cod IN ("+cod+")", callback);
		}
		else connection.query("select * from produtos where cod = '"+cod+"'", callback);
	}

	this.getProdutoCodFor = function(cod, I, venda, app, res, connection){
		/*Chama a função para alterar a quantidade de produtos para cada produto*/
		connection.query("select * from produtos where cod = '"+cod+"'", function(error,result){
			app.app.models.produtoModel.setQuant('sub', venda.quantidade[I], result[0].cod, result[0].quantidade, connection, res, function(error, result){
				if(I == (cod.length)-1){
					res.redirect('buscaProduto');
					return;
				}
			})
		})
	}

	this.getProdutoOS = function(cod, I, venda, app, connection){//Altera quantidade de produtos a partir de vetor
		connection.query("select * from produtos where cod = '"+cod+"'", function(error,result){
			app.app.models.produtoModel.setQuant('sub', venda.quantidade[I], result[0].cod, result[0].quantidade, connection);
		})
	}

	this.getProdutoOSunic = function(cod, venda, app, connection){//Altera quantidade de produtos a partir de vetor
		connection.query("select * from produtos where cod = '"+cod+"'", function(error,result){
			app.app.models.produtoModel.setQuant('sub', venda.quantidade, result[0].cod, result[0].quantidade, connection);
		})
	}


	this.produtoOS = function(dados, connection, app, req, res){
		/*Verificar produtos da OS*/
		cod = dados.produto;
		quantidade = dados.quantidade;
		desconto = dados.desconto;
		connection.query("select * from produtos", function(error,result){
			var ok=0;
			var total  = parseFloat(dados.total);
			if(Array.isArray(cod)){
				for(var I in cod){
					for(var J in result){
						if(result[J].cod==cod[I] && result[J].quantidade >= quantidade[I]){
							ok++;
							//total += parseInt(result[J].valor)*parseInt(dados.quantidade[I]);
							break;
						}
					}
				}
				if(ok == cod.length){
					app.app.models.produtoModel.getProdutosCodForOS(dados, connection, total, quantidade, desconto, app, res);
				}
				else{
					app.app.controllers.ordemServico.ordemServico(app, req, res);
				}
			}
			else{
				for(var I in result){
					if(result[I].cod == cod && result[I].quantidade >= quantidade){
						ok++;
						break;
					}
				}
				if(ok>0){
					app.app.models.produtoModel.getProdutoCodForOS(dados, connection, total, quantidade, desconto, app, res);
				}
				else{
					app.app.controllers.ordemServico.ordemServico(app, req, res);
				}
			}
			
		})
	}

	this.getProdutoCodForOS = function(OS, connection, total, quantidade, desconto, app, res){
		/*Gerar OS, Vincular produtos à OS*/
		var OSModel = app.app.models.OSModel;

		var tableOS =  {
			cliente: OS.cliente,
			placa: OS.placa,
			problema: OS.problema,
			servico: OS.servico,
			preco: OS.preco,
			total: total,
			responsavel: OS.responsavel 
		}
		OSModel.cadastrarOS(tableOS, connection);
		app.app.models.produtoModel.getProdutoOSunic(OS.produto, OS, app, connection);
			OSModel.getOS(connection, cod, function(error, result){
				OSModel.produtoOS(result[result.length-1].id,connection, cod, quantidade, desconto, res);
				OSModel.emitirOS(result[result.length-1].id, app ,res, connection);
		});
	}

	this.getProdutosCodForOS = function(OS, connection, total, quantidade, desconto, app, res){
		/*Gerar OS, Vincular produtos à OS*/
		var OSModel = app.app.models.OSModel;

		var tableOS =  {
			cliente: OS.cliente,
			placa: OS.placa,
			problema: OS.problema,
			servico: OS.servico,
			preco: OS.preco,
			total: total,
			responsavel: OS.responsavel 
		}
		OSModel.cadastrarOS(tableOS, connection);
		for(var K in OS.produto)app.app.models.produtoModel.getProdutoOS(OS.produto[K], K, OS, app, connection);
			OSModel.getOS(connection, cod, function(error, result){
				OSModel.produtoOS(result[result.length-1].id,connection, cod, quantidade, desconto, res);
				OSModel.emitirOS(result[result.length-1].id, app ,res, connection);
		});
	}

	this.edit = function(produto, connection, callback){
		connection.query("update produtos set descricao = '"+produto.descricao+"' where cod = '"+produto.cod+"'");
		connection.query("update produtos set fornecedor= '"+produto.fornecedor+"' where cod = '"+produto.cod+"'");
		connection.query("update produtos set valor = '"+produto.valor+"' where cod = '"+produto.cod+"'",callback);
	}

	this.setQuant  =function(op, quant, cod, r, connection, res, callback){
		/*O paramentro op é a operação de mudança, deve ser soma para aumentar a quantidade
		e sub para subtrair*/

		var q = 0;
		if(op == 'soma') q = parseInt(r)+parseInt(quant);
		else if(op == 'sub')
			{
				
				q = parseInt(r)-parseInt(quant);

			}
		connection.query("UPDATE produtos SET quantidade = '"+q+"' where cod ='"+cod+"'",callback);
		
	}

	this.verificar = function(dados, erros, I, result, connection){
		//if(erros)return true;
		if(result.length == 0||result[0].quantidade<dados.quantidade[I]){
			if(result.length == 0){
				erros[0] = {
				location: 'body',
				param: 'produto',
				msg: 'Produto não encotrado',
				value: '' 
			}

			}
			else{
				erros[0] = {
					location: 'body',
					param: 'quantidade',
					msg: 'Quantidade não disponível',
					value: '' 
				}
			}
			return erros;
		}
		return [];
	}

	

	this.venda = function(venda, connection, app, res, req){
		/*Verifica se os códigos dos produtos estão no Bando de Dados*/
		cod = venda.produto;
		desc = venda.desconto;
		var controle = false;

		for(var I in venda.produto)if(venda.produto[I] == '')controle = true;
		for(var I in venda.desconto)if(venda.desconto[I] == '')controle = true;

		if(controle)res.redirect('venda');
		else{
			connection.query("select * from produtos", function(error,result){
				var ok=0;
				for(var I in cod){
					for(var J in result){
						if(result[J].cod==cod[I]){
							ok++;
							break;
						}
					}
				}
				if(ok == cod.length){
					for(var K in venda.produto)
					{
						var posVenda = {produto: venda.produto[K], quantidade: venda.quantidade[K], desconto: venda.desconto[K]};
						app.app.models.vendaModel.venda(posVenda, connection, function(error, result){
							return;
						});
						app.app.models.produtoModel.getProdutoCodFor(venda.produto[K], K, venda, app, res, connection);
					}
				}
				else{
					res.redirect('venda');
				}
			})
			
		}
	}
	return this;
}