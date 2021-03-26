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
        //this will bascially fire an even to establish our conection
        this.socket.on('connect' , function(){
            console.log("connection using sockets !");
        });

    }

}