package get.high.service;

import get.high.model.entity.LikeComment;

import java.util.Optional;

public interface ILikeCommentService extends IGeneralService<LikeComment> {
    Optional<LikeComment> findByComment_IdAndUserInfo_Id(Long comment_id, Long userinfo_id);

    Long countLikeCommentByComment_Id(Long post_id);

    void deleteAllByComment_Id(Long post_id);

    Iterable<LikeComment> findAllByStatus(Integer status);
}
