	var moment = require('moment');
	module.exports = function(app){
		
		var Pergunta = app.models.pergunta;
		var HomeController = {
			index:function(req,res){	
				Pergunta.find({linguagem:req.params.ling},function(err,data){
					if(err){
						console.log(err);
					}
					res.render('home/index',{lista:data, moment:moment});
				}).sort({_id:-1});
			},
		}
		return HomeController;
	}
	
	