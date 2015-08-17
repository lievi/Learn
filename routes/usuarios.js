ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
module.exports = function(app){

	var usuarios = app.controllers.usuarios;

	app.get('/usuarios', usuarios.index);
	app.get('/usuarios/create',usuarios.create);
	app.post('/usuarios',usuarios.insert);
	app.get('/usuarios/lista', usuarios.lista);
	app.get('/usuarios/edit/:id', usuarios.edit);
	app.post('/usuarios/edit/:id', usuarios.update);
	app.get('/usuarios/show/:id', usuarios.show);
	app.post('/usuarios/delete/:id',usuarios.remove);
	app.get('/usuarios/teste',
  		ensureLoggedIn('/usuarios/login'),function(req, res) {
    		res.send('<html><body>Ola '+ req.user.username+'.<br/><a href="/logout">Logout</a></body></html> ');
  });
	app.get('/usuarios/login',function(req, res) {
    res.send('<html><body><a href="/auth/twitter">Login com Twitter</a></body></html>');
  });
}