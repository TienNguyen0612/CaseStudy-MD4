let user_id = JSON.parse(localStorage.getItem('user')).id;

function displayFormCreate() {
    document.getElementById("form").reset();
    document.getElementById("form").hidden = false;
    document.getElementById("form-button").onclick = function () {
        addNewGroup();
    }
}

function addNewGroup() {
    let name = $('#name').val();
    let newGroup = {
        name: name
    }

    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'POST',
        data: JSON.stringify(newGroup),
        url: `http://localhost:8080/api/group/create-group/${user_id}`,
        success: function () {
            getGroups();
        }
    });
    event.preventDefault();
}

function getGroups() {
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'GET',
        url: `http://localhost:8080/api/group/get-group/${user_id}`,
        success: function (data) {
            console.log(data);
            let content = '';
            for (let i = 0; i < data.length; i++) {
                content += displayGroup(data[i]);
            }
            document.getElementById("group_list").innerHTML = content;
            document.getElementById("form").hidden = true;
        }
    });
}

function getMyGroups() {
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'GET',
        url: `http://localhost:8080/api/group/get-my-group/${user_id}`,
        success: function (data) {
            let content = '';
            if (data != undefined) {
                for (let i = 0; i < data.length; i++) {
                    content += displayGroup1(data[i]);
                }
            }
            document.getElementById("group_list").innerHTML = content;
            document.getElementById("form").hidden = true;
        }
    });
}

function displayGroup(group) {
    return `  <li>

                                    <div class="sl_group_list">

                                        <!-- Group cover -->
                                            <div class="sl_group_list_media">
                                                <img src="../static/assets/images/group/group-cover-4.jpg" alt="image">
                                            </div>
                             
                                        <!-- Group  Content -->
                                        <div class="sl_group_list_info">
                                            <h3>${group.name}</h3>
                                            <ul>
                                                <li> <span> 12 Members </span> </li>
                                                <li> <span> 2 posts </span> </li>
                                            </ul>

                                            <div class="sl_avatar-groups sl_hide_members">
                                                <a href="group-feed.html">

                                                    <img src="../static/assets/images/avatars/avatar-3.jpg" class="avatars"
                                                         alt="picture">
                                                    <img src="../static/assets/images/avatars/avatar-4.jpg" class="avatars"
                                                         alt="picture">
                                                    <img src="../static/assets/images/avatars/avatar-5.jpg" class="avatars"
                                                         alt="picture">
                                                    <img src="../static/assets/images/avatars/avatar-6.jpg" class="avatars"
                                                         alt="picture">

                                                </a><a>See all Members </a>

                                            </div>

                                            <div class="sl_group_list_info_btns">
                                                <span >
                                                    <button id="join_group" onclick="joinGroup(${group.id})" type="button" class="button primary small block">
                                                        <span> Join</span>
                                                    </button>
                                                </span>
                                                <span hidden>
                                                    <button onclick="viewGroup(${group.id})" type="button" class="button light small block">
                                                        <span>View</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                </li>`;
}

function displayGroup1(group) {
    return `  <li>

                                    <div class="sl_group_list">

                                        <!-- Group cover -->
                                        <a>
                                            <div class="sl_group_list_media">
                                                <img src="../static/assets/images/group/group-cover-4.jpg" alt="image">
                                            </div>
                                        </a>

                                        <!-- Group  Content -->
                                        <div class="sl_group_list_info">
                                            <h3><a>${group.name}</a href="group-feed.html"></h3>
                                            <ul>
                                                <li> <span> 12 Members </span> </li>
                                                <li> <span> 2 posts </span> </li>
                                            </ul>

                                            <div class="sl_avatar-groups sl_hide_members">
                                                <a href="group-feed.html">

                                                    <img src="../static/assets/images/avatars/avatar-3.jpg" class="avatars"
                                                         alt="picture">
                                                    <img src="../static/assets/images/avatars/avatar-4.jpg" class="avatars"
                                                         alt="picture">
                                                    <img src="../static/assets/images/avatars/avatar-5.jpg" class="avatars"
                                                         alt="picture">
                                                    <img src="../static/assets/images/avatars/avatar-6.jpg" class="avatars"
                                                         alt="picture">

                                                </a><a>See all Members </a>

                                            </div>

                                            <div class="sl_group_list_info_btns">
                                                <span hidden>
                                                    <button id="join_group" onclick="joinGroup(${group.id})" type="button" class="button primary small block">
                                                        <span> Join</span>
                                                    </button>
                                                </span>
                                                <span>
                                                    <button onclick="viewGroup(${group.id})" type="button" class="button light small block">
                                                        <span>View</span>
                                                    </button>
                                                </span>
                                            </div>

                                        </div>
                                    </div>

                                </li>`;
}

function joinGroup(group_id) {
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'POST',
        url: `http://localhost:8080/api/group-member/send-request/${user_id}/${group_id}`,
        success: function () {
           getGroups()
        }
    })
}

function viewGroup(group_id) {
    localStorage.setItem('group_id', group_id);
    window.location.href = "group-feed.html";
}

function acceptGroup() {
    $.ajax({
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        type: 'PUT',
        url: `http://localhost:8080/api/group-member/join-group/${user_id}/${group_id}`,
        success: function () {
            // gửi notifications
        }
    })
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
                // gửi notifications
            }
        })
    }

}



window.onload = getGroups;