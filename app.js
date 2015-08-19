/**
 * Module dependencies.
 */

var express  = require('express');
var load     = require('express-load');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');

//teste chat com socket.IO
var client = require('socket.io').listen(8080);
var mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://127.0.0.1/chat', function(err,db){
  if(err) throw err;
    client.on('connection',function(socket){

      //Criando variável para entrar na Collection(Tabela)
      var col = db.collection('messages'),

      sendStatus = function(s){
        socket.emit('status',s);
      };

      //Emit all messages
      col.find().limit(100).sort({_id: 1}).toArray(function(err,res){
        if(err) throw err;
        socket.emit('output', res);
      });
      
      //Esperando por um input
      socket.on('input', function(data){
        
        //pegando os dados inseridos e tranformando em var
        var name = data.name,
            message = data.message,
            whitespacePattern = /^\s*$/;
            //Verificando se a algum campo em branco
        if(whitespacePattern.test(name)|| whitespacePattern.test(message)){
          sendStatus('Nome e mensagem obrigatórios');
        }else{
            //Inserindo no banco
            col.insert({name: name, message:message}, function(){
            
            //Emit lastest messages to all clients
            client.emit('output',[data]);

            sendStatus({
              message:"Message sent",
              clear: true
            });
          });
        }       
      });
    });
});



//VERSAO 4
var favicon        = require('serve-favicon');
var logger         = require('morgan');
var methodOverride = require('method-override');
var session        = require('express-session');
var bodyParser     = require('body-parser');
var errorHandler   = require('errorhandler');

var app = express();




//Teste implementação de login com Twitter com Passport
 var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
 var passport = require('passport');
 var TwitterStrategy = require('passport-twitter').Strategy;

 	app.use(cookieParser());
	app.use(session({ secret: 'usadoparacalcularohash' }));
	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/usuarios/teste',
  		ensureLoggedIn('/usuarios/login'),function(req, res) {
    		res.send('<html><body>Ola '+ req.user.username+'.<br/><a href="/logout">Logout</a></body></html> ');
  });
	app.get('/usuarios/login',function(req, res) {
    res.send('<html><body><a href="/auth/twitter">Login com Twitter</a></body></html>');
  });

var TWITTER_CONSUMER_KEY = "QxY0kP1qbD4vVk1FmuCrbnLZd";
var TWITTER_CONSUMER_SECRET = "1nnvaQ5kZJeB3SF68cDZma20EELuplt51Wc8nP17WGrAuKnuDB";
 
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // NOTA: Voce tera, provavelmente, que associar o usuario do Twitter
    //       com um registro do usuario no banco de dados da aplicacao.
    var user = profile;
    return done(null, user);
  }
));

//Testando branch login
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter',{ successReturnToOrRedirect: 'usuarios/teste', failureRedirect: 'usuarios/login' }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



//Conexão ao banco
var mongoose = require('mongoose');	
mongoose.connect('mongodb://localhost/learn', function(err){
	if(err){
		console.err('Erro na conexão com o banco: '+ err);
	}else{
		console.log('Servidor conectado');
	}
});






// all environments
app.set('views', __dirname + '/views'); //alterado
app.set('view engine', 'jade');

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('learn'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//app.use(app.router);
app.use(express.static(__dirname+'/public')); //alterado
app.use(expressValidator());

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}



load('models').then('controllers').then('routes').into(app);

//alterado
app.listen(3000, function(){
  console.log('Servidor rodando na porta 3000...');
});



