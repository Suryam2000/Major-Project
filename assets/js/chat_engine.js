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


        $('#send-msg-1').click(function(){
            let msg = $('#chat-msg-input-1').val();

            $('#chat-msg-input-1').val('');

            if(msg != ''){
                self.socket.emit('send_msg_1', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'Social'
                });
            }
        });

        $('#send-msg-2').click(function(){
            let msg = $('#chat-msg-input-2').val();

            $('#chat-msg-input-2').val('');

            if(msg != ''){
                self.socket.emit('send_msg_2', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'Social'
                });
            }
        });

        self.socket.on('receive_msg_1', function(data){
            console.log('Message Received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-msg-1';

            if(data.user_email == self.userEmail){
                messageType = 'self-msg-1';
            } 

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.addClass(messageType);

            $('#chat-msg-list-1').append(newMessage);
        });

        self.socket.on('receive_msg_2', function(data){
            console.log('Message Received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-msg-2';

            if(data.user_email == self.userEmail){
                messageType = 'self-msg-2';
            } 

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.addClass(messageType);

            $('#chat-msg-list-2').append(newMessage);
        });

    }
}