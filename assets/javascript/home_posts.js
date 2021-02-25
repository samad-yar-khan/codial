{

    
    // let newButtons = document.getElementsByClassName(' new-posts-btn');
    // for(b of newButtons){
    //     b.addEventListener('click' , function(){
    //         console.log(this.getAttribute("post-id"))
    //         var commentId = this.getAttribute("post-id");
    //         var temp = "comment-section-";
    //         commentId = temp+commentId;
    //         var commentSection = document.getElementById(commentId);    
    //         commentSection.classList.toggle("hidden");
    //         if(this.innerText == "Comments"){
    //             this.innerText = "Show Less";
    //         }else{
    //             this.innerText = "Comments"
    //         }
    //     })
    // }

    //will handle button clicks
    //will expand all preexisting commments
    let expandComment = function(commentBtn){
        commentBtn.addEventListener('click' , function(){
          
            console.log(this.getAttribute("post-id"))
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
        })
    }

    // will expa comments of posts added using ajax
    let expandCommentNew = function(commentBtn){
        commentBtn.click(function(event){
            event.preventDefault();
            event.stopPropagation();
            console.log(this.getAttribute("post-id"))
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
        })
    }

        let commentDisplayBtns = $('.comments-btn');
        console.log(commentDisplayBtns);
        for(let i = 0 ; i<commentDisplayBtns.length  ; i++){

            expandComment(commentDisplayBtns[i]);

        }

  
    

    //methdo to create a post using ajax
    function createPost(){

        //we get the form  and prevent the defualt behavior off its submit button
        var newPostForm = $('#form-posts');

        newPostForm.submit(function(defaultEvent){
            // console.log(defaultEvent);

            defaultEvent.preventDefault();

            $.ajax({
                url : "/posts/create",
                method:"POST",
                data: newPostForm.serialize(), //this converts the foem data into json
                success : function(data){
                    //data recooved from the api call
                    console.log(data); //ajax req by jquery will parse the string dat into json itslef
                    let newPost = newPostDom(data.data.post , data.data.userName);
                    $("#posts-display-wrapper").prepend(newPost );
                    newCommentsBtn.push()
                   expandCommentNew($(`#btn-${data.data.post._id}`));
                
                   
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })

        })

    }

    //methdo to create post in dom
    let newPostDom = function(post , userName){

        let myPost = $(`
        <div class="posts-display" id="post-${post._id}">
            <h3>
                ${ userName }
            </h3>
            <p class="post-content">
            
                ${post.content}
            </p>
            <div class='post-btns'>
                <button class='comments-btn new-posts-btn' post-id="${post._id}" id="btn-${post._id}" >Comments</button>
        
        
                    <a href="/posts/destroy/${post._id}">
                    <button class='delete-post-btn' >Delete</button>
                    </a>
                
            </div>

            <div class="post-comments" id="comment-section-${post._id}" >
           
                <form action="/comments/create" method="POST" class="comment-form">
                    <input type="text" name="content" placeholder="Add a comment !" required>
        
        
                    <input type="hidden" name="post" value="${post._id}"> 
                    <input type="submit" value="POST" class="post-comment-btn">
                </form>
           
        
            <div class="post-comments-list " id="post-comments-wrapper-${post._id}">
        
                <ul id="post-comments-${post._id}">
        
                </ul>
        
            </div>
        </div>
        
            
        
        </div>`)

        return myPost;

    }





    createPost();
   

}