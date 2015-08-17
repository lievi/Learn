module.exports = function(app){
	var SobreController = {
		index: function(req,res){
			res.render('sobre/index');
		}
	}
	return SobreController;
}