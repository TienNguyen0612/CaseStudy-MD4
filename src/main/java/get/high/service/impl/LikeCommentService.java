package get.high.service.impl;

import get.high.model.entity.LikeComment;
import get.high.repository.ILikeCommentRepository;
import get.high.service.ILikeCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LikeCommentService implements ILikeCommentService {
    @Autowired
    private ILikeCommentRepository iLikeCommentRepository;

    @Override
    public Iterable<LikeComment> findAll() {
        return iLikeCommentRepository.findAll();
    }

    @Override
    public Optional<LikeComment> findByComment_IdAndUserInfo_Id(Long comment_id, Long userinfo_id) {
        return iLikeCommentRepository.findByComment_IdAndUserInfo_Id(comment_id, userinfo_id);
    }

    @Override
    public Optional<LikeComment> findById(Long id) {
        return iLikeCommentRepository.findById(id);
    }

    @Override
    public LikeComment save(LikeComment likeComment) {
        return iLikeCommentRepository.save(likeComment);
    }

    @Override
    public Long countLikeCommentByComment_Id(Long post_id) {
        return iLikeCommentRepository.countLikeCommentByComment_Id(post_id);
    }

    @Override
    public void deleteAllByComment_Id(Long post_id) {
        iLikeCommentRepository.deleteAllByComment_Id(post_id);
    }

    @Override
    public void remove(Long id) {
        iLikeCommentRepository.deleteById(id);
    }

    @Override
    public Iterable<LikeComment> findAllByStatus(Integer status) {
        return iLikeCommentRepository.findAllByStatus(status);
    }
}
