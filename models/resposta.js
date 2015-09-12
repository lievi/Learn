module.exports = function(){
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Realizando nova collection (Tabela) para perguntas;

var resposta = new Schema({
	resposta: String,
	idPerg: String,
	//id_user,
	data_resp:{type:Date, default: Date.now},
});
return mongoose.model('resposta', resposta);
}