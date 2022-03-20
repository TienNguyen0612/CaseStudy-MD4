package get.high.service.impl;

import get.high.model.entity.Friendship;
import get.high.model.entity.UserInfo;
import get.high.repository.IFriendshipRepository;
import get.high.service.IFriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FriendshipService implements IFriendshipService {
    @Autowired
    private IFriendshipRepository iFriendshipRepository;

    @Override
    public Optional<Friendship> findFriendshipByFromUser_IdAndToUser_Id(Long from_user_id, Long to_user_id) {
        return iFriendshipRepository.findFriendshipByFromUser_IdAndToUser_Id(from_user_id, to_user_id);
    }

    @Override
    public Iterable<Friendship> findAll() {
        return iFriendshipRepository.findAll();
    }

    @Override
    public Optional<Friendship> findById(Long id) {
        return iFriendshipRepository.findById(id);
    }

    @Override
    public Friendship save(Friendship friendship) {
        return iFriendshipRepository.save(friendship);
    }

    @Override
    public void remove(Long id) {
        iFriendshipRepository.deleteById(id);
    }

    @Override
    public Iterable<Friendship> findAllByStatus(Integer status) {
        return iFriendshipRepository.findAllByStatus(status);
    }
}
