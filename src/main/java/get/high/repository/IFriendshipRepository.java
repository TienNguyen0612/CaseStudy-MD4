package get.high.repository;

import get.high.model.entity.Friendship;
import get.high.model.entity.LikePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IFriendshipRepository extends JpaRepository<Friendship, Long> {

    Optional<Friendship> findFriendshipByFromUser_IdAndToUser_Id(Long from_user_id, Long to_user_id);

    Iterable<Friendship> findAllByStatus(Integer status);
}
