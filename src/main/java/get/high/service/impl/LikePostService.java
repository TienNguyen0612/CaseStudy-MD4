package get.high.service.impl;

import get.high.model.entity.LikePost;
import get.high.model.entity.UserInfo;
import get.high.repository.ILikePostRepository;
import get.high.service.ILikePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikePostService implements ILikePostService {
    @Autowired
    private ILikePostRepository iLikePostRepository;

    @Override
    public Iterable<LikePost> findAll() {
        return iLikePostRepository.findAll();
    }

    @Override
    public Optional<LikePost> findById(Long id) {
        return iLikePostRepository.findById(id);
    }

    @Override
    public LikePost save(LikePost likePost) {
        return iLikePostRepository.save(likePost);
    }

    @Override
    public void remove(Long id) {
        iLikePostRepository.deleteById(id);
    }

    @Override
    public Optional<LikePost> findByPost_IdAndUserInfo_Id(Long post_id, Long userinfo_id) {
        return iLikePostRepository.findByPost_IdAndUserInfo_Id(post_id, userinfo_id);
    }

    @Override
    public void deleteAllByPost_Id(Long post_id) {
        iLikePostRepository.deleteAllByPost_Id(post_id);
    }

    @Override
    public Long countLikeCommentByPost_Id(Long post_id) {
        return iLikePostRepository.countLikeCommentByPost_Id(post_id);
    }

    @Override
    public Iterable<LikePost> findAllByStatus(Integer status) {
        return iLikePostRepository.findAllByStatus(status);
    }
}
