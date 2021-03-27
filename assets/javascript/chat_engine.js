class chatEngine{

    constructor(chatBoxId , userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000', { transport : ['websocket'] });

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){

        let self = this;

        //1this will bascially fire an even to establish our conection
        this.socket.on('connect' , function(){
            console.log("connection using sockets !");
            
            //1)what we do is that we emit an event('join_room') from the front end which will tell the backend that a user wants to join a vhat room
            //along with the emit we send some data 
            //this req will be recived at the baackdend chat_socket
            self.socket.emit('join_room' , {
                user_email : self.userEmail,
                chat_room : 'codial'
            });

            //4)we confiem if a user has joned the room
            self.socket.on('user_joined' , function(data){
                console.log("user joined " , data);
            })

        });

    }

}