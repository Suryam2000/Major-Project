module.exports.chatSockets = function(socketServer){

    //added this cors to use web application on one port and socket server from another
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET","POST"]
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('New connection recieved', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected');
        });

        socket.on('join_room', function(data){
            console.log('Joining request recieved', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        socket.on('send_msg_1', function(data){
            io.in(data.chatroom).emit('receive_msg_1', data);
        });

        socket.on('send_msg_2', function(data){
            io.in(data.chatroom).emit('receive_msg_2', data);
        });

    });

}