	var moment = require('moment');
	module.exports = function(app){
		
		var Pergunta = app.models.pergunta;
		var Linguagem = app.models.linguagem;
		var HomeController = {
			index:function(req,res){				
				Pergunta.find({linguagem:req.params.ling},function(err,perguntas){
					if(err)
					{
						console.log(err);
					}
					
					else
					{
						//Criando outra função dentro da primeira função que está chamando o banco de linguagens
						Linguagem.find(function(err,linguagens) 
						{
							res.render('home/index',{perguntas:perguntas, moment:moment, linguagens:linguagens});												
						});
					}
				}).sort({_id:-1});
			},
		}
		return HomeController;
	}
	
	