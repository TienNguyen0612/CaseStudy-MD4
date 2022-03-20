package get.high.controller;

import get.high.model.entity.GroupMember;
import get.high.model.entity.Groups;
import get.high.model.entity.LikeComment;
import get.high.model.entity.UserInfo;
import get.high.service.IGroupMemberService;
import get.high.service.IGroupService;
import get.high.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("api/group-member")
public class GroupMemberController {
    @Autowired
    private IGroupMemberService groupMemberService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IGroupService groupService;

    @GetMapping
    public ResponseEntity<Iterable<GroupMember>> getAllGroupMember() {
        Iterable<GroupMember> groupMembers = groupMemberService.findAll();
        if (!groupMembers.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(groupMembers, HttpStatus.OK);
    }

    @GetMapping("/get-all-request/{group_id}")
    public ResponseEntity<Iterable<GroupMember>> getAllRequest(@PathVariable("group_id") Long group_id) {
        Iterable<GroupMember> groupMembers = groupMemberService.findAllByGroups_IdAndStatus(group_id, 2);
        if (!groupMembers.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(groupMembers, HttpStatus.OK);
    }

    @GetMapping("/get-all-members/{group_id}")
    public ResponseEntity<Iterable<GroupMember>> getAllMembers(@PathVariable("group_id") Long group_id) {
        List<GroupMember> members = (List<GroupMember>) groupMemberService.findAllByGroups_IdAndStatus(group_id, 1);
        List<GroupMember> admins = (List<GroupMember>) groupMemberService.findAllByGroups_IdAndStatus(group_id, 0);
        members.addAll(admins);
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @PostMapping("/send-request/{userinfo_id}/{group_id}")
    public ResponseEntity<GroupMember> sendRequest(@PathVariable("userinfo_id") Long userinfo_id,
                                                   @PathVariable("group_id") Long group_id) {
        Optional<UserInfo> userInfo = userService.findById(userinfo_id);
        Optional<Groups> groups = groupService.findById(group_id);
        GroupMember groupMember = new GroupMember(2, userInfo.get(), groups.get());
        return new ResponseEntity<>(groupMemberService.save(groupMember), HttpStatus.CREATED);
    }

    @PostMapping("/notification/{userinfo_id}")
    public ResponseEntity<Iterable<GroupMember>> getNotificationAcceptGroup(@PathVariable("userinfo_id") long userinfo_id) {
        List<GroupMember> groupMemberList = (List<GroupMember>) groupMemberService.findAllByStatus(2);
        List<GroupMember> admin = (List<GroupMember>) groupMemberService.findAllByUserInfo_IdAndStatus(userinfo_id, 0);
        List<GroupMember> groupMembers = new ArrayList<>();
        if (!groupMemberList.isEmpty()) {
            for (GroupMember groupMember: admin) {
                for (GroupMember group: groupMemberList) {
                    if (groupMember.getGroups().getId() == group.getGroups().getId() && group.getStatus() == 2) {
                        groupMembers.add(group);
                    }
                }
            }
            return new ResponseEntity<>(groupMembers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/join-group/{userinfo_id}/{group_id}")
    public ResponseEntity<GroupMember> joinGroup(@PathVariable("userinfo_id") Long userinfo_id,
                                                   @PathVariable("group_id") Long group_id) {
        Optional<GroupMember> groupMember = groupMemberService.findByGroups_IdAndUserInfo_Id(group_id, userinfo_id);
        groupMember.get().setStatus(1);
        groupMemberService.save(groupMember.get());
        return new ResponseEntity<>(groupMember.get(), HttpStatus.OK);
    }

    @DeleteMapping("/out-group/{userinfo_id}/{group_id}")
    public ResponseEntity<GroupMember> outGroup(@PathVariable("userinfo_id") Long userinfo_id,
                                                 @PathVariable("group_id") Long group_id) {
        Optional<GroupMember> groupMember = groupMemberService.findByGroups_IdAndUserInfo_Id(group_id, userinfo_id);
        groupMemberService.remove(groupMember.get().getId());
        return new ResponseEntity<>(groupMember.get(), HttpStatus.OK);
    }
}
