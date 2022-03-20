let user_id = JSON.parse(localStorage.getItem('user')).id;

function getFriends() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/user/get-no-friend/${user_id}`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += displayAllUser(data[i]);
            }
            document.getElementById("user_list").innerHTML = content;
        }
    });
}

function getMyFriends() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/api/user/get-my-friend/${user_id}`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += displayAllUserFriend(data[i]);
            }
            document.getElementById("user_list").innerHTML = content;
        }
    });
}

function displayAllUser(userInfo) {
    return `<div class="sl_find_frns_user">
                                <div class="sl_find_frns_user_cover"> 
                                    <img src="../static/images/Gethight.png" alt="">
                                </div>
                                <div class="sl_find_frns_user_info">
                                    <div class="sl_find_frns_user_avatar"> 
                                        <a>
                                            <img src="${userInfo.avatarUrl}" alt="">
                                        </a>
                                    </div>
                                    <h4> <a onclick="openTimeline(${userInfo.id})"> ${userInfo.fullName} </a> </h4>
                                </div>
                                <div class="sl_find_frns_user_btns">
                                    <span>
                                        <button onclick="sendInvitations(${userInfo.id})" type="button" class="btn button small primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                                <line x1="23" y1="11" x2="17" y2="11"></line>
                                            </svg>
                                            <span> Add Friend </span>
                                        </button>
                                    </span>
                                    <span>
                                        <button onclick="blockFriend(${userInfo.id})" type="button" class="btn button small light">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-message-square">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <span> Block </span>
                                        </button> 
                                    </span>
                                </div>
    </div>`;
}

function displayAllUserFriend(userInfo) {
    return `<div class="sl_find_frns_user">
                                <div class="sl_find_frns_user_cover"> 
                                    <img src="../static/images/Gethight.png" alt="">
                                </div>
                                <div class="sl_find_frns_user_info">
                                    <div class="sl_find_frns_user_avatar"> 
                                        <a>
                                            <img src="${userInfo.avatarUrl}" alt="">
                                        </a>
                                    </div>
                                    <h4> <a onclick="openTimeline(${userInfo.id})"> ${userInfo.fullName} </a> </h4>
                                </div>
                                <div class="sl_find_frns_user_btns">
                                    <span>
                                        <button  onclick="unfriend(${userInfo.id})" type="button" class="btn button small primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="8.5" cy="7" r="4"></circle>
                                                <line x1="20" y1="8" x2="20" y2="14"></line>
                                                <line x1="23" y1="11" x2="17" y2="11"></line>
                                            </svg>
                                            <span> UnFriend </span>
                                        </button>
                                    </span>
                                    <span>
                                        <button type="button" class="btn button small light">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                class="feather feather-message-square">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <span> Block </span>
                                        </button> 
                                    </span>
                                </div>
    </div>`;
}

function openTimeline(userTimelineId) {
    localStorage.setItem("timeLineId", userTimelineId);
    window.location.href = "timeline.html";

}

function sendInvitations(toUser_id) {
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/api/friendship/${user_id}/${toUser_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function () {
            getFriends()
        }
    });
}

function unfriend(toUser_id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/friendship/${user_id}/${toUser_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function () {
            getMyFriends()
        }
    });
}

function blockFriend(toUser_id) {
    $.ajax({
        type: "PUT",
        url: `http://localhost:8080/api/friendship/block/${user_id}/${toUser_id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function () {
            getMyFriends()
        }
    });
}

function searchUser() {
    let search = document.getElementById("search_friend").value;
    $.ajax({
       type: "GET",
       url: `http://localhost:8080/api/user/search?search=${search}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        success: function (data) {
            let content = "";
            if (data !== undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayAllUser(data[i]);
                }
            }
            document.getElementById("user_list").innerHTML = content;
            document.getElementById("search_friend").value = "";
        }
    });
    event.preventDefault();
}

// function getFriendship(userInfo) {
//     $.ajax({
//         type: 'GET',
//         url: `http://localhost:8080/api/friendship/get-friendship/${user_id}/${userInfo.id}`,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//         },
//         success: function (data) {
//             console.log(data);
//             if (data !== 1) {
//               return displayAllUserFriend(data);
//             } else {
//                 // console.log(data);
//                return displayAllUser(data);
//             }
//         }
//     })
// }


window.onload = getFriends
