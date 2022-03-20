package get.high.service.impl;

import get.high.model.entity.ERole;
import get.high.model.entity.Role;
import get.high.repository.IRoleRepository;
import get.high.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {

    @Autowired
    private IRoleRepository roleRepository;


    @Override
    public Iterable<Role> findAll() {
        return null;
    }

    @Override
    public Optional<Role> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Role save(Role role) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public Optional<Role> findByName(ERole role) {
        return roleRepository.findByName(role);
    }
}
