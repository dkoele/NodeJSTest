var http=require('http')
  , express = require('express')
  , stylus = require('stylus')
  , nib= require('nib');

var app = express();

var url = require('url');

function compile(str,path){
  return stylus(str)
    .set('filename',path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
    , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));

function start(){
  function onRequest(request,response){
    var pathname = url.parse(request.url).pathname;
    console.log("Request received for " + pathname + ".");
    response.render('index',
      { title : 'Home - ' + pathname }
    );
    response.end("Raspberry Pi up and running\nRequested path " + pathname);
  }
  app.get("/form", function(req,res){
    res.render('form', {title : 'form'});
  });
  app.get("/address", function(req,res){
    res.render('address', {title : 'Enter address'});
  });
  app.get("*",onRequest);

  http.createServer(app).listen(80);
  console.log("Server was started.");

}
exports.start = start;


