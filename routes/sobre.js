module.exports = function (app){
	var sobre = app.controllers.sobre;

	app.get('/sobre',sobre.index);
}