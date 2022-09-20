class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
        }

    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('Connection established using sockets !');

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'Social'
            });

            self.socket.on('user_joined', function(data){
                console.log('User Joined', data);
            });
        });


        $('#send-msg').click(function(){
            let msg = $('#chat-msg-input').val();

            $('#chat-msg-input').val('');

            if(msg != ''){
                self.socket.emit('send_msg', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'Social'
                });
            }
        });

        self.socket.on('receive_msg', function(data){
            console.log('Message Received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-msg';

            if(data.user_email == self.userEmail){
                messageType = 'self-msg';
            } 

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.addClass(messageType);

            $('#chat-msg-list').append(newMessage);
        });

    }
}