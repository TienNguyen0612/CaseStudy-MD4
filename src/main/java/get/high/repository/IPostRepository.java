package get.high.repository;

import get.high.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostRepository extends JpaRepository<Post, Long> {
    Iterable<Post> findAllByContentContaining(String content);

    Iterable<Post> findAllByUserInfo_IdAndStatus(Long userinfo_id, Integer status);

    Iterable<Post> findAllByStatus(Integer status);

    Iterable<Post> findAllByUserInfo_Id(Long userinfo_id);

    Iterable<Post> findAllByGroups_Id(Long groups_id);
}