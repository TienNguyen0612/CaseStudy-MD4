package get.high.controller;

import get.high.model.entity.Comment;
import get.high.model.entity.LikeComment;
import get.high.model.entity.LikePost;
import get.high.model.entity.UserInfo;
import get.high.service.ICommentService;
import get.high.service.ILikeCommentService;
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
@RequestMapping("api/like-comment")
public class LikeCommentController {

    @Autowired
    private ILikeCommentService likeCommentService;

    @Autowired
    private ICommentService commentService;

    @Autowired
    private IUserService userService;

    @PostMapping("/{comment_id}/{userinfo_id}")
    public ResponseEntity<LikeComment> checkLikeComment(@PathVariable("comment_id") long comment_id, @PathVariable("userinfo_id") long userinfo_id) {
        Optional<LikeComment> likeCommentOptional = likeCommentService.findByComment_IdAndUserInfo_Id(comment_id, userinfo_id);
        if (!likeCommentOptional.isPresent()) {
            UserInfo userInfo = userService.findById(userinfo_id).get();
            Comment comment = commentService.findById(comment_id).get();
            LikeComment likeComment = new LikeComment(comment, userInfo);
            likeCommentService.save(likeComment);
            return new ResponseEntity<>(likeComment, HttpStatus.OK);
        } else {
            likeCommentService.remove(likeCommentOptional.get().getId());
            return new ResponseEntity<>(likeCommentOptional.get(), HttpStatus.OK);
        }
    }

    @PutMapping("/{comment_id}/{userinfo_id}")
    public ResponseEntity<LikeComment> readLikeComment(@PathVariable("comment_id") long comment_id, @PathVariable("userinfo_id") long userinfo_id) {
        Optional<LikeComment> likeCommentOptional = likeCommentService.findByComment_IdAndUserInfo_Id(comment_id, userinfo_id);
        if (likeCommentOptional.isPresent()) {
            likeCommentOptional.get().setStatus(1);
            likeCommentService.save(likeCommentOptional.get());
        }
        return new ResponseEntity<>(likeCommentOptional.get(), HttpStatus.OK);
    }

    @PostMapping("/notification/{userinfo_id}")
    public ResponseEntity<Iterable<LikeComment>> getNotLikePost(@PathVariable("userinfo_id") long userinfo_id) {
        List<LikeComment> likeComments = (List<LikeComment>) likeCommentService.findAllByStatus(0);
        List<LikeComment> likeCommentOptional = new ArrayList<>();
        for (LikeComment likeComment : likeComments) {
            if (likeComment.getComment().getUserInfo().getId() == userinfo_id) {
                likeCommentOptional.add(likeComment);
            }
        }
        return new ResponseEntity<>(likeCommentOptional, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Long> countLikeCommentByComment_Id(@PathVariable("id") long id) {
        Long countLikeCommentByComment_Id = likeCommentService.countLikeCommentByComment_Id(id);
        return new ResponseEntity<>(countLikeCommentByComment_Id, HttpStatus.OK);
    }

}
