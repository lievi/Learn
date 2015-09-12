module.exports = function(app){
	var perguntas = app.controllers.perguntas;
	var resposta = app.controllers.respostas;

	app.post('/Add',perguntas.insert);
	app.get('/pergunta/:id', perguntas.show);
	app.post('/resposta/add', resposta.insert);
}