{

    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    $('#new-post-input-data')[0].value = "";
                    
                    //call class created in home_post_comments.js
                    new PostComments(data.data.post._id);

                    new ToggleLike($('.toggle-like-btn', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post Created!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 800
                        
                    }).show();

                },error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            ${ post.content }
            <br>
            <small>
                ${ post.user.name }
            </small>
            <small>
                <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
            </small>
            <br>
            <small>
                <a class="toggle-like-btn" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                    0 Likes
                </a>
            </small>
        </p>
        <div class="post-comments">

            <form action="/comments/create" method="post" id="post-${post._id}-comments-form">
                <input id="post-${ post._id }-comments-input-data" type="text" name="content" placeholder="Type Here to add Comment..." required>
                <input type="hidden" name="post" value="${ post._id }">
                <input type="submit" value="Post">
            </form>

            <div class="post-comments-list">
                <ul id="post-comments-${ post._id }">

                </ul>
            </div>
        </div>
    </li>`);
    }
    
    
    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 800
                        
                    }).show();
                },error: function(err){
                    console.log(err.responseText);
                }
            });
        });
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}