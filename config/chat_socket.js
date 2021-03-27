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
        //2)we detected the emited join_room event
        socket.on('join_room' , function(data){

          console.log( 'joining the requested room',data);
          //we join the chatroom if it exists else its created 
          socket.join(data.chat_room);
          
          //3)we must send a confirmation back to the front end broeserr taht our user has been added ,
          //for that we emit an event confiming that user has joined
          //we must emit this message only to the user  of that speceific room
          io.in(data.chat_room ).emit('user_joined' , data);
          //this confirmation is recved at the front end 
        })
    })

}