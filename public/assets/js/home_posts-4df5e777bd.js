{let t=function(t){t.click((function(t){t.preventDefault(),t.stopPropagation();var e=this.getAttribute("post-id");e="comment-section-"+e,document.getElementById(e).classList.toggle("hidden"),"Comments"==this.innerText?this.innerText="Show Less":this.innerText="Comments"}))},e=$(".comments-btn");for(let n=0;n<e.length;n++)t($(e[n]));let n=function(t){new Noty({theme:"mint",text:t,type:"alert",layout:"topCenter",timeout:1500}).show()},s=function(t){new Noty({theme:"mint",text:"Post Created",type:"error",layout:"topCenter",timeout:1500}).show()};function createPost(){var e=$("#form-posts");e.submit((function(a){a.preventDefault(),$.ajax({url:"/posts/create",method:"POST",data:e.serialize(),success:function(e){let s=o(e.data.post,e.data.userName);$("#posts-display-wrapper").prepend(s),i($(" .delete-post-btn-link",s)),new PostComments(e.data.post._id),t($("#btn-"+e.data.post._id)),n("Post Created !"),new ToggleLike($(" .like-btn-link",s))},error:function(t){console.log(t.responseText),s(err.responseText)}})}))}let o=function(t,e){return $(`\n        <div class="posts-display" id="post-${t._id}">\n            <h3>\n                ${e}\n            </h3>\n            <p class="post-content">\n            \n                ${t.content}\n            </p>\n            <div class='post-btns'>\n            \n            <a href="/likes/toggle/?id=${t._id}&type=Post" class="like-btn-link" data-likes="${t.likes.length}">\n                <button class='like-post-btn' ><span id="like-count-${t._id}-Post">${t.likes.length}</span> &nbsp <i class="fas fa-heart"></i></button>\n            </a>\n                <button class='comments-btn new-posts-btn ' post-id="${t._id}" id="btn-${t._id}" >Show Less</button>\n        \n        \n                    <a href="/posts/destroy/${t._id}" class='delete-post-btn-link'>\n                    <button class='delete-post-btn' >Delete</button>\n                    </a>\n                \n            </div>\n\n            <div class="post-comments" id="comment-section-${t._id}" >\n           \n                <form action="/comments/create" method="POST" class="comment-form comment-form-preloaded" id="post-${t._id}-comment-form">\n                <input type="text" name="content" placeholder="Add a comment !" required>\n\n               \n                <input type="hidden" name="post" value="${t._id}"> \n                <input type="submit" value="POST" class="post-comment-btn">\n                </form>\n           \n        \n            <div class="post-comments-list " id="post-comments-wrapper-${t._id}">\n        \n                <ul id="post-comments-${t._id}">\n        \n                </ul>\n        \n            </div>\n        </div>\n        \n            \n        \n        </div>`)},i=function(t){t.click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove(),n("Post and Associated Comments Deleted")},error:function(t){console.log(t.responseText),s(t.responseText)}})}))},a=function(t){$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$("#post-"+t.data.post_id).remove(),n("Post and Associated Comments Deleted")},error:function(t){s(t.responseText),console.log(t.responseText)}})},l=document.getElementsByClassName("delete-post-btn-link");for(let t=0;t<l.length;t++)l[t].addEventListener("click",(function(e){e.preventDefault(),a(l[t])}));(function(){$(".posts-display").each((function(){let t=$(this).prop("id").substr(5);new PostComments(t)}))})(),createPost()}