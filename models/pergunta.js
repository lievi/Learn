module.exports = function(){
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Realizando nova collection (Tabela) para perguntas;

var pergunta = new Schema({
	pergunta: String,
	linguagem: String,
	//id_user,
	data_perg:{type:Date, default: Date.now}
});
return mongoose.model('pergunta', pergunta);
}