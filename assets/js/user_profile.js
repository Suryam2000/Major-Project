$('.toggle-friend-btn a button').click(function(e){
    $('.toggle-friend-btn a button').toggleClass("remove");
    $('.toggle-friend-btn a button').toggleClass("add");
    $('.add').html('Add Friend');
    $('.remove').html('Remove');
    e.preventDefault();
});





