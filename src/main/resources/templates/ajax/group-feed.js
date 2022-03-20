let user_id = JSON.parse(localStorage.getItem('user')).id;
let group_id = JSON.parse(localStorage.getItem('group_id'));

function findGroupById() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/group/detail/${group_id}`,
        success: function (data) {
            return data;
        }
    })
}

function deletePost(id) {
    if (confirm('Are you sure you want to delete ?') === true) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            type: "delete",
            url: `http://localhost:8080/api/post/${id}`,
            success: function () {
                showAllPost();
            }
        });
    }

}

function showAllPost() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/post/get-new-feeds-group/${group_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            console.log(data)
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayPost(data[i]);
                }
            }
            document.getElementById("postList").innerHTML = content;
        }
    })
}

function showOne() {
    $.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/group/detail/${group_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            console.log(data)
            document.getElementById("name_group").innerHTML = `<h3> ${data.name} </h3>`;
        }
    })
}


function displayPost(post) {
    console.log(post)
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
                                <div onclick="likePost(${post.id},user_id)" class="post-state">
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
                                            <button type="button" onclick="createCommentPost(${post.id},user_id)" class="button primary px-6"> Comment </button>
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
            console.log(data)
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
                                    <span id="likeCountComment${comment.id}" style="padding-right: 5px"></span>
                                    <a onclick="likeComment(${comment.id},user_id)" class="view-more-comment"> Like </a>
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
            // console.log(data)
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
            console.log(data)
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
            showAllPost();
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
            showAllPost();
        }
    });
}

function getImg() {
    let img = $('#fileImage')[0].files[0]
    document.getElementById("demo-img").src = "../static/imagesUpload/" + img.name
}

function createPost() {
    let data = new FormData();
    let content = $('#contentPost').val();
    let status = $('#statusPost').val();
    let newPost = {
        content: content,
        status: status
    };

    data.append("file", $('#fileImage')[0].files[0]);
    data.append("post", new Blob([JSON.stringify(newPost)], {
        type: "application/json"
    }))

    //gọi ajax
    $.ajax({
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        //tên API
        url: `http://localhost:8080/api/group/create-post/${group_id}/${user_id}`,
        //xử lý khi thành công
        success: function () {
            showAllPost();
            document.getElementById("formCreatePost").reset();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();

}

let index = 0;

function editPost(id) {
    $.ajax({
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/post/${id}`,
        success: function (data) {
            $('#contentPost').val(data.content);
            $('#statusPost').val(data.status);
            index = data.id;
            document.getElementById("formSubmit").onclick = function () {
                updatePost();
            };
        }
    });
}

function updatePost() {
    let data = new FormData();
    let content = $('#contentPost').val();
    let status = $('#statusPost').val();
    let newPost = {
        content: content,
        status: status
    };

    data.append("file", $('#fileImage')[0].files[0]);
    data.append("postUpdate", new Blob([JSON.stringify(newPost)], {
        type: "application/json"
    }))

    //gọi ajax
    $.ajax({
        type: "put",
        data: data,
        processData: false,
        contentType: false,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        //tên API
        url: `http://localhost:8080/api/post/${index}`,
        //xử lý khi thành công
        success: function () {
            showAllPost();
            document.getElementById("formCreatePost").reset();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
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

    //gọi ajax
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

function outGroup() {
    if (confirm('Do you want to leave this group ?') === true) {
        $.ajax({
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            type: 'DELETE',
            url: `http://localhost:8080/api/group-member/out-group/${user_id}/${group_id}`,
            success: function () {
                localStorage.setItem('group_id', "");
                window.location.href = "group.html";
            }
        })
    }
}

window.onload = showAllPost;
window.onload = showOne;