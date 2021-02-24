{
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
        <div class="posts-display" id="post-${post.id}">
            <h3>
                ${ userName }
            </h3>
            <p class="post-content">
            
                ${post.content}
            </p>
            <div class='post-btns'>
                <button class='comments-btn' post-id="${post.id}">Comments</button>
        
        
                    <a href="/posts/destroy/${post.id}">
                    <button class='delete-post-btn' >Delete</button>
                    </a>
                
            </div>

            <div class="post-comments hidden" id="comment-section-${post.id}" >
           
                <form action="/comments/create" method="POST" class="comment-form">
                    <input type="text" name="content" placeholder="Add a comment !" required>
        
        
                    <input type="hidden" name="post" value="${post.id}"> 
                    <input type="submit" value="POST" class="post-comment-btn">
                </form>
           
        
            <div class="post-comments-list " id="post-comments-wrapper-${post.id}">
        
                <ul id="post-comments-<%= p.id %>">
        
                </ul>
        
            </div>
        </div>
        
            
        
        </div>`)

        return myPost;

    }

    createPost();

}