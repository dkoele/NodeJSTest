// Call Basic modules
var http=require('http')
  , express = require('express')
  , stylus = require('stylus')
  , nib= require('nib');
var url = require('url');

// Create express application
var app = express();

// Set up handles for each enabled module
//var BarcodeApiHandler = new require('./modules/barcodeapi/handler');
//var PrinterApiHandler = new require('./modules/printerapi/handler');
var BarcodeWebHandler = require('./modules/barcodeweb/handler');

// Set up the routes
var routes = require('./routes');

// Set up the logging
var fs = require('fs');
var expressLogFile = fs.createWriteStream('./logs/express.log',{flags : 'a'});

// Required for nib/stylus ???
function compile(str,path){
  return stylus(str)
    .set('filename',path)
    .use(nib());
}

app.configure(function(){
    app.use(express.logger({stream : expressLogFile}));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(stylus.middleware(
        { src: __dirname + '/public'
            , compile: compile
        }
    ));
    app.use(express.static(__dirname + '/public'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.configure('development', function(){
    app.use(express.errorHandler({dumpExceptions: true, showStack : true}));
});

//app.configure('production', function(){
//    app.use(express.errorHandler());
//});

var handlers = {
    barcodeweb : BarcodeWebHandler
};

function start(){
  routes.setup(app, handlers);
  var port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);
  console.log(app.routes);
    /*function onRequest(request,response){
    var pathname = url.parse(request.url).pathname;
    console.log("Request received for " + pathname + ".");
    response.render('index',
      { title : 'Home - ' + pathname }
    );
    response.end("Raspberry Pi up and running\nRequested path " + pathname);
  }
*/
  //app.all("/form", function(req,res){
  //  console.log(req.body);
  //  res.render('form', {title : 'form'});
  //});
  //app.get("/address", function(req,res){
  //  res.render('address', {title : 'Enter address'});
  //});
  //app.get("*",onRequest);

  //app.post("/post", function(req,res,next){
  //   res.render('form',{title:'Posted'})
  //});
  //http.createServer(app).listen(8080);

}
exports.start = start;
exports.app = app;

