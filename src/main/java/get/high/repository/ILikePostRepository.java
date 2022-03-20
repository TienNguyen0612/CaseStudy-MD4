package get.high.repository;

import get.high.model.entity.LikePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface ILikePostRepository extends JpaRepository<LikePost, Long> {
    Optional<LikePost> findByPost_IdAndUserInfo_Id(Long post_id, Long userinfo_id);

    Long countLikeCommentByPost_Id(Long post_id);

    void deleteAllByPost_Id(Long post_id);

    Iterable<LikePost> findAllByStatus(Integer status);
}
