module.exports = function(app){
	var home = app.controllers.home;
	var perguntas = app.controllers.perguntas;

	app.get('/',home.index);
	app.get('/testeAdd',perguntas.insert);
}