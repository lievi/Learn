	module.exports = function(app){

		var HomeController = {
			index: function(req,res){
				res.render('home/index');
			},

			testeChat:function(req,res){
				res.render('home/testeChat');
			},

		}


		return HomeController;
	}