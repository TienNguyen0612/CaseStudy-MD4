let userCurrent_id = JSON.parse(localStorage.getItem('user')).id;
//notification like post
function notificationLikePost() {
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/api/like-post/notification/${userCurrent_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayLikePostNotification(data[i]);
                }
            }
            document.getElementById("notification_like_post").innerHTML = content;
        }
    })
}

function displayLikePostNotification(likePost) {
    return `<li>
                                       <a onclick="checkLikePostNotification(${likePost.post.id},${likePost.userInfo.id})">
                                           <span class="notification-avatar">
                                               <img src="${likePost.userInfo.avatarUrl}" alt="">
                                           </span>
                                           <span class="notification-icon bg-gradient-primary">
                                               <i class="icon-feather-thumbs-up"></i></span>
                                           <span class="notification-text">
                                               <strong>${likePost.userInfo.fullName}</strong> Like Your Post
                                           </span>
                                       </a>
                                   </li>`
}

function checkLikePostNotification(post_id,userinfo_id) {
    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/api/like-post/${post_id}/${userinfo_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            notificationLikePost()
        }
    })
}

//notification like Comment
function notificationLikeComment() {
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/api/like-comment/notification/${userCurrent_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayLikeCommentNotification(data[i]);
                }
            }
            document.getElementById("notification_like_comment").innerHTML = content;
        }
    })
}

function displayLikeCommentNotification(LikeComment) {
    return `<li>
                                       <a onclick="checkLikeCommentNotification(${LikeComment.comment.id},${LikeComment.userInfo.id})">
                                           <span class="notification-avatar">
                                               <img src="${LikeComment.userInfo.avatarUrl}" alt="">
                                           </span>
                                           <span class="notification-icon bg-gradient-primary">
                                               <i class="icon-feather-thumbs-up"></i></span>
                                           <span class="notification-text">
                                               <strong>${LikeComment.userInfo.fullName}</strong> Like Your Comment
                                           </span>
                                       </a>
                                   </li>`
}

function checkLikeCommentNotification(comment_id,userinfo_id) {
    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/api/like-post/${comment_id}/${userinfo_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            notificationLikeComment()
        }
    })
}

//notification accept friend
function notificationAcceptFriend() {
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/api/friendship/notification/${userCurrent_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayAcceptFriendNotification(data[i]);
                }
            }
            document.getElementById("notification_accept_friend").innerHTML = content;
        }
    })
}

function displayAcceptFriendNotification(friendship) {
    return `<li>
                                       <a onclick="checkAcceptFriendNotification(${friendship.fromUser.id})">
                                           <span class="notification-avatar">
                                               <img src="${friendship.fromUser.avatarUrl}" alt="">
                                           </span>
                                           <span class="notification-icon bg-gradient-primary">
                                               <i class="icon-feather-thumbs-up"></i></span>
                                           <span class="notification-text">
                                               <strong>${friendship.fromUser.fullName}</strong> want to make friends with you
                                           </span>
                                       </a>
                                   </li>`
}

function checkAcceptFriendNotification(fromuserCurrent_id) {
    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/api/friendship/${fromuserCurrent_id}/${userCurrent_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            notificationAcceptFriend()
        }
    })
}

//notification accept group
// function notificationAcceptGroup() {
//     $.ajax({
//         type: "POST",
//         url: `http://localhost:8080/api/group-member/notification/${userCurrent_id}`,
//         headers: {
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//         },
//         success: function (data) {
//             let content = "";
//             if (data !== undefined) {
//                 for (let i = 0; i < data.length; i++) {
//                     content += displayAcceptGroupNotification(data[i]);
//                 }
//             }
//             document.getElementById("notification_accept_group").innerHTML = content;
//         }
//     })
// }

function notificationAcceptGroup() {
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/api/group-member/notification/${userCurrent_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayAcceptGroupNotification(data[i]);
                }
            }
            document.getElementById("notification_accept_group").innerHTML = content;
        }
    })
}

function displayAcceptGroupNotification(groupMember) {
    return `<li>
                                       <a onclick="checkAcceptGroupNotification(${groupMember.userInfo.id},${groupMember.groups.id})">
                                           <span class="notification-avatar">
                                               <img src="${groupMember.userInfo.avatarUrl}" alt="">
                                           </span>
                                           <span class="notification-icon bg-gradient-primary">
                                               <i class="icon-feather-thumbs-up"></i></span>
                                           <span class="notification-text">
                                               <strong>${groupMember.userInfo.fullName}</strong> want to join your group
                                           </span>
                                       </a>
                                   </li>`
}

function checkAcceptGroupNotification(member_id,group_id) {
    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/api/group-member/join-group/${member_id}/${group_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            notificationAcceptGroup()
        }
    })
}

function signOut() {
    localStorage.setItem('token', "");
    localStorage.setItem('user', "");
    localStorage.setItem('group_id', "");
    window.location.href = "form-login.html";
}


setTimeout(notificationLikeComment, 1000)
setTimeout(notificationLikePost, 1000)
setTimeout(notificationAcceptFriend, 1000)
setTimeout(notificationAcceptGroup, 1000)

// setInterval(notificationLikeComment, 1000)
// setInterval(notificationLikePost, 1000)
// setInterval(notificationAcceptFriend, 1000)

// notificationLikeComment()
// notificationLikePost()
// notificationAcceptFriend()

