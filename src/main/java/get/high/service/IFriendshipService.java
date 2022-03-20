package get.high.service;

import get.high.model.entity.Friendship;

import java.util.Optional;

public interface IFriendshipService extends IGeneralService<Friendship> {

    Optional<Friendship> findFriendshipByFromUser_IdAndToUser_Id(Long from_user_id, Long to_user_id);

    Iterable<Friendship> findAllByStatus(Integer status);

}
