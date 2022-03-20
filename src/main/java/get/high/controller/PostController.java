package get.high.controller;

import get.high.model.entity.Friendship;
import get.high.model.entity.Post;
import get.high.service.IFriendshipService;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("api/post")
public class PostController {
    @Value("${file-upload}")
    private String fileUpload;

    @Value("${view}")
    private String view;

    @Autowired
    private IPostService postService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IFriendshipService friendshipService;

    @GetMapping
    public ResponseEntity<Iterable<Post>> findAll() {
        Iterable<Post> posts = postService.findAll();
        if (!posts.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/search-content")
    public ResponseEntity<Iterable<Post>> findAllByHasTag(@RequestParam Optional<String> search) {
        List<Post> posts = (List<Post>) postService.findAllByHasTag(search.get());
        if (!posts.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        posts.sort((o1, o2) -> (int) (o2.getId() - o1.getId()));
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

//     detail post
    @GetMapping("/{id}")
    public ResponseEntity<Post> detail(@PathVariable("id") Long id) {
        Optional<Post> post = postService.findById(id);
        return post.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/my-time-line/{user_id}")
    public ResponseEntity<Iterable<Post>> myProfile(@PathVariable("user_id") long user_id) {
        List<Post> posts = (List<Post>) postService.findAllByUserInfo_Id(user_id);
        if (!posts.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        posts.sort((o1, o2) -> (int) (o2.getId() - o1.getId()));
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    //profile
    @GetMapping("/{from_user_id}/{to_user_id}")
    public ResponseEntity<Iterable<Post>> profile(@PathVariable("from_user_id") long from_user_id,
                                                  @PathVariable("to_user_id") long to_user_id) {
        List<Post> posts;
        Optional<Friendship> friendshipOptional = friendshipService.findFriendshipByFromUser_IdAndToUser_Id(from_user_id, to_user_id);
        if (friendshipOptional.isPresent() && friendshipOptional.get().getStatus() == 1) {
            posts = (List<Post>) postService.findAllByUserInfo_Id(to_user_id);
        } else {
            posts = (List<Post>) postService.findAllByUserInfo_IdAndStatus(to_user_id, 0);
        }
        posts.sort((o1, o2) -> (int) (o2.getId() - o1.getId()));
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    //tạo post + upload file
    @PostMapping("/{userinfo_id}")
    public ResponseEntity<Post> add(@PathVariable("userinfo_id") Long userinfo_id,
                                    @RequestPart("post") Post post, @RequestPart("file") Optional<MultipartFile> file) {
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

        post.setUserInfo(userService.findById(userinfo_id).get());
        Post postCreate = postService.save(post);
        return new ResponseEntity<>(postCreate, HttpStatus.CREATED);
    }

    //sửa post + upload file
    @PutMapping("/{id}")
    public ResponseEntity<Post> update(@PathVariable("id") Long id, @RequestPart("postUpdate") Post postUpdate,
                                            @RequestPart("file") Optional<MultipartFile> file) {
        Optional<Post> post = postService.findById(id);
        if (!post.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        postUpdate.setId(post.get().getId());
        postUpdate.setDateCreated(post.get().getDateCreated());
        postUpdate.setGroups(post.get().getGroups());
        postUpdate.setUserInfo(post.get().getUserInfo());

        if (file.isPresent()) {
                String fileName = file.get().getOriginalFilename();
                try {
                    FileCopyUtils.copy(file.get().getBytes(), new File(fileUpload + fileName));
                    postUpdate.setImgUrl(view + fileName);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                postUpdate.setImgUrl(post.get().getImgUrl());
            }

        postUpdate = postService.save(postUpdate);
        return new ResponseEntity<>(postUpdate, HttpStatus.OK);
    }

    //xóa post
    @DeleteMapping("/{id}")
    public ResponseEntity<Post> delete(@PathVariable("id") Long id) {
        Optional<Post> post = postService.findById(id);
        if (!post.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        postService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //New-feeds
    @GetMapping("/get-new-feeds/{userinfo_id}")
    public ResponseEntity<Iterable<Post>> getNewFeeds(@PathVariable("userinfo_id") long userinfo_id) {
        List<Post> posts = (List<Post>) postService.findAllByStatus(0);
        Iterable<Friendship> friendships = friendshipService.findAll();
        for (Friendship friendship : friendships) {
            if (friendship.getFromUser().getId() == userinfo_id && friendship.getStatus() == 1) {
                List<Post> posts_ToUser = (List<Post>) postService.findAllByUserInfo_IdAndStatus(friendship.getToUser().getId(), 1);
                posts.addAll(posts_ToUser);
            } else if (friendship.getToUser().getId() == userinfo_id && friendship.getStatus() == 1) {
                List<Post> posts_FromUser = (List<Post>) postService.findAllByUserInfo_IdAndStatus(friendship.getFromUser().getId(), 1);
                posts.addAll(posts_FromUser);
            }
        }
        List<Post> postUser = (List<Post>) postService.findAllByUserInfo_IdAndStatus(userinfo_id, 1);
        posts.addAll(postUser);
        posts.sort((o1, o2) -> (int) (o2.getId()-o1.getId()));
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    //New-feeds-group
    @GetMapping ("/get-new-feeds-group/{group_id}")
    public ResponseEntity<Iterable<Post>> getPostGroup(@PathVariable("group_id") Long group_id) {
        List<Post> posts = (List<Post>) postService.findAllByGroups_Id(group_id);
        if (!posts.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        posts.sort((o1, o2) -> (int) (o2.getId() - o1.getId()));
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }
}
