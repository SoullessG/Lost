const http = require("http");
const express = require("express");
const socketio = require('socket.io');
const path = require("path");
const au1 = process.env['User1'];
const au2 = process.env['User2'];
const master = process.env['Master'];
const db_url = process.env['db.url'];
const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));
httpserver.listen(30);

var rooms = [];
var usernames = [];
var passwords = [];

	
io.on('connection', function(socket) {

	socket.on("join", function(room, username,password) {
		if (username != "") {
			if (username === au1) {
				if ((room === master), (password === p)) {
					room = master;
				}
				rooms[socket.id] = room;
				usernames[socket.id] = [key = username, value = password];
				passwords[socket.id] = password
				socket.leaveAll();
				socket.join(room, password);
				io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
				socket.emit("join", room, password);
			}
			else if (username === au2) {
				if (room = master) {
					room = master;
				}
				rooms[socket.id] = room;
				usernames[socket.id] = username;
				socket.leaveAll();
				socket.join(room);
				io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
				socket.emit("join", room);
			}
			else if ((username != au1), (username != au2)) {
				if (room === master) {
					room = "Lost";
				}
				rooms[socket.id] = room;
				usernames[socket.id] = username;
				socket.leaveAll();
				socket.join(room);
				io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
				socket.emit("join", room);
			}
		}
	})

	socket.on("send", function(message) {
		io.in(rooms[socket.id]).emit("recieve", usernames[socket.id] + " : " + message);
	})

 	
	socket.on("recieve", function(message) {
		socket.emit("recieve", message);
	})
})
