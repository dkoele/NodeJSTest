var http = require('http');

http.createServer(function(req,resp) {
	resp.writeHead(200, {"Content-Type": "text/plain"});
	resp.write("Node was set up successfully on your Raspberry.");
	resp.end();
	
	console.log("sample output to console");

}).listen(80);
