let user_id = JSON.parse(localStorage.getItem('user')).id;
let timeline_id = localStorage.getItem('timeLineId');
window.onload = profileDetail;

function profileDetail() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/user/${timeline_id}`,
        success: function (data) {
            let content1 = userInfo(data);
            let content2 = userInfoDetail(data);
            document.getElementById("user_detail").innerHTML = content1;
            document.getElementById("userInfo_detail").innerHTML = content2;
            userInfoAllPost()
        }
    })
}

function userInfo(user) {
    return `<div class="profile-cover">
                        <!-- profile cover -->
                        <img src="../static/fakebook.jpg" alt="">
                    </div>

                    <div class="profile-details">
                        <div class="profile-image">
                            <img src="${user.avatarUrl}" alt="">
                        </div>
                        <div class="profile-details-info">
                            <h1> ${user.fullName} </h1>
                        </div>
                    </div>
                    
                    <div class="nav-profile" uk-sticky="media : @s">
    </div>`;
}

function userInfoDetail(userInfo) {
    return`<div class="sl_user-widget-wrap-header pb-0">
                                    <div class="sl_user-widget-wrap-header-left">
                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                                <path fill="currentColor"
                                                    d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z">
                                                </path>
                                            </svg></span>
                                        <h4> Info </h4>
                                    </div>
                                </div>
                                <ul class="sl_right_user_info">
                                    <li class="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z">
                                            </path>
                                        </svg>
                                        ${userInfo.phoneNumber}
                                    </li>
                            
                                    <li class="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M9,11.75A1.25,1.25 0 0,0 7.75,13A1.25,1.25 0 0,0 9,14.25A1.25,1.25 0 0,0 10.25,13A1.25,1.25 0 0,0 9,11.75M15,11.75A1.25,1.25 0 0,0 13.75,13A1.25,1.25 0 0,0 15,14.25A1.25,1.25 0 0,0 16.25,13A1.25,1.25 0 0,0 15,11.75M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,11.71 4,11.42 4.05,11.14C6.41,10.09 8.28,8.16 9.26,5.77C11.07,8.33 14.05,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20Z">
                                            </path>
                                        </svg>
                                        ${userInfo.birthday}</li>
                                        
                                    <hr class="my-2">
                                    </li>
                                    <li class="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z">
                                            </path>
                                        </svg>
                                        <span>Working at Fake Book</span>
                                    </li>
                                    <li class="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"></path>
                                        </svg>
                                        <span>Studied at Code Gym</span>
                                    </li>
                            
                                    <li class="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z">
                                            </path>
                                        </svg>
                                        Living in ${userInfo.address}</li>
                                    <li class="list-group-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                            <path fill="currentColor"
                                                d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z">
                                            </path>
                                        </svg>
                                        <span>Located in ${userInfo.address}</span>
                                        <iframe width="100%" class="user-location-frame" frameborder="0" style="border:0;margin-top: 10px;"
                                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBOfpaMO_tMMsuvS2T4zx4llbtsFqMuT9Y&amp;q=Hanoi&amp;language=en"></iframe>
                                    </li>
                                </ul>`;
}

function userInfoAllPost() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/post/${user_id}/${timeline_id}`,
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += findAllPostByUser(data[i]);
                }
            }
            document.getElementById("userAllPost").innerHTML = content;
        }
    });
}

function findAllPostByUser(post) {
    let content = "";
    content += `<div class="post">
                                <div class="post-heading">
                                    <div class="post-avature">
                                        <img src="${post.userInfo.avatarUrl}" alt="">
                                    </div>
                                    <div class="post-title">
                                        <h4> ${post.userInfo.fullName} </h4>
                                        <p> ${post.dateCreated} <i class="uil-users-alt"></i> </p>
                                    </div>
                                    <div class="post-btn-action">
                                        <span class="icon-more uil-ellipsis-h"></span>
                                        <div class="mt-0 p-2" uk-dropdown="pos: top-right;mode:hover ">
                                            <ul class="uk-nav uk-dropdown-nav">
                                                <li><a onclick="editPost(${post.id})"> <i class="uil-edit-alt mr-1"></i> Edit Post </a></li>
                                           
                                                <li><a onclick="deletePost(${post.id})" class="text-danger"> <i class="uil-trash-alt mr-1"></i>
                                                    Delete </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="post-description">
                                    <div class="fullsizeimg">
                                    <p style="padding-left: 20px">${post.content}</p>`;
    if (post.imgUrl != null) {
        content += `<img src="${post.imgUrl}" alt="">`;
    }
    content += `</div>
                                </div>
                                <div onclick="likePost(${post.id})" class="post-state">
                                    <div class="post-state-btns"> 
                                    <i class="uil-thumbs-up"></i> 
                                    <span id="likeCount${post.id}" style="padding-right: 5px"></span>
                                    <a class="view-more-comment"> Like </a>
                                    </div>
                                </div>

                                <!-- post comments -->
                                <div class="post-comments">
                                    <a onclick="showComments(${post.id})" class="view-more-comment">View Comments</a>
                                    <div id="commentList${post.id}"></div>
                                    <div class="post-add-comment">
                                        <div class="post-add-comment-text-area">
                                            <input type="text" id="createComment${post.id}" placeholder="Write your comment...">
                                            <button type="button" onclick="createCommentPost(${post.id})" class="button primary px-6"> Comment </button>
                                        </div>

                                    </div>

                                </div>
                            </div>
<div id="commentList"></div>`

    countlikePost(post.id);
    return content;
}

function showComments(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/comment/${id}`,
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayComment(data[i]);
                }
            }
            document.getElementById("commentList" + id).innerHTML = content;
        }
    })
}

function displayComment(comment) {
    let content = `<div class="post-comments-single">
        <div class="post-comment-avatar">
            <img src="${comment.userInfo.avatarUrl}" alt="">
        </div>
        <div class="post-comment-text">
            <div class="post-comment-text-inner">
                <h6> ${comment.userInfo.fullName} </h6>
                <p> ${comment.content} </p>
            </div>
            <div class="uk-text-small"> 
                                    <i class="uil-thumbs-up"></i> 
                                    <span id="likeCountComment${comment.id}" style="padding-right: 5px"></span><a onclick="likeComment(${comment.id})" class="view-more-comment"> Like </a>
            </div>
        </div>
    </div>`

    countlikeComment(comment.id);
    return content;
}

function countlikePost(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/like-post/${id}`,
        success: function (data) {
            document.getElementById("likeCount" + id).innerHTML = data;
        }
    });
}

function countlikeComment(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/like-comment/${id}`,
        success: function (data) {
            document.getElementById("likeCountComment" + id).innerHTML = data;
        }
    });
}

function likeComment(comment_id) {
    $.ajax({
        type: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/like-comment/${comment_id}/${user_id}`,
        success: function () {
            userInfoAllPost();
        }
    });
}

function likePost(post_id) {
    $.ajax({
        type: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/like-post/${post_id}/${user_id}`,
        success: function () {
            userInfoAllPost();
        }
    });
}

function createCommentPost(post_id) {
    let content = $(`#createComment${post_id}`).val();
    let newComment = {
        content: content,
        userInfo: {
            id: user_id
        },
        post: {
            id: post_id
        }
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: "POST",
        data: JSON.stringify(newComment),
        url: `http://localhost:8080/api/comment`,
        success: function () {
            showComments(post_id);
            document.getElementById("commentPost").value = "";
        }

    });
    event.preventDefault();
}