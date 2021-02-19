
let commentDisplayBtns = document.getElementsByClassName('comments-btn');
console.log("connected");
console.log(commentDisplayBtns[0]);



for(c of commentDisplayBtns){

    c.addEventListener('click' , function(){
        var commentId = this.getAttribute("post-id");
        var temp = "comment-section-";
        commentId = temp+commentId;
        var commentSection = document.getElementById(commentId);    
        commentSection.classList.toggle("hidden");
        if(this.innerText == "Comments"){
            this.innerText = "Show Less";
        }else{
            this.innerText = "Comments"
        }
        console.log("hello");
    })

}