package get.high.repository;

import get.high.model.entity.Comment;
import get.high.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ICommentRepository extends JpaRepository<Comment, Long> {
    Iterable<Comment> findAllByPost_Id(Long id);

    void deleteAllByPost(Post post);
}
