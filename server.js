var http = require('http');
var url = require('url');

function start(){
  function onRequest(request,response){
    var pathname = url.parse(request.url).pathname;
    console.log("Request received for " + pathname + ".");
    response.end("Raspberry Pi up and running\nRequested path " + pathname);
  }
  http.createServer(onRequest).listen(80);
  console.log("Server was started.");

}
exports.start = start;
