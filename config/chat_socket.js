module.exports.chatSockets = function(socketServer){

    let io= require('socket.io')(socketServer , {
        cors: {
          origin: "http://localhost:8000",
          methods: ["GET", "POST"],
          credentials: true
        }
      });
    //js is a event absed llanguage so our sockets woek on events
    io.sockets.on('connection' , (socket)=>{
        console.log("new connection recieved !" , socket.id);

        socket.on('disconnect' , function(){
            console.log("Socket Disconnected !" );
        })
    })

}