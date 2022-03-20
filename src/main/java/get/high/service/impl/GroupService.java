package get.high.service.impl;

import get.high.model.entity.Groups;
import get.high.model.entity.UserInfo;
import get.high.repository.IGroupRepository;
import get.high.service.IGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GroupService implements IGroupService {
    @Autowired
    private IGroupRepository iGroupRepository;

    @Override
    public Iterable<Groups> findAll() {
        return iGroupRepository.findAll();
    }

    @Override
    public Optional<Groups> findById(Long id) {
        return iGroupRepository.findById(id);
    }

    @Override
    public Groups save(Groups groups) {
        return iGroupRepository.save(groups);
    }

    @Override
    public void remove(Long id) {
        iGroupRepository.deleteById(id);
    }

    @Override
    public Iterable<Groups> findAllByName(String name) {
        return iGroupRepository.findAllByNameContaining(name);
    }
}
