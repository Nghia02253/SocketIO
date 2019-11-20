var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000);

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");	
});
console.log('server running');

io.sockets.on('connection', function (socket) {
	
  console.log("Co nguoi connect");
  
  io.sockets.emit('serverguitinnhan', { noidung: "okbaby" });
  
  socket.on('clientdata', function (data) {
  	console.log("Server nhan: " + data);
	// emit toi tat ca moi nguoi
	io.sockets.emit('serverguitinnhan', { noidung: data });
	// emit tới máy nguoi vừa gửi
	socket.emit('serverguitinnhan', { noidung: data });
  });
  
});