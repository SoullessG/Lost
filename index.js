const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const au1 = process.env['User1'];
const au2 = process.env['User2'];
const au3 = process.env['User3'];
const master = process.env['Master'];
const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));
httpserver.listen(3000);

var rooms = [];
var usernames = [];


io.on('connection', function(socket) {
	io.in(room).emit("recieve", "Server : " + username + " has left the chat.")
	socket.on("join", function(room, username) {
		if (username && room != "") {
			if (username === au1) {
				if (room === master) {
					room = master;

				}
				rooms[socket.id] = room;
				usernames[socket.id] = username;
				socket.leaveAll();
				socket.join(room);
				io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
				socket.emit("join", room);
			}
			else if (username === au2) {
				if (room === master) {
					room = master;
				}
				rooms[socket.id] = room;
				usernames[socket.id] = username;
				socket.leaveAll();
				socket.join(room);
				io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
				socket.emit("join", room);
			}
			else if (username === au3) {
				if (room === master) {
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
					RA.opacity = 1;
					rooms[socket.id] = room;
					usernames[socket.id] = username;
					socket.leaveAll();
					socket.join(room);
					io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
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
