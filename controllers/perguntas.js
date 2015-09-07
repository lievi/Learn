module.exports = function(app){
	
	var Pergunta = app.models.pergunta;
	
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
		}
	}
	return PerguntaController;
}