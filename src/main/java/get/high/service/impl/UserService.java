package get.high.service.impl;

import get.high.model.entity.UserInfo;
import get.high.repository.IUserRepository;
import get.high.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;

    @Override
    public Iterable<UserInfo> findAll() {
        return iUserRepository.findAll();
    }

    @Override
    public Optional<UserInfo> findById(Long id) {
        return iUserRepository.findById(id);
    }

    @Override
    public UserInfo save(UserInfo userInfo) {
        return iUserRepository.save(userInfo);
    }

    @Override
    public void remove(Long id) {
        iUserRepository.deleteById(id);
    }

    @Override
    public Iterable<UserInfo> findAllByFullNameContaining(String fullName) {
        return iUserRepository.findAllByFullNameContaining(fullName);
    }
}
