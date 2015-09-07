module.exports = function(){
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Realizando nova collection (Tabela) para perguntas;

var linguagem = new Schema({
	linguagem: String,
});
return mongoose.model('linguagem', linguagem);
}