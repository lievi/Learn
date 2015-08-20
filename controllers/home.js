	var moment = require('moment');
	module.exports = function(app){
		
		var Usuario = app.models.usuarios;

		var HomeController = {
			index:function(req,res){
				Usuario.find(function(err,data){
					if(err){
						console.log(err);
					}
					res.render('home/index',{lista:data, moment:moment});
				});				
			},
		}
		return HomeController;
	}
	
	