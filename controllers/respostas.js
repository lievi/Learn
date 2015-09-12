var moment = require('moment');
module.exports = function(app){
	
	var Resposta = app.models.resposta;
	var RespostaController = {
		//Método Post
		insert:function(req,res){
		//Necessário realizar tratamento de erros ao colocar o formulário
		var model = new Resposta(req.body);
		model.save(function(err,data){
				if(err){
					console.log('Erro ao salvar '+err);
				}else{
					res.redirect(req.get('referer'));
				}
			});
		}
		
	}
	return RespostaController;
}