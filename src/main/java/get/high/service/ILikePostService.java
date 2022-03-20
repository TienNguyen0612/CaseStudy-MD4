package get.high.service;

import get.high.model.entity.LikePost;

import java.util.Optional;

public interface ILikePostService extends IGeneralService<LikePost> {
    Optional<LikePost> findByPost_IdAndUserInfo_Id(Long post_id, Long userinfo_id);

    Long countLikeCommentByPost_Id(Long post_id);

    void deleteAllByPost_Id(Long post_id);

    Iterable<LikePost> findAllByStatus(Integer status);
}
