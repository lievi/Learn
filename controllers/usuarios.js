var moment = require('moment');
module.exports = function(app){

	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index:function(req,res){
			Usuario.find(function(err, data){
				if(err){
					console.log(err);
				}
			res.render('usuarios/index',{lista:data, moment:moment});
		});
		},

		create:function(req,res){
			
			//Teste de criação de usuário via get no server-side
			/*var model = new Usuario({
				nome:'Lievi',
				login:'lievi.silva',
				senha:'123'
			});	

			model.save(function(err,data){
				if(err){
					console.log('Erro ao salvar '+erro);
				}else{
					res.json(data);
				}
			});*/
			res.render('usuarios/create')
		},

		insert:function(req,res){
			req.assert('nome', 'Nome obrigatório').notEmpty();
			req.assert('login', 'Login obrigatório').notEmpty();
			req.assert('senha', 'Senha obrigatório').notEmpty();
			var errors = req.validationErrors();				
				if(errors){
					res.render('usuarios/create',{
						errors: errors
					});
				}else{
					var model = new Usuario(req.body);
					model.save(function(err){
						if(err){
							console.log(err);
						}else{
						req.flash('info', 'Usuário cadastrado com sucesso!')
						res.redirect('/usuarios');
						}
					});
				}
		},

		lista:function(req,res){
			Usuario.find(function(err,user){
			if(err){
				console.log('Erro ao resgatar usuários ' + err);
			}
				res.json(user);
			});
		},

		edit:function(req,res){
			//Este params.id é a variável criada lá nas routes, que ela pega
			//provávelmente da ulr
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
					res.render('usuarios/edit', {valor:data});
				}
			});
		},

		update:function(req,res){
			var userEdit = Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
					data.update(req.body, function(err){
						if(err){
							console.log(err);
						}else{
							req.flash('info', 'Usuário atualizado com sucesso!')
							res.redirect('/usuarios');
						}
					});	
				}				
			});
		},

		show:function(req,res){
			Usuario.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				}else{
					res.render('usuarios/show', {valor:data});
				}
			});
		},

		remove:function(req,res){
			var userDel = Usuario.findById(req.params.id, function(err,data){
				if(err){
					console.log(err);
				}else{
					data.remove(err)
					{
						if(err){
							console.log(err);
						}else{
							req.flash('info', 'Usuário Deletado com sucesso!')
							res.redirect('/usuarios');
						}
					}
				}
			});
		}
	}
	return UsuarioController;
}