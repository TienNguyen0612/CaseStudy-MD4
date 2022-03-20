package get.high.controller;

import get.high.model.entity.Comment;
import get.high.service.ICommentService;
import get.high.service.IPostService;
import get.high.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("api/comment")
public class CommentController {

    @Autowired
    private ICommentService commentService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IPostService postService;

    @GetMapping("/{id}")
    public ResponseEntity<Iterable<Comment>> showAllByPost(@PathVariable("id") Long id) {
        Iterable<Comment> comments = commentService.findAllByPost_Id(id);

        if (!comments.iterator().hasNext()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
    }

    @GetMapping("/demo/{id}")

    public ResponseEntity<Comment> showById(@PathVariable("id") Long id) {
        Optional<Comment> comments = commentService.findById(id);
        return comments.map(comment -> new ResponseEntity<>(comment, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping

    public ResponseEntity<Comment> saveComment(@RequestBody Comment comment) {
        return new ResponseEntity<>(commentService.save(comment), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")

    public ResponseEntity<Comment> update(@PathVariable("id") long id, @RequestBody Comment comment) {
        Optional<Comment> commentOptional = commentService.findById(id);
        if (!commentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            comment.setId(commentOptional.get().getId());
            comment = commentService.save(comment);
            return new ResponseEntity<>(comment, HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")

    public ResponseEntity<Comment> delete(@PathVariable("id") long id) {
        Optional<Comment> commentOptional = commentService.findById(id);
        if (!commentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            commentService.remove(id);
            return new ResponseEntity<>(commentOptional.get(), HttpStatus.OK);
        }
    }
}
