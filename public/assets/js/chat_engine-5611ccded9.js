class chatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io.connect("http://localhost:5000",{transport:["websocket"]}),this.userEmail&&this.connectionHandler()}createMessagePill(e){let s=e.user_email,o=e.msg;console.log("create");let t="other-message";return s===this.userEmail&&(t="self-message"),$(`\n        <li class="${t}">\n            <span>${o}</span>\n        </li>\n        `)}connectionHandler(){let e=this;this.socket.on("connect",(function(){console.log("connection using sockets !"),e.socket.emit("join_room",{user_email:e.userEmail,chat_room:"codial"}),e.socket.on("user_joined",(function(e){console.log("user joined ",e)})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&(e.socket.emit("send_message",{user_email:e.userEmail,chat_room:"codial",msg:s}),$("#chat-message-input").val(""))})),e.socket.on("receive_message",(function(s){console.log("message recved !",s.msg);let o=e.createMessagePill(s);$(".chat-messages-list").append(o)}))}))}}