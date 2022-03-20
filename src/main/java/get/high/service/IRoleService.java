package get.high.service;

import get.high.model.entity.ERole;
import get.high.model.entity.Role;

import java.util.List;
import java.util.Optional;

public interface IRoleService extends IGeneralService<Role>{
     Optional<Role> findByName(ERole role);
}
