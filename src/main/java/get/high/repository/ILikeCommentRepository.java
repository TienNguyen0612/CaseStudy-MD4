package get.high.repository;

import get.high.model.entity.LikeComment;
import get.high.model.entity.LikePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

@Repository
@Transactional
public interface ILikeCommentRepository extends JpaRepository<LikeComment, Long> {
    Optional<LikeComment> findByComment_IdAndUserInfo_Id(Long comment_id, Long userinfo_id);

    Long countLikeCommentByComment_Id(Long post_id);

    void deleteAllByComment_Id(Long post_id);

    Iterable<LikeComment> findAllByStatus(Integer status);
}
