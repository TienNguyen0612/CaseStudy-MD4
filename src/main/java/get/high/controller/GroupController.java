package get.high.controller;

import get.high.model.entity.GroupMember;
import get.high.model.entity.Groups;
import get.high.model.entity.Post;
import get.high.model.entity.UserInfo;
import get.high.service.IGroupMemberService;
import get.high.service.IGroupService;
import get.high.service.IPostService;
import get.high.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("api/group")
public class GroupController {
    @Value("${file-upload}")
    private String fileUpload;

    @Value("${view}")
    private String view;

    @Autowired
    private IGroupService groupService;

    @Autowired
    private IGroupMemberService groupMemberService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IPostService postService;

    @GetMapping("/get-group-member")
    public ResponseEntity<Iterable<GroupMember>> getAllGroupMember() {
        Iterable<GroupMember> groupMembers = groupMemberService.findAll();
        if (!groupMembers.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(groupMembers, HttpStatus.OK);
    }

    @GetMapping("/get-group/{userinfo_id}")
    public ResponseEntity<Iterable<Groups>> getAllGroups(@PathVariable("userinfo_id") Long userinfo_id) {
        List<Groups> groupsList = (List<Groups>) groupService.findAll();
        List<Groups> myGroups = new ArrayList<>();
        for (Groups groups : groupsList) {
            Optional<GroupMember> groupMemberOptional = groupMemberService.findByGroups_IdAndUserInfo_Id(groups.getId(), userinfo_id);
            if (groupMemberOptional.isPresent()) {
                myGroups.add(groups);
            }
        }
        groupsList.removeAll(myGroups);
        return new ResponseEntity<>(groupsList, HttpStatus.OK);
    }

    @GetMapping("/get-my-group/{userinfo_id}")
    public ResponseEntity<Iterable<Groups>> getMyGroups(@PathVariable("userinfo_id") Long userinfo_id) {
        List<GroupMember> groupMembers = (List<GroupMember>) groupMemberService.findAllByUserInfo_IdAndStatus(userinfo_id, 0);
        groupMembers.addAll((List<GroupMember>) groupMemberService.findAllByUserInfo_IdAndStatus(userinfo_id, 1));
        List<Groups> groupsList = new ArrayList<>();
        for (GroupMember groupMember : groupMembers) {
            groupsList.add(groupMember.getGroups());
        }
        if (groupsList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(groupsList, HttpStatus.OK);
    }

    //tạo group
    @PostMapping("/create-group/{userinfo_id}")
    public ResponseEntity<Groups> createGroup(@PathVariable("userinfo_id") Long userinfo_id, @RequestBody Groups groups) {
        Groups groupsCreate = groupService.save(groups);
        Optional<UserInfo> userInfo = userService.findById(userinfo_id);
        GroupMember groupMember = new GroupMember(0, userInfo.get(), groups);
        groupMemberService.save(groupMember);
        return new ResponseEntity<>(groupsCreate, HttpStatus.CREATED);
    }

    //tạo post trong group + upload-File
    @PostMapping("/create-post/{group_id}/{userinfo_id}")
    public ResponseEntity<Post> createPost(@PathVariable("group_id") Long group_id, @PathVariable("userinfo_id") Long userinfo_id,
                                           @RequestPart Post post, @RequestPart("file") Optional<MultipartFile> file) {
        post.setDateCreated(LocalDate.now());
        String fileName = "";
        if (file.isPresent()) {
            fileName = file.get().getOriginalFilename();
            try {
                FileCopyUtils.copy(file.get().getBytes(), new File(fileUpload + fileName));
                post.setImgUrl(view + fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        post.setGroups(groupService.findById(group_id).get());
        post.setUserInfo(userService.findById(userinfo_id).get());
        Post postCreate = postService.save(post);
        return new ResponseEntity<>(postCreate, HttpStatus.CREATED);
    }

    @GetMapping("/search-group")
    public ResponseEntity<Iterable<Groups>> findAllByName(@RequestParam Optional<String> search) {
        Iterable<Groups> groupsList = groupService.findAllByName(search.get());
        if (!groupsList.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(groupsList, HttpStatus.OK);
    }

    @GetMapping("/detail/{group_id}")
    public ResponseEntity<Groups> detail(@PathVariable("group_id") Long group_id) {
        Optional<Groups> groupOptional = groupService.findById(group_id);
        return groupOptional.map(groups -> new ResponseEntity<>(groups, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
