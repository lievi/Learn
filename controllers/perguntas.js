var moment = require('moment');
module.exports = function(app){
	
	var Pergunta = app.models.pergunta;
	var Resposta = app.models.resposta;
	
	var PerguntaController = {
		//Método Post
		insert:function(req,res){
		//Necessário realizar tratamento de erros ao colocar o formulário
		var model = new Pergunta(req.body);
		model.save(function(err,data){
				if(err){
					console.log('Erro ao salvar '+err);
				}else{
					res.redirect('/');
				}
			});
		},
		
		show:function(req,res){
			Pergunta.findById(req.params.id, function(err,data){
				if(err){
					console.log(err);
				}else{
					Resposta.find({idPerg: data._id},function(err,resposta) 
						{
							res.render('perguntas/pergunta',{pergunta:data,moment:moment,respostas:resposta});												
						}).sort({_id:-1});					
				}
			});
		}
	}
	return PerguntaController;
}