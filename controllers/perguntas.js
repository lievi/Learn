module.exports = function(app){
	
	var Pergunta = app.models.pergunta;
	
	var PerguntaController = {
		//Método Post
		insert:function(req,res){
		//Necessário realizar tratamento de erros ao colocar o formulário
		var model = new Pergunta({
			pergunta: "Como cria um método?",
			linguagem: "PHP"
		});
		model.save(function(err,data){
				if(err){
					console.log('Erro ao salvar '+err);
				}else{
					res.json(data);
				}
			});
		}
	}
	return PerguntaController;
}