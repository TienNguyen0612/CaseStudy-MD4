package get.high.service.impl;

import get.high.model.entity.Comment;
import get.high.model.entity.Post;
import get.high.repository.IPostRepository;
import get.high.service.ICommentService;
import get.high.service.ILikePostService;
import get.high.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PostService implements IPostService {
    @Autowired
    private IPostRepository iPostRepository;

    @Autowired
    private ICommentService iCommentService;

    @Autowired
    private ILikePostService iLikePostService;

    @Override
    public Iterable<Post> findAll() {
        return iPostRepository.findAll();
    }

    @Override
    public Optional<Post> findById(Long id) {
        return iPostRepository.findById(id);
    }

    @Override
    public Post save(Post post) {
        return iPostRepository.save(post);
    }

    @Override
    public void remove(Long id) {
        Iterable<Comment> comments = iCommentService.findAllByPost_Id(id);
        for (Comment comment : comments) {
            iCommentService.remove(comment.getId());
        }
        iLikePostService.deleteAllByPost_Id(id);
        iPostRepository.deleteById(id);
    }

    @Override
    public Iterable<Post> findAllByHasTag(String hasTag) {
        return iPostRepository.findAllByContentContaining(hasTag);
    }

    @Override
    public Iterable<Post> findAllByUserInfo_IdAndStatus(Long userinfo_id, Integer status) {
        return iPostRepository.findAllByUserInfo_IdAndStatus(userinfo_id, status);
    }

    @Override
    public Iterable<Post> findAllByStatus(Integer status) {
        return iPostRepository.findAllByStatus(status);
    }

    @Override
    public Iterable<Post> findAllByGroups_Id(Long groups_id) {
        return iPostRepository.findAllByGroups_Id(groups_id);
    }

    @Override
    public Iterable<Post> findAllByUserInfo_Id(Long userinfo_id) {
        return iPostRepository.findAllByUserInfo_Id(userinfo_id);
    }
}
